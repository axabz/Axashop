import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getAllColumns, getColumnById, getVisibleProducts, getProductsByColumnId, getProductById, getLatestStatistics } from "./db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { stripeRouter } from "./routers/stripe";

// Admin procedure - only accessible by admins
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Admin access required',
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    adminLogin: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const { ENV } = await import("./_core/env");
        const { upsertUser } = await import("./db");
        const { sdk } = await import("./_core/sdk");
        const { ONE_YEAR_MS } = await import("@shared/const");

        if (input.password !== ENV.adminPassword) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid admin password",
          });
        }

        // Create a special admin session
        const adminOpenId = "admin-session";
        await upsertUser({
          openId: adminOpenId,
          name: "Administrator",
          role: "admin",
        });

        const sessionToken = await sdk.createSessionToken(adminOpenId, {
          name: "Administrator",
          expiresInMs: ONE_YEAR_MS,
        });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: ONE_YEAR_MS,
        });

        return { success: true };
      }),
  }),

  // Columns router
  columns: router({
    list: publicProcedure.query(() => getAllColumns()),
    getById: publicProcedure.input((val: any) => val.id as number).query(({ input }) => getColumnById(input)),
  }),

  // Products router
  products: router({
    list: publicProcedure.query(() => getVisibleProducts()),
    getByColumnId: publicProcedure.input((val: any) => val.columnId as number).query(({ input }) => getProductsByColumnId(input)),
    getById: publicProcedure.input((val: any) => val.id as number).query(({ input }) => getProductById(input)),
  }),

  // Statistics router
  statistics: router({
    getLatest: publicProcedure.query(() => getLatestStatistics()),
  }),

  // Stripe router
  stripe: stripeRouter,

  // Admin routers
  admin: router({
    columns: router({
      list: adminProcedure.query(async () => {
        const { getAllColumns } = await import("./db");
        return getAllColumns();
      }),
      create: adminProcedure.input((val: any) => ({
        name: val.name as string,
        slug: val.slug as string,
        icon: val.icon as string,
        displayOrder: val.displayOrder as number,
      })).mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { columns } = await import("../drizzle/schema");
        const result = await db.insert(columns).values(input);
        return result;
      }),
      update: adminProcedure.input((val: any) => ({
        id: val.id as number,
        name: val.name as string,
        displayOrder: val.displayOrder as number,
        isActive: val.isActive as boolean,
      })).mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { columns } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        return db.update(columns).set(input).where(eq(columns.id, input.id));
      }),
    }),
    products: router({
      list: adminProcedure.query(async () => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) return [];
        const { products } = await import("../drizzle/schema");
        return db.select().from(products);
      }),
      create: adminProcedure.input((val: any) => ({
        columnId: val.columnId as number,
        name: val.name as string,
        description: val.description as string,
        image: val.image as string,
        price: val.price as string,
        stock: val.stock as number,
      })).mutation(async ({ input }) => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const { products } = await import("../drizzle/schema");
        return db.insert(products).values(input);
      }),
    }),
    users: router({
      list: adminProcedure.query(async () => {
        const { getDb } = await import("./db");
        const db = await getDb();
        if (!db) return [];
        const { users } = await import("../drizzle/schema");
        return db.select().from(users);
      }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
