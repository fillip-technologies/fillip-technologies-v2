import type { HardwareSolutionPage } from "@/data/hardware-solutions";
import { hardwareSolutionPages } from "@/data/hardware-solutions";
import businessSolutionsData from "./solutions.json";

export type SolutionPageContent = HardwareSolutionPage;

type BusinessSolutionsData = {
  category: {
    title: string;
    description: string;
    basePath: string;
    items: {
      label: string;
      slug: string;
      href: string;
    }[];
  };
  pages: SolutionPageContent[];
};

export const businessSolutions = businessSolutionsData as BusinessSolutionsData;
export const businessSolutionPages = businessSolutions.pages;
export const businessSolutionMenuItems = businessSolutions.category.items;

/** The Business Solutions pages (shared "solution" page shape). */
export const BUSINESS_SOLUTION_CONTENT: Record<string, SolutionPageContent> = Object.fromEntries(
  businessSolutionPages.map((page) => [page.slug, page])
);

/**
 * All seeded Solution pages (hardware + business), keyed by slug. Drives the CMS
 * defaults (fallback until edited) and the public routes' static fallback.
 */
export const SOLUTION_CONTENT: Record<string, SolutionPageContent> = {
  ...Object.fromEntries(hardwareSolutionPages.map((p) => [p.slug, p])),
  ...BUSINESS_SOLUTION_CONTENT,
};

/** Look up seeded solution content by slug (hardware or business). */
export function getSolutionBySlug(slug: string): SolutionPageContent | undefined {
  return SOLUTION_CONTENT[slug];
}

/** Look up a Business Solution page by slug. */
export function getBusinessSolutionBySlug(slug: string): SolutionPageContent | undefined {
  return BUSINESS_SOLUTION_CONTENT[slug];
}
