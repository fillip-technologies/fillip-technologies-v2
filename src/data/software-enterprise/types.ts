/**
 * Content shape for the "software-enterprise" Service Pages template — now a
 * SaaS-style layout shared by every page in the Software & Enterprise section
 * (SaaS Product Development, Custom Software, CRM, ERP, API Integration and the
 * Software Development overview).
 *
 * The layout has four editable sections: hero, capabilities (bento widgets),
 * scaleTiers and faq. The interactive demo widgets keep their own fixed
 * mechanics; only the surrounding copy is per-page / CMS-editable.
 */

/** Icon keys usable in hero bullets and tier architecture nodes. */
export type SaasIconKey =
  | "database"
  | "shield"
  | "layers"
  | "check"
  | "server"
  | "globe"
  | "refresh"
  | "cpu"
  | "cloud"
  | "lock"
  | "zap"
  | "activity";

export type SaasHeroBullet = { icon: SaasIconKey; label: string };
export type SaasCta = { label: string; href: string };

export type SaasHero = {
  badge: string;
  /** Heading text before the gradient-highlighted words. */
  title: string;
  /** Gradient-highlighted words at the end of the heading. */
  highlightedTitle: string;
  description: string;
  bullets: SaasHeroBullet[];
  primaryCta: SaasCta;
  secondaryCta: SaasCta;
};

/**
 * One bento capability card. The four cards map by index to the four demo
 * widgets (0 = data-routing, 1 = billing, 2 = analytics chart, 3 = deploy
 * pipeline). `caption` is the small label shown above the widget.
 */
export type SaasCapabilityCard = {
  title: string;
  description: string;
  caption: string;
};

export type SaasCapabilities = {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  cards: SaasCapabilityCard[];
};

export type SaasTierMetric = { label: string; value: string };
export type SaasTierNode = { label: string; icon: SaasIconKey };

export type SaasTier = {
  id: string;
  label: string;
  title: string;
  description: string;
  metrics: SaasTierMetric[];
  architecture: { title: string; desc: string; nodes: SaasTierNode[] };
};

export type SaasScaleTiers = {
  eyebrow: string;
  title: string;
  description: string;
  tiers: SaasTier[];
};

export type SaasFaqItem = { category: string; question: string; answer: string };

export type SaasFaq = {
  title: string;
  highlightedTitle: string;
  description: string;
  items: SaasFaqItem[];
};

export type SoftwareEnterpriseContent = {
  slug: string;
  hero: SaasHero;
  capabilities: SaasCapabilities;
  scaleTiers: SaasScaleTiers;
  faq: SaasFaq;
};
