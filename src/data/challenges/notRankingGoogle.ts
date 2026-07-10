import type { ChallengeContent } from "./types";

export const notRankingGoogleContent: ChallengeContent = {
  slug: "not-ranking-on-google",
  hero: {
    title: "Your Business Is Invisible",
    highlightedTitle: "On Google",
    description:
      "If you're not on page one, your customers are finding competitors instead. We build the rankings that put you in front of buyers actively searching.",
  },
  problem: {
    eyebrow: "The Problem",
    title: "Why You're Not",
    highlightedTitle: "Ranking",
    description:
      "Technical issues, thin content, and weak authority keep most businesses buried past page one.",
    secondaryDescription:
      "We diagnose the gaps and build a search strategy that steadily climbs you into visibility.",
    cta: "Get My Business Ranking",
    items: [
      { title: "Technical Barriers", description: "Crawl and speed issues stop Google indexing you properly." },
      { title: "Thin Content", description: "Pages that don't answer real queries can't rank for them." },
      { title: "Low Authority", description: "Few quality backlinks mean Google doesn't trust your site." },
      { title: "Wrong Keywords", description: "Targeting terms customers don't search wastes effort." },
      { title: "No Local Presence", description: "Missing local signals keep you out of nearby results." },
      { title: "Ignored Analytics", description: "Without tracking, you can't see what's working or fix what isn't." },
    ],
  },
  approach: {
    eyebrow: "HOW WE SOLVE IT",
    title: "We Build Rankings That",
    highlightedTitle: "Last",
    description:
      "A complete SEO strategy — technical, content, and authority — aimed at the searches that matter.",
    cards: [
      {
        eyebrow: "Foundation",
        title: "Technical Fixes",
        description:
          "Fix crawlability, speed, and structure so Google can index and rank you.",
        metric: "Search-Ready Site",
      },
      {
        eyebrow: "Content",
        title: "Content That Ranks",
        description:
          "Keyword-driven, genuinely useful content mapped to buyer intent.",
        metric: "More Coverage",
      },
      {
        title: "Authority Building",
        description:
          "Quality backlinks and signals that build the trust Google rewards.",
      },
      {
        title: "Tracking & Reporting",
        description:
          "Rank tracking and analytics so growth is measurable and repeatable.",
        tags: ["Technical", "Content", "Links", "Local"],
      },
    ],
  },
  outcomes: {
    eyebrow: "THE OUTCOME",
    title: "Front-Page Visibility",
    highlightedTitle: "That Drives Traffic",
    description:
      "Higher rankings put you in front of buyers at the exact moment they're searching.",
    stats: [
      { value: "+120%", label: "Keyword Rankings" },
      { value: "Page 1", label: "Target Terms" },
      { value: "+85%", label: "Organic Traffic" },
      { value: "+45%", label: "Organic Leads" },
    ],
    leftPill: "Higher Rankings",
    rightPill: "More Traffic",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "SEO That Delivers",
    highlightedTitle: "Real Rankings",
    description:
      "We combine technical, content, and authority into a strategy that compounds over time.",
    items: [
      { title: "Full-Stack SEO", description: "Technical, content, and links handled together." },
      { title: "Intent-Focused", description: "We target the searches your buyers actually make." },
      { title: "White-Hat", description: "Sustainable methods that won't risk penalties." },
      { title: "Transparent", description: "Clear reporting on rankings, traffic, and leads." },
    ],
  },
  faq: {
    title: "Google Rankings",
    highlightedTitle: "Questions",
    description: "Common questions about ranking your business on Google.",
    items: [
      {
        question: "How long does SEO take to work?",
        answer:
          "Early gains can appear within a few months, but meaningful ranking growth typically builds over 4–6 months as technical fixes, content, and authority compound.",
      },
      {
        question: "Can you guarantee page-one rankings?",
        answer:
          "No credible agency guarantees specific positions — Google's algorithm decides. We do commit to a proven strategy and transparent reporting that reliably improves visibility.",
      },
      {
        question: "Do you handle both technical and content SEO?",
        answer:
          "Yes. We cover the full stack — technical foundations, content, authority, and local — because rankings require all of them working together.",
      },
      {
        question: "How do you choose which keywords to target?",
        answer:
          "We research the terms your ideal customers actually search, balancing intent, volume, and difficulty to prioritise the ones that drive real leads.",
      },
    ],
  },
};
