"use client";

import { useEffect, useState } from "react";
import type { WhatWeDoCategory } from "./whatWeDoMegaMenuData";

/**
 * Reads the published "What We Do" category pages from /api/whatwedo/categories.
 * Returns null until loaded so callers can fall back to the static menu, then
 * the live list once it arrives (updates when categories are published).
 */
export function useWhatWeDoCategories(): WhatWeDoCategory[] | null {
  const [categories, setCategories] = useState<WhatWeDoCategory[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/whatwedo/categories")
      .then((r) => r.json())
      .then((data) => {
        if (alive && Array.isArray(data?.items)) setCategories(data.items as WhatWeDoCategory[]);
      })
      .catch(() => {
        /* keep the static fallback on failure */
      });
    return () => {
      alive = false;
    };
  }, []);

  return categories;
}
