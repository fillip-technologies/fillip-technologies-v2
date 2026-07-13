import type { TechnicalSeoHeroContent } from "@/lib/service-content/types";

/**
 * Content shape for the "marketing" Service Pages template — the
 * /marketing/<slug> detail pages under the "SEO & Performance Marketing"
 * category. Mirrors the rich, purpose-built SEO layout (the sections that used
 * to live hardcoded on the static /technical-seo page), but every field is
 * per-page and CMS-editable.
 */

export type MarketingChallengesContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  para1: string;
  para2: string;
  ctaText: string;
  items: {
    icon: string; // key into SEO_ICONS
    title: string;
    description: string;
  }[];
};

export type MarketingServicesContent = {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  items: {
    number: string;
    title: string;
    description: string;
    metric: string;
    icon: string; // key into SEO_ICONS
  }[];
};

export type MarketingIssuesContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  items: {
    number: string;
    title: string;
    description: string;
    impact: string;
  }[];
};

export type MarketingIndustriesContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  items: {
    name: string;
    label: string;
    blurb: string;
    points: string[];
  }[];
};

export type MarketingToolsContent = {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  items: {
    name: string;
    icon: string; // key into SEO_ICONS
  }[];
};

export type MarketingTestimonialsContent = {
  badge: string;
  title: string;
  description: string;
  items: {
    name: string;
    role: string;
    image: string;
    review: string;
  }[];
};

export type MarketingFaqContent = {
  badge: string;
  title: string;
  description: string;
  items: {
    question: string;
    answer: string;
  }[];
};

export type MarketingContent = {
  slug: string;
  hero: TechnicalSeoHeroContent;
  challenges: MarketingChallengesContent;
  services: MarketingServicesContent;
  issues: MarketingIssuesContent;
  industries: MarketingIndustriesContent;
  tools: MarketingToolsContent;
  testimonials: MarketingTestimonialsContent;
  faq: MarketingFaqContent;
};
