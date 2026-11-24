"use client";

import type { SolutionCategory } from "./solutionsMegaMenuData";
import { useSharedItems } from "./sharedItems";

/**
 * Reads the published Solutions categories from /api/solutions/categories.
 * Returns null until loaded so callers can fall back to the static menu, then
 * the live list once it arrives. Fetched once per page load and shared. Pass
 * `enabled: false` to skip the request.
 */
export function useSolutionsCategories(enabled = true): SolutionCategory[] | null {
  return useSharedItems<SolutionCategory>(enabled ? "/api/solutions/categories" : null);
}
