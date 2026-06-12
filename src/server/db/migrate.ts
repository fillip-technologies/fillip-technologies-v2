/**
 * Minimal migration runner: executes schema.sql against DATABASE_URL.
 * Usage: `npm run db:migrate`
 *
 * Standalone (own pool, no `@/` alias) so it runs directly under Node.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Pool } from "pg";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const sql = readFileSync(join(process.cwd(), "src/server/db/schema.sql"), "utf8");
  console.log("Applying schema.sql ...");
  await pool.query(sql);
  console.log("✓ Schema applied.");
  await pool.end();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
