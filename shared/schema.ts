import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const providers = pgTable("providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  location: text("location").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  contactEmail: text("contact_email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  available: boolean("available").default(true),
  reviewCount: integer("review_count").default(0),
});

export const insertProviderSchema = createInsertSchema(providers).omit({
  id: true,
});

export type InsertProvider = z.infer<typeof insertProviderSchema>;
export type Provider = typeof providers.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
