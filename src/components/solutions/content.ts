/**
 * Content shapes for the (CMS-driven) WhatsApp Business solution page. The
 * public route reads each section from `page.whatsapp-business.<id>` and passes
 * the merged data (registry defaults + saved edits) into these props. Icons,
 * chat mock-ups and the comparison columns stay in code (by position).
 */

export type WaLabelItem = { label: string };

export type WaHeroContent = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  headingTail: string;
  subheading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type WaProblemContent = {
  eyebrow: string;
  heading: string;
  description: string;
  steps: WaLabelItem[];
};

export type WaSolutionContent = {
  eyebrow: string;
  heading: string;
  description: string;
  steps: WaLabelItem[];
};

export type WaUseCaseItem = { number: string; title: string; copy: string };
export type WaUsecasesContent = {
  eyebrow: string;
  heading: string;
  items: WaUseCaseItem[];
};

export type WaDifferenceContent = {
  eyebrow: string;
  heading: string;
  description: string;
};

export type WaShowcaseContent = {
  eyebrow: string;
  heading: string;
  engineTitle: string;
};

export type WaIndustriesContent = {
  eyebrow: string;
  heading: string;
  industries: WaLabelItem[];
};

export type WaReasonItem = { number: string; title: string; copy: string };
export type WaWhyusContent = {
  eyebrow: string;
  heading: string;
  description: string;
  items: WaReasonItem[];
};

export type WaMetric = { value: string; suffix: string; label: string };
export type WaResultsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  metrics: WaMetric[];
};

export type WaCtaContent = {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type WhatsAppBusinessContent = {
  hero: WaHeroContent;
  problem: WaProblemContent;
  solution: WaSolutionContent;
  usecases: WaUsecasesContent;
  difference: WaDifferenceContent;
  showcase: WaShowcaseContent;
  industries: WaIndustriesContent;
  whyus: WaWhyusContent;
  results: WaResultsContent;
  cta: WaCtaContent;
};
