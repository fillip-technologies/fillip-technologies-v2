import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportsDir = path.join(root, "reports");
const siteUrl = "https://filliptechnologies.com";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validStatuses = new Set(["draft", "review", "published", "archived"]);

const issues = [];
const records = [];
const brokenLinks = [];
const missingAltText = [];
const jsonBackedRoutes = new Set();

await fs.mkdir(reportsDir, { recursive: true });

await collectJsonLandingPages();
await collectStaticRoutes();
await collectBlogs();
await collectSourceSignals();
validateRecords();

const duplicateMetadata = findDuplicateMetadata();
const missingSchema = issues.filter((issue) => issue.code.includes("SCHEMA"));
const summary = summarizeIssues();

await Promise.all([
  writeJson("seo-audit.json", { summary, issues, records }),
  writeJson("duplicate-metadata.json", duplicateMetadata),
  writeJson("broken-links.json", brokenLinks),
  writeJson("missing-schema.json", missingSchema),
  writeJson("missing-alt-text.json", missingAltText),
  writeMarkdown(),
]);

console.log(`SEO audit complete: ${summary.ERROR} errors, ${summary.WARNING} warnings, ${summary.INFO} info.`);
console.log("Reports written to reports/.");

if (summary.ERROR > 0) {
  process.exitCode = 1;
}

async function collectStaticRoutes() {
  const pageFiles = await listFiles(path.join(root, "src", "app"), "page.tsx");
  for (const file of pageFiles) {
    if (file.includes(`${path.sep}admin${path.sep}`) || file.includes(`${path.sep}api${path.sep}`)) continue;
    if (file.includes("[") || file.includes("preview")) continue;

    const route = routeFromPageFile(file);
    if (!route) continue;
    if (jsonBackedRoutes.has(route)) continue;
    const source = await fs.readFile(file, "utf8");
    const title = matchMetadataValue(source, "title") || titleFromPath(route);
    const description = matchMetadataValue(source, "description") || `${title} by Fillip Technologies.`;
    const canonical = matchCanonical(source) || route;

    records.push({
      path: route,
      slug: route === "/" ? undefined : route.split("/").filter(Boolean).at(-1),
      kind: route === "/" ? "home" : "static",
      status: "published",
      title,
      description,
      canonical,
      robots: { index: !route.includes("/get-a-quote"), follow: true },
      openGraphImage: matchOgImage(source),
      twitterImage: matchTwitterImage(source),
      h1Count: countMatches(source, /<h1[\s>]/g),
      schema: inferSchema(route),
      source: relative(file),
    });
  }
}

async function collectJsonLandingPages() {
  const servicesRoot = path.join(root, "src", "data", "services");
  const pageFiles = (await listFiles(servicesRoot, ".json")).filter((file) =>
    file.includes(`${path.sep}pages${path.sep}`)
  );

  for (const file of pageFiles) {
    const page = await readJson(file);
    if (!page || typeof page !== "object") continue;
    const serviceDirectory = path.dirname(path.dirname(file));
    const definition = await readJson(path.join(serviceDirectory, "service.json")).catch(() => ({}));
    const defaults = definition.defaultsFile
      ? await readJson(path.join(serviceDirectory, definition.defaultsFile)).catch(() => ({}))
      : {};
    const mergedContent = mergeContent(defaults, page.content ?? {});
    const status = page.status ?? (page.enabled ? "published" : "draft");
    const routePath = page.seo?.canonical || `/${page.slug}`;
    jsonBackedRoutes.add(stripSiteUrl(routePath));
    const hero = mergedContent?.hero;
    const h1 = [hero?.title, hero?.highlightedTitle, hero?.suffix].filter(Boolean).join(" ").trim();

    records.push({
      path: routePath,
      slug: page.slug,
      kind: "landing",
      status,
      title: page.seo?.title || "",
      description: page.seo?.description || "",
      canonical: page.seo?.canonical || "",
      robots: page.seo?.robots,
      openGraphImage: page.seo?.openGraph?.image,
      twitterImage: page.seo?.twitter?.image || page.seo?.openGraph?.image,
      h1,
      h1Count: h1 ? 1 : 0,
      faqCount: page.faq?.items?.length ?? 0,
      city: page.city?.name,
      serviceKey: page.serviceKey,
      schema: {
        webpage: true,
        service: true,
        faq: Boolean(page.faq?.items?.length),
        breadcrumb: true,
        localBusiness: Boolean(page.city),
      },
      source: relative(file),
    });
  }
}

function mergeContent(base, overrides) {
  if (!base || typeof base !== "object" || Array.isArray(base)) return overrides ?? base;
  if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) return overrides ?? base;
  const out = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    out[key] = key in out ? mergeContent(out[key], value) : value;
  }
  return out;
}

