import type { SoftwareEnterpriseContent } from "./types";
import { customSoftwareDevelopmentContent } from "./customSoftwareDevelopment";
import { crmDevelopmentContent } from "./crmDevelopment";
import { erpSolutionsContent } from "./erpSolutions";
import { apiIntegrationContent } from "./apiIntegration";

export type {
  SoftwareEnterpriseContent,
  EngagementModel,
  SoftwareEnterpriseFaqItem,
} from "./types";

export {
  customSoftwareDevelopmentContent,
  crmDevelopmentContent,
  erpSolutionsContent,
  apiIntegrationContent,
};

/**
 * Static default content for the seeded "software-enterprise" pages, keyed by
 * slug. Drives both the CMS defaults (fallback until edited) and the public
 * route's static fallback (mirrors MOBILE_CONTENT for the mobile-app template).
 */
export const SOFTWARE_ENTERPRISE_CONTENT: Record<string, SoftwareEnterpriseContent> = {
  "custom-software-development": customSoftwareDevelopmentContent,
  "crm-development": crmDevelopmentContent,
  "erp-solutions": erpSolutionsContent,
  "api-integration": apiIntegrationContent,
};

/** Look up seeded SE content by slug. */
export function getSoftwareEnterpriseBySlug(
  slug: string
): SoftwareEnterpriseContent | undefined {
  return SOFTWARE_ENTERPRISE_CONTENT[slug];
}
