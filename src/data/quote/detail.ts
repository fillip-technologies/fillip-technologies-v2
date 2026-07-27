/**
 * Shared content for the richer "detail" sections on the Get-a-Quote pages
 * (What's Included, How to Choose, Why Choose Fillip). Kept as a plain,
 * client-safe data module — icons are lucide *names* resolved by the icon map
 * so this can be imported from server or client components.
 */

export type DetailCard = {
  /** lucide icon name (see quoteDetailIcons) */
  icon: string;
  title: string;
  description?: string;
};

/** Category id (from src/data/pricing.ts) → lucide icon name for its card. */
export const CATEGORY_ICONS: Record<string, string> = {
  website: "Globe",
  seo: "Search",
  smm: "Share2",
  performance: "Target",
  software: "Code2",
};

/**
 * "How to choose the right package" — generic, honest guidance that applies to
 * both the main packages calculator and every industry page.
 */
export const HOW_TO_CHOOSE: DetailCard[] = [
  {
    icon: "Goal",
    title: "Know the outcome you're after",
    description:
      "A simple brochure site, a lead machine, or a full platform are worlds apart. Name the result you want first — the right package almost picks itself.",
  },
  {
    icon: "Wallet",
    title: "Spend where it counts",
    description:
      "Every tier shows an honest starting price, so there are no surprises. And it's a starting point, not a ceiling — we'll happily shape it to your budget.",
  },
  {
    icon: "TrendingUp",
    title: "Build for where you're headed",
    description:
      "Planning to scale fast? A mid or higher tier saves you a painful rebuild later. Just testing the waters? Start lean and level up when you're ready.",
  },
  {
    icon: "ListChecks",
    title: "Compare with eyes open",
    description:
      "Scroll the full breakdown below and see every feature, side by side. No fine print, no mystery gaps between the columns.",
  },
  {
    icon: "MessageSquare",
    title: "Still torn? Just ask us",
    description:
      "Two minutes on a call beats an hour second-guessing. Share your goal and we'll point you to the leanest package that actually gets you there.",
  },
];

/** Company-wide trust stats shown in the "Why Choose Fillip" band. */
export const WHY_CHOOSE_STATS: { value: string; label: string }[] = [
  { value: "13+", label: "Years turning ideas into shipped products" },
  { value: "500+", label: "Colleges & government projects delivered" },
  { value: "100%", label: "Built from scratch — never a recycled template" },
  { value: "1:1", label: "A real person who owns your project end to end" },
];

/** Company-wide reasons to choose Fillip, shown as a checklist. */
export const WHY_CHOOSE_POINTS: string[] = [
  "Clear, itemised pricing — you always know exactly what you're paying for",
  "Real-time progress you can watch, plus one dedicated point of contact",
  "Design, development and marketing under one roof — no agency ping-pong",
  "Fast, mobile-first and SEO-ready from day one, not bolted on later",
  "Architecture that grows with you, so you never start over from zero",
  "We don't disappear at launch — support and upgrades whenever you need them",
];
