"use client";

import { useEffect, useState } from "react";
import type { SolutionCategory } from "./solutionsMegaMenuData";

/**
 * Reads the published Solutions categories from /api/solutions/categories.
 * Returns null until loaded so callers can fall back to the static menu, then
 * the live list once it arrives (updates when categories/links change).
 */
export function useSolutionsCategories(): SolutionCategory[] | null {
  const [categories, setCategories] = useState<SolutionCategory[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/solutions/categories")
      .then((r) => r.json())
      .then((data) => {
        if (alive && Array.isArray(data?.items)) setCategories(data.items as SolutionCategory[]);
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
