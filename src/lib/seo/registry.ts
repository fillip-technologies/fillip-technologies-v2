import "server-only";

import { siteConfig } from "@/config/site";
import { getAllBlogs } from "@/lib/blogs";
import { getServiceLandingPage, getServiceLandingPageSlugs } from "@/lib/service-content/repository";
import { listPublishedIndustries } from "@/server/content/industry-registry";
import { getPublishedServiceHrefs } from "@/server/content/servicepage-registry";
import { listPublishedCategories } from "@/server/content/whatwedo-registry";
import { normalizePath } from "./urls";
import { serviceLandingToSeoRecord } from "./metadata";
import type { SeoPageRecord } from "./types";

const staticPages: SeoPageRecord[] = [
  {
    path: "/",
    kind: "home",
    status: "published",
    title: "Best Digital Marketing Company in Patna | Fillip Technologies",
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
  staticRecord("/website-development", "Website Development | Fillip Technologies", "Build fast, scalable, responsive, and SEO-ready websites with Fillip Technologies.", 0.55),
  staticRecord("/wordpress-development", "WordPress Development | Fillip Technologies", "Custom WordPress website design, development, maintenance, and optimization services by Fillip Technologies.", 0.5),
  staticRecord("/ecommerce-development", "Ecommerce Development | Fillip Technologies", "Ecommerce website and platform development services for growing online businesses.", 0.5),
  staticRecord("/software-development", "Software Development | Fillip Technologies", "Custom software, SaaS, CRM, ERP, API integration, and enterprise development services.", 0.55),
  staticRecord("/mobile-app-development", "Mobile App Development | Fillip Technologies", "Mobile app design and development services for Android, iOS, ecommerce, enterprise, and automation use cases.", 0.55),
  staticRecord("/performance-marketing", "Performance Marketing | Fillip Technologies", "Performance marketing campaigns focused on measurable leads, conversions, and growth.", 0.55),
  staticRecord("/graphic-designing", "Premium Graphic Designing Services | Fillip Technologies", "Premium graphic design, brand identity, creative design, and visual communication services.", 0.5),
  staticRecord("/security-surveillance", "Security Surveillance | Fillip Technologies", "Security surveillance and hardware solution services for homes, offices, institutions, and organizations.", 0.45),
  staticRecord("/messenger", "WhatsApp Business Solutions | Fillip Technologies", "WhatsApp Business, chatbot, and messaging automation solutions for sales, support, and engagement.", 0.45),
  staticRecord("/sms-communication", "SMS Communication Solutions | Fillip Technologies", "SMS communication solutions for customer notifications, campaigns, alerts, and business engagement.", 0.45),
  staticRecord("/ticket-booking", "Ticketing Platform Development Services | Fillip Technologies", "Ticketing platform development services for bookings, operations, dashboards, and event workflows.", 0.45),
  staticRecord("/get-a-quote", "Get a Quote | Fillip Technologies", "Request a project estimate from Fillip Technologies for digital, software, website, app, and marketing services.", 0.35, false),
  staticRecord("/get-a-quote/requirement", "Project Requirement | Fillip Technologies", "Share your project requirement with Fillip Technologies.", 0.25, false),
  staticRecord("/get-a-quote/custom", "Custom Quote | Fillip Technologies", "Build a custom quote for services from Fillip Technologies.", 0.25, false),
  staticRecord("/carrer", "Careers | Fillip Technologies", "Explore career opportunities, culture, and open roles at Fillip Technologies.", 0.35),
  staticRecord("/privacy-policy", "Privacy Policy | Fillip Technologies", "Read the Fillip Technologies privacy policy.", 0.2),
  staticRecord("/terms", "Terms | Fillip Technologies", "Read the Fillip Technologies terms of service.", 0.2),
  staticRecord("/cookies", "Cookie Policy | Fillip Technologies", "Read the Fillip Technologies cookie policy.", 0.2),
  staticRecord("/compliance", "Compliance | Fillip Technologies", "Review Fillip Technologies compliance information.", 0.2),
];

function staticRecord(
  path: string,
  title: string,
  description: string,
  priority: number,
  index = true
): SeoPageRecord {
  return {
    path,
    kind: "static",
    status: "published",
    title,
    description,
    canonical: path,
    robots: { index, follow: true },
    openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
    schema: { webpage: true, breadcrumb: true },
    priority,
    changeFrequency: "monthly",
    source: `static:${path}`,
  };
}

export async function getSeoPageRecords(): Promise<SeoPageRecord[]> {
  const records: SeoPageRecord[] = [...staticPages];

  await Promise.all([
    addJsonLandingPages(records),
    addBlogPages(records),
    addCmsPages(records),
  ]);

  return dedupeRecords(records).sort((a, b) => a.path.localeCompare(b.path));
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

function addBlogPages(records: SeoPageRecord[]) {
  for (const blog of getAllBlogs()) {
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

async function addCmsPages(records: SeoPageRecord[]) {
  const [serviceHrefs, industries, whatWeDoCategories] = await Promise.all([
    getPublishedServiceHrefs(),
    listPublishedIndustries(),
    listPublishedCategories("whatwedo"),
  ]);

  for (const href of serviceHrefs) {
    const slug = href.split("/").filter(Boolean).at(-1) ?? href;
    records.push({
      path: href,
      slug,
      kind: "service",
      status: "published",
      title: `${titleFromSlug(slug)} | ${siteConfig.name}`,
      description: `${titleFromSlug(slug)} services by ${siteConfig.name}.`,
      canonical: href,
      robots: { index: true, follow: true },
      openGraph: { image: siteConfig.defaultOpenGraphImage, type: "website" },
      serviceName: titleFromSlug(slug),
      h1: titleFromSlug(slug),
      schema: { webpage: true, service: true, breadcrumb: true },
      priority: 0.55,
      changeFrequency: "monthly",
      source: `cms-service:${slug}`,
    });
  }

  for (const industry of industries) {
    records.push({
      path: `/industries/${industry.slug}`,
      slug: industry.slug,
      kind: "industry",
      status: "published",
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
      status: "published",
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
