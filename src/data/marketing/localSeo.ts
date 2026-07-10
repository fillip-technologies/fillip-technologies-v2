import type { MarketingContent } from "./types";

export const localSeoContent: MarketingContent = {
  slug: "local-seo",
  hero: {
    title: "Local SEO That Puts You On The",
    highlightedTitle: "Map & In The Pack",
    description:
      "Dominate the local results that drive foot traffic and calls — Google Business Profile, local rankings, and reviews that win nearby customers.",
  },
  capabilities: {
    eyebrow: "WHAT WE OPTIMISE",
    title: "Everything Local",
    highlightedTitle: "Customers See",
    description:
      "From your Google Business Profile to citations and reviews, we optimise every local ranking signal.",
    cards: [
      {
        eyebrow: "Profile",
        title: "Google Business Profile",
        description:
          "Full optimisation of your profile — categories, services, posts, and photos that convert.",
        metric: "More Map Views",
      },
      {
        eyebrow: "Rankings",
        title: "Local Pack Rankings",
        description:
          "Rank in the 3-pack for the searches your customers actually make near you.",
        metric: "Top 3 Visibility",
      },
      {
        title: "Citations & NAP",
        description:
          "Consistent name, address, and phone data across directories that build local trust.",
      },
      {
        title: "Reviews & Reputation",
        description:
          "Systems that grow genuine reviews and help you respond to build credibility.",
        tags: ["GBP", "Citations", "Reviews"],
      },
    ],
  },
  process: {
    title: "Our Local SEO",
    highlightedTitle: "Process",
    description:
      "A location-focused workflow that builds visibility where your customers are searching.",
    steps: [
      { title: "Audit", items: ["Profile Review", "Ranking Check", "Citation Audit", "Competitors"] },
      { title: "Optimise", items: ["GBP Setup", "Local Pages", "Citations", "Schema"] },
      { title: "Grow", items: ["Posts", "Reviews", "Content", "Links"] },
      { title: "Report", items: ["Rank Tracking", "Calls & Directions", "Insights", "Iteration"] },
    ],
  },
  results: {
    eyebrow: "LOCAL SEO OUTCOMES",
    title: "More Nearby Customers",
    highlightedTitle: "Finding You",
    description:
      "Local visibility turns into real actions — calls, directions, and store visits.",
    stats: [
      { value: "+120%", label: "Map Views" },
      { value: "+65%", label: "Direction Requests" },
      { value: "+80%", label: "Profile Calls" },
      { value: "Top 3", label: "Local Pack" },
    ],
    leftPill: "More Calls",
    rightPill: "More Visits",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Local SEO That Drives",
    highlightedTitle: "Real Footfall",
    description:
      "We focus on the local signals that turn searches into customers walking through your door.",
    items: [
      { title: "Location-Focused", description: "Strategy built around your service areas and intent." },
      { title: "Review Growth", description: "Ethical systems that build genuine, ranking-boosting reviews." },
      { title: "Multi-Location Ready", description: "Scales cleanly from one location to many." },
      { title: "Action-Tracked", description: "We report calls, directions, and visits — not vanity metrics." },
    ],
  },
  faq: {
    title: "Local SEO",
    highlightedTitle: "Questions",
    description: "Common questions about local SEO with Fillip Technologies.",
    items: [
      {
        question: "What is the local 3-pack?",
        answer:
          "It's the block of three business listings with a map that appears for local searches. Ranking there dramatically increases calls, directions, and visits.",
      },
      {
        question: "Do you manage our Google Business Profile?",
        answer:
          "Yes. We fully optimise and can manage your profile — categories, services, posts, photos, and Q&A — to maximise local visibility.",
      },
      {
        question: "Can you help with multiple locations?",
        answer:
          "Absolutely. We build scalable local SEO across all your locations with consistent citations and location-specific pages.",
      },
      {
        question: "How do you grow reviews?",
        answer:
          "We set up ethical review-generation flows and help you respond consistently, which improves both rankings and conversion.",
      },
    ],
  },
};
