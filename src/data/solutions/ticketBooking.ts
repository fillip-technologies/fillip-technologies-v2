import type { HardwareSolutionPage } from "@/data/hardware-solutions";

export const ticketBookingContent: HardwareSolutionPage = {
  slug: "ticket-booking",
  label: "Ticket Booking",
  seo: {
    title: "Ticket Booking Solution | Fillip Technologies",
    description:
      "Custom ticket booking platforms for events, travel, and venues — real-time seat selection, secure payments, and automated confirmations.",
  },
  hero: {
    badge: "Business Solution",
    title: "Ticket Booking Systems",
    highlightedTitle: "Built To Sell Out",
    description:
      "Custom booking platforms for events, travel, and venues — real-time availability, secure payments, and instant confirmations that scale on your busiest day.",
    image:
      "/images/case-bg.jpg",
  },
  solutions: [
    {
      title: "Real-Time Seat Selection",
      description:
        "Interactive seat maps with live availability so customers pick exactly where they sit, with no double-booking.",
      image:
        "/images/case-1.jpg",
    },
    {
      title: "Secure Payments",
      description:
        "Integrated, PCI-compliant payment gateways with support for cards, UPI, and wallets for frictionless checkout.",
      image:
        "/images/case-2.jpg",
    },
    {
      title: "QR & E-Tickets",
      description:
        "Automated e-tickets with QR codes for fast, contactless entry and easy on-site validation.",
      image:
        "/images/case-3.jpg",
    },
    {
      title: "Admin & Analytics",
      description:
        "A dashboard to manage events, pricing, and inventory with real-time sales and attendance insights.",
      image:
        "/images/case-4.jpg",
    },
  ],
  benefits: [
    "Scales On Peak Sale Days",
    "Secure, Reliable Payments",
    "Fewer No-Shows",
    "Full Sales Visibility",
  ],
  faqs: [
    {
      question: "Can you handle high-traffic on-sale moments?",
      answer:
        "Yes. We build booking systems that scale to handle sudden spikes in demand so your platform stays fast and reliable when tickets go live.",
    },
    {
      question: "Which payment methods are supported?",
      answer:
        "We integrate secure gateways supporting cards, UPI, net banking, and popular wallets, tailored to your market and audience.",
    },
    {
      question: "Can it integrate with our existing systems?",
      answer:
        "Yes. We integrate with your CRM, email/SMS providers, and accounting tools so bookings flow into the systems you already use.",
    },
    {
      question: "Do customers get instant confirmation?",
      answer:
        "Absolutely. Customers receive instant e-tickets with QR codes by email and SMS the moment payment is confirmed.",
    },
  ],
};
