import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { sessionTable, userTable } from '@/auth/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL ?? '';

const client = postgres(connectionString);
export const db = drizzle(client);

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable,
);
