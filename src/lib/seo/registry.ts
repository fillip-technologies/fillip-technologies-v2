import "server-only";

import { siteConfig } from "@/config/site";
import { getAllBlogs } from "@/lib/blogs";
import { getServiceLandingPage, getServiceLandingPageSlugs } from "@/lib/service-content/repository";
import { listCaseStudies } from "@/server/content/casestudy-registry";
import { listIndustries } from "@/server/content/industry-registry";
import { listServicePages } from "@/server/content/servicepage-registry";
import { listLocationPages } from "@/server/location-pages/registry";
import { listCategories } from "@/server/content/whatwedo-registry";
import { getAllSeoOverrides, getSeoOverride } from "@/server/content/seo-overrides";
import { normalizePath } from "./urls";
import { mergeSeoOverride } from "./page-seo";
import { serviceLandingToSeoRecord } from "./metadata";
import type { SeoPageRecord, SeoPageStatus } from "./types";

const staticPages: SeoPageRecord[] = [
  {
    path: "/",
    kind: "home",
    status: "published",
    title: "Best Digital Marketing Company | Fillip Technologies",
    description:
      "Fillip Technologies is a digital marketing company in Patna helping businesses grow with SEO, performance marketing, website development, social media, and AI-driven solutions.",
    canonical: "/",
    robots: { index: true, follow: true },
    openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
    schema: { webpage: true, breadcrumb: true, localBusiness: true },
    priority: 1,
    changeFrequency: "weekly",
    source: "static:home",
  },
  staticRecord("/blog", "Blog | Fillip Technologies", "Read the latest insights from Fillip Technologies on technology, digital marketing, software, AI, design, and business growth.", 0.6),
  staticRecord("/contact", "Contact Fillip Technologies | Digital Solutions Partner", "Get in touch with Fillip Technologies for website development, SEO, performance marketing, software, AI, and digital growth solutions.", 0.7),
  staticRecord("/case-studies", "Case Studies | Fillip Technologies", "Explore Fillip Technologies case studies and client success stories across digital marketing, websites, software, and growth projects.", 0.6),
  staticRecord("/our-story", "Our Story | Fillip Technologies", "Learn about Fillip Technologies, our journey, team, values, and approach to building practical digital solutions for growing organizations.", 0.45),
  staticRecord("/our-culture", "Our Culture | Fillip Technologies", "Explore the people, values, work culture, and team spirit behind Fillip Technologies.", 0.4),
  staticRecord("/portfolio", "Portfolio | Fillip Technologies", "View creative, web, technology, and digital work delivered by Fillip Technologies.", 0.45),
  staticRecord("/services", "Services | Fillip Technologies", "Explore website development, SEO, mobile app, software, marketing, design, automation, and digital services from Fillip Technologies.", 0.65),
  staticRecord("/social-media-marketing", "Social Media Marketing | Fillip Technologies", "Social media marketing, content, and community growth services from Fillip Technologies.", 0.45),
  staticRecord("/website-development", "Website Development | Fillip Technologies", "Build fast, scalable, responsive, and SEO-ready websites with Fillip Technologies.", 0.55),
  staticRecord("/wordpress-development", "WordPress Development | Fillip Technologies", "Custom WordPress website design, development, maintenance, and optimization services by Fillip Technologies.", 0.5),
  staticRecord("/ecommerce-development", "Ecommerce Development | Fillip Technologies", "Ecommerce website and platform development services for growing online businesses.", 0.5),
  staticRecord("/software-development", "Software Development | Fillip Technologies", "Custom software, SaaS, CRM, ERP, API integration, and enterprise development services.", 0.55),
  staticRecord("/mobile-app-development", "Mobile App Development | Fillip Technologies", "Mobile app design and development services for Android, iOS, ecommerce, enterprise, and automation use cases.", 0.55),
  staticRecord("/performance-marketing", "Performance Marketing | Fillip Technologies", "Performance marketing campaigns focused on measurable leads, conversions, and growth.", 0.55),
  staticRecord("/graphic-designing", "Premium Graphic Designing Services | Fillip Technologies", "Premium graphic design, brand identity, creative design, and visual communication services.", 0.5),
  staticRecord("/security-surveillance", "Security Surveillance | Fillip Technologies", "Security surveillance and hardware solution services for homes, offices, institutions, and organizations.", 0.45),
  staticRecord("/messenger", "WhatsApp Business Solutions | Fillip Technologies", "WhatsApp Business, chatbot, and messaging automation solutions for sales, support, and engagement.", 0.45, true, "/solutions/whatsapp-business"),
  staticRecord("/sms-communication", "SMS Communication Solutions | Fillip Technologies", "SMS communication solutions for customer notifications, campaigns, alerts, and business engagement.", 0.45, true, "/solutions/sms-communication"),
  staticRecord("/ticket-booking", "Ticketing Platform Development Services | Fillip Technologies", "Ticketing platform development services for bookings, operations, dashboards, and event workflows.", 0.45),
  staticRecord("/get-a-quote", "Get a Quote | Fillip Technologies", "Request a project estimate from Fillip Technologies for digital, software, website, app, and marketing services.", 0.35, false),
  staticRecord("/get-a-quote/requirement", "Project Requirement | Fillip Technologies", "Share your project requirement with Fillip Technologies.", 0.25, false),
  staticRecord("/get-a-quote/custom", "Custom Quote | Fillip Technologies", "Build a custom quote for services from Fillip Technologies.", 0.25, false),
  staticRecord("/carrer", "Careers | Fillip Technologies", "Explore career opportunities, culture, and open roles at Fillip Technologies.", 0.35),
  staticRecord("/privacy-policy", "Privacy Policy | Fillip Technologies", "Read the Fillip Technologies privacy policy.", 0.2),
  staticRecord("/terms", "Terms | Fillip Technologies", "Read the Fillip Technologies terms of service.", 0.2),
  staticRecord("/cookies", "Cookie Policy | Fillip Technologies", "Read the Fillip Technologies cookie policy.", 0.2),
  staticRecord("/compliance", "Compliance | Fillip Technologies", "Review Fillip Technologies compliance information.", 0.2),
  // Alias route: renders the Healthcare industry page verbatim. Kept live for
  // any inbound links, canonicalised to the page it duplicates.
  staticRecord(
    "/industries/healthcare-web-design",
    "Healthcare Web Design | Fillip Technologies",
    "Healthcare website design and digital solutions by Fillip Technologies.",
    0.4,
    true,
    "/industries/healthcare"
  ),
];

