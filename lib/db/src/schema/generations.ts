import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const generationsTable = pgTable("generations", {
  id: serial("id").primaryKey(),
  inputText: text("input_text").notNull(),
  tone: text("tone").notNull(),
  tweets: jsonb("tweets").$type<string[]>().notNull().default([]),
  linkedin: text("linkedin").notNull().default(""),
  blog: text("blog").notNull().default(""),
  hooks: jsonb("hooks").$type<string[]>().notNull().default([]),
  captions: jsonb("captions").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGenerationSchema = createInsertSchema(generationsTable).omit({ id: true, createdAt: true });
export type InsertGeneration = z.infer<typeof insertGenerationSchema>;
export type Generation = typeof generationsTable.$inferSelect;
