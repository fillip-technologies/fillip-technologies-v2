import type { SoftwareEnterpriseContent } from "./types";

export const erpSolutionsContent: SoftwareEnterpriseContent = {
  slug: "erp-solutions",
  hero: {
    badge: "ERP Solutions",
    title: "Run Your Whole Operation On",
    highlightedTitle: "One Connected System",
    description:
      "Custom ERP platforms that connect finance, inventory, procurement, HR, and operations — replacing disconnected tools with a single source of truth for the whole business.",
    bullets: [
      { icon: "layers", label: "Unified Modules" },
      { icon: "database", label: "Real-Time Inventory" },
      { icon: "shield", label: "Audit & Compliance" },
      { icon: "activity", label: "Live Operational Reporting" },
    ],
    primaryCta: { label: "Discuss Your ERP", href: "/contact" },
    secondaryCta: { label: "See Our Work", href: "/portfolio" },
  },
  capabilities: {
    eyebrow: "ERP CAPABILITIES",
    title: "One Platform To",
    highlightedTitle: "Run It All",
    description:
      "We build modular ERP systems tailored to your operations — finance, inventory, procurement, and analytics that talk to each other in real time.",
    cards: [
      {
        title: "Connected Modules",
        description:
          "Finance, inventory, procurement, sales, and HR modelled as one connected system so data flows without re-entry.",
        caption: "Module Routing Simulator",
      },
      {
        title: "Finance & Invoicing",
        description:
          "Automated invoicing, tax handling, ledgers, and approvals with full audit trails across every transaction.",
        caption: "Invoice & Ledger Preview",
      },
      {
        title: "Operational Analytics",
        description:
          "Real-time dashboards for cash flow, stock levels, and production so leadership sees the whole business at a glance.",
        caption: "Operational KPI Chart",
      },
      {
        title: "Cloud, Roles & Deployment",
        description:
          "Granular role-based access, containerised deployment, and secure CI/CD across every branch and warehouse.",
        caption: "Deployment Runner",
      },
    ],
  },
  scaleTiers: {
    eyebrow: "BUILT FOR SCALE",
    title: "ERP That Fits Your Operation",
    description:
      "From a single site to a multi-branch enterprise, we design ERP architecture that scales with your transaction volume and locations.",
    tiers: [
      {
        id: "single-site",
        label: "Single Site",
        title: "Digitise Core Operations",
        description:
          "Bring finance, inventory, and orders into one system for a single location — replacing spreadsheets and manual reconciliation.",
        metrics: [
          { label: "Locations", value: "1 Site" },
          { label: "Users", value: "Up to 25" },
          { label: "Modules", value: "Core Finance & Stock" },
          { label: "Support", value: "Email Support" },
        ],
        architecture: {
          title: "Unified Operations Core",
          desc: "A single database powering finance, inventory, and orders with role-based access.",
          nodes: [
            { label: "Staff Clients", icon: "globe" },
            { label: "ERP App Server", icon: "server" },
            { label: "Operations Database", icon: "database" },
          ],
        },
      },
      {
        id: "multi-branch",
        label: "Multi-Branch",
        title: "Connect Every Location",
        description:
          "Synchronise stock, procurement, and reporting across multiple branches and warehouses in real time.",
        metrics: [
          { label: "Locations", value: "2-25 Sites" },
          { label: "Users", value: "Up to 500" },
          { label: "Modules", value: "Full Suite" },
          { label: "Support", value: "Priority Slack" },
        ],
        architecture: {
          title: "Distributed Branch Cluster",
          desc: "Adds sync services, a cache layer, and reporting replicas across locations.",
          nodes: [
            { label: "Branch Clients", icon: "globe" },
            { label: "Sync Services", icon: "refresh" },
            { label: "App Nodes (AutoScale)", icon: "server" },
            { label: "Cache + DB Replica", icon: "database" },
          ],
        },
      },
      {
        id: "enterprise",
        label: "Enterprise",
        title: "Governance & Compliance",
        description:
          "Enterprise-grade audit trails, approvals, custom SSO, and high availability across regions and business units.",
        metrics: [
          { label: "Locations", value: "Unlimited" },
          { label: "Users", value: "500+" },
          { label: "Governance", value: "Audit & SSO" },
          { label: "Support", value: "24/7 Dedicated SLA" },
        ],
        architecture: {
          title: "Governed Enterprise Mesh",
          desc: "Segmented modules, audit logging, and SSO with regional failover.",
          nodes: [
            { label: "SSO & Access Gateway", icon: "shield" },
            { label: "Service Mesh", icon: "server" },
            { label: "Multi-Region Database", icon: "database" },
          ],
        },
      },
    ],
  },
  faq: {
    title: "ERP Solutions",
    highlightedTitle: "Questions",
    description: "Common questions about building a custom ERP with Fillip Technologies.",
    items: [
      {
        category: "Fit",
        question: "Why a custom ERP instead of SAP or Odoo?",
        answer:
          "Packaged ERPs are heavy, expensive to license, and rarely fit your processes without costly customisation. A custom ERP includes only the modules you need, matches your workflows exactly, and grows with you.",
      },
      {
        category: "Migration",
        question: "Can you migrate from our existing systems?",
        answer:
          "Yes. We migrate master data, historical transactions, and open balances from your current tools with validation and reconciliation so nothing is lost.",
      },
      {
        category: "Integration",
        question: "Will it integrate with our accounting and hardware?",
        answer:
          "We integrate with accounting software, payment gateways, barcode/RFID scanners, and POS or warehouse hardware through secure APIs.",
      },
      {
        category: "Timeline & IP",
        question: "How is it delivered and do we own it?",
        answer:
          "ERP is delivered module by module so you see value early. You own 100% of the source code, data, and infrastructure with no per-seat licensing.",
      },
    ],
  },
};
