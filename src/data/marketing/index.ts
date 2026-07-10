import type { MarketingContent } from "./types";
import { technicalSeoContent } from "./technicalSeo";
import { localSeoContent } from "./localSeo";
import { enterpriseSeoContent } from "./enterpriseSeo";
import { googleAdsManagementContent } from "./googleAdsManagement";
import { metaAdsManagementContent } from "./metaAdsManagement";
import { youtubeAdsCampaignContent } from "./youtubeAdsCampaign";
import { whatsappAdsCampaignContent } from "./whatsappAdsCampaign";
import { leadGenerationCampaignsContent } from "./leadGenerationCampaigns";

export type { MarketingContent } from "./types";

/**
 * Static default content for the seeded "marketing" pages, keyed by slug. Drives
 * both the CMS defaults (fallback until edited) and the public route's static
 * fallback (mirrors SOFTWARE_ENTERPRISE_CONTENT / CREATIVE_DESIGN_CONTENT).
 */
export const MARKETING_CONTENT: Record<string, MarketingContent> = {
  "technical-seo": technicalSeoContent,
  "local-seo": localSeoContent,
  "enterprise-seo": enterpriseSeoContent,
  "google-ads-management": googleAdsManagementContent,
  "meta-ads-management": metaAdsManagementContent,
  "youtube-ads-campaign": youtubeAdsCampaignContent,
  "whatsapp-ads-campaign": whatsappAdsCampaignContent,
  "lead-generation-campaigns": leadGenerationCampaignsContent,
};

/** Look up seeded marketing content by slug. */
export function getMarketingBySlug(slug: string): MarketingContent | undefined {
  return MARKETING_CONTENT[slug];
}
