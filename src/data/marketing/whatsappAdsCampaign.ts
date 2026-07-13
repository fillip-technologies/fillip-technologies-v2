import type { MarketingContent } from "./types";
import { sharedIndustries, sharedTestimonials } from "./_shared";

export const whatsappAdsCampaignContent: MarketingContent = {
  slug: "whatsapp-ads-campaign",
  hero: {
    badge: "WHATSAPP ADS CAMPAIGNS",
    title: "WhatsApp Ads That Start",
    highlightedTitle: "Real Conversations",
    description:
      "Turn ad clicks into direct chats with click-to-WhatsApp campaigns that capture leads and drive sales in real time.",
    searchText: "WhatsApp Marketing Agency",
    primaryCta: "Get Free Ads Audit",
    secondaryCta: "View Case Studies",
    image: { src: "/images/seo-magnifier.png", alt: "WhatsApp Ads Illustration" },
  },
  challenges: {
    badge: "WHATSAPP ADS CHALLENGES",
    title: "Why Your Leads",
    highlightedTitle: "Go Cold",
    para1:
      "Traditional forms lose buyers to slow follow-up. By the time you reply, the intent is gone and the lead has moved on.",
    para2:
      "Click-to-WhatsApp ads open an instant conversation at peak intent — so you engage, qualify and convert in the moment.",
    ctaText: "See How We Turn Clicks Into Chats",
    items: [
      {
        icon: "click",
        title: "Slow Follow-Up",
        description:
          "Leads that aren't contacted within minutes go cold and buy elsewhere. Impact: Lost Sales.",
      },
      {
        icon: "target",
        title: "High Form Drop-Off",
        description:
          "Long forms create friction that stops interested buyers from converting. Impact: Fewer Leads.",
      },
      {
        icon: "users",
        title: "No Personalisation",
        description:
          "Generic responses fail to qualify and nurture buyers toward a decision. Impact: Low Conversion Rate.",
      },
      {
        icon: "chart",
        title: "No Tracking",
        description:
          "Without attribution you can't tell which ads actually drive qualified chats. Impact: Blind Spending.",
      },
    ],
  },
  services: {
    eyebrow: "WHATSAPP ADS SERVICES",
    title: "WhatsApp Ad Campaigns",
    highlightedTitle: "That Convert Chats",
    description:
      "Click-to-WhatsApp advertising and automation that turn ad spend into real conversations and closed sales.",
    items: [
      {
        number: "01",
        title: "Click-to-WhatsApp Ads",
        description: "Meta ads that open a chat instantly at peak intent.",
        metric: "Instant Chat",
        icon: "megaphone",
      },
      {
        number: "02",
        title: "Audience Targeting",
        description: "Reach buyers most likely to start and complete a chat.",
        metric: "Right People",
        icon: "users",
      },
      {
        number: "03",
        title: "Chat Automation",
        description: "Greetings, quick replies and flows that qualify leads.",
        metric: "Fast Response",
        icon: "zap",
      },
      {
        number: "04",
        title: "Lead Qualification",
        description: "Structured questions that route hot leads to your team.",
        metric: "Qualified Leads",
        icon: "target",
      },
      {
        number: "05",
        title: "Broadcast & Retargeting",
        description: "Re-engage contacts with offers and reminders.",
        metric: "Re-Engagement",
        icon: "click",
      },
      {
        number: "06",
        title: "Tracking & Reporting",
        description: "Attribution from ad click to chat to conversion.",
        metric: "Visibility",
        icon: "chart",
      },
    ],
  },
  issues: {
    badge: "WHATSAPP ADS AUDIT",
    title: "Conversation Gaps",
    highlightedTitle: "We Fix",
    description:
      "Click-to-chat campaigns underperform when ads, automation and follow-up aren't set up to convert conversations into customers.",
    items: [
      {
        number: "01",
        title: "No Instant Reply",
        description:
          "Without automated greetings, new chats wait and lose momentum.",
        impact: "Cold Leads",
      },
      {
        number: "02",
        title: "Weak Ad Hook",
        description:
          "Ads that don't promise a clear reason to chat get few conversations.",
        impact: "Low Chat Rate",
      },
      {
        number: "03",
        title: "No Qualification Flow",
        description:
          "Unstructured chats waste your team's time on unqualified leads.",
        impact: "Low Efficiency",
      },
      {
        number: "04",
        title: "Poor Targeting",
        description:
          "Reaching the wrong audiences fills your inbox with non-buyers.",
        impact: "High Cost Per Lead",
      },
      {
        number: "05",
        title: "No Follow-Up",
        description:
          "Contacts that go quiet are never re-engaged with offers or reminders.",
        impact: "Missed Sales",
      },
      {
        number: "06",
        title: "No Attribution",
        description:
          "Without tracking, you can't tell which ads drive real conversions.",
        impact: "Blind Optimisation",
      },
    ],
  },
  industries: sharedIndustries,
  tools: {
    eyebrow: "TOOLS & PLATFORMS",
    title: "WhatsApp Ads Tools",
    highlightedTitle: "We Work With",
    description:
      "We combine Meta advertising with the WhatsApp Business Platform and automation to run conversational campaigns that convert.",
    items: [
      { name: "Meta Ads Manager", icon: "target" },
      { name: "WhatsApp Business API", icon: "megaphone" },
      { name: "Click-to-Chat Ads", icon: "click" },
      { name: "Chat Automation", icon: "zap" },
      { name: "Facebook Pixel", icon: "code" },
      { name: "Conversions API", icon: "network" },
      { name: "Audience Manager", icon: "users" },
      { name: "CRM Integration", icon: "database" },
      { name: "Broadcast Campaigns", icon: "activity" },
      { name: "Lead Qualification", icon: "check" },
      { name: "Google Analytics 4", icon: "chart" },
      { name: "Reporting", icon: "gauge" },
    ],
  },
  testimonials: sharedTestimonials(
    "See how businesses captured more qualified leads and closed faster with click-to-WhatsApp campaigns.",
  ),
  faq: {
    badge: "WHATSAPP ADS FAQS",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about WhatsApp advertising and click-to-chat campaigns.",
    items: [
      {
        question: "What are click-to-WhatsApp ads?",
        answer:
          "They are Facebook and Instagram ads that open a WhatsApp chat when clicked, letting buyers reach you instantly at peak intent.",
      },
      {
        question: "Do I need the WhatsApp Business API?",
        answer:
          "For automation, qualification and scale we recommend the WhatsApp Business Platform, which we can set up and integrate for you.",
      },
      {
        question: "Can chats be automated?",
        answer:
          "Yes. We build greetings, quick replies and qualification flows so leads get instant, structured responses.",
      },
      {
        question: "How do you measure results?",
        answer:
          "We track cost per conversation, qualified leads and conversions with attribution from ad click through to sale.",
      },
      {
        question: "How soon will I see leads?",
        answer:
          "Conversations typically start within days of launch, improving as we optimise ads and flows.",
      },
    ],
  },
};
