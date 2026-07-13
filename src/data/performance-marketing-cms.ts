import type {
  PerformanceMarketingHeroContent,
  PerformancePhilosophyContent,
  PerformanceWorkflowContent,
  PerformanceResultsContent,
} from "@/lib/service-content/types";

/**
 * Content shape for the "performance-marketing" Service Pages template — the
 * admin-created /marketing/<slug> pages that use the Performance Marketing (ads)
 * layout. Reuses the performance-marketing hero/philosophy/workflow/results
 * shapes plus a testimonials + faq block. All fields are per-page and
 * CMS-editable.
 */

export type PmTestimonialsContent = {
  badge: string;
  title: string;
  description: string;
  items: { name: string; role: string; image: string; review: string }[];
};

export type PmFaqContent = {
  badge: string;
  title: string;
  description: string;
  items: { question: string; answer: string }[];
};

export type PerformanceMarketingCmsContent = {
  slug: string;
  hero: PerformanceMarketingHeroContent;
  philosophy: PerformancePhilosophyContent;
  workflow: PerformanceWorkflowContent;
  results: PerformanceResultsContent;
  testimonials: PmTestimonialsContent;
  faq: PmFaqContent;
};

/**
 * Generic starter content for a newly-created Performance Marketing page. Used
 * as the section defaults until the admin edits them, so a fresh page renders
 * sensibly instead of blank.
 */
export const PERFORMANCE_MARKETING_STARTER: Omit<PerformanceMarketingCmsContent, "slug"> = {
  hero: {
    title: "Grow your business with",
    highlightedTitle: "Performance Marketing",
    suffix: "That Delivers",
    description:
      "Reach the right audience and turn ad spend into measurable leads and sales through strategically managed campaigns.",
    cta: "Plan Your Campaign",
    metricValue: "ROI",
    metricLabel: "Campaigns optimized for measurable business growth",
    image: { src: "/images/meta.png", alt: "Performance marketing" },
  },
  philosophy: {
    badge: "OUR PERFORMANCE PHILOSOPHY",
    title: "Outperform Competitors.",
    highlightedTitle: "Don't Outspend Them.",
    lead: "Most businesses increase advertising budgets when results decline.",
    support: "We improve strategy when results matter.",
    description:
      "Successful campaigns are built on audience insights, creative testing, conversion tracking, and continuous optimization, not simply bigger budgets.",
    caption: "Smart strategy beats bigger budgets",
    metrics: [
      { label: "Qualified Leads", value: "+68%" },
      { label: "Average ROAS", value: "3.8x" },
    ],
  },
  workflow: {
    badge: "HOW IT WORKS",
    title: "We Make Campaign",
    highlightedTitle: "Growth Easy.",
    description:
      "From audience research to campaign scaling, our team handles every step needed to generate qualified leads and measurable business growth.",
    steps: [
      {
        title: "Research & Strategy",
        description:
          "We identify your audience, competitors, and growth opportunities before launching campaigns.",
        image: "/images/research-mockup.png",
        alt: "Research & Strategy",
      },
      {
        title: "Launch & Optimize",
        description:
          "Campaigns are launched, tested, and optimized continuously to improve performance and maximize returns.",
        image: "/images/launch-mockup.png",
        alt: "Launch & Optimize",
        cta: "Launch Campaign",
      },
      {
        title: "Scale & Grow",
        description:
          "Winning campaigns are scaled strategically to maximize revenue without wasting advertising budget.",
        image: "/images/scale-mockup.png",
        alt: "Scale & Grow",
      },
    ],
  },
  results: {
    badge: "RESULTS WE FOCUS ON",
    title: "Growth You Can",
    highlightedTitle: "Actually Measure.",
    description:
      "Every campaign decision is optimized around qualified leads, lower acquisition costs, stronger conversion rates, and sustainable growth.",
    image: { src: "/images/results-dashboard.png", alt: "Results dashboard" },
    metrics: [
      { label: "Qualified Leads", value: "+68%" },
      { label: "Average ROAS", value: "3.8x" },
      { label: "Cost Per Lead", value: "-42%" },
      { label: "Revenue Growth", value: "+127%" },
    ],
  },
  testimonials: {
    badge: "CLIENT SUCCESS STORIES",
    title: "What Our Clients Say",
    description:
      "See how focused advertising strategies help businesses improve lead quality, conversions, and campaign performance.",
    items: [
      {
        name: "Rahul Sharma",
        role: "Marketing Director",
        image: "/testimonials/rahul.jpg",
        review:
          "Their campaigns lowered our cost per lead while improving quality within the first month.",
      },
      {
        name: "Priya Verma",
        role: "Founder",
        image: "/testimonials/priya.jpg",
        review:
          "Sharp targeting and constant optimization delivered results previous agencies couldn't.",
      },
      {
        name: "Amit Gupta",
        role: "Growth Manager",
        image: "/testimonials/amit.jpg",
        review:
          "Transparent reporting and a clear focus on ROAS made scaling our spend easy.",
      },
    ],
  },
  faq: {
    badge: "FAQS",
    title: "Frequently Asked Questions",
    description: "Common questions about our performance marketing campaigns.",
    items: [
      {
        question: "How much budget do I need to start?",
        answer:
          "We recommend a budget after reviewing your goals and market, enough to test creative and gather meaningful conversion data.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Campaigns can generate leads within days, with performance improving as we optimize over the first few weeks.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We track qualified leads, cost per acquisition, and return on ad spend, optimizing toward profit rather than just clicks.",
      },
    ],
  },
};
