import type { Service } from "@/data/website-development";

/** A single portfolio / showcase tile (creative-design specific section). */
export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
};

/** One "why choose us" reason card (creative-design specific section). */
export type WhyChooseReason = {
  title: string;
  description: string;
};

/** One FAQ entry (creative-design specific section). */
export type CreativeDesignFaqItem = {
  question: string;
  answer: string;
};

/**
 * Content shape for the "creative-design" Service Pages template — the
 * /design/<slug> detail pages under the "Creative Experience Design" category.
 * It reuses the proven `Service` hero, `whatWeBuild` (as "capabilities") and
 * `process` shapes and adds three design-specific sections: portfolio, why
 * choose us and FAQs.
 */
export type CreativeDesignContent = {
  slug: string;
  hero: Service["hero"];
  capabilities: Service["whatWeBuild"];
  portfolio: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    items: PortfolioItem[];
  };
  process: Service["process"];
  whyChooseUs: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    items: WhyChooseReason[];
  };
  faq: {
    title: string;
    highlightedTitle: string;
    description: string;
    items: CreativeDesignFaqItem[];
  };
};
