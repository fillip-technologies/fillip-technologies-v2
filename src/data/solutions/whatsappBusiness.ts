import type { HardwareSolutionPage } from "@/data/hardware-solutions";

export const whatsappBusinessContent: HardwareSolutionPage = {
  slug: "whatsapp-business",
  label: "WhatsApp Business",
  seo: {
    title: "WhatsApp Business Solution | Fillip Technologies",
    description:
      "WhatsApp Business API, chatbots, and broadcast campaigns — engage customers with automated conversations, notifications, and support at scale.",
  },
  hero: {
    badge: "Business Solution",
    title: "WhatsApp Business That",
    highlightedTitle: "Talks & Converts",
    description:
      "WhatsApp Business API, chatbots, and broadcasts that meet customers where they already are — automated conversations, notifications, and support at scale.",
    image:
      "/images/background.png",
  },
  solutions: [
    {
      title: "WhatsApp Business API",
      description:
        "Official API setup with verified business profile, so you message customers reliably and at scale.",
      image:
        "/images/case-4.jpg",
    },
    {
      title: "Chatbots & Automation",
      description:
        "Automated flows that answer FAQs, qualify leads, and route conversations to your team instantly.",
      image:
        "/images/case-5.jpg",
    },
    {
      title: "Broadcast Campaigns",
      description:
        "Compliant, template-based broadcasts for offers, updates, and re-engagement to opted-in audiences.",
      image:
        "/images/case-7.jpg",
    },
    {
      title: "CRM Integration",
      description:
        "Connect WhatsApp to your CRM and helpdesk so every conversation is tracked and actioned.",
      image:
        "/images/case-1.jpg",
    },
  ],
  benefits: [
    "Higher Open Rates",
    "24/7 Automated Replies",
    "Verified Business Profile",
    "Seamless CRM Handoff",
  ],
  faqs: [
    {
      question: "What is the WhatsApp Business API?",
      answer:
        "It's the official platform for businesses to message customers at scale with automation, verified profiles, and template messaging — beyond what the standard app allows.",
    },
    {
      question: "Can you build a chatbot for us?",
      answer:
        "Yes. We design and build automated conversation flows that handle FAQs, qualify leads, and hand off to a human agent when needed.",
    },
    {
      question: "Are broadcast messages compliant?",
      answer:
        "Yes. We use approved message templates and opted-in audiences to keep campaigns compliant with WhatsApp's policies and protect your number.",
    },
    {
      question: "Does it integrate with our CRM?",
      answer:
        "Absolutely. We integrate WhatsApp with your CRM and helpdesk so conversations and leads flow into your existing workflows.",
    },
  ],
};
