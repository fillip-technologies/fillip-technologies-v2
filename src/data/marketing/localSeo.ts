import type { MarketingContent } from "./types";
import { sharedIndustries, sharedTestimonials } from "./_shared";

export const localSeoContent: MarketingContent = {
  slug: "local-seo",
  hero: {
    badge: "LOCAL SEO SERVICES",
    title: "Get Found By Customers",
    highlightedTitle: "Near You",
    description:
      "Rank in the local map pack, win more calls and store visits, and turn nearby searches into paying customers.",
    searchText: "Best SEO Agency Near Me",
    primaryCta: "Get Free Local Audit",
    secondaryCta: "View Case Studies",
    image: { src: "/images/seo-magnifier.png", alt: "Local SEO Illustration" },
  },
  challenges: {
    badge: "LOCAL SEO CHALLENGES",
    title: "Why You're Not Showing",
    highlightedTitle: "In Local Results",
    para1:
      "Customers search for services near them every day — if your business isn't in the map pack, those calls go to competitors.",
    para2:
      "Local SEO fixes the signals Google uses to rank nearby businesses: your profile, citations, reviews and location relevance.",
    ctaText: "See How We Boost Local Rankings",
    items: [
      {
        icon: "location",
        title: "Weak Map Pack Presence",
        description:
          "An unoptimized Google Business Profile keeps you out of the top 3 local results where most clicks happen. Impact: Lost Local Visibility.",
      },
      {
        icon: "search-x",
        title: "Inconsistent Citations",
        description:
          "Mismatched name, address and phone details across directories confuse Google and erode local trust. Impact: Lower Local Rankings.",
      },
      {
        icon: "users",
        title: "Too Few Reviews",
        description:
          "A thin or outdated review profile reduces trust and click-through from local searchers. Impact: Fewer Calls & Visits.",
      },
      {
        icon: "target",
        title: "No Location Targeting",
        description:
          "Missing location pages and local keywords mean you never surface for the areas you actually serve. Impact: Missed Nearby Demand.",
      },
    ],
  },
  services: {
    eyebrow: "LOCAL SEO SERVICES",
    title: "Local SEO Solutions",
    highlightedTitle: "That Drive Foot Traffic",
    description:
      "A complete local optimisation programme that gets your business into the map pack and in front of nearby buyers.",
    items: [
      {
        number: "01",
        title: "Google Business Profile",
        description: "Optimise and manage your profile to win the local map pack.",
        metric: "Map Pack",
        icon: "location",
      },
      {
        number: "02",
        title: "Local Citations",
        description: "Consistent NAP across directories to build local trust.",
        metric: "NAP Consistency",
        icon: "check",
      },
      {
        number: "03",
        title: "Review Management",
        description: "Generate and respond to reviews that boost credibility.",
        metric: "Reputation",
        icon: "users",
      },
      {
        number: "04",
        title: "Location Pages",
        description: "SEO-optimised pages for each area and service you serve.",
        metric: "Local Reach",
        icon: "file",
      },
      {
        number: "05",
        title: "Local Keywords",
        description: "Target 'near me' and city-level intent that converts.",
        metric: "Local Intent",
        icon: "search",
      },
      {
        number: "06",
        title: "Local Link Building",
        description: "Earn local relevance signals from trusted regional sources.",
        metric: "Local Authority",
        icon: "link",
      },
    ],
  },
  issues: {
    badge: "LOCAL SEO AUDIT",
    title: "Local Ranking Gaps",
    highlightedTitle: "We Fix",
    description:
      "Most businesses miss local customers not because of poor service, but because their local signals aren't optimised for how Google ranks nearby results.",
    items: [
      {
        number: "01",
        title: "Unoptimized Profile",
        description:
          "Incomplete categories, services and photos weaken your Google Business Profile ranking.",
        impact: "Lower Map Pack Position",
      },
      {
        number: "02",
        title: "NAP Inconsistency",
        description:
          "Conflicting business details across the web dilute local trust and confuse search engines.",
        impact: "Reduced Local Trust",
      },
      {
        number: "03",
        title: "Review Gaps",
        description:
          "Few recent reviews and unanswered feedback lower conversions from local searches.",
        impact: "Fewer Conversions",
      },
      {
        number: "04",
        title: "Missing Location Pages",
        description:
          "No dedicated pages for the areas you serve means lost visibility for city-level searches.",
        impact: "Missed Local Demand",
      },
      {
        number: "05",
        title: "Weak Local Content",
        description:
          "Generic content without local relevance fails to rank for 'near me' intent.",
        impact: "Lost Nearby Traffic",
      },
      {
        number: "06",
        title: "No Local Backlinks",
        description:
          "A lack of regional citations and links limits local authority and rankings.",
        impact: "Reduced Local Authority",
      },
    ],
  },
  industries: sharedIndustries,
  tools: {
    eyebrow: "TOOLS & PLATFORMS",
    title: "Local SEO Tools",
    highlightedTitle: "We Work With",
    description:
      "We use proven local SEO platforms and directories to boost map rankings, reviews and citation consistency.",
    items: [
      { name: "Google Business Profile", icon: "location" },
      { name: "Google Maps", icon: "globe" },
      { name: "Local Citations", icon: "check" },
      { name: "Review Platforms", icon: "users" },
      { name: "BrightLocal", icon: "chart" },
      { name: "Google Search Console", icon: "search" },
      { name: "Local Schema", icon: "code" },
      { name: "Directory Listings", icon: "database" },
      { name: "GEO Targeting", icon: "target" },
      { name: "Semrush Local", icon: "activity" },
      { name: "NAP Audit", icon: "shield" },
      { name: "Local Rank Tracking", icon: "network" },
    ],
  },
  testimonials: sharedTestimonials(
    "See how local businesses grew calls, store visits and map pack rankings through our local SEO work.",
  ),
  faq: {
    badge: "LOCAL SEO FAQS",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about local SEO, Google Business Profile and map pack rankings.",
    items: [
      {
        question: "What is Local SEO?",
        answer:
          "Local SEO optimises your online presence so your business ranks for nearby searches and appears in Google's local map pack.",
      },
      {
        question: "How long until I rank in the map pack?",
        answer:
          "Most businesses see local ranking improvements within 1–3 months, depending on competition and profile health.",
      },
      {
        question: "Do reviews affect local rankings?",
        answer:
          "Yes. Review quantity, quality and recency are strong local ranking and conversion signals.",
      },
      {
        question: "Can you manage multiple locations?",
        answer:
          "Yes. We optimise and manage local SEO for single and multi-location businesses.",
      },
      {
        question: "What is NAP consistency?",
        answer:
          "NAP stands for Name, Address and Phone. Keeping it consistent everywhere online builds local trust and rankings.",
      },
    ],
  },
};
