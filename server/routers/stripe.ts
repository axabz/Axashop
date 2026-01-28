import { protectedProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

let stripe: any;

// Initialize Stripe lazily
function getStripe() {
  if (!stripe && ENV.stripeSecretKey) {
    const Stripe = require("stripe");
    stripe = new Stripe(ENV.stripeSecretKey);
  }
  return stripe;
}

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure
    .input((val: any) => ({
      productId: val.productId as number,
      quantity: val.quantity as number,
    }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user?.email) {
        throw new Error("User email is required");
      }

      try {
        const stripeClient = getStripe();
        if (!stripeClient) {
          throw new Error("Stripe is not configured");
        }

        // Get product from database
        const { getProductById } = await import("../db");
        const product = await getProductById(input.productId);

        if (!product) {
          throw new Error("Product not found");
        }

        // Create checkout session
        const session = await stripeClient.checkout.sessions.create({
          customer_email: ctx.user.email,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            product_id: input.productId.toString(),
            customer_email: ctx.user.email,
            customer_name: ctx.user.name || "Customer",
          },
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: product.name,
                  description: product.description || undefined,
                },
                unit_amount: Math.round(parseFloat(product.price) * 100),
              },
              quantity: input.quantity,
            },
          ],
          mode: "payment",
          success_url: `${ctx.req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin}/cancelled`,
          allow_promotion_codes: true,
        });

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error("Stripe checkout error:", error);
        throw new Error("Failed to create checkout session");
      }
    }),

  getSession: protectedProcedure
    .input((val: any) => ({
      sessionId: val.sessionId as string,
    }))
    .query(async ({ input }) => {
      try {
        const stripeClient = getStripe();
        if (!stripeClient) {
          throw new Error("Stripe is not configured");
        }
        const session = await stripeClient.checkout.sessions.retrieve(input.sessionId);
        return {
          id: session.id,
          status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_email,
        };
      } catch (error) {
        console.error("Stripe session retrieval error:", error);
        throw new Error("Failed to retrieve session");
      }
    }),
});
