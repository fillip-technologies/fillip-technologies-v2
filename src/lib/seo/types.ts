import type { MetadataRoute } from "next";

export type SeoPageStatus = "draft" | "review" | "published" | "archived";

export type SeoPageKind =
  | "home"
  | "static"
  | "landing"
  | "blog"
  | "service"
  | "category"
  | "industry";

export type SeoRobots = {
  index: boolean;
  follow: boolean;
};

export type SeoBreadcrumb = {
  name: string;
  item: string;
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoLocalBusiness = {
  name?: string;
  city?: string;
  region?: string;
  country?: string;
};

export type SeoSchemaFlags = {
  organization?: boolean;
  website?: boolean;
  webpage?: boolean;
  service?: boolean;
  faq?: boolean;
  breadcrumb?: boolean;
  localBusiness?: boolean;
  blogPosting?: boolean;
};

export type SeoPageRecord = {
  path: string;
  slug?: string;
  kind: SeoPageKind;
  status: SeoPageStatus;
  title: string;
  description: string;
  canonical: string;
  robots?: SeoRobots;
  keywords?: string[] | string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
  };
  alternates?: MetadataRoute.Sitemap[number]["alternates"];
  lastModified?: string | Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: MetadataRoute.Sitemap[number]["priority"];
  serviceName?: string;
  city?: {
    name: string;
    state?: string;
    country: string;
  };
  h1?: string;
  faq?: SeoFaqItem[];
  breadcrumbs?: SeoBreadcrumb[];
  imageAlts?: { src: string; alt?: string; decorative?: boolean }[];
  internalLinks?: string[];
  relatedContent?: string[];
  schema?: SeoSchemaFlags;
  source?: string;
};

export type SeoIssueSeverity = "ERROR" | "WARNING" | "INFO";

export type SeoIssue = {
  severity: SeoIssueSeverity;
  code: string;
  message: string;
  path?: string;
  source?: string;
};

