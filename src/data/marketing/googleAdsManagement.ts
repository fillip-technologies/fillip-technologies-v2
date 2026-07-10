import type { MarketingContent } from "./types";

export const googleAdsManagementContent: MarketingContent = {
  slug: "google-ads-management",
  hero: {
    title: "Google Ads Management That",
    highlightedTitle: "Turns Spend Into Profit",
    description:
      "Search, Shopping, and Performance Max campaigns engineered for ROAS — capturing high-intent buyers the moment they're ready.",
  },
  capabilities: {
    eyebrow: "WHAT WE RUN",
    title: "Campaigns Built To",
    highlightedTitle: "Convert",
    description:
      "Full-funnel Google Ads management focused on qualified conversions, not just clicks.",
    cards: [
      {
        eyebrow: "Search",
        title: "Search Campaigns",
        description:
          "Intent-driven keyword campaigns that capture buyers actively searching for you.",
        metric: "High-Intent Traffic",
      },
      {
        eyebrow: "Shopping",
        title: "Shopping & PMax",
        description:
          "Feed-optimised Shopping and Performance Max campaigns that scale profitable sales.",
        metric: "Better ROAS",
      },
      {
        title: "Conversion Tracking",
        description:
          "Accurate tracking and offline conversions so you optimise to real revenue.",
      },
      {
        title: "Landing & CRO",
        description:
          "Landing page and creative testing that lifts conversion rate on the traffic you pay for.",
        tags: ["Search", "Shopping", "PMax", "CRO"],
      },
    ],
  },
  process: {
    title: "Our Google Ads",
    highlightedTitle: "Process",
    description:
      "A data-driven management cycle that continuously improves cost per acquisition.",
    steps: [
      { title: "Audit", items: ["Account Review", "Tracking Check", "Competitors", "Goals"] },
      { title: "Build", items: ["Structure", "Keywords", "Creatives", "Tracking"] },
      { title: "Optimise", items: ["Bids", "Search Terms", "A/B Tests", "Feeds"] },
      { title: "Scale", items: ["Budget Shifts", "New Campaigns", "Reporting", "Iteration"] },
    ],
  },
  results: {
    eyebrow: "GOOGLE ADS OUTCOMES",
    title: "Spend That Works",
    highlightedTitle: "Harder",
    description:
      "Tight management turns wasted budget into predictable, profitable acquisition.",
    stats: [
      { value: "+3.8x", label: "Average ROAS" },
      { value: "-35%", label: "Cost Per Lead" },
      { value: "+55%", label: "Conversion Rate" },
      { value: "-40%", label: "Wasted Spend" },
    ],
    leftPill: "Lower CPA",
    rightPill: "Higher ROAS",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Google Ads Managed For",
    highlightedTitle: "Profit, Not Clicks",
    description:
      "We optimise to revenue and CPA — the numbers that actually grow your business.",
    items: [
      { title: "ROAS-Focused", description: "Every decision is measured against profit, not vanity clicks." },
      { title: "Tracking-First", description: "We fix measurement so optimisation is based on truth." },
      { title: "Transparent", description: "Clear reporting on spend, results, and what we changed and why." },
      { title: "Always Testing", description: "Continuous creative and landing tests compound results." },
    ],
  },
  faq: {
    title: "Google Ads",
    highlightedTitle: "Questions",
    description: "Common questions about Google Ads management with Fillip Technologies.",
    items: [
      {
        question: "What budget do we need to start?",
        answer:
          "It depends on your market and goals, but we'll recommend a starting budget that gathers enough conversion data to optimise while staying within your targets.",
      },
      {
        question: "How soon will we see results?",
        answer:
          "Traffic starts immediately; profitable performance typically stabilises within 4–8 weeks as the campaigns gather data and we optimise.",
      },
      {
        question: "Do you handle Shopping and Performance Max?",
        answer:
          "Yes. We manage Search, Shopping, Performance Max, and remarketing, with feed optimisation for e-commerce accounts.",
      },
      {
        question: "Who owns the ad account?",
        answer:
          "You do. We work in your account with full transparency, so you keep all history and access.",
      },
    ],
  },
};
