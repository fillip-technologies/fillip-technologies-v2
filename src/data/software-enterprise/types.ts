import type { Service } from "@/data/website-development";

/** A single engagement/collaboration model card (SE-specific section). */
export type EngagementModel = {
  badge?: string;
  title: string;
  description: string;
  points: string[];
};

/** One FAQ entry (SE-specific section). */
export type SoftwareEnterpriseFaqItem = {
  question: string;
  answer: string;
};

/**
 * Content shape for the "software-enterprise" Service Pages template. It reuses
 * the proven `Service` sections (hero, challenges, whatWeBuild, technologyStack,
 * process, outcomes) and adds two SE-only sections: engagement models + FAQs.
 */
export type SoftwareEnterpriseContent = Service & {
  engagementModels: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    models: EngagementModel[];
  };
  faq: {
    title: string;
    highlightedTitle: string;
    description: string;
    items: SoftwareEnterpriseFaqItem[];
  };
};
