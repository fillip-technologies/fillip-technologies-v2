import type { SoftwareEnterpriseContent } from "./types";

export const apiIntegrationContent: SoftwareEnterpriseContent = {
  slug: "api-integration",
  hero: {
    title: "API Integration That Makes",
    highlightedTitle: "Your Systems Talk",
    description:
      "Custom API development and integration services that connect your apps, platforms, and data — eliminating manual transfers and keeping every system in sync.",
  },
  challenges: {
    eyebrow: "Integration Challenges",
    title: "Your Best Tools Are",
    highlightedTitle: "Working In Isolation.",
    description:
      "Without integrations, teams copy data between systems by hand, reports go stale, and automation stalls at every tool boundary.",
    secondaryDescription:
      "We design and build APIs and integrations that connect your stack, automate data flow, and keep every platform working from the same information.",
    cta: "See How Integration Helps",
    items: [
      {
        title: "Manual Data Transfer",
        description:
          "Teams export and re-import data between tools, wasting time and introducing errors.",
      },
      {
        title: "Out-Of-Sync Systems",
        description:
          "Records differ across platforms because nothing keeps them updated in real time.",
      },
      {
        title: "No Public API",
        description:
          "Your product can't connect to partners or customers without an API to build on.",
      },
      {
        title: "Fragile Point Fixes",
        description:
          "One-off scripts break silently and leave no visibility when data stops flowing.",
      },
      {
        title: "Legacy Connectivity",
        description:
          "Older systems lack modern endpoints, blocking automation and reporting.",
      },
      {
        title: "Scaling Bottlenecks",
        description:
          "Ad-hoc integrations can't handle growing volume without failures and delays.",
      },
    ],
  },
  whatWeBuild: {
    eyebrow: "INTEGRATION SERVICES WE BUILD",
    title: "Connections Built For",
    highlightedTitle: "Reliable Data Flow",
    description:
      "From custom APIs to third-party integrations and middleware, we connect your systems with resilient, monitored pipelines.",
    cards: [
      {
        eyebrow: "Custom APIs",
        title: "REST & GraphQL APIs",
        description:
          "Well-documented, secure APIs that let your product connect to partners, apps, and services.",
        metric: "Built To Scale",
      },
      {
        eyebrow: "Third-Party Integrations",
        title: "Connect Your Stack",
        description:
          "Integrations with payment, CRM, ERP, shipping, and marketing platforms.",
        metric: "Real-Time Sync",
      },
      {
        title: "Middleware & iPaaS",
        description:
          "Integration layers that route, transform, and reconcile data between systems.",
      },
      {
        title: "Webhooks & Events",
        description:
          "Event-driven pipelines that push updates the moment data changes.",
      },
      {
        title: "Legacy Connectors",
        description:
          "Modern API layers wrapped around older systems to unlock automation.",
        tags: ["REST", "GraphQL", "Webhooks", "OAuth", "iPaaS"],
      },
    ],
  },
  technologyStack: {
    eyebrow: "Integration Stack",
    title: "Built With Resilient",
    highlightedTitle: "Integration Technologies",
    description:
      "Technologies chosen for reliability, security, and observability so your data keeps flowing without surprises.",
    whyTitle: "Why This Stack?",
    whyDescription:
      "Integrations must be secure, observable, and fault-tolerant — we pick technologies that retry, log, and scale gracefully.",
    stacks: {
      apis: {
        title: "API Layer",
        description:
          "Secure, documented REST and GraphQL endpoints with versioning and auth.",
        technologies: ["REST", "GraphQL", "OpenAPI", "OAuth", "JWT"],
      },
      backend: {
        title: "Integration Backend",
        description:
          "Services for transformation, queuing, retries, and reconciliation.",
        technologies: ["Node.js", ".NET", "Python", "PostgreSQL", "Redis"],
      },
      messaging: {
        title: "Events & Messaging",
        description:
          "Event-driven pipelines for real-time sync and reliable delivery.",
        technologies: ["Webhooks", "Kafka", "RabbitMQ", "Queues"],
      },
      cloud: {
        title: "Cloud & Monitoring",
        description:
          "Deployment plus logging and alerting so failures surface immediately.",
        technologies: ["AWS", "Azure", "Docker", "CI/CD", "Monitoring"],
      },
    },
  },
  process: {
    title: "Integration Delivery",
    highlightedTitle: "Phases",
    description:
      "From mapping systems and data contracts to monitored rollout, every integration is built for reliability.",
    steps: [
      { title: "Discovery", items: ["System Audit", "Data Mapping", "API Contracts", "Success Metrics"] },
      { title: "Design", items: ["Integration Plan", "Auth & Security", "Error Handling", "Schema"] },
      { title: "Build", items: ["API Development", "Connectors", "Transformations", "Webhooks"] },
      { title: "Testing", items: ["Contract Tests", "Load Testing", "Failure Cases", "Security"] },
      { title: "Deploy", items: ["Staged Rollout", "Monitoring", "Logging", "Alerts"] },
      { title: "Support", items: ["Observability", "Maintenance", "Scaling", "Iteration"] },
    ],
  },
  engagementModels: {
    eyebrow: "How We Work Together",
    title: "Integration Engagement",
    highlightedTitle: "Models",
    description:
      "Choose the model that matches the scope and ongoing nature of your integration needs.",
    models: [
      {
        badge: "Best for a defined connection",
        title: "Fixed Scope Integration",
        description:
          "A specified set of integrations delivered to an agreed scope and timeline.",
        points: ["Clear data contracts", "Fixed budget", "Documented delivery", "Fast turnaround"],
      },
      {
        badge: "Best for ongoing needs",
        title: "Dedicated Team",
        description:
          "A team that builds and maintains your integrations as your stack evolves.",
        points: ["Rolling roadmap", "New connectors on demand", "Monitoring included", "Flexible scope"],
      },
      {
        badge: "Best for reliability",
        title: "Managed Integrations",
        description:
          "We build, monitor, and maintain your pipelines with proactive support.",
        points: ["24/7 monitoring", "Proactive fixes", "SLA support", "Scaling handled"],
      },
    ],
  },
  outcomes: {
    eyebrow: "Integration Outcomes",
    title: "Systems That Stay",
    highlightedTitle: "In Perfect Sync",
    description:
      "Every integration is built to remove manual transfers, keep data consistent, and scale with your volume.",
    stats: [
      { value: "-70%", label: "Manual Transfers" },
      { value: "+99%", label: "Sync Reliability" },
      { value: "Real-Time", label: "Data Updates" },
      { value: "24/7", label: "Monitoring" },
    ],
    leftPill: "Connected Systems",
    rightPill: "Automated Data Flow",
  },
  faq: {
    title: "API Integration",
    highlightedTitle: "Questions",
    description:
      "Common questions about API development and integration with Fillip Technologies.",
    items: [
      {
        question: "Can you integrate systems that don't have an API?",
        answer:
          "Yes. We build API layers and connectors around legacy or closed systems — using databases, files, or screen automation where needed — to unlock integration.",
      },
      {
        question: "Do you build APIs as well as connect to them?",
        answer:
          "Both. We design and build custom REST and GraphQL APIs for your product, and we integrate with third-party APIs like payment, CRM, ERP, and shipping platforms.",
      },
      {
        question: "How do you handle failures and downtime?",
        answer:
          "We build in retries, queuing, logging, and alerting so transient failures self-heal and any real issue surfaces immediately with full visibility.",
      },
      {
        question: "Will the integration scale as our volume grows?",
        answer:
          "We use event-driven, queue-backed architecture designed to handle growing volume without dropping or delaying data.",
      },
    ],
  },
};
