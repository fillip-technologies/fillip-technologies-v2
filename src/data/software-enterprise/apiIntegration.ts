import type { SoftwareEnterpriseContent } from "./types";

export const apiIntegrationContent: SoftwareEnterpriseContent = {
  slug: "api-integration",
  hero: {
    badge: "API Integration",
    title: "Connect Every Tool Into",
    highlightedTitle: "One Data Flow",
    description:
      "We design, build, and maintain API integrations that connect your apps, payment systems, and third-party services — so data moves reliably instead of being copied by hand.",
    bullets: [
      { icon: "refresh", label: "Real-Time Sync" },
      { icon: "shield", label: "Secure Auth & Tokens" },
      { icon: "zap", label: "Webhooks & Events" },
      { icon: "activity", label: "Monitoring & Retries" },
    ],
    primaryCta: { label: "Discuss Your Integration", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/portfolio" },
  },
  capabilities: {
    eyebrow: "INTEGRATION CAPABILITIES",
    title: "Systems That",
    highlightedTitle: "Talk To Each Other",
    description:
      "From payment gateways to CRMs, ERPs, and logistics APIs — we build resilient integrations with the auth, error handling, and monitoring production needs.",
    cards: [
      {
        title: "API Gateway & Routing",
        description:
          "A secure gateway that authenticates, routes, and rate-limits traffic between your systems and third-party services.",
        caption: "Request Routing Simulator",
      },
      {
        title: "Payments & Billing APIs",
        description:
          "Stripe, Razorpay, and PayPal integrations for subscriptions, invoicing, refunds, and reconciliation.",
        caption: "Transaction Preview",
      },
      {
        title: "Sync & Event Analytics",
        description:
          "Dashboards for throughput, latency, and failures so you can see the health of every integration in real time.",
        caption: "Throughput Chart",
      },
      {
        title: "Webhooks & Deployment",
        description:
          "Event-driven webhooks with retries and idempotency, shipped through secure CI/CD pipelines you fully control.",
        caption: "Integration Deploy Runner",
      },
    ],
  },
  scaleTiers: {
    eyebrow: "BUILT TO SCALE",
    title: "Integrations That Handle Your Volume",
    description:
      "From a single connection to a high-throughput event backbone, we design integration architecture that scales with your traffic.",
    tiers: [
      {
        id: "connect",
        label: "Connect",
        title: "Wire Up Your Core Systems",
        description:
          "Connect two or three key systems with reliable, authenticated sync — no more manual CSV exports.",
        metrics: [
          { label: "Endpoints", value: "2-3 Systems" },
          { label: "Throughput", value: "100K Calls/mo" },
          { label: "Sync", value: "Scheduled + Webhook" },
          { label: "Support", value: "Email Support" },
        ],
        architecture: {
          title: "Direct Integration Bridge",
          desc: "A lightweight service authenticating and mapping data between systems.",
          nodes: [
            { label: "Source System", icon: "globe" },
            { label: "Integration Service", icon: "server" },
            { label: "Target System", icon: "database" },
          ],
        },
      },
      {
        id: "orchestrate",
        label: "Orchestrate",
        title: "Automate Multi-System Flows",
        description:
          "Add an event bus, transformation, and retries to orchestrate data across many services reliably.",
        metrics: [
          { label: "Endpoints", value: "Up to 15 Systems" },
          { label: "Throughput", value: "5M Calls/mo" },
          { label: "Sync", value: "Event-Driven" },
          { label: "Support", value: "Priority Slack" },
        ],
        architecture: {
          title: "Event-Driven Orchestration",
          desc: "Adds a queue, transformation layer, and cache for resilient multi-system flows.",
          nodes: [
            { label: "API Gateway", icon: "globe" },
            { label: "Event Queue", icon: "refresh" },
            { label: "Transform Workers", icon: "server" },
            { label: "State & Cache Store", icon: "database" },
          ],
        },
      },
      {
        id: "backbone",
        label: "Backbone",
        title: "High-Throughput & Compliance",
        description:
          "A hardened integration backbone with SSO, audit logging, and multi-region failover for mission-critical data.",
        metrics: [
          { label: "Endpoints", value: "Unlimited" },
          { label: "Throughput", value: "100M+ Calls/mo" },
          { label: "Governance", value: "Audit & SSO" },
          { label: "Support", value: "24/7 Dedicated SLA" },
        ],
        architecture: {
          title: "Resilient Integration Mesh",
          desc: "WAF-guarded gateway, distributed workers, and replicated state across regions.",
          nodes: [
            { label: "Edge WAF Gateway", icon: "shield" },
            { label: "Worker Mesh", icon: "server" },
            { label: "Multi-Region State", icon: "database" },
          ],
        },
      },
    ],
  },
  faq: {
    title: "API Integration",
    highlightedTitle: "Questions",
    description: "Common questions about building integrations with Fillip Technologies.",
    items: [
      {
        category: "Scope",
        question: "Which systems and APIs can you integrate?",
        answer:
          "Payment gateways, CRMs, ERPs, logistics and messaging APIs, and any REST or GraphQL service. If it has an API (or even a webhook or file export), we can connect it.",
      },
      {
        category: "Reliability",
        question: "How do you handle failures and duplicate events?",
        answer:
          "We build in retries with backoff, idempotency keys, and dead-letter handling so transient failures recover automatically without creating duplicate records.",
      },
      {
        category: "Security",
        question: "How is authentication and data secured?",
        answer:
          "We use OAuth2, signed webhooks, and encrypted secrets management, with least-privilege tokens and full audit logging on every call.",
      },
      {
        category: "Support",
        question: "Do you monitor integrations after launch?",
        answer:
          "Yes. We add dashboards and alerting for throughput, latency, and errors, and offer ongoing maintenance as third-party APIs change.",
      },
    ],
  },
};
