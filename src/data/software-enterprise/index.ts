import type { SoftwareEnterpriseContent } from "./types";
import { saasProductDevelopmentContent } from "./saasProductDevelopment";
import { customSoftwareDevelopmentContent } from "./customSoftwareDevelopment";
import { crmDevelopmentContent } from "./crmDevelopment";
import { erpSolutionsContent } from "./erpSolutions";
import { apiIntegrationContent } from "./apiIntegration";
import { softwareDevelopmentContent } from "./softwareDevelopment";

export type {
  SoftwareEnterpriseContent,
  SaasHero,
  SaasHeroBullet,
  SaasCta,
  SaasCapabilities,
  SaasCapabilityCard,
  SaasScaleTiers,
  SaasTier,
  SaasTierMetric,
  SaasTierNode,
  SaasFaq,
  SaasFaqItem,
  SaasIconKey,
} from "./types";

export {
  saasProductDevelopmentContent,
  customSoftwareDevelopmentContent,
  crmDevelopmentContent,
  erpSolutionsContent,
  apiIntegrationContent,
  softwareDevelopmentContent,
};

/**
 * Static default content for the seeded "software-enterprise" pages, keyed by
 * slug. Drives both the CMS defaults (fallback until edited) and the public
 * route's static fallback. All pages share the SaaS-style layout.
 */
export const SOFTWARE_ENTERPRISE_CONTENT: Record<string, SoftwareEnterpriseContent> = {
  "saas-product-development": saasProductDevelopmentContent,
  "custom-software-development": customSoftwareDevelopmentContent,
  "crm-development": crmDevelopmentContent,
  "erp-solutions": erpSolutionsContent,
  "api-integration": apiIntegrationContent,
  "software-development": softwareDevelopmentContent,
};

/** Look up seeded SE content by slug. */
export function getSoftwareEnterpriseBySlug(
  slug: string
): SoftwareEnterpriseContent | undefined {
  return SOFTWARE_ENTERPRISE_CONTENT[slug];
}
