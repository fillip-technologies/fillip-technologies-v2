"use client";

import {
  Bot,
  Briefcase,
  Building2,
  Cog,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  LayoutGrid,
  Lightbulb,
  MessagesSquare,
  Palette,
  Server,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useWhatWeDoCategories } from "@/components/layouts/Navbar/useWhatWeDoCategories";
import { useSolutionsCategories } from "@/components/layouts/Navbar/useSolutionsCategories";
import { useNavMenu } from "@/components/layouts/Navbar/useAboutMenu";
import {
  STATIC_WHAT_WE_DO_CATEGORIES,
  WHAT_WE_DO_ITEMS_BY_SLUG,
  type WhatWeDoCategory,
} from "@/components/layouts/Navbar/whatWeDoMegaMenuData";
import {
  STATIC_SOLUTION_CATEGORIES,
  type SolutionCategory,
} from "@/components/layouts/Navbar/solutionsMegaMenuData";
import { AI_AUTOMATION_MENU } from "@/components/layouts/Navbar/aiAutomationMenuData";
import { INDUSTRIES_MENU } from "@/components/layouts/Navbar/industriesMegaMenuData";
import type { AboutMenuItem } from "@/components/layouts/Navbar/aboutMegaMenuData";

/**
 * Data for the service dock: every nav menu whose pages should get the dock,
 * built from the same (admin-managed) data the navbar uses, plus the dock's own
 * copy and icons. `useDockMatch` finds the menu + group the current page is in.
 */

export type DockItem = { label: string; href: string; icon?: LucideIcon };
export type DockGroup = { slug: string; label: string; icon: LucideIcon; items: DockItem[] };
export type DockSource = {
  id: "whatwedo" | "ai" | "solutions" | "industries";
  /** Small caps line above the panel title. */
  eyebrow: string;
  title: string;
  subtitle: (total: number) => string;
  /** Plural noun for the nudge CTA: "Peek at 5 more <noun>". */
  noun: string;
  /** Nudge-bubble hook line for a visitor on a page in `groupSlug`. */
  teaser: (groupSlug: string) => string;
  groups: DockGroup[];
};
export type DockMatch = { source: DockSource; group: DockGroup; item: DockItem };

export const normalizePath = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

const toItems = (
  list: readonly { label: string; href?: string }[],
  icons: Record<string, LucideIcon> = {},
  relabel: (label: string) => string = (l) => l
): DockItem[] =>
  list.flatMap((i) => {
    if (!i.href) return [];
    const href = normalizePath(i.href);
    return [{ label: relabel(i.label), href, icon: icons[href] }];
  });

/* ---------------- What We Do ---------------- */

const WHATWEDO_ICONS: Record<string, LucideIcon> = {
  "web-development": Globe,
  "mobile-app-development": Smartphone,
  "software-enterprise": Layers,
  "creative-experience-design": Palette,
  "seo-performance-marketing": TrendingUp,
};
const WHATWEDO_TEASERS: Record<string, string> = {
  "web-development": "Psst… not just websites.",
  "mobile-app-development": "Psst… not just apps.",
  "software-enterprise": "Psst… not just software.",
  "creative-experience-design": "Psst… not just design.",
  "seo-performance-marketing": "Psst… not just SEO.",
};
// "Challenges We Solve" links to case studies, not services.
const WHATWEDO_EXCLUDED = new Set(["challenges-we-solve"]);

function buildWhatWeDo(live: WhatWeDoCategory[] | null): DockSource {
  const source = live && live.length ? live : STATIC_WHAT_WE_DO_CATEGORIES;
  return {
    id: "whatwedo",
    eyebrow: "Explore more",
    title: "What's your next big move?",
    subtitle: (n) => `${n} services · one expert team`,
    noun: "services",
    teaser: (g) => WHATWEDO_TEASERS[g] ?? "Psst… there's more we build.",
    groups: source
      .filter((c) => !WHATWEDO_EXCLUDED.has(c.slug))
      .map((c) => ({
        slug: c.slug,
        label: c.label,
        icon: WHATWEDO_ICONS[c.slug] ?? LayoutGrid,
        // Mirror the mega menu: admin-managed links win, static defaults otherwise.
        items: toItems(c.items ?? WHAT_WE_DO_ITEMS_BY_SLUG[c.slug] ?? []),
      })),
  };
}

/* ---------------- AI & Automation ---------------- */