/**
 * Routes that render real content but deliberately defer to another URL as the
 * indexable one. `sitemap.ts` lists canonical URLs only, so an alias listed here
 * stops competing with the page it duplicates without being taken offline.
 */
const CMS_CANONICAL_ALIASES: Record<string, string> = {
  // The file-based landing page at /technical-seo is the retained canonical for
  // this topic (see redirects.json — the old /technical-seo -> /marketing/...
  // rule was removed because it put a redirecting URL in the sitemap).
  "/marketing/technical-seo": "/technical-seo",
};

function staticRecord(
  path: string,
  title: string,
  description: string,
  priority: number,
  index = true,
  // When a route deliberately points its canonical at a different URL (an alias
  // route kept for backwards compatibility), pass that URL here. `sitemap.ts`
  // lists canonical URLs only, so aliases drop out of the sitemap automatically.
  canonical: string = path
): SeoPageRecord {
  return {
    path,
    kind: "static",
    status: "published",
    title,
    description,
    canonical,
    robots: { index, follow: true },
    openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
    schema: { webpage: true, breadcrumb: true },
    priority,
    changeFrequency: "monthly",
    source: `static:${path}`,
  };
}

/**
 * The hardcoded/synthesized records for every page (static + landing + blog +
 * CMS), before any admin SEO override is applied. This is the *fallback* layer.
 */
