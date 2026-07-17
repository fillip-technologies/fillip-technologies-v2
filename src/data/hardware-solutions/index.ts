import hardwareSolutionsData from "./solutions.json";

export type HardwareSolutionItem = {
  label: string;
  slug: string;
  href: string;
};

export type HardwareSolutionPage = {
  slug: string;
  label: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    highlightedTitle: string;
    description: string;
    image: string;
  };
  solutions: {
    title: string;
    description: string;
    image: string;
  }[];
  benefits: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  // CMS-managed copy blocks for the Solutions renderer. Optional so the seeded
  // JSON (and any legacy caller) stays valid; the renderer falls back to its
  // built-in defaults when a block is absent.
  about?: {
    heading: string;
    description: string;
    ctaLabel: string;
  };
  promise?: {
    eyebrow: string;
    heading: string;
    description: string;
    features: { title: string; description: string }[];
  };
  solutionsHeading?: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  whyChoose?: {
    eyebrow: string;
    heading: string;
    benefitDescription: string;
  };
  testimonials?: {
    badge: string;
    title: string;
    description: string;
    items: { name: string; role: string; review: string; image: string }[];
  };
};

export type HardwareSolutionsData = {
  category: {
    title: string;
    description: string;
    basePath: string;
    items: HardwareSolutionItem[];
  };
  pages: HardwareSolutionPage[];
};

export const hardwareSolutions = hardwareSolutionsData as HardwareSolutionsData;
export const hardwareSolutionPages = hardwareSolutions.pages;
export const hardwareSolutionMenuItems = hardwareSolutions.category.items;

export function getHardwareSolutionBySlug(slug: string) {
  return hardwareSolutionPages.find((page) => page.slug === slug);
}
