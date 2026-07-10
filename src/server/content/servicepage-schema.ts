import "server-only";

import type { SectionSpec } from "./servicepage-sections";
import {
  SERVICEPAGE_SECTION_IDS,
  getServicePageSectionSpec,
  serviceDefault,
} from "./servicepage-sections";
import {
  MOBILEAPP_SECTION_IDS,
  getMobileAppSectionSpec,
  mobileappDefault,
} from "./mobileapp-sections";
import {
  SOFTWAREENTERPRISE_SECTION_IDS,
  getSoftwareEnterpriseSectionSpec,
  softwareenterpriseDefault,
} from "./softwareenterprise-sections";
import {
  CREATIVEDESIGN_SECTION_IDS,
  getCreativeDesignSectionSpec,
  creativedesignDefault,
} from "./creativedesign-sections";
import {
  MARKETING_SECTION_IDS,
  getMarketingSectionSpec,
  marketingDefault,
} from "./marketing-sections";
import {
  CHALLENGES_SECTION_IDS,
  getChallengesSectionSpec,
  challengesDefault,
} from "./challenges-sections";
import {
  SOLUTION_SECTION_IDS,
  getSolutionSectionSpec,
  solutionDefault,
} from "./solution-sections";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Resolves a page's `template` to its section schema. This is the single place
 * that knows which section set / codecs / defaults a template uses, so the
 * registry, actions and admin editors stay template-agnostic.
 */
export type TemplateSchema = {
  sectionIds: readonly string[];
  getSpec: (id: string) => SectionSpec | undefined;
  default: (slug: string, id: string) => Record<string, any>;
};

const SCHEMAS: Record<string, TemplateSchema> = {
  service: {
    sectionIds: SERVICEPAGE_SECTION_IDS,
    getSpec: getServicePageSectionSpec,
    default: serviceDefault,
  },
  "mobile-app": {
    sectionIds: MOBILEAPP_SECTION_IDS,
    getSpec: getMobileAppSectionSpec,
    default: mobileappDefault,
  },
  "software-enterprise": {
    sectionIds: SOFTWAREENTERPRISE_SECTION_IDS,
    getSpec: getSoftwareEnterpriseSectionSpec,
    default: softwareenterpriseDefault,
  },
  "creative-design": {
    sectionIds: CREATIVEDESIGN_SECTION_IDS,
    getSpec: getCreativeDesignSectionSpec,
    default: creativedesignDefault,
  },
  marketing: {
    sectionIds: MARKETING_SECTION_IDS,
    getSpec: getMarketingSectionSpec,
    default: marketingDefault,
  },
  challenges: {
    sectionIds: CHALLENGES_SECTION_IDS,
    getSpec: getChallengesSectionSpec,
    default: challengesDefault,
  },
  "hardware-solution": {
    sectionIds: SOLUTION_SECTION_IDS,
    getSpec: getSolutionSectionSpec,
    default: solutionDefault,
  },
  "business-solution": {
    sectionIds: SOLUTION_SECTION_IDS,
    getSpec: getSolutionSectionSpec,
    default: solutionDefault,
  },
};

export function getTemplateSchema(templateId: string): TemplateSchema {
  return SCHEMAS[templateId] ?? SCHEMAS.service;
}