async function buildBaseRecords(): Promise<SeoPageRecord[]> {
  const records: SeoPageRecord[] = [...staticPages];

  await Promise.all([
    addJsonLandingPages(records),
    addBlogPages(records),
    addCmsPages(records),
    addCaseStudies(records),
    addLocationPages(records),
  ]);

  return dedupeRecords(records).sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Every page's resolved SEO record: the hardcoded fallback with any admin-saved
 * override merged over it field-by-field. Used by the sitemap (filtered by
 * `isIndexable`), the SEO audit, the admin list, and publish validation.
 */
export async function getSeoPageRecords(): Promise<SeoPageRecord[]> {
  const [base, overrides] = await Promise.all([buildBaseRecords(), getAllSeoOverrides()]);
  return base.map((record) => {
    const override = overrides.get(normalizePath(record.path));
    return override ? mergeSeoOverride(record, override) : record;
  });
}

/** The base (fallback) record for one path — no override applied. */
export async function getBaseSeoRecordForPath(path: string): Promise<SeoPageRecord | undefined> {
  const target = normalizePath(path);
  return (await buildBaseRecords()).find((record) => normalizePath(record.path) === target);
}

/** The resolved record for one path — fallback with its override merged in. */
export async function getResolvedSeoRecord(path: string): Promise<SeoPageRecord | undefined> {
  const target = normalizePath(path);
  const base = await getBaseSeoRecordForPath(target);
  if (!base) return undefined;
  const override = await getSeoOverride(target);
  return override ? mergeSeoOverride(base, override) : base;
}

export function getStaticSeoPageRecords(): SeoPageRecord[] {
  return [...staticPages];
}

async function addJsonLandingPages(records: SeoPageRecord[]) {
  const slugs = await getServiceLandingPageSlugs();
  const pages = await Promise.all(slugs.map((slug) => getServiceLandingPage(slug)));
  for (const page of pages) {
    if (!page) continue;
    records.push(serviceLandingToSeoRecord(page));
  }
}

async function addBlogPages(records: SeoPageRecord[]) {
  for (const blog of await getAllBlogs()) {
    records.push({
      path: `/blog/${blog.slug}`,
      slug: blog.slug,
      kind: "blog",
      status: "published",
      title: blog.title,
      description: blog.excerpt,
      canonical: `/blog/${blog.slug}`,
      robots: { index: true, follow: true },
      openGraph: { image: blog.featuredImage, type: "article" },
      twitter: { card: "summary_large_image", image: blog.featuredImage },
      h1: blog.title,
      breadcrumbs: [
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: blog.title, item: `/blog/${blog.slug}` },
      ],
      schema: { webpage: true, breadcrumb: true, blogPosting: true },
      lastModified: blog.publishedAt,
      priority: 0.45,
      changeFrequency: "monthly",
      source: `blog:${blog.slug}`,
    });
  }
}

// CMS pages are enumerated in full (drafts included) with their real status
// derived from the `published` flag. Drafts/archived carry a non-"published"
// status, so `isIndexable` keeps them out of the sitemap while the admin editor
// and publish validation can still see them.
const cmsStatus = (published: boolean): SeoPageStatus => (published ? "published" : "draft");

async function addCmsPages(records: SeoPageRecord[]) {
  const [servicePages, industries, whatWeDoCategories] = await Promise.all([
    listServicePages(),
    listIndustries(),
    listCategories("whatwedo"),
  ]);

  for (const page of servicePages) {
    const href = `${page.urlPrefix}/${page.slug}`;
    const name = page.title || titleFromSlug(page.slug);
    records.push({
      path: href,
      slug: page.slug,
      kind: "service",
      status: cmsStatus(page.published),
      title: `${name} | ${siteConfig.name}`,
      description: `${name} services by ${siteConfig.name}.`,
      canonical: CMS_CANONICAL_ALIASES[href] ?? href,
      robots: { index: true, follow: true },
      openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
      serviceName: name,
      h1: name,
      schema: { webpage: true, service: true, breadcrumb: true },
      priority: 0.55,
      changeFrequency: "monthly",
      source: `cms-service:${page.slug}`,
    });
  }

  for (const industry of industries) {
    records.push({
      path: `/industries/${industry.slug}`,
      slug: industry.slug,
      kind: "industry",
      status: cmsStatus(industry.published),
      title: `${industry.label} | ${siteConfig.name}`,
      description: `${industry.label} digital solutions by ${siteConfig.name}.`,
      canonical: `/industries/${industry.slug}`,
      robots: { index: true, follow: true },
      openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
      h1: industry.label,
      schema: { webpage: true, breadcrumb: true, service: true },
      priority: 0.5,
      changeFrequency: "monthly",
      source: `cms-industry:${industry.slug}`,
    });
  }

  for (const category of whatWeDoCategories) {
    records.push({
      path: `/what-we-do/${category.slug}`,
      slug: category.slug,
      kind: "category",
      status: cmsStatus(category.published),
      title: `${category.label} | ${siteConfig.name}`,
      description: category.description || `${category.label} services and solutions by ${siteConfig.name}.`,
      canonical: `/what-we-do/${category.slug}`,
      robots: { index: true, follow: true },
      openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
      h1: category.label,
      schema: { webpage: true, breadcrumb: true },
      priority: 0.5,
      changeFrequency: "monthly",
      source: `cms-category:${category.slug}`,
    });
  }
}

