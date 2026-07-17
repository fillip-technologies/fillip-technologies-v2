// Build-time seed generator for the "last-known-good" content cache.
//
// Connects to Mongo, reads every collection that backs a public page, and writes
// a snapshot keyed *exactly* like the runtime `snapshotRead` cache keys (see
// src/server/content/*.ts) to src/data/content-snapshot.json. That file is
// bundled into the app and used as the final fallback when the DB is unreachable
// on a cold start (e.g. serverless), so the public site still renders.
//
// Non-fatal by design: if the DB can't be reached it warns, leaves the existing
// snapshot in place, and exits 0 so it never breaks a build.
//
// Run: node --env-file-if-exists=.env --env-file-if-exists=.env.local scripts/snapshot-content.mjs
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import dns from "node:dns";
import mongoose from "mongoose";

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, "src", "data", "content-snapshot.json");

if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean));
}

// Mirror of templateUrlPrefix() in src/server/content/servicepage-templates.ts.
const TEMPLATE_URL_PREFIX = {
  service: "/services",
  "mobile-app": "/mobile-app-development",
  "software-enterprise": "/software-development",
  "creative-design": "/design",
  "creative-experience": "/design",
  marketing: "/marketing",
  "performance-marketing": "/marketing",
  challenges: "/challenges",
  "hardware-solution": "/hardware-solutions",
  "business-solution": "/solutions",
};
const urlPrefix = (template) => TEMPLATE_URL_PREFIX[template ?? "service"] ?? "/services";

// Mirror of the to*() mappers in the registry modules (snake_case → camelCase).
const toIndustry = (d) => ({
  slug: d.slug,
  label: d.label,
  published: d.published,
  sortOrder: d.sort_order,
});
const toPage = (d) => ({
  slug: d.slug,
  title: d.title,
  template: d.template ?? "service",
  categorySlug: d.category_slug ?? null,
  published: d.published,
  sortOrder: d.sort_order,
  urlPrefix: urlPrefix(d.template ?? "service"),
});
const toCategory = (d) => ({
  slug: d.slug,
  label: d.label,
  group: d.group ?? "whatwedo",
  description: d.description ?? "",
  published: d.published,
  sortOrder: d.sort_order,
});

// Mirror of groupFilter() in whatwedo-registry.ts.
const inGroup = (d, group) => {
  if (!group) return true;
  if (group === "whatwedo") return (d.group ?? "whatwedo") !== "solutions";
  return (d.group ?? "whatwedo") === group;
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("[snapshot-content] MONGODB_URI not set; keeping existing snapshot.");
    return;
  }

  await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8000 });
  const db = mongoose.connection.db;

  const snapshot = {};

  // -- site_content: content:<key> = the row's saved data --------------------
  const contentRows = await db.collection("site_content").find({}).toArray();
  for (const row of contentRows) {
    if (row?.key) snapshot[`content:${row.key}`] = row.data ?? {};
  }

  // -- industries ------------------------------------------------------------
  const industries = (await db.collection("industries").find({}).sort({ sort_order: 1, slug: 1 }).toArray())
    .map(toIndustry);
  snapshot["industries:all"] = industries;
  snapshot["industries:published"] = industries.filter((i) => i.published);
  for (const i of industries) snapshot[`industry:${i.slug}`] = i;

  // -- service pages ---------------------------------------------------------
  const pages = (await db.collection("service_pages").find({}).sort({ sort_order: 1, slug: 1 }).toArray())
    .map(toPage);
  snapshot["servicepages:all"] = pages;
  const publishedPages = pages.filter((p) => p.published);
  snapshot["servicepages:published-slugs"] = publishedPages.map((p) => p.slug);
  // Stored as an array; runtime rehydrates it into a Set.
  snapshot["servicepages:published-hrefs"] = publishedPages.map((p) => `${p.urlPrefix}/${p.slug}`);
  for (const p of pages) snapshot[`servicepage:${p.slug}`] = p;

  // -- what-we-do / solutions categories -------------------------------------
  const categories = (await db.collection("service_categories").find({}).sort({ sort_order: 1, slug: 1 }).toArray())
    .map(toCategory);
  for (const group of [undefined, "whatwedo", "solutions"]) {
    const suffix = group ?? "*";
    const inThisGroup = categories.filter((c) => inGroup(c, group));
    snapshot[`categories:all:${suffix}`] = inThisGroup;
    snapshot[`categories:published:${suffix}`] = inThisGroup.filter((c) => c.published);
  }
  for (const c of categories) snapshot[`category:${c.slug}`] = c;

  await writeFile(OUT_FILE, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  const keyCount = Object.keys(snapshot).length;
  console.log(`[snapshot-content] wrote ${keyCount} keys to ${path.relative(ROOT, OUT_FILE)}`);
}

main()
  .catch((err) => {
    // Never fail the build. Keep whatever snapshot already exists.
    const kept = existsSync(OUT_FILE) ? " Keeping existing snapshot." : "";
    console.warn(`[snapshot-content] skipped: ${err?.message ?? err}.${kept}`);
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
