import type { MarketingContent } from "./types";

export const technicalSeoContent: MarketingContent = {
  slug: "technical-seo",
  hero: {
    badge: "TECHNICAL SEO SERVICES",
    title: "Technical SEO That Builds A",
    highlightedTitle: "Foundation To Rank",
    description:
      "We fix the crawlability, speed, and structure issues holding your site back — so search engines can find, understand, and rank every page.",
    searchText: "Best Technical SEO Agency Near Me",
    primaryCta: "Get Free SEO Audit",
    secondaryCta: "View Case Studies",
    image: { src: "/images/seo-magnifier.png", alt: "Technical SEO Illustration" },
  },
  challenges: {
    badge: "TECHNICAL SEO CHALLENGES",
    title: "Why Your Website",
    highlightedTitle: "Isn't Ranking",
    para1:
      "Even great content cannot rank if search engines struggle to crawl, index, and understand your website correctly.",
    para2:
      "Technical SEO helps remove the barriers that stop important pages from being discovered, indexed, and trusted by search engines.",
    ctaText: "See How We Solve These Challenges",
    items: [
      {
        icon: "bot",
        title: "Crawlability Issues",
        description:
          "Search engines cannot efficiently discover important pages because of poor site architecture, broken internal linking, crawl restrictions, and technical barriers. Impact: Reduced Search Visibility.",
      },
      {
        icon: "search-x",
        title: "Indexing Problems",
        description:
          "Critical pages remain absent from search results due to duplicate URLs, noindex errors, incorrect canonicals, and indexing issues. Impact: Missing Search Traffic.",
      },
      {
        icon: "gauge",
        title: "Slow Site Performance",
        description:
          "Poor Core Web Vitals and slow loading experiences negatively impact rankings, engagement, conversions, and overall user satisfaction. Impact: Lower Rankings.",
      },
      {
        icon: "triangle-alert",
        title: "Technical SEO Errors",
        description:
          "Redirect chains, schema issues, broken links, duplicate content, and technical mistakes weaken website authority and search performance. Impact: Lost Organic Growth.",
      },
    ],
  },
  services: {
    eyebrow: "TECHNICAL SEO SERVICES",
    title: "Technical SEO Solutions",
    highlightedTitle: "For Sustainable Growth",
    description:
      "Premium technical SEO execution built for faster crawling, cleaner indexing, stronger site structure and long-term organic growth.",
    items: [
      {
        number: "01",
        title: "Technical SEO Audit",
        description: "Find crawl, indexation, performance and structure issues.",
        metric: "SEO Health",
        icon: "search",
      },
      {
        number: "02",
        title: "Core Web Vitals",
        description: "Improve speed, responsiveness and visual stability.",
        metric: "LCP • INP • CLS",
        icon: "gauge",
      },
      {
        number: "03",
        title: "Crawl & Indexation",
        description: "Help search engines crawl and index important pages.",
        metric: "Crawl Flow",
        icon: "bot",
      },
      {
        number: "04",
        title: "Schema Markup",
        description: "Add structured data for rich result eligibility.",
        metric: "JSON-LD",
        icon: "code",
      },
      {
        number: "05",
        title: "Site Architecture",
        description: "Create scalable hierarchy and internal linking.",
        metric: "URL Structure",
        icon: "network",
      },
      {
        number: "06",
        title: "SEO Migration Support",
        description: "Protect rankings during redesigns and migrations.",
        metric: "Safe Launch",
        icon: "shield",
      },
    ],
  },
  issues: {
    badge: "TECHNICAL SEO AUDIT",
    title: "Hidden Technical",
    highlightedTitle: "Issues We Fix",
    description:
      "Many websites lose rankings not because of content quality, but because technical SEO issues prevent search engines from properly crawling, indexing and evaluating the site.",
    items: [
      {
        number: "01",
        title: "Crawlability Problems",
        description:
          "Broken internal links, orphan pages, crawl restrictions and poor architecture prevent search engines from discovering important content.",
        impact: "Poor Search Discovery",
      },
      {
        number: "02",
        title: "Indexing Errors",
        description:
          "Noindex directives, canonical conflicts and duplicate URLs stop valuable pages from appearing in search results.",
        impact: "Lost Organic Traffic",
      },
      {
        number: "03",
        title: "Core Web Vitals",
        description:
          "Slow loading pages, CLS issues and poor performance metrics impact rankings and user experience.",
        impact: "Lower Rankings",
      },
      {
        number: "04",
        title: "Schema & Structured Data",
        description:
          "Missing or invalid schema reduces search visibility and rich result opportunities.",
        impact: "Reduced SERP Visibility",
      },
      {
        number: "05",
        title: "Redirect Issues",
        description:
          "Redirect chains, loops and broken redirects waste crawl budget and hurt performance.",
        impact: "Crawl Budget Waste",
      },
      {
        number: "06",
        title: "Duplicate Content",
        description:
          "Content duplication and URL conflicts weaken authority and create ranking confusion.",
        impact: "Reduced Authority",
      },
    ],
  },
  industries: {
    badge: "INDUSTRIES WE SERVE",
    title: "Industries We Help",
    highlightedTitle: "Scale Digitally",
    items: [
      {
        name: "Healthcare",
        label: "Care",
        blurb:
          "Digital growth strategy for Healthcare businesses looking to generate better visibility, quality leads and measurable conversions.",
        points: ["Clinic growth campaigns", "Doctor appointment leads", "Local SEO visibility"],
      },
      {
        name: "Finance",
        label: "Trust",
        blurb:
          "Digital growth strategy for Finance businesses looking to generate better visibility, quality leads and measurable conversions.",
        points: ["Lead generation funnels", "SEO for finance brands", "Conversion landing pages"],
      },
      {
        name: "Retail",
        label: "Sales",
        blurb:
          "Digital growth strategy for Retail businesses looking to generate better visibility, quality leads and measurable conversions.",
        points: ["E-commerce growth", "Shopping campaigns", "Store visibility"],
      },
      {
        name: "Education",
        label: "Admissions",
        blurb:
          "Digital growth strategy for Education businesses looking to generate better visibility, quality leads and measurable conversions.",
        points: ["Admission campaigns", "Institute SEO", "Student enquiries"],
      },
      {
        name: "Real Estate",
        label: "Property",
        blurb:
          "Digital growth strategy for Real Estate businesses looking to generate better visibility, quality leads and measurable conversions.",
        points: ["Buyer lead funnels", "Project promotions", "Local property SEO"],
      },
      {
        name: "Logistics",
        label: "B2B",
        blurb:
          "Digital growth strategy for Logistics businesses looking to generate better visibility, quality leads and measurable conversions.",
        points: ["Transport SEO", "B2B campaigns", "Lead funnel optimization"],
      },
    ],
  },
  tools: {
    eyebrow: "TOOLS & TECHNOLOGIES",
    title: "Technical SEO Tools",
    highlightedTitle: "We Work With",
    description:
      "We use trusted SEO platforms, audit systems and technical frameworks to improve crawling, indexing, performance and search visibility.",
    items: [
      { name: "Google Search Console", icon: "search" },
      { name: "Google Analytics 4", icon: "chart" },
      { name: "PageSpeed Insights", icon: "gauge" },
      { name: "Screaming Frog", icon: "bot" },
      { name: "Schema Markup", icon: "file" },
      { name: "Ahrefs", icon: "link" },
      { name: "Semrush", icon: "activity" },
      { name: "Robots.txt", icon: "shield" },
      { name: "XML Sitemap", icon: "globe" },
      { name: "Log File Analysis", icon: "database" },
      { name: "Lighthouse", icon: "gauge" },
      { name: "Technical Audit", icon: "network" },
      { name: "JSON-LD", icon: "code" },
      { name: "Canonical Tags", icon: "link" },
      { name: "Core Web Vitals", icon: "activity" },
      { name: "Crawl Mapping", icon: "bot" },
      { name: "Index Coverage", icon: "search" },
      { name: "Site Architecture", icon: "network" },
    ],
  },
  testimonials: {
    badge: "CLIENT SUCCESS STORIES",
    title: "What Our Clients Say",
    description:
      "See how businesses improved search visibility, performance, and organic growth through our technical SEO expertise.",
    items: [
      {
        name: "Rahul Sharma",
        role: "Marketing Director",
        image: "/testimonials/rahul.jpg",
        review:
          "The technical SEO audit uncovered critical indexing issues that were limiting our organic growth.",
      },
      {
        name: "Priya Verma",
        role: "Founder",
        image: "/testimonials/priya.jpg",
        review:
          "Their team fixed performance and crawlability problems that previous agencies had missed.",
      },
      {
        name: "Amit Gupta",
        role: "Growth Manager",
        image: "/testimonials/amit.jpg",
        review:
          "The audit report was detailed, actionable, and delivered measurable ranking improvements.",
      },
    ],
  },
  faq: {
    badge: "TECHNICAL SEO FAQS",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about technical SEO audits, implementation and optimization.",
    items: [
      {
        question: "What is Technical SEO?",
        answer:
          "Technical SEO focuses on improving website infrastructure so search engines can efficiently crawl, index, and rank pages.",
      },
      {
        question: "How long does a technical SEO audit take?",
        answer:
          "Most audits are completed within 1–2 weeks depending on the size and complexity of the website.",
      },
      {
        question: "Will technical SEO improve rankings?",
        answer:
          "Technical SEO removes barriers that prevent search engines from properly understanding and ranking your website.",
      },
      {
        question: "Do you fix issues after the audit?",
        answer:
          "Yes. We provide implementation support and can resolve all identified technical SEO issues.",
      },
      {
        question: "How often should a technical SEO audit be performed?",
        answer:
          "Most businesses should perform a technical SEO audit every 6–12 months or after major website changes.",
      },
    ],
  },
};
