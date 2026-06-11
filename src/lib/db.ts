import { Pool } from "pg";

/**
 * A single shared Postgres connection pool, created lazily on first use.
 *
 * In development Next.js clears the module cache on every change, which would
 * otherwise open a brand-new pool on each reload and exhaust connections. We
 * cache the pool on `globalThis` to survive hot reloads.
 *
 * The pool is created lazily (not at import time) so that importing this module
 * never throws — only an actual query requires DATABASE_URL to be set.
 */
const globalForDb = globalThis as unknown as { pool?: Pool };

export function getPool(): Pool {
  if (globalForDb.pool) return globalForDb.pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
  }

  const pool = new Pool({
    connectionString,
    // Neon (and most hosted Postgres) require SSL.
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.pool = pool;
  }
  return pool;
}

/**
 * Run a parameterized SQL query. Always pass values as the second argument
 * (never string-interpolate) so queries are safe from SQL injection.
 *
 * @example
 *   const rows = await query<Lead>("SELECT * FROM leads WHERE id = $1", [id]);
 */
export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await getPool().query(text, params as never);
  return result.rows as T[];
}
