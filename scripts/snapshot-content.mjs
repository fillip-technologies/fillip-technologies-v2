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

// Mirror of normalizeCaseStudy() in casestudy-registry.ts. Case studies are
// self-contained (all sections embedded), so the snapshot stores the whole
// normalized doc as the DB-outage fallback for /case-studies.
const csStr = (v) => (v == null ? "" : String(v));
const csArr = (v) => (Array.isArray(v) ? v : []);
const csBulletBlock = (b = {}) => ({
  heading: csStr(b.heading),
  intro: csStr(b.intro),
  items: csArr(b.items).map((i) => ({ text: csStr(i?.text) })),
});
const toCaseStudy = (d = {}) => {
  const hero = d.hero ?? {};
  const results = d.results ?? {};
  const brands = d.brands ?? {};
  const journey = d.journey ?? {};
  const outcome = d.outcome ?? {};
  const cta = d.cta ?? {};
  return {
    slug: csStr(d.slug),
    title: csStr(d.title),
    industry: csStr(d.industry),
    published: Boolean(d.published),
    sortOrder: Number(d.sort_order ?? 0),
    hero: {
      eyebrow: csStr(hero.eyebrow) || "Case Study",
      title: csStr(hero.title),
      description: csStr(hero.description),
      heroImage: csStr(hero.heroImage),
      cardImage: csStr(hero.cardImage),
      imageAlt: csStr(hero.imageAlt),
      resultBadge: csStr(hero.resultBadge),
    },
    results: {
      heading: csStr(results.heading),
      items: csArr(results.items).map((i) => ({ value: csStr(i?.value), label: csStr(i?.label) })),
    },
    brands: {
      heading: csStr(brands.heading),
      description: csStr(brands.description),
      logos: csArr(brands.logos).map((i) => ({ name: csStr(i?.name), logo: csStr(i?.logo) })),
    },
    challenges: csBulletBlock(d.challenges),
    strategy: csBulletBlock(d.strategy),
    journey: {
      heading: csStr(journey.heading),
      subheading: csStr(journey.subheading),
      chartLabel: csStr(journey.chartLabel),
      chartValues: csArr(journey.chartValues).map((n) => Number(n)).filter((n) => Number.isFinite(n)),
      phases: csArr(journey.phases).map((p) => ({
        period: csStr(p?.period),
        title: csStr(p?.title),
        description: csStr(p?.description),
      })),
    },
    outcome: {
      heading: csStr(outcome.heading),
      paragraphs: csArr(outcome.paragraphs).map((i) => ({ text: csStr(i?.text) })),
    },
    cta: {
      heading: csStr(cta.heading),
      description: csStr(cta.description),
      buttonLabel: csStr(cta.buttonLabel),
      buttonHref: csStr(cta.buttonHref),
    },
  };
};

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

  // -- per-page SEO overrides (site_content key `seo:<path>`) -----------------
  // Mirror of getSeoOverride/getAllSeoOverrides cache keys in seo-overrides.ts.
  const seoRows = contentRows.filter((r) => typeof r?.key === "string" && r.key.startsWith("seo:/"));
  const allOverrides = [];
  for (const row of seoRows) {
    const seoPath = row.key.slice("seo:".length);
    snapshot[`seo-override:${seoPath}`] = row.data ?? null;
    allOverrides.push({ path: seoPath, data: row.data ?? null });
  }
  snapshot["seo-overrides:all"] = allOverrides;

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

  // -- case studies ----------------------------------------------------------
  const caseStudies = (await db.collection("case_studies").find({}).sort({ sort_order: 1, slug: 1 }).toArray())
    .map(toCaseStudy);
  snapshot["case-studies:all"] = caseStudies;
  snapshot["case-studies:published"] = caseStudies.filter((c) => c.published);
  for (const c of caseStudies) snapshot[`case-study:${c.slug}`] = c;

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
