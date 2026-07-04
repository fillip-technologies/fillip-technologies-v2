/**
 * MongoDB setup runner: ensures indexes and seeds the base industries.
 * Usage: `npm run db:migrate`  (safe to run repeatedly — idempotent).
 *
 * Standalone (no `@/` alias) so it runs directly under Node.
 */
import dns from "node:dns";
import mongoose from "mongoose";

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

const SEED_INDUSTRIES = [
  { slug: "healthcare", label: "Healthcare", sort_order: 1 },
  { slug: "finance", label: "Finance", sort_order: 2 },
  { slug: "retail", label: "Retail", sort_order: 3 },
  { slug: "education", label: "Education", sort_order: 4 },
  { slug: "real-estate", label: "Real Estate", sort_order: 5 },
  { slug: "logistics", label: "Logistics", sort_order: 6 },
];

const SEED_CATEGORIES = [
  { slug: "web-development", label: "Web Development", sort_order: 1 },
  { slug: "mobile-app-development", label: "Mobile App Development", sort_order: 2 },
  { slug: "software-enterprise", label: "Software & Enterprise", sort_order: 3 },
  { slug: "creative-experience-design", label: "Creative Experience Design", sort_order: 4 },
  { slug: "seo-performance-marketing", label: "SEO & Performance Marketing", sort_order: 5 },
  { slug: "challenges-we-solve", label: "Challenges We Solve", sort_order: 6 },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.example).");
  }

  await mongoose.connect(uri);
  const db = mongoose.connection.db!;
  console.log("Connected. Ensuring indexes ...");

  await db.collection("site_content").createIndex({ key: 1 }, { unique: true });
  await db.collection("admin_users").createIndex({ email: 1 }, { unique: true });
  await db.collection("industries").createIndex({ slug: 1 }, { unique: true });
  await db.collection("industries").createIndex({ sort_order: 1, slug: 1 });
  await db.collection("service_categories").createIndex({ slug: 1 }, { unique: true });
  await db.collection("service_categories").createIndex({ sort_order: 1, slug: 1 });
  await db.collection("leads").createIndex({ created_at: -1 });

  console.log("Seeding base industries ...");
  const now = new Date();
  for (const ind of SEED_INDUSTRIES) {
    await db.collection("industries").updateOne(
      { slug: ind.slug },
      {
        $setOnInsert: {
          slug: ind.slug,
          label: ind.label,
          published: true,
          sort_order: ind.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding What-We-Do categories ...");
  for (const cat of SEED_CATEGORIES) {
    await db.collection("service_categories").updateOne(
      { slug: cat.slug },
      {
        $setOnInsert: {
          slug: cat.slug,
          label: cat.label,
          published: true,
          sort_order: cat.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("✓ MongoDB setup complete.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
