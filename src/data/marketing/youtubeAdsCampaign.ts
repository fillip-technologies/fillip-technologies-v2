import type { MarketingContent } from "./types";

export const youtubeAdsCampaignContent: MarketingContent = {
  slug: "youtube-ads-campaign",
  hero: {
    title: "YouTube Ads That Build",
    highlightedTitle: "Demand & Drive Action",
    description:
      "Video campaigns that reach the right audience at scale — from awareness to conversion — with creative built for the platform.",
  },
  capabilities: {
    eyebrow: "WHAT WE RUN",
    title: "Video Campaigns That",
    highlightedTitle: "Deliver",
    description:
      "Full-funnel YouTube advertising, from skippable in-stream to action-driving demand-gen.",
    cards: [
      {
        eyebrow: "Awareness",
        title: "In-Stream & Bumper",
        description:
          "Reach and frequency campaigns that put your brand in front of the right viewers.",
        metric: "Efficient Reach",
      },
      {
        eyebrow: "Action",
        title: "Video Action Campaigns",
        description:
          "Conversion-focused video that drives clicks, leads, and sales at scale.",
        metric: "More Conversions",
      },
      {
        title: "Audience Targeting",
        description:
          "Intent, affinity, and custom audiences that reach viewers likely to act.",
      },
      {
        title: "Creative & Scripting",
        description:
          "Hooks and story structure built for the first five seconds that matter most.",
        tags: ["In-Stream", "Bumper", "VAC"],
      },
    ],
  },
  process: {
    title: "Our YouTube Ads",
    highlightedTitle: "Process",
    description:
      "A creative-led video process that pairs the right message with the right audience.",
    steps: [
      { title: "Plan", items: ["Goals", "Audiences", "Funnel", "Messaging"] },
      { title: "Create", items: ["Scripts", "Hooks", "Edits", "Variants"] },
      { title: "Launch", items: ["Targeting", "Bidding", "Placements", "Tracking"] },
      { title: "Optimise", items: ["Creative Tests", "Audiences", "Budget", "Reporting"] },
    ],
  },
  results: {
    eyebrow: "YOUTUBE ADS OUTCOMES",
    title: "Video That Moves",
    highlightedTitle: "The Needle",
    description:
      "The right video in front of the right audience builds brand and drives measurable action.",
    stats: [
      { value: "-45%", label: "Cost Per View" },
      { value: "+70%", label: "View-Through Rate" },
      { value: "+50%", label: "Branded Search" },
      { value: "+35%", label: "Conversions" },
    ],
    leftPill: "More Reach",
    rightPill: "More Action",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "YouTube Ads Built On",
    highlightedTitle: "Strong Creative",
    description:
      "Video performance lives or dies on the first few seconds — that's where we focus.",
    items: [
      { title: "Hook-Driven", description: "We script for the opening seconds that decide performance." },
      { title: "Full-Funnel", description: "Awareness to action, mapped to the right campaign types." },
      { title: "Audience-Smart", description: "Intent and custom audiences that reach likely buyers." },
      { title: "Measured", description: "We track view-through, branded lift, and conversions." },
    ],
  },
  faq: {
    title: "YouTube Ads",
    highlightedTitle: "Questions",
    description: "Common questions about YouTube ad campaigns with Fillip Technologies.",
    items: [
      {
        question: "Do we need a professional video?",
        answer:
          "Not always. We can script and edit effective ads from existing footage or lightweight production — what matters most is a strong hook and clear message.",
      },
      {
        question: "Is YouTube good for direct response?",
        answer:
          "Yes. Video Action Campaigns are built for conversions, and combined with strong creative they can drive leads and sales, not just awareness.",
      },
      {
        question: "How is YouTube different from Google Search ads?",
        answer:
          "Search captures existing demand; YouTube creates it. It's ideal for reaching new audiences and building brand while still driving action.",
      },
      {
        question: "How do you measure success?",
        answer:
          "Depending on the goal, we track cost per view, view-through rate, branded search lift, and conversions from video.",
      },
    ],
  },
};
