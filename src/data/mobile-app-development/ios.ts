import type { MobileAppDevelopmentContent } from "./types";

export const iosMobileAppContent = {
  hero: {
    title: "iOS App Development",
    highlightedTitle: "For Premium Experiences",
    description:
      "We design and build polished iOS applications for iPhone and iPad users with secure architecture, smooth performance, and elegant user experiences.",
    leftCard: {
      title: "Apple-Ready UX",
      description: "Clean, intuitive interfaces aligned with iOS user expectations.",
    },
    rightCard: {
      value: "iOS",
      label: "App Experiences",
    },
    image: { src: "/images/mobile-app-phone.png", alt: "iOS app development" },
  },
  challenges: {
    badge: "IOS CHALLENGES",
    title: "iOS App Challenges",
    highlightedTitle: "We Solve",
    lead: "iOS users expect refined design and dependable performance.",
    support:
      "We help businesses create iOS apps that feel premium, secure, and easy to use.",
    description:
      "From unclear navigation to performance issues and App Store readiness, we solve the details that shape a successful iOS launch.",
    items: ["Poor App UX", "Slow Performance", "Weak App Store Readiness", "Limited Integration"],
    image: { src: "/images/enterprise-dashboard.png", alt: "iOS app dashboard" },
  },
  solutions: {
    badge: "IOS SOLUTIONS",
    title: "iOS Apps",
    highlightedTitle: "Built Around Users",
    description:
      "We build iOS apps for customers, teams, ecommerce, bookings, services, and enterprise operations.",
    items: [
      { title: "Customer iOS Apps", description: "Create branded iPhone apps for bookings, services, accounts, and communication.", icon: "Smartphone", iconColor: "text-blue-600", iconBg: "bg-blue-50", footerLabel: "iOS Solution" },
      { title: "Business iOS Apps", description: "Digitize business processes, reporting, approvals, and internal team workflows.", icon: "BriefcaseBusiness", iconColor: "text-indigo-600", iconBg: "bg-indigo-50", footerLabel: "iOS Solution" },
      { title: "Ecommerce iOS Apps", description: "Build shopping apps with product discovery, checkout, payments, and order tracking.", icon: "ShoppingCart", iconColor: "text-cyan-600", iconBg: "bg-cyan-50", footerLabel: "iOS Solution" },
      { title: "On-Demand iOS Apps", description: "Launch service booking, delivery, appointment, and marketplace applications.", icon: "Truck", iconColor: "text-violet-600", iconBg: "bg-violet-50", footerLabel: "iOS Solution" },
      { title: "Analytics Apps", description: "Give teams mobile access to dashboards, KPIs, users, and business reports.", icon: "BarChart3", iconColor: "text-sky-600", iconBg: "bg-sky-50", footerLabel: "iOS Solution" },
      { title: "API-Integrated Apps", description: "Connect iOS apps with existing websites, CRMs, ERPs, and cloud systems.", icon: "Cloud", iconColor: "text-blue-700", iconBg: "bg-blue-50", footerLabel: "iOS Solution" },
    ],
  },
  features: {
    badge: "IOS FEATURES",
    title: "Built For iOS",
    highlightedTitle: "Quality",
    description:
      "iOS features focused on usability, secure access, fast performance, and App Store readiness.",
    image: { src: "/images/enterprise-mobile-dashboardd.png", alt: "iOS mobile app interface" },
    items: [
      { title: "Secure Authentication", description: "Protect user sessions and sensitive data.", icon: "Lock" },
      { title: "Push Notifications", description: "Send timely app updates and reminders.", icon: "Smartphone" },
      { title: "Payment Support", description: "Support secure payment and checkout flows.", icon: "CreditCard" },
      { title: "Cloud Sync", description: "Keep app data updated across systems.", icon: "RefreshCw" },
      { title: "API Integration", description: "Connect with CRMs, ERPs, websites, and tools.", icon: "Cloud" },
      { title: "Analytics", description: "Measure user behavior and business outcomes.", icon: "BarChart3" },
      { title: "Role-Based Access", description: "Manage users, teams, and permissions.", icon: "KeyRound" },
      { title: "Scalable Codebase", description: "Plan for future app versions and features.", icon: "Layers3" },
    ],
  },
  whyChooseUs: {
    badge: "WHY IOS APPS MATTER",
    title: "Premium Users Expect",
    highlightedTitle: "Premium Apps.",
    description:
      "A well-built iOS app helps your brand deliver trust, convenience, and a polished experience to Apple users.",
    image: { src: "/images/mobile-app-phone.png", alt: "iOS app growth" },
    reasons: [
      { icon: "Smartphone", title: "Premium Experience", description: "Deliver refined interfaces for iPhone and iPad users." },
      { icon: "Clock3", title: "Faster Engagement", description: "Make important actions easy and quick." },
      { icon: "ShieldCheck", title: "Secure Access", description: "Protect customer and business data." },
      { icon: "TrendingUp", title: "Brand Growth", description: "Strengthen customer trust and digital presence." },
    ],
    quote: "A polished iOS app can turn your service into a premium digital experience.",
    quoteDescription: "Build an app Apple users enjoy using.",
  },
  testimonials: {
    badge: "Client Success Stories",
    title: "iOS Apps Built With Care",
    description:
      "Businesses trust Fillip Technologies to build clean, secure, and user-friendly iOS applications.",
    testimonials: [
      { name: "Rohit Mehra", role: "Founder", image: "", review: "The iOS app gave our customers a smoother and more premium booking experience." },
      { name: "Anjali Sinha", role: "Product Lead", image: "", review: "The interface was clean, fast, and exactly aligned with what our users needed." },
      { name: "Karan Gupta", role: "Business Owner", image: "", review: "Fillip Technologies handled design, development, and launch support very professionally." },
      { name: "Meera Kapoor", role: "Operations Manager", image: "", review: "Our internal iOS app simplified reporting and team communication." },
    ],
  },
  faq: {
    title: "Frequently Asked Questions About iOS App Development",
    description: "Common questions before building a custom iOS app.",
    faqs: [
      { question: "Do you build iPhone and iPad apps?", answer: "Yes. We build iOS apps for iPhone and iPad based on your business requirements." },
      { question: "Can you help with App Store submission?", answer: "Yes. We support App Store build preparation, listing assets, review guidance, and release steps." },
      { question: "Can the iOS app integrate with existing systems?", answer: "Yes. We integrate with CRMs, ERPs, payment gateways, websites, cloud tools, and APIs." },
      { question: "How long does an iOS app take?", answer: "Most iOS apps take 8-16 weeks depending on scope, design, integrations, and backend needs." },
      { question: "Do you provide post-launch support?", answer: "Yes. We provide maintenance, updates, bug fixes, and feature enhancements." },
    ],
    ctaTitle: "Ready To Build Your iOS App?",
    ctaDescription: "Let's plan your iOS app experience and launch roadmap.",
    ctaButtonText: "Book Free Consultation",
  },
  guidance: { title: "Planning an iOS App?", buttonText: "Discuss Your iOS App ->" },
} satisfies MobileAppDevelopmentContent;
