import type { MarketingContent } from "./types";

export const leadGenerationCampaignsContent: MarketingContent = {
  slug: "lead-generation-campaigns",
  hero: {
    title: "Lead Generation Campaigns That",
    highlightedTitle: "Fill Your Pipeline",
    description:
      "Multi-channel campaigns engineered to generate qualified leads on demand — with the tracking and follow-up to turn them into revenue.",
  },
  capabilities: {
    eyebrow: "WHAT WE BUILD",
    title: "A Predictable Lead",
    highlightedTitle: "Engine",
    description:
      "Offers, funnels, and paid channels working together to deliver a steady flow of qualified leads.",
    cards: [
      {
        eyebrow: "Offer",
        title: "Offer & Funnel Design",
        description:
          "Compelling lead magnets and funnels built to convert cold traffic into leads.",
        metric: "Higher Opt-In",
      },
      {
        eyebrow: "Channels",
        title: "Multi-Channel Ads",
        description:
          "Google, Meta, and more — the right channel mix for your audience and budget.",
        metric: "More Volume",
      },
      {
        title: "Landing Pages & CRO",
        description:
          "High-converting landing pages and continuous testing to lower cost per lead.",
      },
      {
        title: "Nurture & Follow-Up",
        description:
          "Email and message sequences plus CRM handoff so no lead is wasted.",
        tags: ["Funnels", "Paid Ads", "CRO", "Nurture"],
      },
    ],
  },
  process: {
    title: "Our Lead Gen",
    highlightedTitle: "Process",
    description:
      "A full-funnel workflow that builds, measures, and scales a reliable lead engine.",
    steps: [
      { title: "Strategy", items: ["ICP", "Offer", "Channels", "Targets"] },
      { title: "Build", items: ["Funnels", "Landing Pages", "Ads", "Tracking"] },
      { title: "Launch", items: ["Campaigns", "Forms", "Automation", "Routing"] },
      { title: "Scale", items: ["CRO Tests", "Budget", "Nurture", "Reporting"] },
    ],
  },
  results: {
    eyebrow: "LEAD GEN OUTCOMES",
    title: "Qualified Leads,",
    highlightedTitle: "On Demand",
    description:
      "A measured lead engine gives you predictable pipeline you can turn up or down.",
    stats: [
      { value: "+120%", label: "Lead Volume" },
      { value: "-40%", label: "Cost Per Lead" },
      { value: "+55%", label: "Lead Quality" },
      { value: "+35%", label: "Close Rate" },
    ],
    leftPill: "More Leads",
    rightPill: "Lower Cost",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Lead Gen That's Built To",
    highlightedTitle: "Scale",
    description:
      "We focus on qualified leads and cost per acquisition — not just form fills that go nowhere.",
    items: [
      { title: "Quality-Focused", description: "We optimise for leads that actually close, not vanity volume." },
      { title: "Full-Funnel", description: "Offer, ads, landing pages, and nurture built to work together." },
      { title: "Tracking-First", description: "Proper attribution so you know what's really driving pipeline." },
      { title: "Scalable", description: "A repeatable engine you can dial up as you grow." },
    ],
  },
  faq: {
    title: "Lead Generation",
    highlightedTitle: "Questions",
    description: "Common questions about lead generation campaigns with Fillip Technologies.",
    items: [
      {
        question: "Which channels do you use?",
        answer:
          "We choose the mix that fits your audience and economics — commonly Google and Meta, plus landing pages, email nurture, and sometimes WhatsApp or LinkedIn.",
      },
      {
        question: "How do you ensure lead quality?",
        answer:
          "Through targeted offers, qualifying questions, and optimising to down-funnel signals like qualified leads and closed deals — not just form submissions.",
      },
      {
        question: "Do you handle follow-up?",
        answer:
          "We build the nurture sequences and CRM handoff so leads are contacted fast and consistently, which is often where most pipeline is won or lost.",
      },
      {
        question: "How quickly can we get leads?",
        answer:
          "Paid campaigns can generate leads within days of launch; we then optimise over the following weeks to improve quality and lower cost per lead.",
      },
    ],
  },
};
