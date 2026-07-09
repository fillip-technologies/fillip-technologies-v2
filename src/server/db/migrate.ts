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

// The 7 originally-static /services/<slug> pages, now DB-managed (content still
// falls back to the static `services` data by slug until edited in the CMS).
const SEED_SERVICE_PAGES = [
  { slug: "website-development", title: "Custom Website Development", category_slug: "web-development", sort_order: 1 },
  { slug: "ecommerce-development", title: "E-Commerce Development", category_slug: "web-development", sort_order: 2 },
  { slug: "wordpress-development", title: "WordPress Development", category_slug: "web-development", sort_order: 3 },
  { slug: "web-application-development", title: "Web Application Development", category_slug: "web-development", sort_order: 4 },
  { slug: "website-redesign", title: "Website Redesign", category_slug: "web-development", sort_order: 5 },
  { slug: "website-maintenance", title: "Website Maintenance", category_slug: "web-development", sort_order: 6 },
  { slug: "software-development", title: "Software Development", category_slug: "software-enterprise", sort_order: 7 },
];

// The Software & Enterprise pages (dedicated "software-enterprise" template,
// served at /software-development/<slug>).
const SEED_SOFTWARE_ENTERPRISE_PAGES = [
  { slug: "custom-software-development", title: "Custom Software Development", sort_order: 20 },
  { slug: "crm-development", title: "CRM Development", sort_order: 21 },
  { slug: "erp-solutions", title: "ERP Solutions", sort_order: 22 },
  { slug: "api-integration", title: "API Integration", sort_order: 23 },
];

// The mobile-app pages (were static /mobile-app-development/<slug> routes).
const SEED_MOBILE_PAGES = [
  { slug: "android", title: "Android App Development", sort_order: 10 },
  { slug: "ios", title: "iOS App Development", sort_order: 11 },
  { slug: "enterprise", title: "Enterprise Mobile Applications", sort_order: 12 },
  { slug: "ecommerce", title: "E-Commerce Mobile Solutions", sort_order: 13 },
  { slug: "business-automation", title: "Business Process Automation Apps", sort_order: 14 },
  { slug: "app-ui-ux-design", title: "App UI/UX Design", sort_order: 15 },
  { slug: "on-demand", title: "On-Demand App Development", sort_order: 16 },
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
  await db.collection("service_pages").createIndex({ slug: 1 }, { unique: true });
  await db.collection("service_pages").createIndex({ sort_order: 1, slug: 1 });
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

  console.log("Seeding service pages ...");
  for (const p of SEED_SERVICE_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "service",
          category_slug: p.category_slug,
          published: true,
          sort_order: p.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding Software & Enterprise pages ...");
  for (const p of SEED_SOFTWARE_ENTERPRISE_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "software-enterprise",
          category_slug: "software-enterprise",
          published: true,
          sort_order: p.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding mobile-app pages ...");
  for (const p of SEED_MOBILE_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "mobile-app",
          category_slug: "mobile-app-development",
          published: true,
          sort_order: p.sort_order,
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
