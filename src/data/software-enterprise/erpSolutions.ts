import type { SoftwareEnterpriseContent } from "./types";

export const erpSolutionsContent: SoftwareEnterpriseContent = {
  slug: "erp-solutions",
  hero: {
    title: "ERP Solutions That Connect",
    highlightedTitle: "Your Whole Business",
    description:
      "Custom and modular ERP platforms that unify finance, inventory, HR, and operations into one connected system — with the flexibility off-the-shelf ERPs can't offer.",
  },
  challenges: {
    eyebrow: "ERP Challenges",
    title: "Departments Run On Systems",
    highlightedTitle: "That Don't Talk.",
    description:
      "Finance, inventory, procurement, and HR each keep their own records, so reconciling them is slow, manual, and error-prone.",
    secondaryDescription:
      "We build ERP solutions that connect every department on shared data, automate cross-team processes, and give leadership one source of truth.",
    cta: "See How A Connected ERP Helps",
    items: [
      {
        title: "Fragmented Systems",
        description:
          "Each department runs separate software, forcing constant manual reconciliation.",
      },
      {
        title: "Duplicate Data Entry",
        description:
          "The same record gets re-keyed across finance, inventory, and operations.",
      },
      {
        title: "Slow Reporting",
        description:
          "Month-end consolidation takes days because data lives in disconnected tools.",
      },
      {
        title: "Rigid Legacy ERP",
        description:
          "Old ERP systems are expensive to change and don't match modern workflows.",
      },
      {
        title: "Poor Inventory Accuracy",
        description:
          "Stock levels drift from reality without real-time, connected tracking.",
      },
      {
        title: "Limited Visibility",
        description:
          "Leadership lacks a live, cross-department view of costs and performance.",
      },
    ],
  },
  whatWeBuild: {
    eyebrow: "ERP MODULES WE ENGINEER",
    title: "Modular ERP Built For",
    highlightedTitle: "Connected Operations",
    description:
      "Deploy the modules you need today and extend as you grow — all sharing one data layer and one interface.",
    cards: [
      {
        eyebrow: "Finance & Accounting",
        title: "Unified Financials",
        description:
          "Ledgers, invoicing, payables, and reporting connected to every transaction across the business.",
        metric: "Faster Month-End Close",
      },
      {
        eyebrow: "Inventory & Supply",
        title: "Real-Time Stock Control",
        description:
          "Live inventory, procurement, and warehouse tracking synced across locations.",
        metric: "+45% Inventory Accuracy",
      },
      {
        title: "HR & Payroll",
        description:
          "Employee records, attendance, leave, and payroll in one connected module.",
      },
      {
        title: "Procurement & Vendors",
        description:
          "Purchase orders, approvals, and vendor management with full audit trails.",
      },
      {
        title: "Analytics & Reporting",
        description:
          "Cross-department dashboards for costs, performance, and forecasting.",
        tags: ["Finance", "Inventory", "HR", "Procurement", "Reports"],
      },
    ],
  },
  technologyStack: {
    eyebrow: "ERP Stack",
    title: "Built With Enterprise",
    highlightedTitle: "Grade Technologies",
    description:
      "Robust, secure technologies designed for high-volume transactions, data integrity, and long-term reliability.",
    whyTitle: "Why This Stack?",
    whyDescription:
      "ERP demands data integrity, auditability, and performance at scale — we choose technologies that deliver all three.",
    stacks: {
      frontend: {
        title: "ERP Frontend",
        description:
          "Role-based interfaces for finance, operations, and management teams.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      backend: {
        title: "ERP Backend",
        description:
          "Transactional services for accounting, inventory, and workflow logic.",
        technologies: ["Node.js", ".NET", "Python", "PostgreSQL", "REST APIs"],
      },
      data: {
        title: "Data & Reporting",
        description:
          "A shared data layer with reporting, audit trails, and analytics.",
        technologies: ["PostgreSQL", "Data Warehouse", "GraphQL", "BI Tools"],
      },
      cloud: {
        title: "Cloud & Security",
        description:
          "Scalable, monitored infrastructure with backups and access controls.",
        technologies: ["AWS", "Azure", "Docker", "CI/CD", "SSO"],
      },
    },
  },
  process: {
    title: "ERP Delivery",
    highlightedTitle: "Phases",
    description:
      "From process mapping to phased rollout, every module is delivered against measurable operational goals.",
    steps: [
      { title: "Discovery", items: ["Process Mapping", "Module Scope", "Data Audit", "Success Metrics"] },
      { title: "Architecture", items: ["Data Model", "Module Plan", "Integration Map", "Roadmap"] },
      { title: "Design", items: ["User Roles", "Workflows", "Dashboards", "Prototype"] },
      { title: "Build", items: ["Core Modules", "Automations", "Integrations", "Reporting"] },
      { title: "Migrate", items: ["Data Cleanup", "Import", "Validation", "Reconciliation"] },
      { title: "Rollout", items: ["Phased Launch", "Training", "Monitoring", "Iteration"] },
    ],
  },
  engagementModels: {
    eyebrow: "How We Work Together",
    title: "ERP Engagement",
    highlightedTitle: "Models",
    description:
      "ERP is best delivered in phases — choose the model that matches your rollout appetite.",
    models: [
      {
        badge: "Best for a focused rollout",
        title: "Phased Module Build",
        description:
          "Start with your highest-impact module and expand across departments over time.",
        points: ["One module first", "Prove value early", "Expand in phases", "Controlled risk"],
      },
      {
        badge: "Best for full transformation",
        title: "Dedicated Team",
        description:
          "A long-term team that delivers and evolves your ERP across the whole business.",
        points: ["Multi-module roadmap", "Ongoing engagement", "Change management", "Continuous delivery"],
      },
      {
        badge: "Best for legacy replacement",
        title: "Migration & Support",
        description:
          "Move off legacy ERP with careful data migration and ongoing support.",
        points: ["Legacy migration", "Data reconciliation", "Team training", "Post-launch support"],
      },
    ],
  },
  outcomes: {
    eyebrow: "ERP Outcomes",
    title: "One System That Runs",
    highlightedTitle: "The Whole Business",
    description:
      "Every ERP we build is designed to connect departments, reduce manual reconciliation, and give leadership real-time visibility.",
    stats: [
      { value: "+45%", label: "Inventory Accuracy" },
      { value: "-50%", label: "Reconciliation Time" },
      { value: "+60%", label: "Reporting Speed" },
      { value: "99.9%", label: "Data Integrity" },
    ],
    leftPill: "Connected Departments",
    rightPill: "One Source Of Truth",
  },
  faq: {
    title: "ERP Solutions",
    highlightedTitle: "Questions",
    description:
      "Common questions about building an ERP with Fillip Technologies.",
    items: [
      {
        question: "Do we have to replace everything at once?",
        answer:
          "No. We deliver ERP in phases — starting with your highest-impact module and expanding across departments so risk stays controlled and value comes early.",
      },
      {
        question: "Can it integrate with our existing tools?",
        answer:
          "Yes. We connect accounting software, e-commerce, logistics, and other systems so the ERP becomes the shared data layer without ripping out what works.",
      },
      {
        question: "How do you handle data migration?",
        answer:
          "We clean, map, import, and reconcile your existing data with validation at each step so balances and records match before go-live.",
      },
      {
        question: "Is a custom ERP secure enough for finance data?",
        answer:
          "We build with encryption, role-based access, audit trails, and monitored cloud infrastructure to keep financial and operational data safe.",
      },
    ],
  },
};
