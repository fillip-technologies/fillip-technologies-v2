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
  CREATIVEEXPERIENCE_SECTION_IDS,
  getCreativeExperienceSectionSpec,
  creativeexperienceDefault,
} from "./creativeexperience-sections";
import {
  MARKETING_SECTION_IDS,
  getMarketingSectionSpec,
  marketingDefault,
} from "./marketing-sections";
import {
  PERFORMANCEMARKETING_SECTION_IDS,
  getPerformanceMarketingSectionSpec,
  performanceMarketingDefault,
} from "./performancemarketing-sections";
import {
  SOLUTION_SECTION_IDS,
  getSolutionSectionSpec,
  solutionDefault,
} from "./solution-sections";
import {
  HARDWARESOLUTION_SECTION_IDS,
  getHardwareSolutionSectionSpec,
  hardwareSolutionDefault,
} from "./hardwaresolution-sections";

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
  "creative-experience": {
    sectionIds: CREATIVEEXPERIENCE_SECTION_IDS,
    getSpec: getCreativeExperienceSectionSpec,
    default: creativeexperienceDefault,
  },
  marketing: {
    sectionIds: MARKETING_SECTION_IDS,
    getSpec: getMarketingSectionSpec,
    default: marketingDefault,
  },
  "performance-marketing": {
    sectionIds: PERFORMANCEMARKETING_SECTION_IDS,
    getSpec: getPerformanceMarketingSectionSpec,
    default: performanceMarketingDefault,
  },
  "hardware-solution": {
    sectionIds: HARDWARESOLUTION_SECTION_IDS,
    getSpec: getHardwareSolutionSectionSpec,
    default: hardwareSolutionDefault,
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
