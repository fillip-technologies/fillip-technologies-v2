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


const SEED_SERVICE_PAGES = [
  { slug: "website-development", title: "Custom Website Development", category_slug: "web-development", sort_order: 1 },
  { slug: "ecommerce-development", title: "E-Commerce Development", category_slug: "web-development", sort_order: 2 },
  { slug: "wordpress-development", title: "WordPress Development", category_slug: "web-development", sort_order: 3 },
  { slug: "web-application-development", title: "Web Application Development", category_slug: "web-development", sort_order: 4 },
  { slug: "website-redesign", title: "Website Redesign", category_slug: "web-development", sort_order: 5 },
  { slug: "website-maintenance", title: "Website Maintenance", category_slug: "web-development", sort_order: 6 },
];

// The Software & Enterprise pages (dedicated "software-enterprise" template —
// a shared SaaS-style layout — served at /software-development/<slug>).
const SEED_SOFTWARE_ENTERPRISE_PAGES = [
  { slug: "software-development", title: "Software Development", sort_order: 19 },
  { slug: "custom-software-development", title: "Custom Software Development", sort_order: 20 },
  { slug: "crm-development", title: "CRM Development", sort_order: 21 },
  { slug: "erp-solutions", title: "ERP Solutions", sort_order: 22 },
  { slug: "api-integration", title: "API Integration", sort_order: 23 },
  { slug: "saas-product-development", title: "SaaS Product Development", sort_order: 24 },
];

// The Creative Experience Design pages (dedicated "creative-design" template,
// served at /design/<slug>).
const SEED_CREATIVE_DESIGN_PAGES = [
  { slug: "ui-ux-designing", title: "UI/UX Designing", sort_order: 30 },
  { slug: "product-design", title: "Product Design", sort_order: 31 },
  { slug: "logo-designing", title: "Logo Designing", sort_order: 32 },
  { slug: "brand-identity", title: "Brand Identity", sort_order: 33 },
  { slug: "motion-video-design", title: "Motion & Video Design", sort_order: 34 },
];

// The SEO & Performance Marketing pages (dedicated "marketing" template,
// served at /marketing/<slug>).
const SEED_MARKETING_PAGES = [
  { slug: "technical-seo", title: "Technical SEO", sort_order: 40 },
  { slug: "local-seo", title: "Local SEO", sort_order: 41 },
  { slug: "enterprise-seo", title: "Enterprise SEO", sort_order: 42 },
  { slug: "google-ads-management", title: "Google Ads Management", sort_order: 43 },
  { slug: "meta-ads-management", title: "Facebook & Instagram Ads", sort_order: 44 },
  { slug: "youtube-ads-campaign", title: "YouTube Ads Campaign", sort_order: 45 },
  { slug: "whatsapp-ads-campaign", title: "WhatsApp Ads Campaign", sort_order: 46 },
  { slug: "lead-generation-campaigns", title: "Lead Generation Campaigns", sort_order: 47 },
];

// The Challenges We Solve pages (dedicated "challenges" template, served at
// /challenges/<slug>).
const SEED_CHALLENGES_PAGES = [
  { slug: "website-not-generating-leads", title: "My Website Doesn't Generate Leads", sort_order: 50 },
  { slug: "generate-quality-leads", title: "I Struggle to Generate Quality Leads", sort_order: 51 },
  { slug: "not-ranking-on-google", title: "My Business Isn't Ranking on Google", sort_order: 52 },
  { slug: "low-organic-traffic", title: "I Have Low Organic Traffic", sort_order: 53 },
];

// The Solutions mega-menu categories (group "solutions"), DB-driven like the
// What We Do categories.
const SEED_SOLUTION_CATEGORIES = [
  {
    slug: "business-solutions",
    label: "Business Solutions",
    description: "Digital products, automation, and enterprise software for growth.",
    sort_order: 1,
  },
  {
    slug: "hardware-solutions",
    label: "Hardware Solutions",
    description: "Secure infrastructure, devices, and workplace technology systems.",
    sort_order: 2,
  },
];

