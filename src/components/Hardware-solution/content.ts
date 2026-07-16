import type { FAQ } from "@/components/shared/FAQSection";
import type { Testimonial } from "@/components/shared/TestimonialsSection";

/**
 * Content shapes for the (CMS-driven) Security Surveillance solution page. The
 * public route reads each section from `page.security-surveillance.<id>` and
 * passes the merged data (registry defaults + saved edits) into these props.
 */

export type SecurityHeroContent = {
  backgroundImage: string;
  badge: string;
  heading: string; // may contain \n for line breaks
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  statusLabel: string;
  statusValue: string;
  statusItem1: string;
  statusItem2: string;
};

export type SecurityCard = { image: string; title: string; description: string };
export type SecurityPriorityContent = {
  heading: string;
  description: string;
  ctaLabel: string;
  cards: SecurityCard[];
};

export type SecurityFeature = { title: string; description: string };
export type SecurityServicesContent = {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  videoTitle: string;
  watchLabel: string;
  features: SecurityFeature[];
};

export type SecuritySolutionCard = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};
export type SecuritySupportContent = {
  heading: string;
  description: string;
  ctaLabel: string;
  solutions: SecuritySolutionCard[];
};

export type SecurityBenefit = { title: string; description: string };
export type SecurityBenefitsContent = {
  eyebrow: string;
  heading: string;
  benefits: SecurityBenefit[];
};

export type SecurityTestimonialsContent = {
  badge: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
};

export type SecurityFaqsContent = {
  badge: string;
  title: string;
  description: string;
  faqs: FAQ[];
};

export type SecuritySurveillanceContent = {
  hero: SecurityHeroContent;
  priority: SecurityPriorityContent;
  services: SecurityServicesContent;
  support: SecuritySupportContent;
  benefits: SecurityBenefitsContent;
  testimonials: SecurityTestimonialsContent;
  faqs: SecurityFaqsContent;
};
