import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ServiceLandingPage } from "@/lib/service-content/types";
import { absoluteUrl, imageUrl, normalizeCanonical } from "./urls";
import type { SeoPageRecord } from "./types";

/**
 * Guarantee a title ends with the brand exactly once.
 *
 * Title sources disagree: the SEO registry and the hardcoded `page.tsx` files
 * already append "| Fillip Technologies", while the 144 file-based landing pages
 * do not. The root layout used to add a `%s | Fillip Technologies` template on
 * top, which produced "… | Fillip Technologies | Fillip Technologies" on every
 * page that had already appended it. The template is gone (see `baseMetadata`)
 * and this is now the single place the suffix is applied.
 */
export function withBrandSuffix(title: string): string {
  const brand = siteConfig.name;
  let base = title.trim();
  // Strip any number of trailing "| Brand" / "- Brand" / "— Brand" segments.
  const trailing = new RegExp(`\\s*[|\\-–—]\\s*${escapeRegExp(brand)}\\s*$`, "i");
  while (trailing.test(base)) base = base.replace(trailing, "").trim();
  // A title that *is* the brand (or is empty after stripping) stands alone.
  if (!base || base.toLowerCase() === brand.toLowerCase()) return brand;
  return `${base} | ${brand}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildSeoMetadata(page: SeoPageRecord): Metadata {
  const openGraphImage =
    page.openGraph?.image || siteConfig.defaultOpenGraphImage;
  const twitterImage =
    page.twitter?.image || openGraphImage;
  const canonical = normalizeCanonical(page.canonical || page.path);
  const title = withBrandSuffix(page.title);
  // OG/Twitter keep the page's own title — only <title> carries the brand suffix.
  const socialTitle = page.title;
  const description = page.description;

  return {
    title,
    description,
    keywords: page.keywords,
    alternates: {
      canonical,
      languages: {},
    },
    openGraph: {
      title: page.openGraph?.title ?? socialTitle,
      description: page.openGraph?.description ?? description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: imageUrl(openGraphImage) }],
      locale: "en_IN",
      type: page.openGraph?.type ?? "website",
    },
    twitter: {
      card: page.twitter?.card ?? "summary_large_image",
      title: page.twitter?.title ?? page.openGraph?.title ?? socialTitle,
      description:
        page.twitter?.description ?? page.openGraph?.description ?? description,
      images: [imageUrl(twitterImage)],
    },
    robots: page.robots ?? { index: true, follow: true },
  };
}

export function buildLandingPageMetadata(page: ServiceLandingPage): Metadata {
  return buildSeoMetadata(serviceLandingToSeoRecord(page));
}

export function serviceLandingToSeoRecord(page: ServiceLandingPage): SeoPageRecord {
  return {
    path: page.seo.canonical,
    slug: page.slug,
    kind: "landing",
    status: page.status ?? "published",
    title: page.seo.title,
    description: page.seo.description,
    canonical: page.seo.canonical,
    keywords: page.seo.keywords,
    robots: page.seo.robots,
    openGraph: {
      title: page.seo.openGraph.title,
      description: page.seo.openGraph.description,
      image: page.seo.openGraph.image || siteConfig.defaultOpenGraphImage,
      type: "website",
    },
    twitter: page.seo.twitter,
    serviceName: page.serviceKey,
    city: page.city,
    h1: "content" in page && "hero" in page.content
      ? [
          (page.content.hero as { title?: string }).title,
          (page.content.hero as { highlightedTitle?: string }).highlightedTitle,
        ]
          .filter(Boolean)
          .join(" ")
          .trim()
      : page.seo.title,
    faq: page.faq.items,
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: page.seo.title, item: page.seo.canonical },
    ],
    schema: {
      webpage: true,
      service: true,
      faq: Boolean(page.faq.items.length),
      breadcrumb: true,
      localBusiness: Boolean(page.city),
    },
    priority: page.city ? 0.72 : 0.68,
    changeFrequency: "monthly",
    source: `service-content:${page.slug}`,
  };
}

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    // A plain string, not a `{ default, template }` pair, on purpose. Page titles
    // come from three sources that disagree about whether they already end in the
    // brand, so a `%s | Brand` template appended it twice on most pages. The
    // suffix is now normalised once in `withBrandSuffix`. Pages that set no title
    // of their own still inherit this value.
    title: siteConfig.name,
    icons: {
      icon: [{ url: "/images/fav-icon.png", type: "image/png" }],
      shortcut: [{ url: "/images/fav-icon.png", type: "image/png" }],
      apple: [{ url: "/images/fav-icon.png", type: "image/png" }],
    },
    openGraph: {
      siteName: siteConfig.name,
      images: [{ url: absoluteUrl(siteConfig.defaultOpenGraphImage) }],
    },
  };
}
