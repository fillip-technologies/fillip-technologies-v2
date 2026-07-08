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