// Sub-links shown under each Solutions category header (stored in site_content
// under `whatwedo.<slug>.menuLinks`, same store the mega-menu reads).
const SEED_SOLUTION_MENU_LINKS: Record<string, { label: string; href: string }[]> = {
  "business-solutions": [
    { label: "Ticket Booking Solution", href: "/solutions/ticket-booking" },
    { label: "SMS Communication Solution", href: "/solutions/sms-communication" },
    { label: "WhatsApp Business Solution", href: "/solutions/whatsapp-business" },
  ],
  "hardware-solutions": [
    { label: "Security Surveillance", href: "/hardware-solutions/security-surveillance" },
    { label: "Fiber Optic Connectivity", href: "/hardware-solutions/fiber-optic-connectivity" },
    { label: "Local Area Network", href: "/hardware-solutions/local-area-network" },
    { label: "Control Room", href: "/hardware-solutions/control-room" },
    { label: "Networking", href: "/hardware-solutions/networking" },
    { label: "Server Solutions", href: "/hardware-solutions/server-solutions" },
    { label: "Wide Area Network", href: "/hardware-solutions/wide-area-network" },
    { label: "System Integration", href: "/hardware-solutions/system-integration" },
    { label: "IT Infrastructure", href: "/hardware-solutions/it-infrastructure" },
    { label: "GPS Solution", href: "/hardware-solutions/gps-solution" },
  ],
};

// The Hardware Solutions pages (template "hardware-solution", /hardware-solutions/<slug>).
const SEED_HARDWARE_SOLUTION_PAGES = [
  { slug: "security-surveillance", title: "Security Surveillance", sort_order: 60 },
  { slug: "fiber-optic-connectivity", title: "Fiber Optic Connectivity", sort_order: 61 },
  { slug: "local-area-network", title: "Local Area Network", sort_order: 62 },
  { slug: "control-room", title: "Control Room", sort_order: 63 },
  { slug: "networking", title: "Networking", sort_order: 64 },
  { slug: "server-solutions", title: "Server Solutions", sort_order: 65 },
  { slug: "wide-area-network", title: "Wide Area Network", sort_order: 66 },
  { slug: "system-integration", title: "System Integration", sort_order: 67 },
  { slug: "it-infrastructure", title: "IT Infrastructure", sort_order: 68 },
  { slug: "gps-solution", title: "GPS Solution", sort_order: 69 },
];

// The Business Solutions pages (template "business-solution", /solutions/<slug>).
const SEED_BUSINESS_SOLUTION_PAGES = [
  { slug: "ticket-booking", title: "Ticket Booking", sort_order: 70 },
  { slug: "sms-communication", title: "SMS Communication", sort_order: 71 },
  { slug: "whatsapp-business", title: "WhatsApp Business", sort_order: 72 },
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

  // The Software Development overview page previously used the "service" template
  // at /services/software-development. It now uses the SaaS-style
  // software-enterprise layout at /software-development/software-development, so
  // force-update any pre-existing row (the $setOnInsert seed above won't touch it).
  console.log("Migrating Software Development overview to software-enterprise ...");
  await db.collection("service_pages").updateOne(
    { slug: "software-development" },
    { $set: { template: "software-enterprise", category_slug: "software-enterprise", updated_at: now } }
  );

  console.log("Seeding Creative Experience Design pages ...");
  for (const p of SEED_CREATIVE_DESIGN_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "creative-design",
          category_slug: "creative-experience-design",
          published: true,
          sort_order: p.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding SEO & Performance Marketing pages ...");
  for (const p of SEED_MARKETING_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "marketing",
          category_slug: "seo-performance-marketing",
          published: true,
          sort_order: p.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding Challenges We Solve pages ...");
  for (const p of SEED_CHALLENGES_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "challenges",
          category_slug: "challenges-we-solve",
          published: true,
          sort_order: p.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding Solutions categories ...");
  for (const cat of SEED_SOLUTION_CATEGORIES) {
    await db.collection("service_categories").updateOne(
      { slug: cat.slug },
      {
        $set: { group: "solutions", description: cat.description, updated_at: now },
        $setOnInsert: {
          slug: cat.slug,
          label: cat.label,
          published: true,
          sort_order: cat.sort_order,
          created_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding Solutions menu links ...");
  for (const [slug, items] of Object.entries(SEED_SOLUTION_MENU_LINKS)) {
    await db.collection("site_content").updateOne(
      { key: `whatwedo.${slug}.menuLinks` },
      { $setOnInsert: { key: `whatwedo.${slug}.menuLinks`, data: { items } } },
      { upsert: true }
    );
  }

  console.log("Seeding Hardware Solution pages ...");
  for (const p of SEED_HARDWARE_SOLUTION_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "hardware-solution",
          category_slug: "hardware-solutions",
          published: true,
          sort_order: p.sort_order,
          created_at: now,
          updated_at: now,
        },
      },
      { upsert: true }
    );
  }

  console.log("Seeding Business Solution pages ...");
  for (const p of SEED_BUSINESS_SOLUTION_PAGES) {
    await db.collection("service_pages").updateOne(
      { slug: p.slug },
      {
        $setOnInsert: {
          slug: p.slug,
          title: p.title,
          template: "business-solution",
          category_slug: "business-solutions",
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
