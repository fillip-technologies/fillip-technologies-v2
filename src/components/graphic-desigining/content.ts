/**
 * Content shapes for the (CMS-driven) Graphic Designing page. The public route
 * reads each section from `page.graphic-designing.<id>` and passes the merged
 * data (registry defaults + saved edits) into these props. Purely visual props
 * (icons, gradient colours, accent hues) stay code-derived by index.
 */

export type GraphicStat = { value: string; label: string };
export type GraphicHeroContent = {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  descriptionLead: string;
  descriptionHighlight: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
  imageAlt: string;
  stats: GraphicStat[];
};

export type GraphicService = {
  subtitle: string;
  title: string;
  desc: string;
  features: string; // comma-separated pills
  tag: string;
};
export type GraphicCapabilitiesContent = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  headingTail: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  services: GraphicService[];
};

export type GraphicStep = { num: string; title: string; desc: string };
export type GraphicProcessContent = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  description: string;
  steps: GraphicStep[];
};

export type GraphicPortfolioItem = {
  category: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
};
export type GraphicPortfolioContent = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  items: GraphicPortfolioItem[];
};

export type GraphicReason = { title: string; desc: string };
export type GraphicWhyChooseContent = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  description: string;
  reasons: GraphicReason[];
};

export type GraphicDeliverable = { text: string };
export type GraphicDeliverablesContent = {
  title: string;
  ctaEmoji: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
  deliverables: GraphicDeliverable[];
};

export type GraphicDesigningContent = {
  hero: GraphicHeroContent;
  capabilities: GraphicCapabilitiesContent;
  process: GraphicProcessContent;
  portfolio: GraphicPortfolioContent;
  whychoose: GraphicWhyChooseContent;
  deliverables: GraphicDeliverablesContent;
};
