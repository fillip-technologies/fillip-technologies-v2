import type { MarketingContent } from "./types";
import { sharedIndustries, sharedTestimonials } from "./_shared";

export const enterpriseSeoContent: MarketingContent = {
  slug: "enterprise-seo",
  hero: {
    badge: "ENTERPRISE SEO SERVICES",
    title: "SEO That Scales With",
    highlightedTitle: "Your Enterprise",
    description:
      "Grow organic revenue across thousands of pages with scalable SEO strategy, technical architecture and governance built for large sites.",
    searchText: "Enterprise SEO Agency",
    primaryCta: "Get Enterprise Audit",
    secondaryCta: "View Case Studies",
    image: { src: "/images/seo-magnifier.png", alt: "Enterprise SEO Illustration" },
  },
  challenges: {
    badge: "ENTERPRISE SEO CHALLENGES",
    title: "Why Large Sites",
    highlightedTitle: "Stop Growing",
    para1:
      "At scale, small technical and content gaps multiply across thousands of pages — quietly capping the organic growth you should be capturing.",
    para2:
      "Enterprise SEO aligns technology, content and teams so search performance scales predictably as your site and business grow.",
    ctaText: "See How We Scale Organic Growth",
    items: [
      {
        icon: "network",
        title: "Crawl Budget Waste",
        description:
          "Millions of low-value URLs consume crawl budget so important pages are crawled and refreshed less often. Impact: Slower Indexing.",
      },
      {
        icon: "code",
        title: "Template-Level Errors",
        description:
          "A single flawed template propagates SEO issues across every page that uses it. Impact: Site-Wide Ranking Loss.",
      },
      {
        icon: "users",
        title: "Siloed Teams",
        description:
          "SEO, product and engineering working in isolation cause changes that break rankings without warning. Impact: Costly Regressions.",
      },
      {
        icon: "chart",
        title: "No Scalable Reporting",
        description:
          "Without segmented, automated reporting, wins and losses across large sites go unnoticed. Impact: Missed Opportunities.",
      },
    ],
  },
  services: {
    eyebrow: "ENTERPRISE SEO SERVICES",
    title: "Enterprise SEO Solutions",
    highlightedTitle: "Built To Scale",
    description:
      "A governance-led SEO programme that scales strategy, technology and content across large, complex websites.",
    items: [
      {
        number: "01",
        title: "Technical SEO At Scale",
        description: "Crawl, indexation and architecture fixes across large sites.",
        metric: "Crawl Efficiency",
        icon: "bot",
      },
      {
        number: "02",
        title: "Content Strategy",
        description: "Topic clusters and templates that scale organic coverage.",
        metric: "Topical Authority",
        icon: "file",
      },
      {
        number: "03",
        title: "Site Architecture",
        description: "Scalable hierarchy and internal linking for large catalogs.",
        metric: "URL Structure",
        icon: "network",
      },
      {
        number: "04",
        title: "SEO Governance",
        description: "Standards and workflows that prevent ranking regressions.",
        metric: "Change Control",
        icon: "shield",
      },
      {
        number: "05",
        title: "Migration Management",
        description: "Protect rankings through replatforming and redesigns.",
        metric: "Safe Launch",
        icon: "target",
      },
      {
        number: "06",
        title: "Enterprise Reporting",
        description: "Automated, segmented dashboards for stakeholders.",
        metric: "Visibility",
        icon: "chart",
      },
    ],
  },
  issues: {
    badge: "ENTERPRISE SEO AUDIT",
    title: "Scale Blockers",
    highlightedTitle: "We Fix",
    description:
      "Enterprise sites lose growth not from a single issue, but from systemic gaps that compound across thousands of pages and multiple teams.",
    items: [
      {
        number: "01",
        title: "Index Bloat",
        description:
          "Thin, duplicate and parameter URLs flood the index and dilute crawl priority.",
        impact: "Slower Indexing",
      },
      {
        number: "02",
        title: "Template SEO Debt",
        description:
          "Errors baked into shared templates affect every page that uses them.",
        impact: "Site-Wide Impact",
      },
      {
        number: "03",
        title: "Internal Link Gaps",
        description:
          "Poor internal linking strands important pages and weakens authority flow.",
        impact: "Lost Ranking Signals",
      },
      {
        number: "04",
        title: "Content Cannibalization",
        description:
          "Overlapping pages compete for the same terms and split ranking potential.",
        impact: "Reduced Rankings",
      },
      {
        number: "05",
        title: "Migration Risk",
        description:
          "Unmanaged replatforming and redesigns cause avoidable ranking drops.",
        impact: "Traffic Loss",
      },
      {
        number: "06",
        title: "No Governance",
        description:
          "Without SEO standards, well-meaning changes quietly break rankings.",
        impact: "Recurring Regressions",
      },
    ],
  },
  industries: sharedIndustries,
  tools: {
    eyebrow: "TOOLS & PLATFORMS",
    title: "Enterprise SEO Tools",
    highlightedTitle: "We Work With",
    description:
      "We use enterprise-grade crawlers, analytics and monitoring to manage SEO across large, complex websites.",
    items: [
      { name: "Google Search Console", icon: "search" },
      { name: "Google Analytics 4", icon: "chart" },
      { name: "Screaming Frog", icon: "bot" },
      { name: "Botify", icon: "network" },
      { name: "Ahrefs", icon: "link" },
      { name: "Semrush", icon: "activity" },
      { name: "Log File Analysis", icon: "database" },
      { name: "Schema / JSON-LD", icon: "code" },
      { name: "XML Sitemaps", icon: "globe" },
      { name: "BigQuery", icon: "database" },
      { name: "Rank Monitoring", icon: "gauge" },
      { name: "SEO Governance", icon: "shield" },
    ],
  },
  testimonials: sharedTestimonials(
    "See how large organisations scaled organic revenue with governance-led enterprise SEO.",
  ),
  faq: {
    badge: "ENTERPRISE SEO FAQS",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about enterprise SEO strategy, governance and scaling organic growth.",
    items: [
      {
        question: "What is Enterprise SEO?",
        answer:
          "Enterprise SEO is SEO strategy, technology and governance designed to scale organic growth across large, complex websites and teams.",
      },
      {
        question: "How is it different from standard SEO?",
        answer:
          "It emphasises scalability, cross-team workflows, template-level fixes and governance to prevent regressions across thousands of pages.",
      },
      {
        question: "Do you work with our engineering team?",
        answer:
          "Yes. We deliver prioritised, developer-ready specifications and collaborate directly with product and engineering.",
      },
      {
        question: "Can you support a site migration?",
        answer:
          "Yes. We plan and manage migrations end to end to protect rankings through replatforming and redesigns.",
      },
      {
        question: "How do you report at scale?",
        answer:
          "We provide automated, segmented dashboards so stakeholders can track organic performance across the whole site.",
      },
    ],
  },
};
