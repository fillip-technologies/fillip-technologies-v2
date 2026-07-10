import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ServiceLandingPage } from "@/lib/service-content/types";

export function buildLandingPageMetadata(page: ServiceLandingPage): Metadata {
  const openGraphImage =
    page.seo.openGraph.image || siteConfig.defaultOpenGraphImage;
  const twitterImage =
    page.seo.twitter?.image || openGraphImage;

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: {
      canonical: page.seo.canonical,
    },
    openGraph: {
      title: page.seo.openGraph.title,
      description: page.seo.openGraph.description,
      url: page.seo.canonical,
      siteName: siteConfig.name,
      images: [{ url: openGraphImage }],
      type: "website",
    },
    twitter: {
      card: page.seo.twitter?.card ?? "summary_large_image",
      title: page.seo.twitter?.title ?? page.seo.openGraph.title,
      description:
        page.seo.twitter?.description ?? page.seo.openGraph.description,
      images: [twitterImage],
    },
    robots: page.seo.robots,
  };
}

