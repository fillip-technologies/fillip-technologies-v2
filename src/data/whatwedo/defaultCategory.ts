/**
 * Generic default content for a "What We Do" category page. Every newly created
 * category renders immediately with this placeholder copy; admins then edit the
 * text and upload per-category images from the CMS. Shape matches the industry
 * section components (reused by CategoryPageView). Images are intentionally
 * blank so each category sets its own.
 */
export const defaultCategoryData = {
  hero: {
    eyebrow: "What We Do",
    titleLines: ["Solutions That", "Move Your Business."],
    highlightedTitle: "Built to Grow.",
    description:
      "We design, build and market digital solutions that help your business attract more customers, work more efficiently, and grow with confidence.",
    primaryCta: { label: "Get Free Consultation", href: "/contact" },
    secondaryCta: { label: "Book Strategy Call", href: "/contact" },
    trustItems: ["Strategy", "Design", "Development", "Growth"],
    image: { src: "", alt: "" },
  },
  challenges: {
    badge: "Challenges We Solve",
    title: "Why Businesses Struggle to Get Results",
    description:
      "Even great businesses lose opportunities when their digital foundation fails to build visibility, trust and engagement.",
    flowerImage: "",
    items: [
      {
        badge: "Experience",
        title: "Outdated Digital Presence",
        description:
          "Slow, dated or confusing experiences create friction that discourages customers from taking action.",
        impact: "Lost Opportunities",
        image: "",
      },
      {
        badge: "Visibility",
        title: "Low Online Visibility",
        description:
          "When customers search, competitors appear first. Limited visibility reduces discovery and enquiries.",
        impact: "Fewer Leads",
        image: "",
      },
      {
        badge: "Trust",
        title: "Weak Brand Trust",
        description:
          "Inconsistent presence makes it harder for customers to trust your expertise and choose you.",
        impact: "Lower Confidence",
        image: "",
      },
    ],
  },
  growthEngine: {
    badge: "Our Approach",
    title: "One System. Every Channel Working Together.",
    description:
      "Strategy, design, development and marketing work together inside one connected system to attract, engage and convert more customers.",
    image: { src: "", alt: "" },
    leftCards: [
      { icon: "Globe", title: "Strategy & Discovery", description: "We understand your goals and map the fastest path to results." },
      { icon: "Search", title: "Design & Build", description: "Modern, high-performing experiences crafted to convert." },
    ],
    rightCards: [
      { icon: "Share2", title: "Launch & Optimize", description: "We ship, measure and refine for continuous improvement." },
      { icon: "Megaphone", title: "Grow & Scale", description: "Drive qualified demand through targeted campaigns." },
    ],
  },
  timeline: {
    headingPrimary: "Our",
    headingSecondary: "Process",
    tags: ["Clarity", "Speed", "Results"],
    eyebrow: "HOW IT WORKS — OUR DELIVERY FLOW",
    labels: ["DISCOVER", "DESIGN", "BUILD", "GROW"],
    steps: [
      { step: "01", title: "Discovery", description: "We align on goals, audience and success metrics.", icon: "Search" },
      { step: "02", title: "Design", description: "We craft experiences that build trust and convert.", icon: "Globe" },
      { step: "03", title: "Build", description: "We develop robust, scalable solutions.", icon: "Users", active: true },
      { step: "04", title: "Launch", description: "We ship and validate in the real world.", icon: "Share2" },
      { step: "05", title: "Grow", description: "We optimize and scale what works.", icon: "Megaphone" },
    ],
  },
  whyChooseUs: {
    badge: "WHY CHOOSE US",
    image: { src: "", alt: "" },
    titlePrefix: "Your Customers Are Searching",
    titleHighlight: "Right Now.",
    titleSuffix: "Will They Find You?",
    description:
      "Customers decide quickly. If your presence is invisible or outdated, those opportunities often go to competitors instead.",
    reasons: [
      { icon: "Clock3", title: "Faster Time to Value", description: "Systems designed to shorten the gap between discovery and conversion." },
      { icon: "MapPin", title: "Precision Targeting", description: "Reach the right audience where they are actively looking." },
      { icon: "ShieldCheck", title: "Trust By Design", description: "Professional experiences and social proof build trust before first contact." },
      { icon: "TrendingUp", title: "Measurable Growth", description: "Track enquiries, rankings and engagement through transparent reporting." },
    ],
    quoteTitle: "Every moment a customer spends searching is a chance to choose your competitor.",
    quoteDescription: "Make your business the obvious choice.",
  },
  testimonials: {
    badge: "Testimonials",
    title: "Trusted by Growing Businesses",
    description:
      "Businesses trust Fillip Technologies to improve visibility, strengthen trust and generate more qualified opportunities.",
    items: [
      { name: "Client Name", role: "Founder", image: "", review: "Working with the team transformed our digital presence and results." },
      { name: "Client Name", role: "Marketing Lead", image: "", review: "We now rank for the searches that matter and enquiries are consistent." },
      { name: "Client Name", role: "CEO", image: "", review: "A complete growth system — customers discover us faster and trust us sooner." },
    ],
  },
  faqs: {
    title: "Everything You Need To Know",
    description: "Common questions businesses ask before starting.",
    items: [
      { question: "How long does it take to see results?", answer: "Most engagements begin showing measurable improvements within 3–6 months, depending on scope and competition." },
      { question: "What types of businesses do you work with?", answer: "We work with startups, SMBs and enterprises across many industries." },
      { question: "How do you approach a new project?", answer: "We start with discovery to align on goals, then design, build and grow through an iterative process." },
      { question: "Do all channels work together?", answer: "Yes. Strategy, design, development and marketing are connected into one system for compounding results." },
    ],
    ctaTitle: "Still Have Questions?",
    ctaDescription: "Let's discuss your goals and how we can help you grow.",
    ctaButtonText: "Book Free Strategy Call",
  },
};
