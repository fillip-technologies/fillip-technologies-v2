import type { MobileAppDevelopmentContent } from "./types";

export const appUiUxMobileAppContent = {
  hero: {
    title: "App UI/UX Design",
    highlightedTitle: "Users Love",
    description:
      "We design clear, modern, and conversion-focused mobile app interfaces that make user journeys simple, engaging, and easy to adopt.",
    leftCard: {
      title: "User-First Flows",
      description: "Interfaces planned around real user actions and business goals.",
    },
    rightCard: {
      value: "UX",
      label: "Driven Design",
    },
    image: { src: "/images/mobile-app-phone.png", alt: "App UI UX design" },
  },
  challenges: {
    badge: "APP DESIGN CHALLENGES",
    title: "Experience Problems",
    highlightedTitle: "We Fix",
    lead: "Users leave apps that feel confusing, slow, or hard to trust.",
    support:
      "We create mobile app designs that reduce friction and make every action easier.",
    description:
      "From messy navigation to weak onboarding and unclear CTAs, we design app experiences that guide users naturally.",
    items: ["Confusing User Flows", "Weak First Impression", "Low User Retention", "Poor Conversion Paths"],
    image: { src: "/images/enterprise-dashboard.png", alt: "App design dashboard" },
  },
  solutions: {
    badge: "APP DESIGN SERVICES",
    title: "Mobile UI/UX",
    highlightedTitle: "Designed To Convert",
    description:
      "We design app journeys, wireframes, screens, prototypes, and design systems for Android, iOS, and cross-platform applications.",
    items: [
      { title: "App Wireframing", description: "Plan screen structure, flows, navigation, and content hierarchy before visual design.", icon: "Layers3", iconColor: "text-blue-600", iconBg: "bg-blue-50", footerLabel: "Design Solution" },
      { title: "Mobile UI Design", description: "Create polished mobile screens with clean layout, typography, colors, and components.", icon: "Smartphone", iconColor: "text-indigo-600", iconBg: "bg-indigo-50", footerLabel: "Design Solution" },
      { title: "Interactive Prototypes", description: "Preview app flows with clickable prototypes before development starts.", icon: "Workflow", iconColor: "text-cyan-600", iconBg: "bg-cyan-50", footerLabel: "Design Solution" },
      { title: "Design Systems", description: "Build reusable components, styles, and patterns for scalable app design.", icon: "Boxes", iconColor: "text-violet-600", iconBg: "bg-violet-50", footerLabel: "Design Solution" },
      { title: "UX Audits", description: "Review existing app journeys and identify friction, drop-offs, and usability issues.", icon: "BarChart3", iconColor: "text-sky-600", iconBg: "bg-sky-50", footerLabel: "Design Solution" },
      { title: "Developer Handoff", description: "Prepare organized design files, assets, specs, and responsive behavior notes.", icon: "CheckCircle2", iconColor: "text-blue-700", iconBg: "bg-blue-50", footerLabel: "Design Solution" },
    ],
  },
  features: {
    badge: "APP UX FEATURES",
    title: "Designed For",
    highlightedTitle: "Better Adoption",
    description:
      "UI/UX capabilities that help users understand, trust, and use your mobile app with less friction.",
    image: { src: "/images/enterprise-mobile-dashboardd.png", alt: "Mobile app UI UX interface" },
    items: [
      { title: "User Journey Mapping", description: "Plan every important user action clearly.", icon: "Workflow" },
      { title: "Clean Navigation", description: "Make screens and actions easy to find.", icon: "Layers3" },
      { title: "Conversion-Focused CTAs", description: "Guide users toward meaningful actions.", icon: "TrendingUp" },
      { title: "Design Consistency", description: "Use reusable patterns across the app.", icon: "Boxes" },
      { title: "Accessible Interfaces", description: "Improve readability, spacing, and usability.", icon: "UserRound" },
      { title: "Prototype Testing", description: "Validate flows before development.", icon: "CheckCircle2" },
      { title: "Responsive Screens", description: "Design for different device sizes.", icon: "Smartphone" },
      { title: "Developer-Ready Files", description: "Prepare clean handoff for faster builds.", icon: "Cloud" },
    ],
  },
  whyChooseUs: {
    badge: "WHY APP DESIGN MATTERS",
    title: "Great Apps Start With",
    highlightedTitle: "Clear Design.",
    description:
      "Strong UI/UX helps users understand your app faster, complete actions confidently, and return more often.",
    image: { src: "/images/mobile-app-phone.png", alt: "App UI UX growth" },
    reasons: [
      { icon: "Clock3", title: "Faster Adoption", description: "Reduce confusion and help users get value quickly." },
      { icon: "Smartphone", title: "Better Usability", description: "Create intuitive flows for mobile users." },
      { icon: "ShieldCheck", title: "More Trust", description: "Professional design makes your app feel reliable." },
      { icon: "TrendingUp", title: "Higher Conversions", description: "Guide users toward bookings, purchases, and enquiries." },
    ],
    quote: "Users judge your app in seconds. Clear design helps them stay.",
    quoteDescription: "Design the experience before building the product.",
  },
  testimonials: {
    badge: "Client Success Stories",
    title: "Mobile Experiences Users Understand",
    description:
      "Brands trust Fillip Technologies to design app interfaces that look modern and work smoothly.",
    testimonials: [
      { name: "Ayesha Khan", role: "Startup Founder", image: "", review: "The prototype helped us understand the app flow clearly before development started." },
      { name: "Nitin Raj", role: "Product Owner", image: "", review: "The redesigned screens made the app much cleaner and easier for users to navigate." },
      { name: "Sneha Verma", role: "Marketing Lead", image: "", review: "The design system gave our app a consistent and professional look." },
      { name: "Arjun Singh", role: "Operations Head", image: "", review: "The UX audit helped us fix confusing flows and improve user adoption." },
    ],
  },
  faq: {
    title: "Frequently Asked Questions About App UI/UX Design",
    description: "Common questions before starting mobile app design.",
    faqs: [
      { question: "Can you design only the app UI without development?", answer: "Yes. We can provide wireframes, UI screens, prototypes, and developer-ready handoff files." },
      { question: "Do you redesign existing mobile apps?", answer: "Yes. We audit current flows and redesign screens to improve usability, clarity, and conversions." },
      { question: "Will I get a clickable prototype?", answer: "Yes. We can create interactive prototypes so you can review the user journey before development." },
      { question: "Can developers use your design files directly?", answer: "Yes. We prepare organized design files, assets, components, and handoff notes." },
      { question: "How long does app UI/UX design take?", answer: "A typical app design project takes 2-6 weeks depending on the number of screens and complexity." },
    ],
    ctaTitle: "Ready To Design Your Mobile App?",
    ctaDescription: "Let's plan your app flows, screens, and user experience.",
    ctaButtonText: "Book Free Consultation",
  },
  guidance: { title: "Planning App UI/UX?", buttonText: "Discuss Your App Design ->" },
} satisfies MobileAppDevelopmentContent;
