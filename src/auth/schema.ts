import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  github_id: text('github_id').unique(),
  hashed_password: text('hashed_password').notNull(),
});

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const registerFormSchema = z.object({
  login: z.string().min(3).max(25),
  password: z.string().min(8),
  repeatPassword: z.string().min(8),
});

export const loginFormSchema = z.object({
  login: z.string().min(3).max(25),
  password: z.string().min(8),
});
