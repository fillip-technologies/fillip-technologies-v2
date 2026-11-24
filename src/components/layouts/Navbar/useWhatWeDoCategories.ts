"use client";

import type { WhatWeDoCategory } from "./whatWeDoMegaMenuData";
import { useSharedItems } from "./sharedItems";

/**
 * Reads the published "What We Do" category pages from /api/whatwedo/categories.
 * Returns null until loaded so callers can fall back to the static menu, then
 * the live list once it arrives. Fetched once per page load and shared.
 */
export function useWhatWeDoCategories(): WhatWeDoCategory[] | null {
  return useSharedItems<WhatWeDoCategory>("/api/whatwedo/categories");
}
