import type { MarketingContent } from "./types";

export const whatsappAdsCampaignContent: MarketingContent = {
  slug: "whatsapp-ads-campaign",
  hero: {
    title: "WhatsApp Ads That Start",
    highlightedTitle: "Conversations That Convert",
    description:
      "Click-to-WhatsApp campaigns and automation that turn ad clicks into real conversations — and conversations into customers.",
  },
  capabilities: {
    eyebrow: "WHAT WE RUN",
    title: "Conversational Campaigns",
    highlightedTitle: "That Sell",
    description:
      "Click-to-WhatsApp ads, message flows, and follow-up that shorten the path from interest to purchase.",
    cards: [
      {
        eyebrow: "Ads",
        title: "Click-to-WhatsApp Ads",
        description:
          "Meta ads that open a WhatsApp chat, capturing high-intent leads instantly.",
        metric: "Instant Leads",
      },
      {
        eyebrow: "Automation",
        title: "Message Flows",
        description:
          "Automated greetings, qualification, and routing that respond in seconds.",
        metric: "Faster Response",
      },
      {
        title: "Broadcast Campaigns",
        description:
          "Compliant broadcast and re-engagement messages that drive repeat business.",
      },
      {
        title: "CRM & Handoff",
        description:
          "Integrations that pass qualified chats to your sales team seamlessly.",
        tags: ["CTWA", "Automation", "Broadcast"],
      },
    ],
  },
  process: {
    title: "Our WhatsApp Ads",
    highlightedTitle: "Process",
    description:
      "A conversation-first workflow that connects paid ads to real-time messaging.",
    steps: [
      { title: "Plan", items: ["Goals", "Offer", "Audiences", "Flows"] },
      { title: "Build", items: ["Ad Creative", "Chat Flows", "Automation", "Templates"] },
      { title: "Launch", items: ["Targeting", "Tracking", "Routing", "Testing"] },
      { title: "Optimise", items: ["Response Rate", "Qualification", "Follow-Up", "Reporting"] },
    ],
  },
  results: {
    eyebrow: "WHATSAPP ADS OUTCOMES",
    title: "Conversations That Turn Into",
    highlightedTitle: "Customers",
    description:
      "Meeting customers in the channel they already use lifts response and conversion.",
    stats: [
      { value: "+80%", label: "Response Rate" },
      { value: "-30%", label: "Cost Per Lead" },
      { value: "+55%", label: "Lead-to-Chat" },
      { value: "3x", label: "Faster Replies" },
    ],
    leftPill: "More Replies",
    rightPill: "Higher Intent",
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "WhatsApp Marketing Done",
    highlightedTitle: "Right",
    description:
      "We connect paid ads to conversation and automation so no lead goes cold.",
    items: [
      { title: "Conversation-First", description: "We design flows that qualify and convert, not just reply." },
      { title: "Fast Response", description: "Automation replies in seconds, when intent is highest." },
      { title: "Compliant", description: "Templates and broadcasts that respect WhatsApp policy." },
      { title: "Integrated", description: "Chats flow into your CRM and sales process cleanly." },
    ],
  },
  faq: {
    title: "WhatsApp Ads",
    highlightedTitle: "Questions",
    description: "Common questions about WhatsApp ad campaigns with Fillip Technologies.",
    items: [
      {
        question: "What are click-to-WhatsApp ads?",
        answer:
          "They're Facebook and Instagram ads that open a WhatsApp conversation instead of a landing page — capturing high-intent leads directly in chat.",
      },
      {
        question: "Do you set up the automation?",
        answer:
          "Yes. We build the message flows, auto-replies, and qualification logic, and can integrate with the WhatsApp Business API and your CRM.",
      },
      {
        question: "Is broadcasting allowed?",
        answer:
          "Yes, within WhatsApp's rules using approved message templates and opted-in audiences. We keep campaigns compliant to protect your number.",
      },
      {
        question: "Which businesses does this suit?",
        answer:
          "It works especially well for high-consideration purchases, local services, and markets where customers prefer messaging over forms or calls.",
      },
    ],
  },
};
