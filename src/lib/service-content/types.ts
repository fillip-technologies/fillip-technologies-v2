import type { MobileAppDevelopmentContent } from "@/data/mobile-app-development";
import type { Service } from "@/data/website-development";

export type ServiceTemplateKey =
  | "website-design"
  | "mobile-app-development"
  | "technical-seo"
  | "performance-marketing"
  | "ai-automation";

type LandingPageBase = {
  slug: string;
  serviceKey: string;
  city?: {
    name: string;
    state?: string;
    country: string;
  };
  seo: {
    title: string;
    description: string;
    canonical: string;
    openGraph: {
      title: string;
      description: string;
      image: string;
    };
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
};

export type WebsiteDesignLandingPage = LandingPageBase & {
  templateKey: "website-design";
  content: Service;
};

export type MobileAppLandingPage = LandingPageBase & {
  templateKey: "mobile-app-development";
  content: MobileAppDevelopmentContent;
};

export type TechnicalSeoHeroContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  searchText: string;
  primaryCta: string;
  secondaryCta: string;
  image: {
    src: string;
    alt: string;
  };
};

export type TechnicalSeoLandingPage = LandingPageBase & {
  templateKey: "technical-seo";
  content: {
    hero: TechnicalSeoHeroContent;
  };
};

export type PerformanceMarketingHeroContent = {
  title: string;
  highlightedTitle: string;
  suffix: string;
  description: string;
  cta: string;
  metricValue: string;
  metricLabel: string;
  image: {
    src: string;
    alt: string;
  };
};

export type PerformancePhilosophyContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  lead: string;
  support: string;
  description: string;
  caption: string;
  metrics: { label: string; value: string }[];
};

export type PerformanceWorkflowContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  steps: {
    title: string;
    description: string;
    image: string;
    alt: string;
    cta?: string;
  }[];
};

export type PerformanceResultsContent = {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  image: { src: string; alt: string };
  metrics: { label: string; value: string }[];
};

export type PerformanceMarketingLandingPage = LandingPageBase & {
  templateKey: "performance-marketing";
  content: {
    hero: PerformanceMarketingHeroContent;
    philosophy: PerformancePhilosophyContent;
    workflow: PerformanceWorkflowContent;
    results: PerformanceResultsContent;
  };
};

export type AIAutomationContent = {
  hero: { badge: string; title: string; highlightedTitle: string; description: string; primaryCta: string; secondaryCta: string; trustItems: string[]; assistantName: string };
  problem: { badge: string; title: string; description: string; items: { title: string; description: string }[] };
  workflow: { badge: string; title: string; highlightedTitle: string; description: string; steps: string[] };
  capabilities: { badge: string; title: string; highlightedTitle: string; description: string; integrationTitle: string; integrationDescription: string; items: string[] };
  showcase: { badge: string; title: string; highlightedTitle: string; scenarios: { name: string; eyebrow: string; messages: { ai: boolean; text: string }[]; result: string }[] };
  industries: { badge: string; title: string; description: string; items: string[] };
  why: { badge: string; title: string; description: string; cta: string; items: { title: string; description: string }[] };
  results: { badge: string; metrics: { value: string; label: string }[] };
  cta: { title: string; description: string; primaryCta: string; secondaryCta: string; emailSubject: string };
};

export type AIAutomationLandingPage = LandingPageBase & {
  templateKey: "ai-automation";
  content: AIAutomationContent;
};

export type ServiceLandingPage =
  | WebsiteDesignLandingPage
  | MobileAppLandingPage
  | TechnicalSeoLandingPage
  | PerformanceMarketingLandingPage
  | AIAutomationLandingPage;
