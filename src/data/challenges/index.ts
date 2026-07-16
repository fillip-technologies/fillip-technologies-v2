import type { ChallengeContent, ChallengesCatalog } from "./types";
import challengesCatalog from "../challenges.json";

export type { ChallengeContent, ChallengeListingContent, ChallengesCatalog } from "./types";

const catalog = challengesCatalog as ChallengesCatalog;

export const CHALLENGES = catalog.challenges;

export const CHALLENGES_CONTENT: Record<string, ChallengeContent> = Object.fromEntries(
  CHALLENGES.map((challenge) => [challenge.slug, challenge]),
);

export const CHALLENGE_MENU_ITEMS = CHALLENGES.map((challenge) => ({
  label: challenge.title,
  href: `/challenges-we-solve/${challenge.slug}`,
}));

/** Look up seeded challenge content by slug. */
export function getChallengeBySlug(slug: string): ChallengeContent | undefined {
  return CHALLENGES_CONTENT[slug];
}

export function getChallenges() {
  return CHALLENGES;
}

export function getChallengesCatalog() {
  return catalog;
}
