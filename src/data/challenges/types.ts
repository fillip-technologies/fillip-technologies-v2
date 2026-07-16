import type { Service } from "@/data/website-development";
import type { WhyChooseUsData } from "@/components/shared/WhyChooseUsSection";
import type { ServiceFaqData } from "@/components/shared/ServiceFaqSection";

/**
 * Content shape for the "challenges" Service Pages template — the
 * /challenges/<slug> detail pages under the "Challenges We Solve" category.
 * Reuses the `Service` hero, challenges (as "problem"), whatWeBuild (as
 * "approach") and outcomes shapes plus the shared whyChooseUs + faq shapes.
 */
export type ChallengeContent = {
  slug: string;
  title: string;
  menuDescription: string;
  summary: string;
  tags: string[];
  hero: Service["hero"];
  problem: Service["challenges"];
  approach: Service["whatWeBuild"];
  outcomes: Service["outcomes"];
  whyChooseUs: WhyChooseUsData;
  faq: ServiceFaqData;
};

export type ChallengeListingContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  process: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  whyChooseUs: WhyChooseUsData;
  industries: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  faq: ServiceFaqData;
  finalCta: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    cta: string;
    href: string;
  };
};

export type ChallengesCatalog = {
  listing: ChallengeListingContent;
  challenges: ChallengeContent[];
};
