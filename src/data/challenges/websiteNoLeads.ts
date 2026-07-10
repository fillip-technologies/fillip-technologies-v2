import type { ChallengeContent } from "./types";

export const websiteNoLeadsContent: ChallengeContent = {
  slug: "website-not-generating-leads",
  hero: {
    title: "Your Website Gets Traffic But",
    highlightedTitle: "Generates No Leads",
    description:
      "A beautiful site that doesn't convert is just an expensive brochure. We turn your website into a lead-generating asset that actually drives enquiries.",
  },
  problem: {
    eyebrow: "The Problem",
    title: "Why Your Website Isn't",
    highlightedTitle: "Converting Visitors",
    description:
      "Most sites lose leads to unclear messaging, weak calls to action, friction, and slow performance.",
    secondaryDescription:
      "We diagnose exactly where visitors drop off and rebuild the journey so more of them become enquiries.",
    cta: "Fix My Website's Conversions",
    items: [
      { title: "Unclear Messaging", description: "Visitors can't tell what you do or why to choose you within seconds." },
      { title: "Weak Calls To Action", description: "No clear next step, so interested visitors simply leave." },
      { title: "Too Much Friction", description: "Long forms and confusing navigation kill conversions." },
      { title: "Slow Load Times", description: "Every extra second of load time drops conversion rate." },
      { title: "No Trust Signals", description: "Missing proof, reviews, and guarantees make visitors hesitate." },
      { title: "Not Mobile-Optimised", description: "A poor mobile experience loses most of your traffic." },
    ],
  },
  approach: {
    eyebrow: "HOW WE SOLVE IT",
    title: "We Turn Your Site Into A",
    highlightedTitle: "Lead Machine",
    description:
      "A conversion-focused overhaul of messaging, layout, speed, and trust — measured end to end.",
    cards: [
      {
        eyebrow: "Clarity",
        title: "Sharp Messaging",
        description:
          "A clear value proposition and story so visitors instantly get why you're the right choice.",
        metric: "Clearer Value",
      },
      {
        eyebrow: "Conversion",
        title: "Optimised Journeys",
        description:
          "Strong CTAs, simplified forms, and frictionless paths from landing to enquiry.",
        metric: "Higher Conversion",
      },
      {
        title: "Speed & UX",
        description:
          "Fast, mobile-first pages that keep visitors engaged and moving forward.",
      },
      {
        title: "Trust & Proof",
        description:
          "Reviews, case studies, and guarantees placed where they overcome hesitation.",
        tags: ["Copy", "CTAs", "Speed", "Trust"],
      },
    ],
  },
  outcomes: {
    eyebrow: "THE OUTCOME",
    title: "A Website That Actually",
    highlightedTitle: "Drives Enquiries",
    description:
      "Conversion-focused changes turn your existing traffic into a steady flow of leads.",
    stats: [
      { value: "+65%", label: "Conversion Rate" },
      { value: "+90%", label: "Form Submissions" },
      { value: "-40%", label: "Bounce Rate" },
      { value: "2x", label: "Qualified Leads" },
    ],
    leftPill: "More Enquiries",
    rightPill: "Same Traffic",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "We Fix Conversions,",
    highlightedTitle: "Not Just Looks",
    description:
      "We optimise for enquiries and revenue — the outcome you actually care about.",
    items: [
      { title: "Conversion-Led", description: "Every change is measured against leads generated." },
      { title: "Evidence-Based", description: "We use analytics and testing to find real drop-off points." },
      { title: "Fast Turnaround", description: "High-impact fixes shipped quickly, not months later." },
      { title: "Full-Journey", description: "From ad click to enquiry, we optimise the whole path." },
    ],
  },
  faq: {
    title: "Website Leads",
    highlightedTitle: "Questions",
    description: "Common questions about turning your website into a lead generator.",
    items: [
      {
        question: "Do you rebuild the whole site or just optimise it?",
        answer:
          "It depends on the diagnosis. Often targeted conversion fixes to messaging, CTAs, speed, and trust deliver most of the gains; sometimes a fuller redesign is the better investment. We'll recommend the highest-ROI path.",
      },
      {
        question: "How do you know what's stopping conversions?",
        answer:
          "We analyse your analytics, heatmaps, and user journeys to pinpoint exactly where visitors drop off, then prioritise the fixes with the biggest impact.",
      },
      {
        question: "How quickly will we see more leads?",
        answer:
          "High-impact fixes can lift conversions within weeks; we then keep testing to compound the results over time.",
      },
      {
        question: "Will this work with our existing traffic?",
        answer:
          "Yes. The goal is to convert more of the visitors you already get — so you generate more leads without spending more on traffic.",
      },
    ],
  },
};
