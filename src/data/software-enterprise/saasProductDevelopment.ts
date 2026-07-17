import type { SoftwareEnterpriseContent } from "./types";

export const saasProductDevelopmentContent: SoftwareEnterpriseContent = {
  slug: "saas-product-development",
  hero: {
    badge: "SaaS Product Engineering",
    title: "Turn Your Vision into a Scalable",
    highlightedTitle: "SaaS Engine",
    description:
      "We engineer custom multi-tenant software platforms. Designed with secure database structures, high-efficiency API routes, automated user subscriptions, and cloud scaling.",
    bullets: [
      { icon: "database", label: "Logical Tenant Isolation" },
      { icon: "shield", label: "WAF Guard & SSO Auth" },
      { icon: "layers", label: "Multi-Tier Subscriptions" },
      { icon: "check", label: "CI/CD Production Pipelines" },
    ],
    primaryCta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "Watch Demo Case", href: "/portfolio" },
  },
  capabilities: {
    eyebrow: "SAAS CAPABILITIES",
    title: "Everything You Need to",
    highlightedTitle: "Succeed",
    description:
      "We design, build, and deploy custom SaaS applications tailored to your business workflows. Try our live capability simulators below.",
    cards: [
      {
        title: "Custom SaaS Architecture",
        description:
          "Secure logical tenant isolation using schema-based or database-per-tenant separations. We prevent cross-tenant data leaks and build high-efficiency API routing matrices.",
        caption: "Tenant Data Isolation Simulator",
      },
      {
        title: "Billing & Subscriptions",
        description:
          "Recurring credit-card systems, flexible subscription tiers, coupons, trial periods, and automated tax reporting.",
        caption: "Stripe Invoice Preview",
      },
      {
        title: "Dashboard Analytics",
        description:
          "Fully interactive dashboard displays, key customer metrics tracking, event logs, and user reports.",
        caption: "SaaS ARR Chart",
      },
      {
        title: "Cloud Scale & DevOps",
        description:
          "Applications are bundled in Docker containers, integrated with secure GitHub CI/CD build scripts, and hosted via AWS/Vercel auto-scaling pools.",
        caption: "GitHub CI/CD Deployment Runner",
      },
    ],
  },
  scaleTiers: {
    eyebrow: "BUILT FOR GROWTH",
    title: "Scale Your SaaS Without Limits",
    description:
      "Choose the scaling tier that fits your SaaS lifecycle. We design architecture models that grow seamlessly with your user count.",
    tiers: [
      {
        id: "startup",
        label: "Startup Tier",
        title: "Launch Quickly & Validate",
        description:
          "Build a sleek, high-performing MVP to test market demand, acquire early adopters, and pitch to investors with low infrastructure costs.",
        metrics: [
          { label: "Optimal Team Size", value: "1-10 Members" },
          { label: "Monthly Requests Limit", value: "100K API Calls" },
          { label: "Guaranteed Uptime SLA", value: "99% Standard" },
          { label: "Support Deliverables", value: "Email Support" },
        ],
        architecture: {
          title: "Monolith Node Architecture",
          desc: "Single server and database setup, perfect for MVP cost efficiency.",
          nodes: [
            { label: "Browser Client", icon: "globe" },
            { label: "App Server", icon: "server" },
            { label: "Logical Database", icon: "database" },
          ],
        },
      },
      {
        id: "scaleup",
        label: "Scaleup Tier",
        title: "Expand Operations & Automate",
        description:
          "Optimize subscription billing, handle traffic surges, scale database read/write replicas, and automate administrative approvals.",
        metrics: [
          { label: "Optimal Team Size", value: "10-100 Members" },
          { label: "Monthly Requests Limit", value: "5M API Calls" },
          { label: "Guaranteed Uptime SLA", value: "99.9% Premium" },
          { label: "Support Deliverables", value: "Priority Slack" },
        ],
        architecture: {
          title: "Decoupled Scaled Cluster",
          desc: "Includes load balancer routing, Redis cache layer, and database read replica.",
          nodes: [
            { label: "CDN Edge Clients", icon: "globe" },
            { label: "Load Balancer Router", icon: "refresh" },
            { label: "App Nodes (AutoScale)", icon: "server" },
            { label: "Redis Cache + DB Replica", icon: "database" },
          ],
        },
      },
      {
        id: "enterprise",
        label: "Enterprise Tier",
        title: "High Security & Compliance",
        description:
          "Deploy multi-tenant database clusters, enforce strict security compliance, ensure zero-downtime rolling updates, and support custom SSO integrations.",
        metrics: [
          { label: "Optimal Team Size", value: "100+ Members" },
          { label: "Monthly Requests Limit", value: "100M+ API Calls" },
          { label: "Guaranteed Uptime SLA", value: "99.99% Enterprise" },
          { label: "Support Deliverables", value: "24/7 Dedicated SLA" },
        ],
        architecture: {
          title: "Global High-Availability Mesh",
          desc: "Cross-region Kubernetes clusters, WAF shield, and globally replicated active databases.",
          nodes: [
            { label: "Global Edge WAF Shield", icon: "shield" },
            { label: "Kubernetes API Pod Mesh", icon: "server" },
            { label: "Multi-Region DB Failover", icon: "database" },
          ],
        },
      },
    ],
  },
  faq: {
    title: "SaaS Development",
    highlightedTitle: "Inquiries",
    description:
      "Find answers to common questions about architecture, scaling, payment integration, and engineering schedules.",
    items: [
      {
        category: "Architecture",
        question: "How do you handle tenant data isolation in multi-tenant SaaS?",
        answer:
          "We implement database isolation strategies tailored to your security requirements. This includes separate databases (logical database isolation per tenant) or a shared database with tenant-specific schemas and row-level security (RLS) policies to ensure absolute data privacy and security.",
      },
      {
        category: "Billing & Security",
        question: "Which payment gateways do you recommend for SaaS billing?",
        answer:
          "We recommend and integrate Stripe, Razorpay, or PayPal Billing. These platforms support complex recurring subscriptions, pricing tiers, coupons, trial management, multi-currency invoicing, and tax handling (e.g., Stripe Tax).",
      },
      {
        category: "Timeline & IP",
        question: "What is the typical timeline to build a custom SaaS MVP?",
        answer:
          "A standard SaaS MVP takes between 8 to 12 weeks to design, develop, test, and launch. This timeline covers the core tenant registration, subscription flow, user dashboard, database structure, and primary feature set.",
      },
      {
        category: "Timeline & IP",
        question: "Do we own the full source code and intellectual property?",
        answer:
          "Yes, 100%. Once development is complete and settled, we hand over full ownership of the source code, databases, design files, and intellectual property. You own your platform entirely with no ongoing licensing fees.",
      },
      {
        category: "Architecture",
        question: "How do you ensure our SaaS platform is ready for automated scaling?",
        answer:
          "We build SaaS applications using microservices or modular architectures (e.g. Next.js, Node.js), containerize the app using Docker, and deploy to AWS, Google Cloud, or Azure with auto-scaling groups, load balancers, and cache layers (like Redis). This ensures the app scales dynamically as user demand surges.",
      },
    ],
  },
};
