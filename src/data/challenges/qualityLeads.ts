import type { ChallengeContent } from "./types";

export const qualityLeadsContent: ChallengeContent = {
  slug: "generate-quality-leads",
  hero: {
    title: "You Get Leads But They're",
    highlightedTitle: "Not The Right Ones",
    description:
      "Chasing unqualified leads wastes your sales team's time. We fix your targeting, offers, and qualification so you attract buyers who actually convert.",
  },
  problem: {
    eyebrow: "The Problem",
    title: "Why Your Leads Aren't",
    highlightedTitle: "Sales-Ready",
    description:
      "Poor targeting, generic offers, and no qualification flood your pipeline with people who never buy.",
    secondaryDescription:
      "We re-focus your marketing on your ideal customer and build qualification in from the first touch.",
    cta: "Get Better Quality Leads",
    items: [
      { title: "Broad Targeting", description: "Reaching everyone means attracting the wrong people." },
      { title: "Generic Offers", description: "Offers that don't speak to a real buyer pull tyre-kickers." },
      { title: "No Qualification", description: "Every lead looks the same, so sales wastes time on dead ends." },
      { title: "Wrong Channels", description: "Spending where your buyers aren't brings low-intent traffic." },
      { title: "Price-Only Attraction", description: "Discount-led messaging attracts bargain hunters, not loyal customers." },
      { title: "Weak Follow-Up", description: "Good leads go cold without fast, relevant follow-up." },
    ],
  },
  approach: {
    eyebrow: "HOW WE SOLVE IT",
    title: "We Attract Buyers,",
    highlightedTitle: "Not Just Clicks",
    description:
      "Sharper targeting, better offers, and built-in qualification that fill your pipeline with the right people.",
    cards: [
      {
        eyebrow: "Targeting",
        title: "Ideal-Customer Focus",
        description:
          "We define your best-fit buyer and aim every campaign squarely at them.",
        metric: "Better-Fit Leads",
      },
      {
        eyebrow: "Offers",
        title: "Compelling Offers",
        description:
          "Offers designed to attract serious buyers, not freebie seekers.",
        metric: "Higher Intent",
      },
      {
        title: "Built-In Qualification",
        description:
          "Forms and flows that qualify leads before they reach your sales team.",
      },
      {
        title: "Smart Follow-Up",
        description:
          "Nurture and scoring that prioritise the leads most likely to close.",
        tags: ["ICP", "Offers", "Qualification", "Nurture"],
      },
    ],
  },
  outcomes: {
    eyebrow: "THE OUTCOME",
    title: "A Pipeline Full Of",
    highlightedTitle: "Real Buyers",
    description:
      "Better quality leads mean higher close rates and a sales team that spends time where it counts.",
    stats: [
      { value: "+55%", label: "Lead Quality" },
      { value: "+40%", label: "Close Rate" },
      { value: "-35%", label: "Wasted Sales Time" },
      { value: "+30%", label: "Deal Size" },
    ],
    leftPill: "Better Fit",
    rightPill: "Higher Close",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "We Optimise For",
    highlightedTitle: "Quality, Not Volume",
    description:
      "More leads isn't the goal — more of the right leads is. That's what we build for.",
    items: [
      { title: "Buyer-Focused", description: "We target and qualify for your best-fit customers." },
      { title: "Offer-Driven", description: "Offers engineered to attract serious intent." },
      { title: "Sales-Aligned", description: "We define 'qualified' with your sales team, not in a vacuum." },
      { title: "Measured On Deals", description: "We optimise to closed revenue, not form fills." },
    ],
  },
  faq: {
    title: "Lead Quality",
    highlightedTitle: "Questions",
    description: "Common questions about generating higher-quality leads.",
    items: [
      {
        question: "Won't tighter targeting reduce our lead volume?",
        answer:
          "Volume may narrow, but quality rises — and so does your close rate and ROI. The goal is more revenue from better-fit leads, not more low-intent form fills.",
      },
      {
        question: "How do you define a 'quality' lead?",
        answer:
          "We define it with your sales team based on fit, intent, and budget, then build qualification into forms, offers, and scoring so those criteria are met earlier.",
      },
      {
        question: "Can you work with our existing channels?",
        answer:
          "Yes. We audit where your best customers actually come from and shift focus and budget toward the channels and offers that attract them.",
      },
      {
        question: "Do you help with follow-up too?",
        answer:
          "Yes. We set up nurture and lead scoring so your team focuses first on the leads most likely to convert.",
      },
    ],
  },
};