// Case-study detail pages live in the `case_studies` collection and render at
// /case-studies/<slug>. Without this they render fine but never reach the
// sitemap, which is where the overview page's only inbound crawl path is.
async function addCaseStudies(records: SeoPageRecord[]) {
  for (const study of await listCaseStudies()) {
    records.push({
      path: `/case-studies/${study.slug}`,
      slug: study.slug,
      kind: "static",
      status: cmsStatus(study.published),
      title: `${study.title} | ${siteConfig.name}`,
      description: study.hero.description || `${study.title} — a ${study.industry} case study by ${siteConfig.name}.`,
      canonical: `/case-studies/${study.slug}`,
      robots: { index: true, follow: true },
      openGraph: {
        image: study.hero.cardImage || study.hero.heroImage || siteConfig.defaultOpenGraphImage,
        type: "article",
      },
      h1: study.hero.title || study.title,
      breadcrumbs: [
        { name: "Home", item: "/" },
        { name: "Case Studies", item: "/case-studies" },
        { name: study.title, item: `/case-studies/${study.slug}` },
      ],
      schema: { webpage: true, breadcrumb: true },
      priority: 0.5,
      changeFrequency: "monthly",
      source: `case-study:${study.slug}`,
    });
  }
}

// Admin-managed "<service> in <city>" pages served through the [landingSlug]
// catch-all. They were previously absent from the sitemap entirely.
async function addLocationPages(records: SeoPageRecord[]) {
  for (const page of await listLocationPages()) {
    const path = page.seo.canonical || `/${page.slug}`;
    records.push({
      path: `/${page.slug}`,
      slug: page.slug,
      kind: "landing",
      status: page.enabled ? "published" : "draft",
      title: page.seo.title,
      description: page.seo.description,
      canonical: path,
      robots: page.seo.robots,
      openGraph: {
        title: page.seo.openGraph.title || page.seo.title,
        description: page.seo.openGraph.description || page.seo.description,
        image: page.seo.openGraph.image || siteConfig.defaultOpenGraphImage,
        type: "website",
      },
      serviceName: page.serviceKey,
      city: page.city?.name
        ? { name: page.city.name, state: page.city.state, country: page.city.country }
        : undefined,
      h1: [page.content.hero.title, page.content.hero.highlightedTitle]
        .filter(Boolean)
        .join(" ")
        .trim(),
      faq: page.faq.items,
      schema: {
        webpage: true,
        service: true,
        breadcrumb: true,
        faq: Boolean(page.faq.items.length),
        localBusiness: Boolean(page.city?.name),
      },
      priority: 0.7,
      changeFrequency: "monthly",
      source: `location-page:${page.slug}`,
    });
  }
}

export function isIndexable(record: SeoPageRecord): boolean {
  return record.status === "published" && record.robots?.index !== false;
}

function dedupeRecords(records: SeoPageRecord[]): SeoPageRecord[] {
  const byPath = new Map<string, SeoPageRecord>();
  for (const record of records) {
    const path = normalizePath(record.path);
    if (!byPath.has(path)) byPath.set(path, { ...record, path });
  }
  return [...byPath.values()];
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
