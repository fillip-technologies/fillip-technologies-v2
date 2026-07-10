import type { HardwareSolutionPage } from "@/data/hardware-solutions";

export const smsCommunicationContent: HardwareSolutionPage = {
  slug: "sms-communication",
  label: "SMS Communication",
  seo: {
    title: "SMS Communication Solution | Fillip Technologies",
    description:
      "Bulk SMS, OTP, and automated messaging platforms — reach customers instantly with reliable delivery, APIs, and campaign analytics.",
  },
  hero: {
    badge: "Business Solution",
    title: "SMS Communication That",
    highlightedTitle: "Reaches Everyone",
    description:
      "Bulk SMS, OTP, and automated messaging built on reliable delivery — reach customers instantly with campaigns, alerts, and two-way conversations at scale.",
    image:
      "/images/TECH-BG.png",
  },
  solutions: [
    {
      title: "Bulk SMS Campaigns",
      description:
        "Send promotions, alerts, and updates to thousands of customers in seconds with high deliverability.",
      image:
        "/images/case-2.jpg",
    },
    {
      title: "OTP & Verification",
      description:
        "Fast, reliable one-time passwords for secure logins, transactions, and account verification.",
      image:
        "/images/case-3.jpg",
    },
    {
      title: "Automated Alerts",
      description:
        "Trigger transactional messages — order updates, reminders, and notifications — automatically via API.",
      image:
        "/images/case-4.jpg",
    },
    {
      title: "Reporting & APIs",
      description:
        "Developer-friendly APIs plus delivery reports and campaign analytics to measure every send.",
      image:
        "/images/case-5.jpg",
    },
  ],
  benefits: [
    "High Delivery Rates",
    "Instant OTP Delivery",
    "Simple API Integration",
    "Detailed Analytics",
  ],
  faqs: [
    {
      question: "How reliable is message delivery?",
      answer:
        "We use established carrier routes and smart routing to maximise delivery rates and speed, with real-time delivery reports for full visibility.",
    },
    {
      question: "Do you provide an API for developers?",
      answer:
        "Yes. We offer well-documented REST APIs so you can send OTPs, alerts, and campaigns directly from your applications.",
    },
    {
      question: "Can we send transactional and promotional messages?",
      answer:
        "Yes. We support both transactional (OTP, alerts) and promotional messaging, configured to comply with local regulations.",
    },
    {
      question: "Is two-way messaging supported?",
      answer:
        "We can enable two-way SMS so customers reply and interact, with responses routed into your systems or team inbox.",
    },
  ],
};
