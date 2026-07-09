import type { SoftwareEnterpriseContent } from "./types";

export const crmDevelopmentContent: SoftwareEnterpriseContent = {
  slug: "crm-development",
  hero: {
    title: "Custom CRM Development That",
    highlightedTitle: "Grows Revenue",
    description:
      "Tailored CRM platforms that unify sales, marketing, and support around a single customer view — built for the way your team sells, not a generic template.",
  },
  challenges: {
    eyebrow: "CRM Challenges",
    title: "Your Customer Data Lives",
    highlightedTitle: "Everywhere But One Place.",
    description:
      "Leads in spreadsheets, conversations in inboxes, and deals in someone's head make it impossible to see the full pipeline.",
    secondaryDescription:
      "We build custom CRMs that centralise every customer interaction, automate follow-ups, and give leaders a real-time view of revenue.",
    cta: "See How A Custom CRM Helps",
    items: [
      {
        title: "Scattered Leads",
        description:
          "Prospects sit in spreadsheets and inboxes with no single source of truth.",
      },
      {
        title: "Missed Follow-Ups",
        description:
          "Manual tracking means deals slip through the cracks and revenue leaks.",
      },
      {
        title: "No Pipeline Visibility",
        description:
          "Leaders can't forecast accurately without a clear view of every stage.",
      },
      {
        title: "Generic CRM Bloat",
        description:
          "Off-the-shelf CRMs are packed with features you don't use and missing the ones you need.",
      },
      {
        title: "Disconnected Support",
        description:
          "Sales and support work in separate tools, so the customer repeats themselves.",
      },
      {
        title: "Poor Adoption",
        description:
          "Clunky, generic interfaces mean reps avoid the CRM and data stays incomplete.",
      },
    ],
  },
  whatWeBuild: {
    eyebrow: "CRM CAPABILITIES WE BUILD",
    title: "A CRM Shaped Around",
    highlightedTitle: "Your Sales Motion",
    description:
      "From lead capture to closed-won and renewal, we build the exact pipeline, automations, and reporting your team needs.",
    cards: [
      {
        eyebrow: "Pipeline Management",
        title: "Visual Deal Tracking",
        description:
          "Custom pipeline stages, deal scoring, and drag-and-drop boards matched to your process.",
        metric: "+30% Win Rate Visibility",
      },
      {
        eyebrow: "Automation",
        title: "Follow-Ups On Autopilot",
        description:
          "Automated reminders, email sequences, and task assignment so nothing gets forgotten.",
        metric: "Zero Missed Follow-Ups",
      },
      {
        title: "360° Customer View",
        description:
          "Every email, call, note, and ticket for a contact in one unified timeline.",
      },
      {
        title: "Reporting & Forecasting",
        description:
          "Real-time dashboards for pipeline value, conversion, and revenue forecasting.",
      },
      {
        title: "Integrations",
        description:
          "Connect email, calendar, telephony, marketing, and billing into one workflow.",
        tags: ["Email", "Telephony", "Marketing", "Billing", "APIs"],
      },
    ],
  },
  technologyStack: {
    eyebrow: "CRM Stack",
    title: "Built With Secure",
    highlightedTitle: "Business Technologies",
    description:
      "Scalable, secure technologies that keep customer data fast, safe, and available across every team.",
    whyTitle: "Why This Stack?",
    whyDescription:
      "We prioritise data security, integration flexibility, and a responsive interface reps will actually use every day.",
    stacks: {
      frontend: {
        title: "CRM Frontend",
        description:
          "Fast, intuitive interfaces that drive adoption across sales and support teams.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      backend: {
        title: "CRM Backend",
        description:
          "Secure services for contacts, deals, permissions, and automation rules.",
        technologies: ["Node.js", ".NET", "Python", "PostgreSQL", "REST APIs"],
      },
      integrations: {
        title: "Integrations & Data",
        description:
          "Connectors for email, telephony, marketing, and billing with reliable sync.",
        technologies: ["Webhooks", "OAuth", "GraphQL", "Zapier", "Twilio"],
      },
      cloud: {
        title: "Cloud & Security",
        description:
          "Encrypted, monitored infrastructure with role-based access and audit trails.",
        technologies: ["AWS", "Azure", "Docker", "CI/CD", "SSO"],
      },
    },
  },
  process: {
    title: "CRM Delivery",
    highlightedTitle: "Phases",
    description:
      "From mapping your sales process to rollout and adoption, every phase is tied to pipeline outcomes.",
    steps: [
      { title: "Discovery", items: ["Sales Process Map", "Data Audit", "User Roles", "Success Metrics"] },
      { title: "Design", items: ["Pipeline Stages", "Automation Rules", "Dashboards", "Prototype"] },
      { title: "Build", items: ["Core CRM", "Automations", "Integrations", "Reporting"] },
      { title: "Migrate", items: ["Data Cleanup", "Import", "Validation", "De-duplication"] },
      { title: "Testing", items: ["Functional QA", "Security", "Performance", "Bug Fixes"] },
      { title: "Rollout", items: ["Deployment", "Training", "Adoption", "Iteration"] },
    ],
  },
  engagementModels: {
    eyebrow: "How We Work Together",
    title: "CRM Engagement",
    highlightedTitle: "Models",
    description:
      "Pick the model that matches your rollout timeline and internal capacity.",
    models: [
      {
        badge: "Best for a clear process",
        title: "Fixed Scope Build",
        description:
          "A defined CRM delivered to an agreed pipeline, automations, and reporting scope.",
        points: ["Mapped sales process", "Fixed budget", "Milestone delivery", "Fast time-to-value"],
      },
      {
        badge: "Best for evolving teams",
        title: "Dedicated Team",
        description:
          "An ongoing team that extends and adapts your CRM as the business grows.",
        points: ["Rolling roadmap", "Monthly engagement", "Continuous improvement", "Flexible scope"],
      },
      {
        badge: "Best for migrations",
        title: "Migration & Support",
        description:
          "Move off a generic CRM with clean data migration and ongoing support.",
        points: ["Data migration", "Integrations", "Team training", "Post-launch support"],
      },
    ],
  },
  outcomes: {
    eyebrow: "CRM Outcomes",
    title: "A CRM That Actually",
    highlightedTitle: "Drives Revenue",
    description:
      "Every CRM we build is designed to improve adoption, forecasting accuracy, and conversion across the funnel.",
    stats: [
      { value: "+35%", label: "Rep Productivity" },
      { value: "+50%", label: "Pipeline Visibility" },
      { value: "-40%", label: "Data Entry Time" },
      { value: "+25%", label: "Follow-Up Rate" },
    ],
    leftPill: "Higher Adoption",
    rightPill: "Accurate Forecasts",
  },
  faq: {
    title: "CRM Development",
    highlightedTitle: "Questions",
    description:
      "Common questions about building a custom CRM with Fillip Technologies.",
    items: [
      {
        question: "Why build a custom CRM instead of using Salesforce or HubSpot?",
        answer:
          "A custom CRM fits your exact sales process without per-seat licensing or unused bloat. It's ideal when generic CRMs force costly workarounds or can't model how you sell.",
      },
      {
        question: "Can you migrate our existing customer data?",
        answer:
          "Yes. We handle data cleanup, de-duplication, and validated migration from spreadsheets or your current CRM so you start with clean, complete records.",
      },
      {
        question: "Will it integrate with our email and phone systems?",
        answer:
          "We integrate email, calendar, telephony, marketing, and billing so every interaction is captured automatically in one timeline.",
      },
      {
        question: "How do you ensure the team actually uses it?",
        answer:
          "Adoption comes from a fast, intuitive interface built around real workflows, plus training and iteration during rollout.",
      },
    ],
  },
};
