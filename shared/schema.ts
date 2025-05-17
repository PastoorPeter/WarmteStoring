import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const errorCodes = pgTable("error_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  severity: text("severity").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  solutionForResidents: text("solution_for_residents").notNull(),
  solutionForTechnicians: text("solution_for_technicians"),
  system: text("system").notNull(),
  tags: text("tags").array(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertErrorCodeSchema = createInsertSchema(errorCodes).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ErrorCode = typeof errorCodes.$inferSelect;
export type InsertErrorCode = z.infer<typeof insertErrorCodeSchema>;

export const severityEnum = z.enum(["critical", "warning", "info"]);
export type Severity = z.infer<typeof severityEnum>;

export const systemEnum = z.enum([
  "Remeha",
  "Intergas",
  "Nefit",
  "Agpo Ferroli",
  "Vaillant",
  "Andere"
]);
export type System = z.infer<typeof systemEnum>;
