import type { MarketingContent } from "./types";

export const metaAdsManagementContent: MarketingContent = {
  slug: "meta-ads-management",
  hero: {
    title: "Facebook & Instagram Ads That",
    highlightedTitle: "Stop The Scroll",
    description:
      "Creative-led Meta advertising that builds demand and drives sales — from thumb-stopping hooks to full-funnel retargeting.",
  },
  capabilities: {
    eyebrow: "WHAT WE RUN",
    title: "Meta Campaigns That",
    highlightedTitle: "Perform",
    description:
      "Full-funnel Facebook and Instagram advertising powered by creative that actually converts.",
    cards: [
      {
        eyebrow: "Creative",
        title: "Ad Creative & Hooks",
        description:
          "Scroll-stopping video and static creative built around angles that sell.",
        metric: "Higher CTR",
      },
      {
        eyebrow: "Funnel",
        title: "Full-Funnel Strategy",
        description:
          "Prospecting, engagement, and retargeting that move cold audiences to buyers.",
        metric: "Lower CPA",
      },
      {
        title: "Audience & Targeting",
        description:
          "Broad, lookalike, and interest testing tuned to the algorithm's strengths.",
      },
      {
        title: "Tracking & CAPI",
        description:
          "Pixel and Conversions API setup so you optimise on accurate signal.",
        tags: ["Prospecting", "Retargeting", "CAPI"],
      },
    ],
  },
  process: {
    title: "Our Meta Ads",
    highlightedTitle: "Process",
    description:
      "A creative-and-data cycle that finds winners fast and scales them profitably.",
    steps: [
      { title: "Audit", items: ["Account Review", "Pixel Check", "Creative Audit", "Goals"] },
      { title: "Create", items: ["Angles", "Video & Static", "Copy", "Landing Pages"] },
      { title: "Test", items: ["Audiences", "Creatives", "Offers", "Placements"] },
      { title: "Scale", items: ["Winners", "Budget", "Retargeting", "Reporting"] },
    ],
  },
  results: {
    eyebrow: "META ADS OUTCOMES",
    title: "Creative That Turns Into",
    highlightedTitle: "Revenue",
    description:
      "Great creative plus tight optimisation makes paid social a reliable growth channel.",
    stats: [
      { value: "+4.2x", label: "Average ROAS" },
      { value: "-38%", label: "Cost Per Purchase" },
      { value: "+60%", label: "Click-Through Rate" },
      { value: "+45%", label: "New Customers" },
    ],
    leftPill: "Better Creative",
    rightPill: "Lower CPA",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Paid Social Built On",
    highlightedTitle: "Creative That Sells",
    description:
      "On Meta, creative is the biggest lever — and it's where we focus to drive your results.",
    items: [
      { title: "Creative-Led", description: "We produce the hooks and angles that actually convert." },
      { title: "Full-Funnel", description: "Prospecting to retargeting, engineered to work together." },
      { title: "Signal-Accurate", description: "Proper CAPI and tracking so optimisation is reliable." },
      { title: "Rapid Testing", description: "We find winners fast and scale them with discipline." },
    ],
  },
  faq: {
    title: "Facebook & Instagram Ads",
    highlightedTitle: "Questions",
    description: "Common questions about Meta ads management with Fillip Technologies.",
    items: [
      {
        question: "Do you produce the ad creative?",
        answer:
          "Yes. Creative is the biggest driver of performance on Meta, so we develop the angles, scripts, and video/static assets your campaigns need.",
      },
      {
        question: "What's a realistic ROAS?",
        answer:
          "It varies by margin, offer, and market. We set targets against your economics and optimise toward profitable, scalable returns rather than a one-size number.",
      },
      {
        question: "Can you fix our tracking?",
        answer:
          "Yes. We set up the Pixel and Conversions API correctly so Meta optimises on accurate data — often the fastest performance win.",
      },
      {
        question: "How much creative do you test?",
        answer:
          "We run continuous creative testing — new hooks and formats regularly — because creative fatigue is the main reason paid social performance drops.",
      },
    ],
  },
};
