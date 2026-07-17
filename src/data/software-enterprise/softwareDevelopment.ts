import type { SoftwareEnterpriseContent } from "./types";

export const softwareDevelopmentContent: SoftwareEnterpriseContent = {
  slug: "software-development",
  hero: {
    badge: "Software Development",
    title: "Custom Software That Powers",
    highlightedTitle: "Your Whole Business",
    description:
      "End-to-end software engineering — web platforms, SaaS products, CRMs, ERPs, and integrations — designed, built, and scaled around the way your business actually works.",
    bullets: [
      { icon: "layers", label: "Product & Platform Builds" },
      { icon: "database", label: "Scalable Architecture" },
      { icon: "shield", label: "Secure By Design" },
      { icon: "check", label: "Full Code Ownership" },
    ],
    primaryCta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/portfolio" },
  },
  capabilities: {
    eyebrow: "WHAT WE BUILD",
    title: "Software Engineering, End",
    highlightedTitle: "To End",
    description:
      "From custom platforms to SaaS products and system integrations, we cover the full software lifecycle with production-grade engineering.",
    cards: [
      {
        title: "Custom Platforms & Portals",
        description:
          "Bespoke web platforms, internal tools, and customer portals engineered around your exact workflows and data.",
        caption: "Architecture Routing Simulator",
      },
      {
        title: "SaaS & Subscriptions",
        description:
          "Multi-tenant SaaS products with secure isolation, subscription billing, and self-service onboarding.",
        caption: "Subscription Billing Preview",
      },
      {
        title: "Dashboards & Analytics",
        description:
          "Interactive dashboards and reporting that turn your operational data into decisions leadership can act on.",
        caption: "Growth Analytics Chart",
      },
      {
        title: "Cloud, DevOps & Delivery",
        description:
          "Containerised apps, secure CI/CD pipelines, and cloud auto-scaling for reliable, repeatable releases.",
        caption: "CI/CD Deployment Runner",
      },
    ],
  },
  scaleTiers: {
    eyebrow: "HOW WE ENGAGE",
    title: "Engineering At The Scale You Need",
    description:
      "Whether you're validating an idea or modernising an enterprise platform, we match the right team and architecture to your stage.",
    tiers: [
      {
        id: "mvp",
        label: "MVP",
        title: "Validate & Launch",
        description:
          "Ship a focused, high-quality MVP to test the market and win early users, on a lean, cost-efficient stack.",
        metrics: [
          { label: "Best For", value: "New Products" },
          { label: "Team", value: "Compact Squad" },
          { label: "Timeline", value: "8-12 Weeks" },
          { label: "Support", value: "Email Support" },
        ],
        architecture: {
          title: "Lean Product Stack",
          desc: "A single, well-structured application optimised for speed to market.",
          nodes: [
            { label: "Web & Mobile Clients", icon: "globe" },
            { label: "Application Server", icon: "server" },
            { label: "Primary Database", icon: "database" },
          ],
        },
      },
      {
        id: "scale",
        label: "Scale",
        title: "Grow & Automate",
        description:
          "Scale a live product with automation, integrations, and an architecture built for rising traffic and teams.",
        metrics: [
          { label: "Best For", value: "Growing Products" },
          { label: "Team", value: "Dedicated Pod" },
          { label: "Delivery", value: "Rolling Sprints" },
          { label: "Support", value: "Priority Slack" },
        ],
        architecture: {
          title: "Decoupled Scaled Cluster",
          desc: "Load balancing, caching, and read replicas for reliable growth.",
          nodes: [
            { label: "CDN Edge Clients", icon: "globe" },
            { label: "Load Balancer", icon: "refresh" },
            { label: "App Nodes (AutoScale)", icon: "server" },
            { label: "Cache + DB Replica", icon: "database" },
          ],
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        title: "Modernise & Govern",
        description:
          "Rebuild legacy systems and run mission-critical platforms with SSO, audit trails, and high availability.",
        metrics: [
          { label: "Best For", value: "Enterprises" },
          { label: "Team", value: "Multi-Squad" },
          { label: "Governance", value: "Audit & SSO" },
          { label: "Support", value: "24/7 Dedicated SLA" },
        ],
        architecture: {
          title: "Global High-Availability Mesh",
          desc: "Cross-region clusters, WAF shield, and replicated databases.",
          nodes: [
            { label: "Edge WAF Gateway", icon: "shield" },
            { label: "Service Mesh", icon: "server" },
            { label: "Multi-Region Database", icon: "database" },
          ],
        },
      },
    ],
  },
  faq: {
    title: "Software Development",
    highlightedTitle: "Questions",
    description: "Common questions about engineering custom software with Fillip Technologies.",
    items: [
      {
        category: "Scope",
        question: "What kinds of software do you build?",
        answer:
          "Web platforms, SaaS products, CRMs, ERPs, internal tools, customer portals, and API integrations — end to end, from discovery through launch and iteration.",
      },
      {
        category: "Process",
        question: "How do you run a project?",
        answer:
          "We start with discovery and architecture, then deliver in short sprints with working software early. You get visibility at every phase, tied to measurable outcomes.",
      },
      {
        category: "Timeline & IP",
        question: "How long does it take and do we own it?",
        answer:
          "A focused MVP ships in 8–12 weeks; larger platforms are delivered in phases. You own 100% of the source code, data, and infrastructure — no vendor lock-in.",
      },
      {
        category: "Support",
        question: "What happens after launch?",
        answer:
          "We provide ongoing support, monitoring, and iteration so your software keeps pace with the business as it grows.",
      },
    ],
  },
};
