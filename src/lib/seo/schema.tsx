import { siteConfig } from "@/config/site";
import { absoluteUrl, imageUrl, normalizePath } from "./urls";
import type { SeoBreadcrumb, SeoFaqItem, SeoPageRecord } from "./types";

type JsonLdValue = Record<string, unknown>;

export function serializeJsonLd(value: JsonLdValue | JsonLdValue[]): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function JsonLdScript({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function organizationJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: imageUrl(siteConfig.logo),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: siteConfig.socialLinks,
  };
}

export function websiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function localBusinessJsonLd(page?: SeoPageRecord): JsonLdValue {
  const city = page?.city;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: imageUrl(siteConfig.defaultOpenGraphImage),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: city?.name ?? siteConfig.address.addressLocality,
      addressRegion: city?.state ?? siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: city?.country ?? siteConfig.address.addressCountry,
    },
  };
}

export function webPageJsonLd(page: SeoPageRecord): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(page.canonical)}#webpage`,
    url: absoluteUrl(page.canonical),
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function serviceJsonLd(page: SeoPageRecord): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(page.canonical)}#service`,
    name: page.serviceName ?? page.h1 ?? page.title,
    description: page.description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: page.city
      ? {
          "@type": "Place",
          name: [page.city.name, page.city.state, page.city.country].filter(Boolean).join(", "),
        }
      : undefined,
    url: absoluteUrl(page.canonical),
  };
}

export function faqPageJsonLd(items: SeoFaqItem[]): JsonLdValue | null {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: SeoBreadcrumb[]): JsonLdValue | null {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  };
}

export function blogPostingJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
}): JsonLdValue {
  const url = absoluteUrl(`/blog/${input.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: input.image ? [imageUrl(input.image)] : undefined,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    author: {
      "@type": "Organization",
      name: input.author || siteConfig.name,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function buildJsonLdForPage(page: SeoPageRecord): JsonLdValue[] {
  const data: (JsonLdValue | null)[] = [
    webPageJsonLd(page),
    page.schema?.service || page.kind === "landing" || page.kind === "service"
      ? serviceJsonLd(page)
      : null,
    page.schema?.localBusiness || page.city ? localBusinessJsonLd(page) : null,
    page.schema?.faq || page.faq?.length ? faqPageJsonLd(page.faq ?? []) : null,
    page.schema?.breadcrumb || page.breadcrumbs?.length
      ? breadcrumbJsonLd(page.breadcrumbs ?? defaultBreadcrumbs(page))
      : null,
  ];

  return data.filter(Boolean) as JsonLdValue[];
}

export function siteJsonLd(): JsonLdValue[] {
  return [organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()];
}

export function defaultBreadcrumbs(page: SeoPageRecord): SeoBreadcrumb[] {
  const path = normalizePath(page.path);
  if (path === "/") return [{ name: "Home", item: "/" }];
  const segments = path.split("/").filter(Boolean);
  const crumbs: SeoBreadcrumb[] = [{ name: "Home", item: "/" }];
  let current = "";
  for (const segment of segments) {
    current += `/${segment}`;
    crumbs.push({
      name: segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      item: current,
    });
  }
  return crumbs;
}

