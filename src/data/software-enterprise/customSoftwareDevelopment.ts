import type { SoftwareEnterpriseContent } from "./types";

export const customSoftwareDevelopmentContent: SoftwareEnterpriseContent = {
  slug: "custom-software-development",
  hero: {
    title: "Custom Software Built Around",
    highlightedTitle: "Your Exact Workflows",
    description:
      "Bespoke software engineering for businesses that have outgrown off-the-shelf tools — tailored applications, automations, and platforms designed around how your teams actually work.",
  },
  challenges: {
    eyebrow: "Why Off-The-Shelf Falls Short",
    title: "Generic Tools Force You To",
    highlightedTitle: "Work Their Way.",
    description:
      "Packaged software rarely matches unique processes, so teams bend their workflows around the tool instead of the other way around.",
    secondaryDescription:
      "We build custom software that fits your operations precisely — removing workarounds, manual glue work, and licensing you don't use.",
    cta: "See How Custom Software Fits You",
    items: [
      {
        title: "Rigid Feature Sets",
        description:
          "SaaS products lock you into fixed workflows, leaving gaps your team fills with manual effort.",
      },
      {
        title: "Costly Licensing",
        description:
          "Per-seat pricing grows with your team while you pay for features you never use.",
      },
      {
        title: "Data Silos",
        description:
          "Every new tool adds another disconnected database that reporting has to stitch together.",
      },
      {
        title: "Limited Automation",
        description:
          "Closed platforms restrict the automations and integrations you can build on top.",
      },
      {
        title: "Vendor Lock-In",
        description:
          "Your business logic lives in someone else's product, and migrating later is painful.",
      },
      {
        title: "Slow To Change",
        description:
          "Feature requests sit in a vendor backlog for months instead of shipping when you need them.",
      },
    ],
  },
  whatWeBuild: {
    eyebrow: "CUSTOM SOFTWARE WE ENGINEER",
    title: "Applications Built For",
    highlightedTitle: "Your Business Logic",
    description:
      "From internal tools and customer portals to workflow engines and data platforms, we design software around your real operations.",
    cards: [
      {
        eyebrow: "Internal Tools",
        title: "Operations & Admin Systems",
        description:
          "Custom back-office applications that centralise workflows, approvals, records, and team activity.",
        metric: "+40% Faster Operations",
      },
      {
        eyebrow: "Customer Portals",
        title: "Self-Service Platforms",
        description:
          "Branded portals where customers track orders, tickets, documents, and account activity.",
        metric: "24/7 Self-Service",
      },
      {
        title: "Workflow Engines",
        description:
          "Rules-driven automation for approvals, routing, and multi-step business processes.",
      },
      {
        title: "Data Platforms",
        description:
          "Central data stores with search, reporting, and role-based access across teams.",
      },
      {
        title: "Legacy Modernisation",
        description:
          "Rebuild ageing systems on a modern, maintainable stack without disrupting operations.",
        tags: ["Migration", "APIs", "Cloud", "Refactor", "Integrations"],
      },
    ],
  },
  technologyStack: {
    eyebrow: "Engineering Stack",
    title: "Built With Reliable",
    highlightedTitle: "Application Technologies",
    description:
      "Proven frameworks, secure backends, and cloud infrastructure chosen for maintainability and long-term ownership.",
    whyTitle: "Why This Stack?",
    whyDescription:
      "We select technologies around your workflow complexity, data needs, security requirements, and the team that will maintain the system.",
    stacks: {
      frontend: {
        title: "Application Frontend",
        description:
          "Fast, accessible interfaces for dashboards, portals, and data-heavy workflows.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vue.js"],
      },
      backend: {
        title: "Application Backend",
        description:
          "Secure services for business logic, permissions, APIs, and data processing.",
        technologies: ["Node.js", ".NET", "Python", "Laravel", "PostgreSQL", "REST APIs"],
      },
      data: {
        title: "Data & Admin",
        description:
          "Databases, admin panels, and reporting layers that keep operations visible.",
        technologies: ["PostgreSQL", "MongoDB", "Redis", "GraphQL", "Admin Panels"],
      },
      cloud: {
        title: "Cloud & DevOps",
        description:
          "Deployment, monitoring, and CI/CD for reliable, repeatable releases.",
        technologies: ["AWS", "Azure", "Docker", "CI/CD", "Vercel"],
      },
    },
  },
  process: {
    title: "Delivery Phases",
    highlightedTitle: "and Timeline",
    description:
      "From workflow discovery to launch and iteration, every phase is tied to measurable operational outcomes.",
    steps: [
      { title: "Discovery", items: ["Workflow Audit", "User Roles", "Data Review", "Success Metrics"] },
      { title: "Architecture", items: ["System Design", "Feature Scope", "Integration Map", "Roadmap"] },
      { title: "Design", items: ["User Flows", "Wireframes", "UI Design", "Prototype"] },
      { title: "Build", items: ["Frontend", "Backend", "APIs", "Database"] },
      { title: "Testing", items: ["Functional QA", "Security", "Performance", "Bug Fixes"] },
      { title: "Launch", items: ["Deployment", "Monitoring", "Training", "Iteration"] },
    ],
  },
  engagementModels: {
    eyebrow: "How We Work Together",
    title: "Engagement Models That",
    highlightedTitle: "Fit Your Project",
    description:
      "Choose the collaboration model that matches your scope, timeline, and internal capacity.",
    models: [
      {
        badge: "Best for defined scope",
        title: "Fixed Scope & Timeline",
        description:
          "A clearly specified build delivered to an agreed scope, budget, and schedule.",
        points: ["Detailed spec upfront", "Fixed budget", "Milestone delivery", "Ideal for MVPs"],
      },
      {
        badge: "Best for evolving needs",
        title: "Dedicated Team",
        description:
          "A cross-functional team that works as an extension of yours on a rolling basis.",
        points: ["Flexible roadmap", "Monthly engagement", "Direct collaboration", "Scales up or down"],
      },
      {
        badge: "Best for extra capacity",
        title: "Staff Augmentation",
        description:
          "Vetted engineers who plug into your existing team and processes.",
        points: ["Fill skill gaps", "Your tooling & process", "Fast onboarding", "No hiring overhead"],
      },
    ],
  },
  outcomes: {
    eyebrow: "Software Outcomes",
    title: "Systems That Improve",
    highlightedTitle: "Business Operations",
    description:
      "Every build is designed to cut manual work, connect systems, and support scalable, measurable operations.",
    stats: [
      { value: "+40%", label: "Operational Speed" },
      { value: "-35%", label: "Manual Effort" },
      { value: "+55%", label: "Process Visibility" },
      { value: "99.9%", label: "System Uptime" },
    ],
    leftPill: "Tailored Workflows",
    rightPill: "Full Ownership",
  },
  faq: {
    title: "Custom Software",
    highlightedTitle: "Questions",
    description:
      "Common questions about building bespoke software with Fillip Technologies.",
    items: [
      {
        question: "How long does a custom software project take?",
        answer:
          "A focused MVP typically ships in 8–12 weeks. Larger platforms are delivered in phases so you get working software early and iterate from there.",
      },
      {
        question: "Do we own the source code?",
        answer:
          "Yes. You retain full ownership of the code, data, and infrastructure — there's no vendor lock-in or per-seat licensing.",
      },
      {
        question: "Can you integrate with our existing tools?",
        answer:
          "Absolutely. We build API integrations with CRMs, ERPs, payment systems, and internal databases so your software works with the stack you already use.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We offer ongoing support, monitoring, and iteration so the system keeps pace with your operations as they evolve.",
      },
    ],
  },
};
