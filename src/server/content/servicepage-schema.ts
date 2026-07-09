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
};

export function getTemplateSchema(templateId: string): TemplateSchema {
  return SCHEMAS[templateId] ?? SCHEMAS.service;
}
