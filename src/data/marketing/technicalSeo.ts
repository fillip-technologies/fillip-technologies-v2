import type { MarketingContent } from "./types";

export const technicalSeoContent: MarketingContent = {
  slug: "technical-seo",
  hero: {
    title: "Technical SEO That Builds A",
    highlightedTitle: "Foundation To Rank",
    description:
      "We fix the crawlability, speed, and structure issues holding your site back — so search engines can find, understand, and rank every page.",
  },
  capabilities: {
    eyebrow: "WHAT WE OPTIMISE",
    title: "The Technical Layer",
    highlightedTitle: "Behind Rankings",
    description:
      "A complete technical audit and remediation programme that turns a hard-to-crawl site into a search-friendly one.",
    cards: [
      {
        eyebrow: "Crawl & Index",
        title: "Crawlability & Indexation",
        description:
          "Fix crawl budget waste, broken links, and index bloat so the right pages get indexed.",
        metric: "Cleaner Index",
      },
      {
        eyebrow: "Speed",
        title: "Core Web Vitals",
        description:
          "Improve LCP, CLS, and INP with real performance fixes that Google rewards.",
        metric: "Faster Pages",
      },
      {
        title: "Site Architecture",
        description:
          "Logical structure, internal linking, and URL hygiene that spread ranking signals.",
      },
      {
        title: "Structured Data",
        description:
          "Schema markup that unlocks rich results and helps engines understand your content.",
        tags: ["Schema", "Sitemaps", "Canonicals"],
      },
    ],
  },
  process: {
    title: "Our Technical SEO",
    highlightedTitle: "Process",
    description:
      "A systematic audit-to-fix workflow that prioritises the issues moving rankings first.",
    steps: [
      { title: "Audit", items: ["Crawl Analysis", "Log Files", "Core Web Vitals", "Index Coverage"] },
      { title: "Prioritise", items: ["Impact Scoring", "Roadmap", "Quick Wins", "Sign-off"] },
      { title: "Fix", items: ["Speed", "Architecture", "Schema", "Redirects"] },
      { title: "Validate", items: ["Re-crawl", "Testing", "Monitoring", "Reporting"] },
    ],
  },
  results: {
    eyebrow: "TECHNICAL SEO OUTCOMES",
    title: "A Site Search Engines",
    highlightedTitle: "Actually Reward",
    description:
      "Technical fixes compound — better crawlability and speed lift rankings across the whole site.",
    stats: [
      { value: "+90", label: "Core Web Vitals" },
      { value: "+40%", label: "Pages Indexed" },
      { value: "-55%", label: "Crawl Errors" },
      { value: "+35%", label: "Organic Sessions" },
    ],
    leftPill: "Faster Site",
    rightPill: "Cleaner Index",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Technical SEO Done",
    highlightedTitle: "Right",
    description:
      "We prioritise the fixes that actually move rankings — not a 200-item checklist of noise.",
    items: [
      { title: "Impact-First", description: "We fix what moves the needle before cosmetic issues." },
      { title: "Developer-Friendly", description: "Clear, actionable tickets your engineers can ship fast." },
      { title: "Data-Backed", description: "Every recommendation is grounded in crawl and log data." },
      { title: "Ongoing Monitoring", description: "We catch regressions before they cost you rankings." },
    ],
  },
  faq: {
    title: "Technical SEO",
    highlightedTitle: "Questions",
    description: "Common questions about technical SEO with Fillip Technologies.",
    items: [
      {
        question: "How is technical SEO different from content SEO?",
        answer:
          "Technical SEO makes your site crawlable, fast, and understandable to search engines. Content SEO is about the words and topics. Both matter — technical is the foundation the content ranks on.",
      },
      {
        question: "How long until we see results?",
        answer:
          "Some fixes (indexation, speed) show impact within weeks; broader ranking gains typically build over 2–4 months as engines re-crawl and re-evaluate.",
      },
      {
        question: "Do you work with our developers?",
        answer:
          "Yes. We deliver prioritised, developer-ready tickets and can work alongside your team or implement directly where we have access.",
      },
      {
        question: "Will you provide reporting?",
        answer:
          "Yes. You get before/after audits plus ongoing monitoring of crawl health, Core Web Vitals, and organic performance.",
      },
    ],
  },
};
