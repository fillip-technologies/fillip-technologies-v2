import type { CreativeDesignContent } from "./types";

export const productDesignContent: CreativeDesignContent = {
  slug: "product-design",
  hero: {
    title: "",
    highlightedTitle: "Ideas Into Products",
    description:
      "End-to-end product design — from problem discovery to shippable, validated experiences that users adopt and businesses can scale.",
  },
  capabilities: {
    eyebrow: "WHAT WE DESIGN",
    title: "From Concept To",
    highlightedTitle: "Market-Ready Product",
    description:
      "We own the full product design lifecycle — strategy, UX, UI, and the systems that keep it consistent as you grow.",
    cards: [
      {
        eyebrow: "Strategy",
        title: "Product Discovery",
        description:
          "Workshops, market research, and problem framing that align the team on what to build and why.",
        metric: "Build The Right Thing",
      },
      {
        eyebrow: "Definition",
        title: "MVP Scoping",
        description:
          "Prioritised feature sets and roadmaps that get a lovable product to market faster.",
        metric: "Faster To Market",
      },
      {
        title: "Interaction Design",
        description:
          "Flows, states, and micro-interactions designed for clarity and delight across the whole journey.",
      },
      {
        title: "Design Systems",
        description:
          "Scalable component libraries and tokens that keep the product consistent across teams and platforms.",
        tags: ["Figma", "Tokens", "Components"],
      },
      {
        title: "Prototyping & Testing",
        description:
          "Interactive prototypes and usability testing to validate ideas before engineering invests.",
      },
      {
        title: "Design-to-Dev Handoff",
        description:
          "Developer-ready specs, assets, and ongoing design support through the build.",
      },
    ],
  },
  portfolio: {
    eyebrow: "SELECTED WORK",
    title: "Products We've",
    highlightedTitle: "Shaped",
    description:
      "A glimpse of product experiences we've designed from zero to launch across industries.",
    items: [
      { title: "B2B SaaS Platform", category: "Product Design", image: "" },
      { title: "Fintech Onboarding", category: "UX Flows", image: "" },
      { title: "Marketplace App", category: "Mobile Product", image: "" },
      { title: "Analytics Suite", category: "Design System", image: "" },
      { title: "Health Tracker", category: "Product Design", image: "" },
      { title: "Internal Ops Tool", category: "Enterprise UX", image: "" },
    ],
  },
  process: {
    title: "Our Product Design",
    highlightedTitle: "Process",
    description:
      "A structured, iterative process that de-risks product decisions and keeps you involved throughout.",
    steps: [
      { title: "Discover", items: ["Stakeholder Workshop", "Market Research", "Problem Framing", "Goals & KPIs"] },
      { title: "Define", items: ["User Personas", "Journey Maps", "Feature Prioritisation", "MVP Scope"] },
      { title: "Design", items: ["Wireframes", "UI Design", "Interactive Prototype", "Design System"] },
      { title: "Validate", items: ["Usability Testing", "Feedback Loops", "Iteration", "Refinement"] },
      { title: "Deliver", items: ["Dev-Ready Specs", "Asset Handoff", "Documentation", "Build Support"] },
    ],
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Design With A",
    highlightedTitle: "Product Mindset",
    description:
      "We design for outcomes — usable products that ship, get adopted, and move your business metrics.",
    items: [
      {
        title: "Outcome-Driven",
        description:
          "Every decision ties back to adoption, retention, or revenue — not just visuals.",
      },
      {
        title: "Research-Led",
        description:
          "We validate with real users so you invest in what works, not assumptions.",
      },
      {
        title: "End-to-End Ownership",
        description:
          "From discovery to handoff, one team carries the product vision through to build.",
      },
      {
        title: "Systemised & Scalable",
        description:
          "Design systems keep the product consistent as it grows across teams and platforms.",
      },
    ],
  },
  faq: {
    title: "Product Design",
    highlightedTitle: "Questions",
    description:
      "Common questions about working with Fillip Technologies on product design.",
    items: [
      {
        question: "How is product design different from UI/UX design?",
        answer:
          "Product design is broader — it covers strategy, discovery, and prioritisation alongside UX and UI. We help decide what to build and why, then design how it looks and works.",
      },
      {
        question: "Can you help us scope an MVP?",
        answer:
          "Yes. We prioritise features against your goals and constraints so you launch a focused, lovable first version and iterate from real usage.",
      },
      {
        question: "Do you work with our engineering team?",
        answer:
          "Absolutely. We deliver developer-ready specs and prototypes and stay involved through the build to keep design intent intact.",
      },
      {
        question: "Can you test concepts before we build?",
        answer:
          "Yes. We run usability testing on interactive prototypes to validate flows and reduce costly rework during development.",
      },
    ],
  },
};
