import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ServiceLandingPage } from "@/lib/service-content/types";
import { absoluteUrl, imageUrl, normalizeCanonical } from "./urls";
import type { SeoPageRecord } from "./types";

export function buildSeoMetadata(page: SeoPageRecord): Metadata {
  const openGraphImage =
    page.openGraph?.image || siteConfig.defaultOpenGraphImage;
  const twitterImage =
    page.twitter?.image || openGraphImage;
  const canonical = normalizeCanonical(page.canonical || page.path);
  const title = page.title;
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
      title: page.openGraph?.title ?? title,
      description: page.openGraph?.description ?? description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: imageUrl(openGraphImage) }],
      locale: "en_IN",
      type: page.openGraph?.type ?? "website",
    },
    twitter: {
      card: page.twitter?.card ?? "summary_large_image",
      title: page.twitter?.title ?? page.openGraph?.title ?? title,
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
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
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
