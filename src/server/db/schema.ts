// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import {
  decimal,
  index,
  integer,
  PgInteger,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fin_trak_${name}`);

export const users = createTable(
  "users",
  {
    uId: varchar("id").primaryKey(),
    username: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
  })
);

export const transactions = createTable(
  "transactions",
  {
    tNo: serial("id").primaryKey(),
    userId: varchar('user_id').notNull().references(() => users.uId),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    vendor: varchar("vendor", {length:256}).default("NULL"),
    category: varchar("category", {length:256}).default("NULL"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    // Optional: Define indexes or constraints here
  })
);

export const budget = createTable(
  "budget",
  {
    BId: varchar('user_id').notNull().references(() => users.uId).primaryKey(),
    budget: decimal("budget", { precision: 10, scale: 2 }).default("0"),
  },
  (example) => ({
    // Optional: Define indexes or constraints here
  })
);

export const logging = createTable(
  "logs",
  {
    lNo: serial("id").primaryKey(),
    logId: varchar('log_id').notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    // Optional: Define indexes or constraints here
  })
);
