import type { MarketingContent } from "./types";
import { technicalSeoContent } from "./technicalSeo";
import { localSeoContent } from "./localSeo";
import { enterpriseSeoContent } from "./enterpriseSeo";
import { whatsappAdsCampaignContent } from "./whatsappAdsCampaign";
import { leadGenerationCampaignsContent } from "./leadGenerationCampaigns";

export type { MarketingContent } from "./types";

/**
 * Static default content for the seeded "marketing" pages, keyed by slug. Drives
 * both the CMS defaults (fallback until edited) and the public route's static
 * fallback. Only the rich-SEO-layout pages live here; the paid-ads pages
 * (google/meta/youtube) render the performance-marketing landing layout instead
 * — see src/app/(site)/marketing/[slug]/page.tsx.
 */
export const MARKETING_CONTENT: Record<string, MarketingContent> = {
  "technical-seo": technicalSeoContent,
  "local-seo": localSeoContent,
  "enterprise-seo": enterpriseSeoContent,
  "whatsapp-ads-campaign": whatsappAdsCampaignContent,
  "lead-generation-campaigns": leadGenerationCampaignsContent,
};

/** Look up seeded marketing content by slug. */
export function getMarketingBySlug(slug: string): MarketingContent | undefined {
  return MARKETING_CONTENT[slug];
}
