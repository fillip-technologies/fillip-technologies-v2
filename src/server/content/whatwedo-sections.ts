/**
 * CMS section schema for the /what-we-do/<slug> category pages. These pages
 * reuse the industry page template (same components + section shapes), so we
 * reuse the industry section SPECS directly — one schema, editable text + image
 * fields per section. Content is stored FLAT under `whatwedo.<slug>.<section>`.
 *
 * The list of categories (slug/label/publish state) lives in the
 * `service_categories` collection — see whatwedo-registry.ts. All categories
 * share one generic default (defaultCategoryData); images start blank so each
 * category sets its own.
 */

import {
  INDUSTRY_SECTION_SPECS,
  INDUSTRY_SECTION_IDS,
  getIndustrySectionSpec,
} from "./industry-sections";
import { defaultCategoryData } from "@/data/whatwedo/defaultCategory";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRec = Record<string, any>;

// Reuse the industry section schema + flat<->nested codecs verbatim.
export const WHATWEDO_SECTION_SPECS = INDUSTRY_SECTION_SPECS;
export const WHATWEDO_SECTION_IDS = INDUSTRY_SECTION_IDS;
export const getWhatWeDoSectionSpec = getIndustrySectionSpec;

/**
 * Raw nested default for a section. Every category shares one generic default
 * (defaultCategoryData); admins then edit copy + upload per-category images.
 */
export function whatwedoDefault(_slug: string, sectionId: string): AnyRec {
  return (defaultCategoryData as AnyRec)?.[sectionId] ?? {};
}
