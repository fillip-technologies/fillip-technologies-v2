/**
 * One-time data migration: copies every table from the old Neon Postgres
 * database into MongoDB. Idempotent for keyed collections (site_content by
 * `key`, admin_users by `email`, industries by `slug`); leads/quotes are only
 * imported when their target collection is empty, so re-running won't duplicate.
 *
 * Usage: `npm run db:migrate-from-postgres`
 * Requires both DATABASE_URL (source) and MONGODB_URI (target) in the env.
 *
 * Standalone (no `@/` alias) so it runs directly under Node.
 */
import dns from "node:dns";
import { Pool } from "pg";
import mongoose from "mongoose";

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

async function main() {
  const pgUrl = process.env.DATABASE_URL;
  const mongoUri = process.env.MONGODB_URI;
  if (!pgUrl) throw new Error("DATABASE_URL (source Postgres) is not set.");
  if (!mongoUri) throw new Error("MONGODB_URI (target MongoDB) is not set.");

  const pool = new Pool({ connectionString: pgUrl, ssl: { rejectUnauthorized: false } });
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db!;

  // Which tables exist in the source DB (some, e.g. quotes/industries, may not).
  const { rows: tableRows } = await pool.query<{ table_name: string }>(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  );
  const tables = new Set(tableRows.map((r) => r.table_name));
  const has = (t: string) => tables.has(t);

  /** Copy every row of a table, upserting on a natural key. */
  async function upsertByKey(table: string, collection: string, keyField: string) {
    if (!has(table)) {
      console.log(`- ${table}: not present in source, skipping.`);
      return;
    }
    const { rows } = await pool.query(`SELECT * FROM ${table}`);
    for (const row of rows) {
      const { id, ...rest } = row; // drop Postgres uuid; Mongo assigns its own _id
      void id;
      await db.collection(collection).updateOne(
        { [keyField]: row[keyField] },
        { $set: rest },
        { upsert: true }
      );
    }
    console.log(`✓ ${table}: ${rows.length} row(s) upserted into "${collection}".`);
  }

  /** Copy a table only if the target collection is empty (no natural key). */
  async function copyIfEmpty(table: string, collection: string) {
    if (!has(table)) {
      console.log(`- ${table}: not present in source, skipping.`);
      return;
    }
    const existing = await db.collection(collection).countDocuments();
    if (existing > 0) {
      console.log(`- ${collection}: already has ${existing} doc(s), skipping to avoid duplicates.`);
      return;
    }
    const { rows } = await pool.query(`SELECT * FROM ${table}`);
    if (rows.length === 0) {
      console.log(`- ${table}: no rows to copy.`);
      return;
    }
    const docs = rows.map((row) => {
      const { id, ...rest } = row;
      void id;
      return rest;
    });
    await db.collection(collection).insertMany(docs);
    console.log(`✓ ${table}: ${docs.length} row(s) copied into "${collection}".`);
  }

  console.log("Migrating Postgres → MongoDB ...\n");
  await upsertByKey("site_content", "site_content", "key");
  await upsertByKey("admin_users", "admin_users", "email");
  await upsertByKey("industries", "industries", "slug");
  await copyIfEmpty("leads", "leads");
  await copyIfEmpty("quotes", "quotes");

  console.log("\n✓ Data migration complete.");
  await pool.end();
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
