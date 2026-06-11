export type ServiceChallenge = {
  title: string;
  description: string;
};

export type ServiceBuildCard = {
  eyebrow?: string;
  title: string;
  description: string;
  metric?: string;
  tags?: string[];
};

export type ServiceTechStack = {
  title: string;
  description: string;
  technologies: string[];
};

export type ServiceProcessStep = {
  title: string;
  items: string[];
};

export type ServiceOutcomeStat = {
  value: string;
  label: string;
};

export type Service = {
  slug: string;
  hero: {
    title: string;
    highlightedTitle: string;
    description: string;
  };
  challenges: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    secondaryDescription: string;
    cta: string;
    items: ServiceChallenge[];
  };
  whatWeBuild: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    cards: ServiceBuildCard[];
  };
  technologyStack: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    stacks: Record<string, ServiceTechStack>;
    whyTitle: string;
    whyDescription: string;
  };
  process: {
    title: string;
    highlightedTitle: string;
    description: string;
    steps: ServiceProcessStep[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    stats: ServiceOutcomeStat[];
    leftPill: string;
    rightPill: string;
  };
};

export const services: Service[] = [
  {
    slug: "website-development",
    hero: {
      title: "Build Faster Websites",
      highlightedTitle: "Grow Smarter Businesses",
      description:
        "Custom website design and development services that help businesses attract, engage and convert more customers online.",
    },
    challenges: {
      eyebrow: "Business Website Challenges",
      title: "Most Websites Look Good.",
      highlightedTitle: "Few Generate Real Results.",
      description:
        "Many businesses invest in websites that appear modern but fail to attract customers, generate leads, improve visibility, or support long-term growth.",
      secondaryDescription:
        "At Fillip Technologies, we build websites engineered for performance, discoverability, scalability, and measurable business outcomes.",
      cta: "See How We Solve These Challenges",
      items: [
        {
          title: "Slow Performance",
          description:
            "Visitors abandon websites that take too long to load, reducing engagement and conversions.",
        },
        {
          title: "Poor User Experience",
          description:
            "Confusing layouts and difficult navigation create friction and decrease customer trust.",
        },
        {
          title: "Low Conversion Rates",
          description:
            "Many websites attract visitors but fail to convert them into leads, inquiries, or customers.",
        },
        {
          title: "Limited Scalability",
          description:
            "Outdated systems struggle to support growing traffic, content, and business requirements.",
        },
        {
          title: "Weak SEO Foundation",
          description:
            "Without proper technical SEO, websites remain difficult to discover through search engines.",
        },
        {
          title: "Difficult Content Management",
          description:
            "Complex backend systems make updates time-consuming and limit marketing agility.",
        },
      ],
    },
    whatWeBuild: {
      eyebrow: "SOLUTIONS WE ENGINEER",
      title: "Digital Products Built For",
      highlightedTitle: "Growth & Scale",
      description:
        "From business websites and ecommerce platforms to enterprise-grade applications, we build digital systems that drive measurable business outcomes.",
      cards: [
        {
          eyebrow: "Corporate Websites",
          title: "Professional Digital Presence",
          description:
            "High-performance websites engineered to establish trust, communicate value, and generate qualified business leads.",
          metric: "+42% Lead Growth",
        },
        {
          eyebrow: "E-Commerce Stores",
          title: "Built For Revenue Growth",
          description:
            "Conversion-focused ecommerce experiences with secure checkout, inventory management, and scalable architecture.",
          metric: "â‚¹2.4M Revenue",
        },
        {
          title: "Customer Portals",
          description:
            "Secure self-service portals for customers, vendors, and partners.",
        },
        {
          title: "Medical Applications",
          description:
            "Custom Medical applications that streamline workflows and operations.",
        },
        {
          title: "Educational Websites",
          description:
            "High-performance education websites that help institutions showcase programs, streamline admissions, and enhance student engagement.",
          tags: ["Admissions", "Courses", "Faculty", "Student Portal", "Results"],
        },
      ],
    },
    technologyStack: {
      eyebrow: "Our Stack",
      title: "Built With Modern",
      highlightedTitle: "Technologies",
      description:
        "We leverage industry-leading technologies, frameworks, and platforms to deliver secure, scalable, and future-ready websites.",
      whyTitle: "Why This Stack?",
      whyDescription:
        "We carefully choose technologies based on performance, maintainability, scalability, security, and long-term business requirements rather than following trends.",
      stacks: {
        frontend: {
          title: "Frontend Development",
          description:
            "Modern interfaces engineered for speed, responsiveness, and exceptional user experiences.",
          technologies: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Vue.js",
            "Angular",
          ],
        },
        backend: {
          title: "Backend Development",
          description:
            "Robust server-side architectures built for performance, security, and scalability.",
          technologies: ["Node.js", "Laravel", ".NET", "Python", "Java", "REST APIs"],
        },
        cms: {
          title: "CMS & Ecommerce",
          description:
            "Flexible content and commerce platforms tailored for business growth.",
          technologies: [
            "WordPress",
            "Shopify",
            "WooCommerce",
            "Strapi",
            "Headless CMS",
            "Contentful",
          ],
        },
        cloud: {
          title: "Cloud & Deployment",
          description:
            "Reliable cloud infrastructure and DevOps practices for continuous delivery.",
          technologies: ["AWS", "Azure", "Google Cloud", "Docker", "CI/CD", "Vercel"],
        },
      },
    },
    process: {
      title: "Project Phases",
      highlightedTitle: "and Timeline",
      description:
        "From discovery and planning to deployment and support, every stage is focused on building secure, scalable, and growth-driven digital experiences.",
      steps: [
        {
          title: "Discovery",
          items: [
            "Business Analysis",
            "Requirement Gathering",
            "Competitor Research",
            "Goal Definition",
          ],
        },
        {
          title: "Planning",
          items: [
            "Information Architecture",
            "Feature Mapping",
            "Project Roadmap",
            "Technology Selection",
          ],
        },
        {
          title: "UI/UX Design",
          items: ["Wireframing", "User Flows", "Visual Design", "Interactive Prototypes"],
        },
        {
          title: "Develop",
          items: [
            "Frontend Development",
            "Backend Development",
            "CMS Integration",
            "API Development",
          ],
        },
        {
          title: "Testing",
          items: [
            "Quality Assurance",
            "Performance Testing",
            "Security Validation",
            "Bug Resolution",
          ],
        },
        {
          title: "Launch",
          items: ["Deployment", "Monitoring", "Maintenance", "Growth Support"],
        },
      ],
    },
    outcomes: {
      eyebrow: "Business Outcomes",
      title: "Results That Drive",
      highlightedTitle: "Real Business Growth",
      description:
        "Every website we build is engineered to improve visibility, increase conversions, strengthen customer trust, and support long-term business growth.",
      stats: [
        { value: "+90%", label: "Page Speed Score" },
        { value: "+42%", label: "Lead Generation Growth" },
        { value: "+68%", label: "Organic Traffic Increase" },
        { value: "99.9%", label: "Website Uptime" },
      ],
      leftPill: "ðŸš€ Faster Performance",
      rightPill: "ðŸ“ˆ Higher Conversions",
    },
  },
  {
    slug: "ecommerce-development",
    hero: {
      title: "Build Smarter Online Stores",
      highlightedTitle: "Sell With Less Friction",
      description:
        "Ecommerce development services that help businesses launch fast storefronts, simplify checkout, manage products, and grow online revenue.",
    },
    challenges: {
      eyebrow: "Ecommerce Growth Challenges",
      title: "Most Stores Get Traffic.",
      highlightedTitle: "Few Turn It Into Revenue.",
      description:
        "Many ecommerce websites lose buyers through slow pages, unclear journeys, weak product discovery, and checkout experiences that create hesitation.",
      secondaryDescription:
        "At Fillip Technologies, we build commerce platforms focused on speed, trust, product clarity, and measurable sales growth.",
      cta: "See How We Improve Store Performance",
      items: [
        {
          title: "Slow Storefronts",
          description:
            "Heavy pages and delayed product browsing reduce customer confidence and increase cart abandonment.",
        },
        {
          title: "Checkout Friction",
          description:
            "Long or confusing checkout flows interrupt purchases and lower completed order rates.",
        },
        {
          title: "Weak Product Discovery",
          description:
            "Poor filters, search, and category structures make it harder for customers to find what they need.",
        },
        {
          title: "Inventory Complexity",
          description:
            "Disconnected product, stock, and order workflows create manual work as stores scale.",
        },
        {
          title: "Low Conversion Signals",
          description:
            "Missing trust cues, unclear offers, and weak product pages reduce buying intent.",
        },
        {
          title: "Limited Integrations",
          description:
            "Payment, shipping, CRM, and analytics gaps prevent teams from running commerce efficiently.",
        },
      ],
    },
    whatWeBuild: {
      eyebrow: "COMMERCE SYSTEMS WE ENGINEER",
      title: "Online Stores Built For",
      highlightedTitle: "Sales & Scale",
      description:
        "From custom storefronts to checkout, catalog, and order workflows, we build ecommerce systems designed for reliable growth.",
      cards: [
        {
          eyebrow: "Custom Storefronts",
          title: "Fast Shopping Experiences",
          description:
            "Responsive storefronts that help customers browse products quickly and move confidently toward purchase.",
          metric: "+38% Conversion Lift",
        },
        {
          eyebrow: "Checkout Systems",
          title: "Built For Completed Orders",
          description:
            "Secure payment flows, cart experiences, and checkout journeys that reduce friction and abandoned carts.",
          metric: "Lower Cart Drop-Off",
        },
        {
          title: "Product Catalogs",
          description:
            "Structured product, category, filter, and search experiences for easier discovery.",
        },
        {
          title: "Order Workflows",
          description:
            "Commerce workflows that connect orders, payments, fulfillment, and customer updates.",
        },
        {
          title: "Ecommerce Management",
          description:
            "Store systems that help teams manage content, products, offers, reporting, and operations.",
          tags: ["Products", "Payments", "Shipping", "Offers", "Analytics"],
        },
      ],
    },
    technologyStack: {
      eyebrow: "Commerce Stack",
      title: "Built With Scalable",
      highlightedTitle: "Commerce Technologies",
      description:
        "We use reliable commerce platforms, frameworks, and integrations to deliver secure online stores that can grow with demand.",
      whyTitle: "Why This Commerce Stack?",
      whyDescription:
        "We choose commerce technology around catalog size, checkout needs, integrations, performance, and the long-term operating model.",
      stacks: {
        frontend: {
          title: "Storefront Development",
          description:
            "Fast, responsive shopping interfaces built for product browsing and conversion.",
          technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Liquid", "Vue.js"],
        },
        backend: {
          title: "Commerce Backend",
          description:
            "Stable backend systems for orders, carts, customer accounts, and business logic.",
          technologies: ["Node.js", "Laravel", "REST APIs", "GraphQL", "Webhooks", "MySQL"],
        },
        cms: {
          title: "Platforms & CMS",
          description:
            "Flexible ecommerce and content platforms for managing stores and campaigns.",
          technologies: [
            "Shopify",
            "WooCommerce",
            "WordPress",
            "Headless CMS",
            "Strapi",
            "Contentful",
          ],
        },
        cloud: {
          title: "Payments & Deployment",
          description:
            "Secure payment, hosting, and release workflows for dependable commerce operations.",
          technologies: ["Razorpay", "Stripe", "AWS", "Vercel", "Docker", "CI/CD"],
        },
      },
    },
    process: {
      title: "Commerce Phases",
      highlightedTitle: "and Timeline",
      description:
        "From catalog planning and UX to checkout, integrations, testing, and launch, each phase is built around dependable selling.",
      steps: [
        {
          title: "Discovery",
          items: ["Store Goals", "Catalog Review", "Customer Journey", "Revenue Targets"],
        },
        {
          title: "Planning",
          items: ["Platform Selection", "Checkout Flow", "Integration Map", "Launch Roadmap"],
        },
        {
          title: "UI/UX Design",
          items: ["Storefront Design", "Product Pages", "Cart Flow", "Mobile Experience"],
        },
        {
          title: "Develop",
          items: ["Storefront Build", "Payment Setup", "Catalog Setup", "API Integration"],
        },
        {
          title: "Testing",
          items: ["Checkout QA", "Performance Testing", "Security Review", "Order Testing"],
        },
        {
          title: "Launch",
          items: ["Store Deployment", "Analytics Setup", "Monitoring", "Growth Support"],
        },
      ],
    },
    outcomes: {
      eyebrow: "Commerce Outcomes",
      title: "Stores That Improve",
      highlightedTitle: "Revenue Performance",
      description:
        "Every ecommerce build is shaped to improve speed, product discovery, checkout completion, and customer confidence.",
      stats: [
        { value: "+38%", label: "Conversion Growth" },
        { value: "-31%", label: "Cart Drop-Off" },
        { value: "+52%", label: "Product Engagement" },
        { value: "99.9%", label: "Store Uptime" },
      ],
      leftPill: "Faster Checkout",
      rightPill: "Higher Revenue",
    },
  },
  {
    slug: "wordpress-development",
    hero: {
      title: "Build Flexible WordPress Sites",
      highlightedTitle: "Publish With Confidence",
      description:
        "WordPress development services for fast, secure, manageable websites that help teams publish content and grow their digital presence.",
    },
    challenges: {
      eyebrow: "WordPress Website Challenges",
      title: "Most WordPress Sites Are Easy To Start.",
      highlightedTitle: "Few Stay Easy To Scale.",
      description:
        "Many WordPress websites become slow, plugin-heavy, difficult to update, and hard for teams to manage as business needs grow.",
      secondaryDescription:
        "At Fillip Technologies, we build WordPress experiences with clean structure, performance, maintainability, and content team usability in mind.",
      cta: "See How We Improve WordPress Websites",
      items: [
        {
          title: "Plugin Overload",
          description:
            "Too many plugins can slow sites down, increase maintenance risk, and create compatibility issues.",
        },
        {
          title: "Slow Page Speed",
          description:
            "Unoptimized themes, media, and scripts can weaken search visibility and visitor engagement.",
        },
        {
          title: "Difficult Editing",
          description:
            "Poor content structures make routine updates dependent on developers and slow marketing teams down.",
        },
        {
          title: "Security Gaps",
          description:
            "Outdated themes, plugins, and weak setup practices can expose websites to avoidable risk.",
        },
        {
          title: "Weak SEO Setup",
          description:
            "Missing technical foundations make content harder to discover and rank effectively.",
        },
        {
          title: "Limited Scalability",
          description:
            "Generic builds often struggle to support new content types, campaigns, and business workflows.",
        },
      ],
    },
    whatWeBuild: {
      eyebrow: "WORDPRESS SOLUTIONS WE ENGINEER",
      title: "WordPress Websites Built For",
      highlightedTitle: "Content & Growth",
      description:
        "From custom themes to content workflows and WooCommerce stores, we build WordPress systems that are easy to manage and ready to grow.",
      cards: [
        {
          eyebrow: "Custom Themes",
          title: "Brand-Led WordPress Experiences",
          description:
            "Custom WordPress themes that match business goals while staying fast, clean, and manageable.",
          metric: "Cleaner Publishing",
        },
        {
          eyebrow: "WooCommerce Stores",
          title: "Commerce On WordPress",
          description:
            "WooCommerce experiences with product management, secure checkout, and conversion-focused pages.",
          metric: "Improved Store Flow",
        },
        {
          title: "Content Hubs",
          description:
            "Structured pages, blogs, resources, and landing pages that marketing teams can update confidently.",
        },
        {
          title: "Business Websites",
          description:
            "Professional WordPress websites for service businesses, institutions, and growing brands.",
        },
        {
          title: "Managed WordPress Systems",
          description:
            "WordPress setups designed for speed, security, SEO, content editing, and long-term support.",
          tags: ["Pages", "Blogs", "SEO", "Forms", "Security"],
        },
      ],
    },
    technologyStack: {
      eyebrow: "WordPress Stack",
      title: "Built With Reliable",
      highlightedTitle: "WordPress Tools",
      description:
        "We combine WordPress best practices, modern frontend techniques, and dependable integrations to create maintainable websites.",
      whyTitle: "Why This WordPress Stack?",
      whyDescription:
        "We select WordPress tools based on editing needs, security, performance, SEO, integration requirements, and maintainability.",
      stacks: {
        frontend: {
          title: "Theme Development",
          description:
            "Responsive WordPress themes built for clean presentation and smooth content experiences.",
          technologies: ["WordPress", "PHP", "JavaScript", "Tailwind CSS", "React", "HTML"],
        },
        backend: {
          title: "WordPress Backend",
          description:
            "Structured backend setup for custom fields, content types, forms, and integrations.",
          technologies: ["PHP", "MySQL", "REST APIs", "ACF", "Custom Post Types", "WP-CLI"],
        },
        cms: {
          title: "CMS & Commerce",
          description:
            "Content and commerce tools that make publishing, campaigns, and selling easier.",
          technologies: [
            "WordPress",
            "WooCommerce",
            "Elementor",
            "Gutenberg",
            "Headless CMS",
            "Yoast SEO",
          ],
        },
        cloud: {
          title: "Hosting & Optimization",
          description:
            "Deployment, caching, security, and maintenance workflows for stable WordPress sites.",
          technologies: ["Cloudflare", "AWS", "Docker", "CI/CD", "Caching", "Backups"],
        },
      },
    },
    process: {
      title: "WordPress Phases",
      highlightedTitle: "and Timeline",
      description:
        "From content planning and theme design to development, testing, launch, and support, every stage keeps editors and visitors in focus.",
      steps: [
        {
          title: "Discovery",
          items: ["Content Audit", "Business Goals", "Editor Needs", "SEO Review"],
        },
        {
          title: "Planning",
          items: ["Sitemap", "Content Model", "Plugin Strategy", "Migration Plan"],
        },
        {
          title: "UI/UX Design",
          items: ["Theme Direction", "Page Templates", "Component Design", "Editing Flow"],
        },
        {
          title: "Develop",
          items: ["Theme Build", "CMS Setup", "Plugin Setup", "Form Integration"],
        },
        {
          title: "Testing",
          items: ["Content QA", "Speed Testing", "Security Checks", "Device Testing"],
        },
        {
          title: "Launch",
          items: ["Deployment", "Migration", "Training", "Maintenance"],
        },
      ],
    },
    outcomes: {
      eyebrow: "WordPress Outcomes",
      title: "Websites That Support",
      highlightedTitle: "Publishing & Growth",
      description:
        "Every WordPress website is built to improve content workflows, site speed, search visibility, and brand credibility.",
      stats: [
        { value: "+75%", label: "Editing Efficiency" },
        { value: "+48%", label: "Organic Visibility" },
        { value: "+60%", label: "Page Speed Gain" },
        { value: "99.9%", label: "Website Uptime" },
      ],
      leftPill: "Easier Publishing",
      rightPill: "Stronger Visibility",
    },
  },
  {
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
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
