import { Request, Response } from "express";
import { ENV } from "../_core/env";
import { getDb } from "../db";
import { orders } from "../../drizzle/schema";
import { notifyNewOrder, notifyPaymentFailed } from "../services/email";

let stripe: any;

function getStripe() {
  if (!stripe && ENV.stripeSecretKey) {
    const Stripe = require("stripe");
    stripe = new Stripe(ENV.stripeSecretKey);
  }
  return stripe;
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const stripeClient = getStripe();
  if (!stripeClient) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = ENV.stripeWebhookSecret;

  if (!webhookSecret) {
    console.error("[Webhook] Stripe webhook secret not configured");
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("[Webhook] Checkout session completed:", session.id);

        // Save order to database
        const db = await getDb();
        if (db && session.metadata) {
          const userId = parseInt(session.metadata.user_id);
          const productId = parseInt(session.metadata.product_id);
          const customerEmail = session.customer_email || session.metadata.customer_email;
          const productName = session.metadata.product_name || "Digital Product";

          const result = await db.insert(orders).values({
            userId,
            productId,
            stripePaymentIntentId: session.payment_intent as string,
            amount: ((session.amount_total || 0) / 100).toString(),
            status: "completed",
            paymentMethod: "stripe",
            metadata: {
              sessionId: session.id,
              customerEmail: session.customer_email,
            },
          });

          console.log("[Webhook] Order created for user", userId);

          // Send notification to owner
          await notifyNewOrder(
            userId,
            customerEmail,
            productName,
            (session.amount_total || 0) / 100
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        console.log("[Webhook] Payment failed:", paymentIntent.id);

        // Update order status
        const db = await getDb();
        if (db) {
          const { eq } = await import("drizzle-orm");
          await db
            .update(orders)
            .set({ status: "failed" })
            .where(eq(orders.stripePaymentIntentId, paymentIntent.id));

          // Send notification to owner
          const failureReason = paymentIntent.last_payment_error?.message || "Unknown reason";
          await notifyPaymentFailed(
            0, // orderId - would need to fetch from DB
            paymentIntent.receipt_email || "Unknown",
            "Digital Product",
            failureReason
          );
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        console.log("[Webhook] Charge refunded:", charge.id);

        // Update order status
        const db = await getDb();
        if (db) {
          const { eq } = await import("drizzle-orm");
          await db
            .update(orders)
            .set({ status: "refunded" })
            .where(eq(orders.stripePaymentIntentId, charge.payment_intent));

          console.log("[Webhook] Order refunded for charge", charge.id);
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