const AI_ICONS: Record<string, LucideIcon> = {
  "/ai-consulting": Lightbulb,
  "/aichatbots": MessagesSquare,
  "/ai-agent-development": Bot,
  "/ai-gpt-integration": Sparkles,
  "/workflow-automation": Workflow,
  "/business-process-automation": Cog,
};

function buildAi(): DockSource {
  return {
    id: "ai",
    eyebrow: "AI & Automation",
    title: "Let AI do the heavy lifting",
    subtitle: (n) => `${n} ways to automate & scale`,
    noun: "AI solutions",
    teaser: () => "Psst… AI can do a lot more.",
    groups: [
      {
        slug: "ai-automation",
        label: "AI & Automation",
        icon: Sparkles,
        items: toItems(AI_AUTOMATION_MENU, AI_ICONS),
      },
    ],
  };
}

/* ---------------- Solutions ---------------- */

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  "business-solutions": Briefcase,
  "hardware-solutions": Server,
};
const SOLUTION_TEASERS: Record<string, string> = {
  "business-solutions": "Psst… we do hardware too.",
  "hardware-solutions": "Psst… we build software too.",
};

function buildSolutions(live: SolutionCategory[] | null): DockSource {
  const staticBySlug = new Map(STATIC_SOLUTION_CATEGORIES.map((c) => [c.slug, c]));
  const source = live && live.length ? live : STATIC_SOLUTION_CATEGORIES;
  return {
    id: "solutions",
    eyebrow: "Solutions",
    title: "Ready-made for your business",
    subtitle: (n) => `${n} solutions, ready to deploy`,
    noun: "solutions",
    teaser: (g) => SOLUTION_TEASERS[g] ?? "Psst… there's more ready to deploy.",
    groups: source.map((c) => ({
      slug: c.slug,
      label: c.label,
      icon: SOLUTION_ICONS[c.slug] ?? LayoutGrid,
      // Mirror buildSolutionsColumns: an empty live list falls back to the static one.
      items: toItems(c.items && c.items.length ? c.items : staticBySlug.get(c.slug)?.items ?? []),
    })),
  };
}

/* ---------------- Industries ---------------- */

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "/industries/healthcare": HeartPulse,
  "/industries/finance": Landmark,
  "/industries/retail": ShoppingBag,
  "/industries/education": GraduationCap,
  "/industries/real-estate": Building2,
  "/industries/logistics": Truck,
};
const INDUSTRY_DEFAULTS: AboutMenuItem[] = INDUSTRIES_MENU.map((i) => ({
  label: i.label,
  href: i.href,
}));

function buildIndustries(items: AboutMenuItem[]): DockSource {
  return {
    id: "industries",
    eyebrow: "Industries",
    title: "We speak your industry",
    subtitle: (n) => `${n} industries · deep domain expertise`,
    noun: "industries",
    teaser: () => "Psst… we know other industries too.",
    groups: [
      {
        slug: "industries",
        label: "Industries",
        icon: Building2,
        // "Healthcare Industries" → "Healthcare": the panel title says the rest.
        items: toItems(items, INDUSTRY_ICONS, (l) => l.replace(/\s+Industries$/i, "") || l),
      },
    ],
  };
}

/* ---------------- Matching ---------------- */

/** The menu + group + item for `pathname`, or null when it isn't in any menu. */
export function useDockMatch(pathname: string): DockMatch | null {
  // Live data for Solutions / Industries is only fetched on their own pages.
  // What We Do is always loaded by the navbar, so it's shared for free.
  const onSolutions = /^\/(solutions|hardware-solutions)\//.test(pathname);
  const onIndustries = pathname.startsWith("/industries/");

  const whatWeDo = useWhatWeDoCategories();
  const solutions = useSolutionsCategories(onSolutions);
  const industries = useNavMenu("industries", INDUSTRY_DEFAULTS, onIndustries);

  // A few dozen items at most — cheap enough to rebuild on each render.
  const sources = [
    buildWhatWeDo(whatWeDo),
    buildAi(),
    buildSolutions(solutions),
    buildIndustries(industries),
  ];
  for (const source of sources) {
    for (const group of source.groups) {
      const item = group.items.find((i) => i.href === pathname);
      if (item) {
        const groups = source.groups.filter((g) => g.items.length > 0);
        return { source: { ...source, groups }, group, item };
      }
    }
  }
  return null;
}
