import type { SoftwareEnterpriseContent } from "./types";

export const crmDevelopmentContent: SoftwareEnterpriseContent = {
  slug: "crm-development",
  hero: {
    badge: "CRM Development",
    title: "A CRM Shaped Around",
    highlightedTitle: "How You Sell",
    description:
      "Custom CRM platforms that unify contacts, pipelines, and customer history — automating follow-ups and giving your team one 360° view instead of scattered spreadsheets.",
    bullets: [
      { icon: "database", label: "360° Contact View" },
      { icon: "activity", label: "Automated Pipelines" },
      { icon: "shield", label: "Role-Based Permissions" },
      { icon: "zap", label: "Email & WhatsApp Sync" },
    ],
    primaryCta: { label: "Discuss Your CRM", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/portfolio" },
  },
  capabilities: {
    eyebrow: "CRM CAPABILITIES",
    title: "Everything Your Team Needs to",
    highlightedTitle: "Close More",
    description:
      "We build CRM systems tailored to your sales motion — pipelines, automation, analytics, and integrations that fit the way your team actually works.",
    cards: [
      {
        title: "Contacts & 360° View",
        description:
          "A single record for every customer — activity, deals, tickets, and documents — with clean segmentation and de-duplication.",
        caption: "Contact 360 Router",
      },
      {
        title: "Deals & Billing Sync",
        description:
          "Quote-to-cash workflows with subscription plans, invoices, and payment-gateway sync so revenue stays in one place.",
        caption: "Deal Value Preview",
      },
      {
        title: "Pipeline Analytics",
        description:
          "Live dashboards for win rates, forecast, and rep performance — so managers see exactly where deals stall.",
        caption: "Revenue Forecast Chart",
      },
      {
        title: "Automation & Integrations",
        description:
          "Trigger-based follow-ups, lead routing, and two-way sync with email, WhatsApp, telephony, and your existing tools.",
        caption: "Automation Workflow Runner",
      },
    ],
  },
  scaleTiers: {
    eyebrow: "BUILT FOR GROWTH",
    title: "A CRM That Grows With Your Team",
    description:
      "From a lean sales team to a multi-branch operation, we design CRM architecture that scales with your contact volume and workflows.",
    tiers: [
      {
        id: "starter",
        label: "Starter",
        title: "Get Your Pipeline Organised",
        description:
          "Replace spreadsheets with a clean, shared pipeline — contacts, deals, and reminders your whole team can trust.",
        metrics: [
          { label: "Optimal Team Size", value: "1-10 Reps" },
          { label: "Contacts", value: "Up to 25K" },
          { label: "Automation", value: "Core Workflows" },
          { label: "Support", value: "Email Support" },
        ],
        architecture: {
          title: "Unified Pipeline Core",
          desc: "A single database of contacts, deals, and activity with role-based access.",
          nodes: [
            { label: "Web & Mobile Clients", icon: "globe" },
            { label: "CRM App Server", icon: "server" },
            { label: "Contact Database", icon: "database" },
          ],
        },
      },
      {
        id: "growth",
        label: "Growth",
        title: "Automate & Scale Your Sales",
        description:
          "Add automation, lead routing, and analytics as your team and contact volume grow across multiple pipelines.",
        metrics: [
          { label: "Optimal Team Size", value: "10-100 Reps" },
          { label: "Contacts", value: "Up to 1M" },
          { label: "Automation", value: "Advanced Rules" },
          { label: "Support", value: "Priority Slack" },
        ],
        architecture: {
          title: "Automation-Ready Cluster",
          desc: "Adds a workflow engine, cache layer, and read replica for reporting at scale.",
          nodes: [
            { label: "CDN Edge Clients", icon: "globe" },
            { label: "Automation Engine", icon: "refresh" },
            { label: "App Nodes (AutoScale)", icon: "server" },
            { label: "Cache + DB Replica", icon: "database" },
          ],
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        title: "Multi-Team & Compliance",
        description:
          "Support multiple business units, granular permissions, audit trails, and custom SSO across a large organisation.",
        metrics: [
          { label: "Optimal Team Size", value: "100+ Users" },
          { label: "Contacts", value: "Unlimited" },
          { label: "Governance", value: "Audit & SSO" },
          { label: "Support", value: "24/7 Dedicated SLA" },
        ],
        architecture: {
          title: "Governed Multi-Team Mesh",
          desc: "Segmented data, audit logging, and SSO across regions and business units.",
          nodes: [
            { label: "SSO & Access Gateway", icon: "shield" },
            { label: "Service Mesh", icon: "server" },
            { label: "Segmented Databases", icon: "database" },
          ],
        },
      },
    ],
  },
  faq: {
    title: "CRM Development",
    highlightedTitle: "Questions",
    description: "Common questions about building a custom CRM with Fillip Technologies.",
    items: [
      {
        category: "Fit",
        question: "Why build a custom CRM instead of using Salesforce or HubSpot?",
        answer:
          "Off-the-shelf CRMs force your process into their model and charge per seat as you grow. A custom CRM matches your exact sales motion, removes licensing you don't use, and keeps your data fully under your control.",
      },
      {
        category: "Integration",
        question: "Can it connect to email, WhatsApp, and telephony?",
        answer:
          "Yes. We build two-way integrations with email, WhatsApp Business, calling systems, and payment gateways so every interaction is logged against the right contact automatically.",
      },
      {
        category: "Migration",
        question: "Can you migrate our existing data?",
        answer:
          "We migrate contacts, deals, and history from spreadsheets or your current CRM, with de-duplication and validation so you start on clean data.",
      },
      {
        category: "Timeline & IP",
        question: "How long does it take and do we own it?",
        answer:
          "A working CRM typically ships in 8–12 weeks, delivered in phases. You own 100% of the source code, data, and infrastructure with no per-seat fees.",
      },
    ],
  },
};
