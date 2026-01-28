import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, columns, products, orders, statistics } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    // Mock admin user for local development/testing if DB is down
    if (openId === "admin-session") {
      return {
        id: 0,
        openId: "admin-session",
        name: "Administrator",
        email: "admin@axa-shop.local",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      } as any;
    }
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Columns (Categories) queries
 */
export async function getAllColumns() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(columns).orderBy(columns.displayOrder);
}

export async function getColumnById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(columns).where(eq(columns.id, id)).limit(1);
  return result[0];
}

/**
 * Products queries
 */
export async function getVisibleProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.isVisible, true));
}

export async function getProductsByColumnId(columnId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(eq(products.columnId, columnId));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

/**
 * Orders queries
 */
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId));
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result[0];
}

export async function getTotalSales() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(orders).where(eq(orders.status, "completed"));
  return result.reduce((sum, order) => sum + parseFloat(order.amount), 0);
}

/**
 * Statistics queries
 */
export async function getLatestStatistics() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(statistics).orderBy(desc(statistics.createdAt)).limit(1);
  return result[0];
}
