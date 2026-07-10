import type { ChallengeContent } from "./types";
import { websiteNoLeadsContent } from "./websiteNoLeads";
import { qualityLeadsContent } from "./qualityLeads";
import { notRankingGoogleContent } from "./notRankingGoogle";
import { lowOrganicTrafficContent } from "./lowOrganicTraffic";

export type { ChallengeContent } from "./types";

/**
 * Static default content for the seeded "challenges" pages, keyed by slug.
 * Drives both the CMS defaults (fallback until edited) and the public route's
 * static fallback.
 */
export const CHALLENGES_CONTENT: Record<string, ChallengeContent> = {
  "website-not-generating-leads": websiteNoLeadsContent,
  "generate-quality-leads": qualityLeadsContent,
  "not-ranking-on-google": notRankingGoogleContent,
  "low-organic-traffic": lowOrganicTrafficContent,
};

/** Look up seeded challenge content by slug. */
export function getChallengeBySlug(slug: string): ChallengeContent | undefined {
  return CHALLENGES_CONTENT[slug];
}
