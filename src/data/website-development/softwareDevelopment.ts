import type { Service } from "./types";

export const softwareDevelopmentContent: Service = {
    slug: "software-development",
    hero: {
      title: "Build Custom Software",
      highlightedTitle: "Run Better Operations",
      description:
        "Software development services for practical business systems, dashboards, portals, and workflow tools that improve operations at scale.",
    },
    challenges: {
      eyebrow: "Software Operations Challenges",
      title: "Most Teams Use Too Many Tools.",
      highlightedTitle: "Few Systems Work Together.",
      description:
        "Many businesses rely on manual processes, spreadsheets, disconnected tools, and legacy workflows that slow teams down.",
      secondaryDescription:
        "At Fillip Technologies, we build custom software that simplifies operations, connects systems, and supports measurable business efficiency.",
      cta: "See How We Build Better Systems",
      items: [
        {
          title: "Manual Workflows",
          description:
            "Repeated manual tasks consume team time and increase the risk of delays and errors.",
        },
        {
          title: "Disconnected Tools",
          description:
            "Data spread across platforms makes reporting, coordination, and decision-making harder.",
        },
        {
          title: "Limited Visibility",
          description:
            "Without central dashboards, leaders struggle to track performance and operational health.",
        },
        {
          title: "Process Bottlenecks",
          description:
            "Unclear approvals and handoffs slow delivery and create avoidable dependencies.",
        },
        {
          title: "Scaling Constraints",
          description:
            "Generic tools often fail to match unique workflows as teams and operations expand.",
        },
        {
          title: "Integration Gaps",
          description:
            "Missing APIs and automation force teams to duplicate data across business systems.",
        },
      ],
    },
    whatWeBuild: {
      eyebrow: "SOFTWARE SYSTEMS WE ENGINEER",
      title: "Custom Platforms Built For",
      highlightedTitle: "Efficiency & Scale",
      description:
        "From internal dashboards and portals to workflow automation and integrations, we build software around real business operations.",
      cards: [
        {
          eyebrow: "Business Applications",
          title: "Systems For Daily Operations",
          description:
            "Custom applications that organize workflows, data, approvals, and team activities in one place.",
          metric: "+45% Faster Workflows",
        },
        {
          eyebrow: "Dashboards & Portals",
          title: "Visibility Across Teams",
          description:
            "Role-based dashboards and portals that help teams manage tasks, customers, reports, and processes.",
          metric: "Real-Time Reporting",
        },
        {
          title: "Workflow Automation",
          description:
            "Automation tools that reduce repetitive work and keep business processes moving.",
        },
        {
          title: "System Integrations",
          description:
            "API integrations that connect business platforms and reduce duplicate data entry.",
        },
        {
          title: "Operational Platforms",
          description:
            "Scalable software foundations for processes, teams, data, analytics, and customer operations.",
          tags: ["Dashboards", "APIs", "Automation", "Reports", "Portals"],
        },
      ],
    },
    technologyStack: {
      eyebrow: "Software Stack",
      title: "Built With Modern",
      highlightedTitle: "Application Technologies",
      description:
        "We use proven frameworks, backend systems, cloud platforms, and integration patterns to build secure and maintainable software.",
      whyTitle: "Why This Software Stack?",
      whyDescription:
        "We choose technologies around workflow complexity, data needs, integrations, security requirements, and long-term maintenance.",
      stacks: {
        frontend: {
          title: "Application Frontend",
          description:
            "Interactive interfaces for dashboards, portals, workflows, and data-rich user experiences.",
          technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Angular", "Vue.js"],
        },
        backend: {
          title: "Application Backend",
          description:
            "Secure backend architecture for business logic, APIs, permissions, and data workflows.",
          technologies: ["Node.js", "Laravel", ".NET", "Python", "PostgreSQL", "REST APIs"],
        },
        cms: {
          title: "Data & Admin Systems",
          description:
            "Admin panels, content systems, and operational tools that help teams manage software workflows.",
          technologies: ["Strapi", "Headless CMS", "Admin Panels", "GraphQL", "CRM", "ERP"],
        },
        cloud: {
          title: "Cloud & DevOps",
          description:
            "Deployment, monitoring, and DevOps foundations for reliable application delivery.",
          technologies: ["AWS", "Azure", "Google Cloud", "Docker", "CI/CD", "Vercel"],
        },
      },
    },
    process: {
      title: "Software Phases",
      highlightedTitle: "and Timeline",
      description:
        "From workflow discovery and architecture to development, QA, launch, and iteration, every phase is tied to operational outcomes.",
      steps: [
        {
          title: "Discovery",
          items: ["Workflow Audit", "User Roles", "Data Review", "Success Metrics"],
        },
        {
          title: "Planning",
          items: ["System Architecture", "Feature Scope", "Integration Map", "Roadmap"],
        },
        {
          title: "UI/UX Design",
          items: ["User Flows", "Wireframes", "Dashboard Design", "Prototype"],
        },
        {
          title: "Develop",
          items: ["Frontend Build", "Backend Build", "API Development", "Database Setup"],
        },
        {
          title: "Testing",
          items: ["Functional QA", "Security Testing", "Performance Testing", "Bug Resolution"],
        },
        {
          title: "Launch",
          items: ["Deployment", "Monitoring", "User Training", "Iteration Support"],
        },
      ],
    },
    outcomes: {
      eyebrow: "Software Outcomes",
      title: "Systems That Improve",
      highlightedTitle: "Business Operations",
      description:
        "Every software build is designed to reduce manual work, improve visibility, connect systems, and support scalable operations.",
      stats: [
        { value: "+45%", label: "Workflow Speed" },
        { value: "-35%", label: "Manual Effort" },
        { value: "+60%", label: "Reporting Visibility" },
        { value: "99.9%", label: "System Uptime" },
      ],
      leftPill: "Better Operations",
      rightPill: "Connected Systems",
    },
  };
