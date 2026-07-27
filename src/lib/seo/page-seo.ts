import { normalizeCanonical } from "./urls";
import type { SeoFaqItem, SeoPageRecord, SeoPageStatus, SeoRobots } from "./types";

/**
 * The editable per-page SEO contract stored as an override in `site_content`
 * (key `seo:<path>`). It mirrors the shape the admin panel edits and maps onto a
 * {@link SeoPageRecord} via {@link mergeSeoOverride}. Every hardcoded/synthesized
 * SEO value stays as the fallback; an override only wins field-by-field when the
 * corresponding field is filled in.
 */
export type PageSeoStatus = "draft" | "published" | "archived";

export type PageSeoFaq = { question: string; answer: string };
export type PageSeoImage = { url: string; alt: string };
export type PageSeoLink = { label: string; url: string };

export type PageSeoInput = {
  title: string;
  slug: string;
  status: PageSeoStatus;
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    robots: SeoRobots;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
  pageSeo: {
    h1: string;
    breadcrumbLabel: string;
    serviceName?: string;
    city?: string;
    state?: string;
    country?: string;
    faqs?: PageSeoFaq[];
    images?: PageSeoImage[];
    internalLinks?: PageSeoLink[];
  };
};

export const PAGE_SEO_STATUSES: PageSeoStatus[] = ["draft", "published", "archived"];

/* --------------------------------------------------------------- coercion -- */

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim());
const bool = (v: unknown, fallback: boolean): boolean => (typeof v === "boolean" ? v : fallback);
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

/** Coerce an arbitrary object (stored JSON or form payload) into a valid input. */
export function normalizePageSeoInput(raw: unknown): PageSeoInput {
  const o = (raw ?? {}) as Record<string, unknown>;
  const seo = (o.seo ?? {}) as Record<string, unknown>;
  const robots = (seo.robots ?? {}) as Record<string, unknown>;
  const page = (o.pageSeo ?? {}) as Record<string, unknown>;

  const status = PAGE_SEO_STATUSES.includes(o.status as PageSeoStatus)
    ? (o.status as PageSeoStatus)
    : "draft";

  return {
    title: str(o.title),
    slug: str(o.slug),
    status,
    seo: {
      metaTitle: str(seo.metaTitle),
      metaDescription: str(seo.metaDescription),
      canonicalUrl: str(seo.canonicalUrl),
      robots: { index: bool(robots.index, true), follow: bool(robots.follow, true) },
      ogTitle: str(seo.ogTitle),
      ogDescription: str(seo.ogDescription),
      ogImage: str(seo.ogImage),
      twitterTitle: str(seo.twitterTitle),
      twitterDescription: str(seo.twitterDescription),
      twitterImage: str(seo.twitterImage),
    },
    pageSeo: {
      h1: str(page.h1),
      breadcrumbLabel: str(page.breadcrumbLabel),
      serviceName: str(page.serviceName),
      city: str(page.city),
      state: str(page.state),
      country: str(page.country),
      faqs: arr(page.faqs).map((f) => {
        const it = (f ?? {}) as Record<string, unknown>;
        return { question: str(it.question), answer: str(it.answer) };
      }),
      images: arr(page.images).map((i) => {
        const it = (i ?? {}) as Record<string, unknown>;
        return { url: str(it.url), alt: str(it.alt) };
      }),
      internalLinks: arr(page.internalLinks).map((l) => {
        const it = (l ?? {}) as Record<string, unknown>;
        return { label: str(it.label), url: str(it.url) };
      }),
    },
  };
}

/* ------------------------------------------------- record <-> input helper -- */

const pick = (override: string, fallback: string | undefined): string =>
  override.trim() ? override.trim() : (fallback ?? "");

/** Map a status coming off a record (which may be "review") to the 3-state input. */
function toInputStatus(status: SeoPageStatus | undefined): PageSeoStatus {
  return status === "published" || status === "archived" ? status : "draft";
}

/**
 * Derive a fully-populated input from a resolved/base record. Used to seed the
 * admin editor so it always shows the current *effective* SEO (hardcoded
 * fallback included), which the admin can then tweak.
 */
