import type { MarketingContent } from "./types";

export const enterpriseSeoContent: MarketingContent = {
  slug: "enterprise-seo",
  hero: {
    title: "Enterprise SEO That Scales",
    highlightedTitle: "Organic At Volume",
    description:
      "SEO strategy, automation, and governance for large sites — capturing demand across thousands of pages without breaking what already works.",
  },
  capabilities: {
    eyebrow: "WHAT WE OPTIMISE",
    title: "SEO Built For",
    highlightedTitle: "Scale & Complexity",
    description:
      "Programmatic templates, workflows, and governance that make SEO repeatable across huge sites.",
    cards: [
      {
        eyebrow: "Scale",
        title: "Programmatic SEO",
        description:
          "Template-driven pages that capture long-tail demand across thousands of queries.",
        metric: "Long-Tail At Scale",
      },
      {
        eyebrow: "Governance",
        title: "SEO Governance",
        description:
          "Standards, QA, and workflows that keep SEO healthy across large, multi-team sites.",
        metric: "Fewer Regressions",
      },
      {
        title: "Content Strategy",
        description:
          "Topic clusters and editorial systems that build topical authority at volume.",
      },
      {
        title: "Migrations & Platforms",
        description:
          "Risk-managed replatforming and migrations that protect existing rankings.",
        tags: ["Programmatic", "Governance", "Migrations"],
      },
    ],
  },
  process: {
    title: "Our Enterprise SEO",
    highlightedTitle: "Process",
    description:
      "A strategic, governance-led approach that scales SEO without introducing risk.",
    steps: [
      { title: "Assess", items: ["Site Audit", "Opportunity Sizing", "Stakeholders", "Roadmap"] },
      { title: "Strategise", items: ["Topic Clusters", "Templates", "Standards", "Prioritisation"] },
      { title: "Execute", items: ["Programmatic", "Content", "Technical", "Internal Links"] },
      { title: "Govern", items: ["QA", "Monitoring", "Reporting", "Iteration"] },
    ],
  },
  results: {
    eyebrow: "ENTERPRISE SEO OUTCOMES",
    title: "Compounding Organic",
    highlightedTitle: "Growth At Scale",
    description:
      "Systemised SEO turns a large site into a durable, compounding acquisition channel.",
    stats: [
      { value: "+150%", label: "Indexed Pages" },
      { value: "+70%", label: "Organic Revenue" },
      { value: "+45%", label: "Keyword Coverage" },
      { value: "-30%", label: "SEO Debt" },
    ],
    leftPill: "Scalable",
    rightPill: "Governed",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "SEO That Scales",
    highlightedTitle: "Without Chaos",
    description:
      "We bring the strategy and governance large organisations need to grow organic safely.",
    items: [
      { title: "Governance-Led", description: "Standards and QA that keep big sites healthy." },
      { title: "Programmatic Expertise", description: "We capture long-tail demand at real scale." },
      { title: "Migration-Safe", description: "Replatforming and migrations without ranking loss." },
      { title: "Cross-Team Ready", description: "We work with your dev, content, and product teams." },
    ],
  },
  faq: {
    title: "Enterprise SEO",
    highlightedTitle: "Questions",
    description: "Common questions about enterprise SEO with Fillip Technologies.",
    items: [
      {
        question: "What makes enterprise SEO different?",
        answer:
          "Scale and complexity. It's about templates, automation, governance, and cross-team workflows — not one-off page tweaks — so SEO stays healthy across thousands of pages.",
      },
      {
        question: "Can you handle a site migration?",
        answer:
          "Yes. We run risk-managed migrations and replatforming with redirect mapping and monitoring to protect existing rankings.",
      },
      {
        question: "What is programmatic SEO?",
        answer:
          "Generating large numbers of high-quality, template-driven pages to capture long-tail search demand — done well, with quality controls to avoid thin content.",
      },
      {
        question: "How do you report at enterprise scale?",
        answer:
          "We build dashboards segmented by section, template, and team so stakeholders see the metrics that matter to them.",
      },
    ],
  },
};
