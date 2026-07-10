/**
 * CMS SECTION SCHEMA for the "marketing" Service Pages template — the
 * /marketing/<slug> detail pages under the "SEO & Performance Marketing"
 * category. Reuses the shared `Service` hero + whatWeBuild (surfaced as
 * "Capabilities") + process + outcomes (surfaced as "Results") specs, plus the
 * shared whyChooseUs + faq specs.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `MarketingContent` shape on read.
 */

import type { SectionSpec } from "./servicepage-sections";
import { SERVICEPAGE_SECTION_SPECS } from "./servicepage-sections";
import { whyChooseUsSpec, faqSpec, aliasSpec } from "./shared-section-specs";
import { MARKETING_CONTENT } from "@/data/marketing";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

export const MARKETING_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: SERVICEPAGE_SECTION_SPECS.hero,
  capabilities: aliasSpec(
    SERVICEPAGE_SECTION_SPECS.whatWeBuild,
    "capabilities",
    "Capabilities",
    "Heading and the service capability cards (each with an optional metric and tags)."
  ),
  process: SERVICEPAGE_SECTION_SPECS.process,
  results: aliasSpec(
    SERVICEPAGE_SECTION_SPECS.outcomes,
    "results",
    "Results",
    "The results heading, the metric stats and the two floating pill labels."
  ),
  whyChooseUs: whyChooseUsSpec,
  faq: faqSpec,
};

// Section order shown on the page + in the admin.
export const MARKETING_SECTION_IDS = [
  "hero",
  "capabilities",
  "process",
  "results",
  "whyChooseUs",
  "faq",
] as const;

export function getMarketingSectionSpec(sectionId: string): SectionSpec | undefined {
  return MARKETING_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the seeded marketing content by slug, else `{}`. */
export function marketingDefault(slug: string, sectionId: string): AnyRec {
  return (MARKETING_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