export function recordToInput(record: SeoPageRecord): PageSeoInput {
  return {
    title: record.title ?? "",
    slug: record.slug ?? lastSegment(record.path),
    status: toInputStatus(record.status),
    seo: {
      metaTitle: record.title ?? "",
      metaDescription: record.description ?? "",
      canonicalUrl: record.canonical ?? "",
      robots: { index: record.robots?.index ?? true, follow: record.robots?.follow ?? true },
      ogTitle: record.openGraph?.title ?? "",
      ogDescription: record.openGraph?.description ?? "",
      ogImage: record.openGraph?.image ?? "",
      twitterTitle: record.twitter?.title ?? "",
      twitterDescription: record.twitter?.description ?? "",
      twitterImage: record.twitter?.image ?? "",
    },
    pageSeo: {
      h1: record.h1 ?? "",
      breadcrumbLabel: record.breadcrumbs?.at(-1)?.name ?? "",
      serviceName: record.serviceName ?? "",
      city: record.city?.name ?? "",
      state: record.city?.state ?? "",
      country: record.city?.country ?? "",
      faqs: (record.faq ?? []).map((f) => ({ question: f.question, answer: f.answer })),
      images: (record.imageAlts ?? []).map((i) => ({ url: i.src, alt: i.alt ?? "" })),
      internalLinks: (record.internalLinks ?? []).map((url) => ({ label: "", url })),
    },
  };
}

/**
 * Apply an editable override onto a base record. Fallback wins wherever the
 * override field is blank, so nothing regresses when only some fields are set.
 */
export function mergeSeoOverride(base: SeoPageRecord, input: PageSeoInput): SeoPageRecord {
  const title = pick(input.seo.metaTitle || input.title, base.title);
  const description = pick(input.seo.metaDescription, base.description);
  const canonical = input.seo.canonicalUrl.trim()
    ? normalizeCanonical(input.seo.canonicalUrl)
    : base.canonical;

  const ogImage = pick(input.seo.ogImage, base.openGraph?.image);
  const twitterImage = pick(input.seo.twitterImage, base.twitter?.image || ogImage);

  const city = input.pageSeo.city?.trim()
    ? {
        name: input.pageSeo.city.trim(),
        state: input.pageSeo.state?.trim() || undefined,
        country: input.pageSeo.country?.trim() || "IN",
      }
    : base.city;

  const faqs = (input.pageSeo.faqs ?? []).filter((f) => f.question || f.answer);
  const faq: SeoFaqItem[] = faqs.length
    ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
    : base.faq ?? [];

  const images = (input.pageSeo.images ?? []).filter((i) => i.url);
  const imageAlts = images.length ? images.map((i) => ({ src: i.url, alt: i.alt })) : base.imageAlts;

  const links = (input.pageSeo.internalLinks ?? []).filter((l) => l.url);
  const internalLinks = links.length ? links.map((l) => l.url) : base.internalLinks;

  const breadcrumbLabel = input.pageSeo.breadcrumbLabel.trim();
  const breadcrumbs = breadcrumbLabel
    ? [{ name: "Home", item: "/" }, { name: breadcrumbLabel, item: canonical }]
    : base.breadcrumbs;

  return {
    ...base,
    slug: input.slug.trim() || base.slug,
    status: input.status,
    title,
    description,
    canonical,
    robots: input.seo.robots,
    openGraph: {
      ...base.openGraph,
      title: pick(input.seo.ogTitle, base.openGraph?.title),
      description: pick(input.seo.ogDescription, base.openGraph?.description),
      image: ogImage,
      type: base.openGraph?.type ?? "website",
    },
    twitter: {
      card: base.twitter?.card ?? "summary_large_image",
      title: pick(input.seo.twitterTitle, base.twitter?.title || input.seo.ogTitle),
      description: pick(input.seo.twitterDescription, base.twitter?.description),
      image: twitterImage,
    },
    h1: pick(input.pageSeo.h1, base.h1),
    serviceName: pick(input.pageSeo.serviceName || "", base.serviceName) || undefined,
    city,
    faq,
    imageAlts,
    internalLinks,
    breadcrumbs,
  };
}

function lastSegment(path: string): string {
  return path.split("/").filter(Boolean).at(-1) ?? "";
}