async function collectBlogs() {
  const indexPath = path.join(root, "src", "data", "blogs", "index.json");
  const blogIndex = await readJson(indexPath).catch(() => []);
  for (const blog of Array.isArray(blogIndex) ? blogIndex : []) {
    records.push({
      path: `/blog/${blog.slug}`,
      slug: blog.slug,
      kind: "blog",
      status: "published",
      title: blog.title || "",
      description: blog.excerpt || "",
      canonical: `/blog/${blog.slug}`,
      robots: { index: true, follow: true },
      openGraphImage: blog.featuredImage,
      twitterImage: blog.featuredImage,
      h1: blog.title,
      h1Count: blog.title ? 1 : 0,
      schema: { webpage: true, blogPosting: true, breadcrumb: true },
      source: "src/data/blogs/index.json",
    });
  }
}

async function collectSourceSignals() {
  const sourceFiles = await listSourceFiles(path.join(root, "src"));
  const publicFiles = await listSourceFiles(path.join(root, "public"));
  const publicSet = new Set(publicFiles.map((file) => `/${relative(path.join(root, "public", path.relative(path.join(root, "public"), file))).replace(/^public\//, "").replaceAll("\\", "/")}`));

  for (const file of sourceFiles) {
    const text = await fs.readFile(file, "utf8").catch(() => "");
    for (const match of text.matchAll(/<Image[\s\S]*?src=\{?["'`]([^"'`}]+)["'`][\s\S]*?>/g)) {
      const tag = match[0];
      const src = match[1];
      const alt = tag.match(/alt=\{?["'`]([^"'`}]*)["'`]/)?.[1];
      if (alt === undefined || alt.trim() === "") {
        missingAltText.push({ file: relative(file), src, message: "Missing or empty alt text" });
      }
    }
    for (const match of text.matchAll(/href=\{?["'`]([^"'`}]+)["'`]/g)) {
      const href = match[1];
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (href.startsWith("/") && !href.includes("[") && hasLikelyMissingStaticAsset(href, publicSet)) {
        brokenLinks.push({ file: relative(file), href, message: "Referenced public asset was not found" });
      }
    }
  }
}

function validateRecords() {
  const published = records.filter((record) => record.status === "published");

  for (const record of records) {
    if (!record.title?.trim()) addIssue("ERROR", "MISSING_TITLE", "Missing title", record);
    if (!record.description?.trim()) addIssue("ERROR", "MISSING_DESCRIPTION", "Missing description", record);
    if (!record.canonical?.trim()) addIssue("ERROR", "MISSING_CANONICAL", "Missing canonical", record);
    if (record.canonical && !isValidCanonical(record.canonical)) addIssue("ERROR", "INVALID_CANONICAL", "Invalid canonical", record);
    if (record.slug && !record.slug.includes("%") && !slugPattern.test(record.slug)) addIssue("ERROR", "INVALID_SLUG", "Invalid slug", record);
    if (!validStatuses.has(record.status)) addIssue("ERROR", "INVALID_STATUS", "Invalid status", record);
    if (record.kind !== "home" && record.kind !== "static" && !record.h1 && record.h1Count === 0) addIssue("ERROR", "MISSING_H1", "Missing H1", record);
    if ((record.h1Count ?? 0) > 1) addIssue("ERROR", "MULTIPLE_H1", "Multiple H1 elements detected", record);
    if (!record.openGraphImage) addIssue("WARNING", "MISSING_OG_IMAGE", "Missing Open Graph image", record);
    if (!record.twitterImage) addIssue("WARNING", "MISSING_TWITTER_IMAGE", "Missing Twitter image", record);
    if ((record.kind === "landing" || record.kind === "service") && !record.faqCount) addIssue("WARNING", "MISSING_FAQ", "Missing FAQ", record);
    if (!record.schema?.breadcrumb) addIssue("WARNING", "MISSING_BREADCRUMB_SCHEMA", "Missing Breadcrumb schema", record);
    if (record.city && !record.schema?.localBusiness) addIssue("WARNING", "MISSING_LOCALBUSINESS_SCHEMA", "Missing LocalBusiness schema", record);
    if (record.kind === "blog") addIssue("INFO", "MISSING_RELATED_CONTENT", "Related content should be verified in rendered page", record);
    if (record.kind !== "home") addIssue("INFO", "LOW_INTERNAL_LINKS", "Internal link depth should be reviewed from rendered HTML", record);
  }

  for (const duplicate of duplicatesBy(published, (record) => canonicalKey(record.canonical))) {
    for (const record of duplicate.records) addIssue("ERROR", "DUPLICATE_CANONICAL", `Duplicate canonical: ${duplicate.key}`, record);
  }
  for (const duplicate of duplicatesBy(published.filter((record) => record.slug), (record) => `${record.kind}:${record.slug}`)) {
    for (const record of duplicate.records) addIssue("ERROR", "DUPLICATE_SLUG", `Duplicate slug: ${duplicate.key}`, record);
  }
  for (const duplicate of duplicatesBy(published, (record) => record.title.trim().toLowerCase())) {
    for (const record of duplicate.records) addIssue("WARNING", "DUPLICATE_TITLE", `Duplicate meta title: ${duplicate.key}`, record);
  }
  for (const duplicate of duplicatesBy(published, (record) => record.description.trim().toLowerCase())) {
    for (const record of duplicate.records) addIssue("WARNING", "DUPLICATE_DESCRIPTION", `Duplicate meta description: ${duplicate.key}`, record);
  }
}

function findDuplicateMetadata() {
  return {
    titles: duplicatesBy(records, (record) => record.title.trim().toLowerCase()),
    descriptions: duplicatesBy(records, (record) => record.description.trim().toLowerCase()),
    canonicals: duplicatesBy(records, (record) => canonicalKey(record.canonical)),
  };
}

async function writeMarkdown() {
  const grouped = {
    ERROR: issues.filter((issue) => issue.severity === "ERROR"),
    WARNING: issues.filter((issue) => issue.severity === "WARNING"),
    INFO: issues.filter((issue) => issue.severity === "INFO"),
  };
  const lines = [
    "# SEO Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- Pages analyzed: ${records.length}`,
    `- Errors: ${grouped.ERROR.length}`,
    `- Warnings: ${grouped.WARNING.length}`,
    `- Info: ${grouped.INFO.length}`,
    `- Broken links: ${brokenLinks.length}`,
    `- Missing alt text: ${missingAltText.length}`,
    "",
    "## Errors",
    "",
    ...formatIssues(grouped.ERROR),
    "",
    "## Warnings",
    "",
    ...formatIssues(grouped.WARNING),
    "",
    "## Info",
    "",
    ...formatIssues(grouped.INFO.slice(0, 100)),
  ];
  await fs.writeFile(path.join(reportsDir, "seo-audit.md"), `${lines.join("\n")}\n`);
}

function formatIssues(list) {
  if (!list.length) return ["- None"];
  return list.map((issue) => `- ${issue.code}: ${issue.path || issue.source || "project"} - ${issue.message}`);
}

function summarizeIssues() {
  return {
    ERROR: issues.filter((issue) => issue.severity === "ERROR").length,
    WARNING: issues.filter((issue) => issue.severity === "WARNING").length,
    INFO: issues.filter((issue) => issue.severity === "INFO").length,
  };
}

function addIssue(severity, code, message, record) {
  issues.push({ severity, code, message, path: record.path, source: record.source });
}

function duplicatesBy(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    map.set(key, [...(map.get(key) ?? []), item]);
  }
  return [...map.entries()]
    .filter(([, value]) => value.length > 1)
    .map(([key, value]) => ({ key, count: value.length, records: value.map(({ path, source }) => ({ path, source })) }));
}

function canonicalKey(value) {
  if (!value) return "";
  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, siteUrl);
    url.hash = "";
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return url.toString();
  } catch {
    return value;
  }
}

function stripSiteUrl(value) {
  if (!value) return value;
  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, siteUrl);
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    return value;
  }
}

function isValidCanonical(value) {
  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, siteUrl);
    return url.protocol === "https:" || url.hostname === "localhost";
  } catch {
    return false;
  }
}

function inferSchema(route) {
  return {
    webpage: true,
    breadcrumb: route !== "/",
    localBusiness: route === "/" || route.includes("patna"),
    service: /services|development|marketing|design|solutions|security|app/.test(route),
  };
}

function hasLikelyMissingStaticAsset(href, publicSet) {
  if (!/\.(png|jpe?g|webp|gif|svg|mp4|pdf|xml|txt)$/i.test(href)) return false;
  return !publicSet.has(decodeURI(href));
}

function routeFromPageFile(file) {
  const appRoot = path.join(root, "src", "app");
  const rel = path.relative(appRoot, file).replaceAll("\\", "/");
  const segments = rel.split("/").slice(0, -1).filter((segment) => !segment.startsWith("("));
  if (segments.length === 0) return "/";
  return `/${segments.join("/")}`;
}

function matchMetadataValue(source, key) {
  return source.match(new RegExp(`${key}:\\s*["'\`]([^"'\`]+)["'\`]`))?.[1];
}

function matchCanonical(source) {
  return source.match(/canonical:\s*["'`]([^"'`]+)["'`]/)?.[1];
}

function matchOgImage(source) {
  return source.match(/openGraph:[\s\S]*?url:\s*([^,\n}]+)/)?.[1]?.replace(/["'`]/g, "").trim();
}

function matchTwitterImage(source) {
  return source.match(/twitter:[\s\S]*?images:\s*\[?([^,\]\n}]+)/)?.[1]?.replace(/["'`]/g, "").trim();
}

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function titleFromPath(route) {
  if (route === "/") return "Fillip Technologies";
  return `${route.split("/").filter(Boolean).at(-1).split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")} | Fillip Technologies`;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function writeJson(file, data) {
  await fs.writeFile(path.join(reportsDir, file), `${JSON.stringify(data, null, 2)}\n`);
}

async function listFiles(directory, suffix) {
  const out = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(suffix)) out.push(full);
    }
  }
  await walk(directory);
  return out;
}

async function listSourceFiles(directory) {
  const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".css"]);
  const out = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (extensions.has(path.extname(entry.name))) out.push(full);
    }
  }
  await walk(directory);
  return out;
}

function relative(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}
