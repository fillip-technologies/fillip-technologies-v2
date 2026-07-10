import type { Service } from "@/data/website-development";
import type { WhyChooseUsData } from "@/components/shared/WhyChooseUsSection";
import type { ServiceFaqData } from "@/components/shared/ServiceFaqSection";

/**
 * Content shape for the "marketing" Service Pages template — the
 * /marketing/<slug> detail pages under the "SEO & Performance Marketing"
 * category. Reuses the `Service` hero, whatWeBuild (as "capabilities"), process
 * and outcomes (as "results") shapes plus the shared whyChooseUs + faq shapes.
 */
export type MarketingContent = {
  slug: string;
  hero: Service["hero"];
  capabilities: Service["whatWeBuild"];
  process: Service["process"];
  results: Service["outcomes"];
  whyChooseUs: WhyChooseUsData;
  faq: ServiceFaqData;
};
