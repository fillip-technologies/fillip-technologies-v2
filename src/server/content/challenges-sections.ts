/**
 * CMS SECTION SCHEMA for the "challenges" Service Pages template — the
 * /challenges/<slug> detail pages under the "Challenges We Solve" category.
 * Reuses the shared `Service` hero + challenges (surfaced as "The Problem") +
 * whatWeBuild (surfaced as "Our Approach") + outcomes specs, plus the shared
 * whyChooseUs + faq specs.
 *
 * Content is stored FLAT (`servicepage.<slug>.<id>`) and unflattened into the
 * `ChallengeContent` shape on read.
 */

import type { SectionSpec } from "./servicepage-sections";
import { SERVICEPAGE_SECTION_SPECS } from "./servicepage-sections";
import { whyChooseUsSpec, faqSpec, aliasSpec } from "./shared-section-specs";
import { CHALLENGES_CONTENT } from "@/data/challenges";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

export const CHALLENGES_SECTION_SPECS: Record<string, SectionSpec> = {
  hero: SERVICEPAGE_SECTION_SPECS.hero,
  problem: aliasSpec(
    SERVICEPAGE_SECTION_SPECS.challenges,
    "problem",
    "The Problem",
    "The problem heading, copy, CTA line and the pain-point cards."
  ),
  approach: aliasSpec(
    SERVICEPAGE_SECTION_SPECS.whatWeBuild,
    "approach",
    "Our Approach",
    "Heading and the solution cards (each with an optional metric and tags)."
  ),
  outcomes: SERVICEPAGE_SECTION_SPECS.outcomes,
  whyChooseUs: whyChooseUsSpec,
  faq: faqSpec,
};

// Section order shown on the page + in the admin.
export const CHALLENGES_SECTION_IDS = [
  "hero",
  "problem",
  "approach",
  "outcomes",
  "whyChooseUs",
  "faq",
] as const;

export function getChallengesSectionSpec(sectionId: string): SectionSpec | undefined {
  return CHALLENGES_SECTION_SPECS[sectionId];
}

/** Raw nested default for a section: the seeded challenge content by slug, else `{}`. */
export function challengesDefault(slug: string, sectionId: string): AnyRec {
  return (CHALLENGES_CONTENT[slug] as AnyRec)?.[sectionId] ?? {};
}
