import type { CreativeDesignContent } from "./types";

export const uiUxDesigningContent: CreativeDesignContent = {
  slug: "ui-ux-designing",
  hero: {
    title: "UI/UX Design That Turns",
    highlightedTitle: "Visitors Into Customers",
    description:
      "Research-led product and interface design that makes every screen effortless to use — beautiful, on-brand, and engineered to convert.",
  },
  capabilities: {
    eyebrow: "WHAT WE DESIGN",
    title: "Experiences People",
    highlightedTitle: "Love To Use",
    description:
      "From first sketch to polished, developer-ready screens — we design the full journey across web, mobile, and product.",
    cards: [
      {
        eyebrow: "Research",
        title: "UX Research & Strategy",
        description:
          "User interviews, journey maps, and competitive audits that ground every design decision in evidence.",
        metric: "Fewer Redesigns",
      },
      {
        eyebrow: "Structure",
        title: "Wireframing & Prototyping",
        description:
          "Low- to high-fidelity flows and clickable prototypes you can test before a line of code is written.",
        metric: "Validate Early",
      },
      {
        title: "Interface Design",
        description:
          "Pixel-perfect, accessible UI with a consistent visual language across every screen and state.",
      },
      {
        title: "Design Systems",
        description:
          "Reusable component libraries and tokens that keep your product consistent and fast to build.",
        tags: ["Figma", "Tokens", "Components", "Docs"],
      },
      {
        title: "Usability Testing",
        description:
          "Moderated and unmoderated testing to find friction and validate that the design actually works.",
      },
      {
        title: "Handoff & Support",
        description:
          "Developer-ready specs, assets, and prototypes with ongoing design support through build.",
      },
    ],
  },
  portfolio: {
    eyebrow: "SELECTED WORK",
    title: "Design That Ships",
    highlightedTitle: "& Performs",
    description:
      "A glimpse of interfaces, apps, and product experiences we've crafted across industries.",
    items: [
      { title: "SaaS Analytics Dashboard", category: "Web App UI", image: "" },
      { title: "Fintech Mobile Banking", category: "Mobile UX", image: "" },
      { title: "E-Commerce Redesign", category: "Web & Conversion", image: "" },
      { title: "Healthcare Patient Portal", category: "Product Design", image: "" },
      { title: "Logistics Ops Console", category: "Design System", image: "" },
      { title: "EdTech Learning App", category: "Mobile UI", image: "" },
    ],
  },
  process: {
    title: "Our Design",
    highlightedTitle: "Process",
    description:
      "A structured, collaborative process that de-risks design and keeps you involved at every step.",
    steps: [
      { title: "Discover", items: ["Stakeholder Workshop", "User Research", "Competitive Audit", "Goals & KPIs"] },
      { title: "Define", items: ["User Personas", "Journey Maps", "Information Architecture", "Success Metrics"] },
      { title: "Design", items: ["Wireframes", "Visual Design", "Interactive Prototype", "Design System"] },
      { title: "Validate", items: ["Usability Testing", "Feedback Loops", "Iteration", "Refinement"] },
      { title: "Deliver", items: ["Dev-Ready Specs", "Asset Handoff", "Documentation", "Build Support"] },
    ],
  },
  whyChooseUs: {
    eyebrow: "WHY FILLIP",
    title: "Design With A",
    highlightedTitle: "Business Mindset",
    description:
      "We don't just make things pretty — we design to move the metrics that matter to your business.",
    items: [
      {
        title: "Outcome-Driven",
        description:
          "Every design choice ties back to conversion, retention, or engagement — not just aesthetics.",
      },
      {
        title: "Research-Led",
        description:
          "We validate with real users so you invest in what works, not guesses.",
      },
      {
        title: "Developer-Ready",
        description:
          "Clean, well-documented handoffs mean your engineers build faster with fewer questions.",
      },
      {
        title: "Systemised & Scalable",
        description:
          "Design systems keep your product consistent as it grows across teams and platforms.",
      },
    ],
  },
  faq: {
    title: "UI/UX Design",
    highlightedTitle: "Questions",
    description:
      "Common questions about working with Fillip Technologies on product and interface design.",
    items: [
      {
        question: "What's the difference between UI and UX design?",
        answer:
          "UX design shapes how a product works — the flows, structure, and logic that make it easy to use. UI design shapes how it looks — the visual layer, typography, colour, and components. We deliver both as one cohesive experience.",
      },
      {
        question: "Do you work from our existing brand and design system?",
        answer:
          "Yes. We can extend your existing brand and design system, or build a new one from scratch if you don't have one yet.",
      },
      {
        question: "Will the designs be ready for our developers?",
        answer:
          "Absolutely. We deliver developer-ready Figma files with specs, tokens, assets, and interactive prototypes, and we stay available through the build.",
      },
      {
        question: "Can you test the designs with real users?",
        answer:
          "Yes. We run moderated and unmoderated usability testing to validate flows and catch friction before development starts.",
      },
    ],
  },
};
