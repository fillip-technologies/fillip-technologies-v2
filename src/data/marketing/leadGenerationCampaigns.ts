import type { MarketingContent } from "./types";
import { sharedIndustries, sharedTestimonials } from "./_shared";

export const leadGenerationCampaignsContent: MarketingContent = {
  slug: "lead-generation-campaigns",
  hero: {
    badge: "LEAD GENERATION CAMPAIGNS",
    title: "Predictable Pipelines Of",
    highlightedTitle: "Qualified Leads",
    description:
      "Fill your sales pipeline with high-quality, sales-ready leads through multi-channel campaigns built to convert and scale.",
    searchText: "Lead Generation Agency",
    primaryCta: "Get Free Strategy Call",
    secondaryCta: "View Case Studies",
    image: { src: "/images/seo-magnifier.png", alt: "Lead Generation Illustration" },
  },
  challenges: {
    badge: "LEAD GENERATION CHALLENGES",
    title: "Why Your Pipeline",
    highlightedTitle: "Runs Dry",
    para1:
      "Inconsistent, low-quality leads make revenue unpredictable and leave your sales team chasing prospects who never buy.",
    para2:
      "A structured lead generation system aligns targeting, offers, funnels and follow-up to deliver a steady flow of qualified leads.",
    ctaText: "See How We Build Predictable Pipelines",
    items: [
      {
        icon: "target",
        title: "Low-Quality Leads",
        description:
          "Broad campaigns attract tyre-kickers who drain sales time without converting. Impact: Wasted Effort.",
      },
      {
        icon: "click",
        title: "Weak Offers",
        description:
          "Without a compelling reason to act, prospects browse and leave without converting. Impact: Low Conversion Rate.",
      },
      {
        icon: "zap",
        title: "No Follow-Up System",
        description:
          "Leads that aren't nurtured quickly go cold and buy from a faster competitor. Impact: Lost Revenue.",
      },
      {
        icon: "chart",
        title: "No Attribution",
        description:
          "Without tracking, you can't tell which channels and campaigns actually drive sales. Impact: Blind Spending.",
      },
    ],
  },
  services: {
    eyebrow: "LEAD GENERATION SERVICES",
    title: "Lead Generation Campaigns",
    highlightedTitle: "That Fill Pipelines",
    description:
      "Multi-channel lead generation that combines targeting, offers, funnels and follow-up into a predictable growth engine.",
    items: [
      {
        number: "01",
        title: "Offer & Funnel Strategy",
        description: "Compelling offers and funnels engineered to convert.",
        metric: "Conversion Path",
        icon: "target",
      },
      {
        number: "02",
        title: "Multi-Channel Ads",
        description: "Google, Meta and more, aligned to one lead strategy.",
        metric: "Reach",
        icon: "megaphone",
      },
      {
        number: "03",
        title: "Landing Pages & CRO",
        description: "High-converting pages and forms that capture more leads.",
        metric: "Higher Conversions",
        icon: "click",
      },
      {
        number: "04",
        title: "Lead Qualification",
        description: "Scoring and routing so sales focuses on ready buyers.",
        metric: "Sales-Ready",
        icon: "check",
      },
      {
        number: "05",
        title: "Nurture & Automation",
        description: "Email and message flows that convert and re-engage.",
        metric: "Nurture",
        icon: "zap",
      },
      {
        number: "06",
        title: "Tracking & Reporting",
        description: "Full attribution from click to lead to closed revenue.",
        metric: "Visibility",
        icon: "chart",
      },
    ],
  },
  issues: {
    badge: "LEAD GENERATION AUDIT",
    title: "Pipeline Leaks",
    highlightedTitle: "We Fix",
    description:
      "Most lead gen underperforms because targeting, offers, follow-up and tracking aren't connected into one converting system.",
    items: [
      {
        number: "01",
        title: "Wrong Targeting",
        description:
          "Reaching poorly matched audiences fills the funnel with unqualified leads.",
        impact: "High Cost Per Lead",
      },
      {
        number: "02",
        title: "Weak Offer",
        description:
          "No clear, valuable reason to act suppresses opt-in and conversion rates.",
        impact: "Low Conversion Rate",
      },
      {
        number: "03",
        title: "Leaky Landing Pages",
        description:
          "Unfocused pages and long forms lose interested prospects.",
        impact: "Lost Leads",
      },
      {
        number: "04",
        title: "No Qualification",
        description:
          "Passing every lead to sales wastes time on prospects who won't buy.",
        impact: "Low Sales Efficiency",
      },
      {
        number: "05",
        title: "No Nurture",
        description:
          "Leads that aren't followed up quickly go cold and lost.",
        impact: "Missed Revenue",
      },
      {
        number: "06",
        title: "No Attribution",
        description:
          "Without tracking, budget can't be shifted to what actually converts.",
        impact: "Blind Optimisation",
      },
    ],
  },
  industries: sharedIndustries,
  tools: {
    eyebrow: "TOOLS & PLATFORMS",
    title: "Lead Generation Tools",
    highlightedTitle: "We Work With",
    description:
      "We combine advertising, landing page, automation and analytics platforms to build predictable lead generation engines.",
    items: [
      { name: "Google Ads", icon: "target" },
      { name: "Meta Ads Manager", icon: "megaphone" },
      { name: "Landing Page Builders", icon: "click" },
      { name: "CRM Integration", icon: "database" },
      { name: "Marketing Automation", icon: "zap" },
      { name: "Google Analytics 4", icon: "chart" },
      { name: "Google Tag Manager", icon: "code" },
      { name: "Lead Scoring", icon: "check" },
      { name: "Email / WhatsApp Nurture", icon: "activity" },
      { name: "A/B Testing", icon: "gauge" },
      { name: "Audience Manager", icon: "users" },
      { name: "Attribution Reporting", icon: "network" },
    ],
  },
  testimonials: sharedTestimonials(
    "See how businesses built predictable pipelines of qualified, sales-ready leads with our campaigns.",
  ),
  faq: {
    badge: "LEAD GENERATION FAQS",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about lead generation campaigns and pipeline growth.",
    items: [
      {
        question: "What channels do you use for lead generation?",
        answer:
          "We build multi-channel campaigns across Google, Meta, WhatsApp and more, unified by a single lead strategy.",
      },
      {
        question: "How do you ensure lead quality?",
        answer:
          "Through precise targeting, strong offers and qualification steps that route only sales-ready leads to your team.",
      },
      {
        question: "Do you build the landing pages?",
        answer:
          "Yes. We design and optimise high-converting landing pages and forms as part of the campaign.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We track cost per lead, lead quality and closed revenue with full attribution from click to sale.",
      },
      {
        question: "How soon will I get leads?",
        answer:
          "Campaigns can generate leads within the first days, with quality and cost improving as we optimise.",
      },
    ],
  },
};
