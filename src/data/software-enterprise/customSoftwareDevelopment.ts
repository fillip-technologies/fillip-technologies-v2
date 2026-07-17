import type { SoftwareEnterpriseContent } from "./types";

export const customSoftwareDevelopmentContent: SoftwareEnterpriseContent = {
  slug: "custom-software-development",
  hero: {
    badge: "Custom Software Engineering",
    title: "Custom Software Built Around",
    highlightedTitle: "Your Exact Workflows",
    description:
      "Bespoke software engineering for businesses that have outgrown off-the-shelf tools — tailored applications, automations, and platforms designed around how your teams actually work.",
    bullets: [
      { icon: "layers", label: "Workflow-Fit Architecture" },
      { icon: "shield", label: "Role-Based Access & Security" },
      { icon: "database", label: "Unified Data Platform" },
      { icon: "check", label: "Full Source-Code Ownership" },
    ],
    primaryCta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/portfolio" },
  },
  capabilities: {
    eyebrow: "WHAT WE ENGINEER",
    title: "Applications Built For",
    highlightedTitle: "Your Business Logic",
    description:
      "From internal tools and customer portals to workflow engines and data platforms, we design software around your real operations. Explore the capabilities below.",
    cards: [
      {
        title: "Workflow & Process Engines",
        description:
          "Rules-driven automation for approvals, routing, and multi-step business processes — modelled precisely around how your teams operate.",
        caption: "Process Routing Simulator",
      },
      {
        title: "Operations & Admin Systems",
        description:
          "Custom back-office applications that centralise workflows, approvals, records, and team activity in one place.",
        caption: "Approval Cost Preview",
      },
      {
        title: "Reporting & Data Platforms",
        description:
          "Central data stores with search, dashboards, and role-based reporting that keep operations visible across teams.",
        caption: "Operations KPI Trend",
      },
      {
        title: "Cloud, CI/CD & Ownership",
        description:
          "Applications containerised with Docker, shipped through secure CI/CD pipelines, and deployed on cloud infrastructure you fully own.",
        caption: "CI/CD Deployment Runner",
      },
    ],
  },
  scaleTiers: {
    eyebrow: "ENGAGEMENT MODELS",
    title: "A Delivery Model That Fits Your Project",
    description:
      "Choose the collaboration model that matches your scope, timeline, and internal capacity. Every build ships with clean, documented, fully owned code.",
    tiers: [
      {
        id: "fixed-scope",
        label: "Fixed Scope",
        title: "Fixed Scope & Timeline",
        description:
          "A clearly specified build delivered to an agreed scope, budget, and schedule — ideal for well-defined MVPs and internal tools.",
        metrics: [
          { label: "Best For", value: "Defined Scope" },
          { label: "Commercials", value: "Fixed Budget" },
          { label: "Delivery", value: "Milestone-Based" },
          { label: "Typical Timeline", value: "8-12 Weeks" },
        ],
        architecture: {
          title: "Spec-First Delivery",
          desc: "Detailed specification, fixed milestones, and predictable delivery against an agreed plan.",
          nodes: [
            { label: "Discovery & Spec", icon: "globe" },
            { label: "Milestone Build", icon: "server" },
            { label: "Handover & Docs", icon: "database" },
          ],
        },
      },
      {
        id: "dedicated-team",
        label: "Dedicated Team",
        title: "Dedicated Product Team",
        description:
          "A cross-functional team that works as an extension of yours on a rolling basis — flexible roadmap, monthly engagement, direct collaboration.",
        metrics: [
          { label: "Best For", value: "Evolving Needs" },
          { label: "Commercials", value: "Monthly Retainer" },
          { label: "Delivery", value: "Rolling Sprints" },
          { label: "Scales", value: "Up or Down" },
        ],
        architecture: {
          title: "Embedded Delivery Squad",
          desc: "Product, engineering, and QA working directly with your stakeholders every sprint.",
          nodes: [
            { label: "Product & UX", icon: "globe" },
            { label: "Engineering Pod", icon: "server" },
            { label: "QA & Release", icon: "refresh" },
          ],
        },
      },
      {
        id: "staff-augmentation",
        label: "Staff Augmentation",
        title: "Staff Augmentation",
        description:
          "Vetted engineers who plug into your existing team, tooling, and processes to fill skill gaps and add capacity fast.",
        metrics: [
          { label: "Best For", value: "Extra Capacity" },
          { label: "Process", value: "Your Tooling" },
          { label: "Onboarding", value: "Fast Ramp-Up" },
          { label: "Overhead", value: "No Hiring Cost" },
        ],
        architecture: {
          title: "Integrated Into Your Stack",
          desc: "Engineers work inside your repos, boards, and standups from day one.",
          nodes: [
            { label: "Your Codebase", icon: "globe" },
            { label: "Augmented Engineers", icon: "server" },
            { label: "Your CI/CD", icon: "refresh" },
          ],
        },
      },
    ],
  },
  faq: {
    title: "Custom Software",
    highlightedTitle: "Questions",
    description: "Common questions about building bespoke software with Fillip Technologies.",
    items: [
      {
        category: "Timeline & IP",
        question: "How long does a custom software project take?",
        answer:
          "A focused MVP typically ships in 8–12 weeks. Larger platforms are delivered in phases so you get working software early and iterate from there.",
      },
      {
        category: "Timeline & IP",
        question: "Do we own the source code?",
        answer:
          "Yes. You retain full ownership of the code, data, and infrastructure — there's no vendor lock-in or per-seat licensing.",
      },
      {
        category: "Integration",
        question: "Can you integrate with our existing tools?",
        answer:
          "Absolutely. We build API integrations with CRMs, ERPs, payment systems, and internal databases so your software works with the stack you already use.",
      },
      {
        category: "Support",
        question: "What happens after launch?",
        answer:
          "We offer ongoing support, monitoring, and iteration so the system keeps pace with your operations as they evolve.",
      },
    ],
  },
};
