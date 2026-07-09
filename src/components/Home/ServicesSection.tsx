"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    BadgeCheck,
    BarChart3,
    Box,
    Brush,
    Building2,
    Code2,
    Database,

    GitBranch,
    Globe,
    Layers3,
    LayoutPanelTop,
    MapPin,
    Megaphone,
    Palette,
    PenTool,
    RefreshCw,
    Search,
    ServerCog,
    Smartphone,
    Target,
    TrendingUp,
    Users,
    Wrench,
    Zap,
} from "lucide-react";

type ServiceCategory =
    | "Web Development"
    | "Mobile App Development"
    | "Software & Enterprise"
    | "SEO & Performance Marketing"
    | "Creative Experience Design";

type Service = {
    category: ServiceCategory;
    title: string;
    description: string;
    icon: keyof typeof iconMap;
};

const iconMap = {
    Globe,
    Code2,
    LayoutPanelTop,
    RefreshCw,
    Wrench,
    Smartphone,
    Layers3,
    Building2,
    Zap,
    Database,
    Users,
    ServerCog,
    GitBranch,
    Search,
    MapPin,
    TrendingUp,
    Megaphone,

    Target,
    PenTool,
    Box,
    Brush,
    Palette,
    BadgeCheck,
    BarChart3,
};

const categories: ServiceCategory[] = [
    "Web Development",
    "Mobile App Development",
    "Software & Enterprise",
    "SEO & Performance Marketing",
    "Creative Experience Design",
];

const serviceImages: Record<string, string> = {
    "Custom Website Development": "/images/FT-web-1.png",
    "E-Commerce Development": "/images/FT-web-2.png",
    "WordPress Development": "/images/SERVICES/wordpress.jpg",
    "Android App Development": "/images/SERVICES/app-development.jpg",
    "iOS App Development": "/images/SERVICES/ios-app.jpg",
    "Cross-Platform Apps": "/images/SERVICES/custom-app.jpg",
    "Custom Software Development": "/images/SERVICES/SOCIAL.jpg",
    "CRM Development": "/images/SERVICES/crm-development.jpg",
    "ERP Solutions": "/images/SERVICES/erp.jpg",
    "Technical SEO": "/images/SERVICES/technical-seo.jpg",
    "Local SEO": "/images/SERVICES/local-seo.jpg",
    "Enterprise SEO": "/images/SERVICES/enterprise.jpg",
    "UI/UX Design": "/images/SERVICES/ui-ux.jpg",
    "Product Design": "/images/SERVICES/brand.jpg",
    "Graphic Design": "/images/SERVICES/graphic-design.jpg",
};

const services: Service[] = [
    {
        category: "Web Development",
        title: "Custom Website Development",
        description:
            "Conversion-focused websites built for performance, trust, speed, and long-term growth.",
        icon: "Globe",
    },
    {
        category: "Web Development",
        title: "E-Commerce Development",
        description:
            "Modern online stores with smooth product journeys, secure checkout, and scalable systems.",
        icon: "Box",
    },
    {
        category: "Web Development",
        title: "WordPress Development",
        description:
            "Premium WordPress websites with easy content control, SEO structure, and fast performance.",
        icon: "LayoutPanelTop",
    },
    {
        category: "Web Development",
        title: "Web Application Development",
        description:
            "Custom web apps designed to simplify operations, manage users, and support business workflows.",
        icon: "Code2",
    },
    {
        category: "Web Development",
        title: "Website Redesign",
        description:
            "Transform outdated websites into cleaner, faster, and more conversion-ready digital experiences.",
        icon: "RefreshCw",
    },
    {
        category: "Web Development",
        title: "Website Maintenance",
        description:
            "Reliable support for updates, fixes, security, backups, speed, and long-term website stability.",
        icon: "Wrench",
    },

    {
        category: "Mobile App Development",
        title: "Android App Development",
        description:
            "Reliable Android apps with intuitive UI, strong backend systems, and smooth user experience.",
        icon: "Smartphone",
    },
    {
        category: "Mobile App Development",
        title: "iOS App Development",
        description:
            "Premium iOS applications crafted for performance, security, usability, and modern design.",
        icon: "BadgeCheck",
    },
    {
        category: "Mobile App Development",
        title: "Cross-Platform Apps",
        description:
            "Cost-efficient apps for Android and iOS with consistent design and shared development logic.",
        icon: "Layers3",
    },
    {
        category: "Mobile App Development",
        title: "Enterprise Mobile Applications",
        description:
            "Business-grade mobile solutions for teams, workflows, dashboards, and customer operations.",
        icon: "Building2",
    },
    {
        category: "Mobile App Development",
        title: "On-Demand Service Apps",
        description:
            "Custom platforms for booking, delivery, tracking, service requests, and customer support.",
        icon: "Zap",
    },
    {
        category: "Mobile App Development",
        title: "App UI/UX Design",
        description:
            "Clean mobile interfaces designed for usability, engagement, retention, and conversions.",
        icon: "Palette",
    },

    {
        category: "Software & Enterprise",
        title: "Custom Software Development",
        description:
            "Tailored business software that automates operations, centralizes data, and improves productivity.",
        icon: "Database",
    },
    {
        category: "Software & Enterprise",
        title: "CRM Development",
        description:
            "Custom CRM systems to manage leads, clients, follow-ups, sales pipelines, and customer data.",
        icon: "Users",
    },
    {
        category: "Software & Enterprise",
        title: "ERP Solutions",
        description:
            "Integrated ERP systems for inventory, finance, HR, operations, reporting, and workflows.",
        icon: "ServerCog",
    },
    {
        category: "Software & Enterprise",
        title: "SaaS Product Development",
        description:
            "End-to-end SaaS product engineering from MVP planning to scalable product launch.",
        icon: "GitBranch",
    },
    {
        category: "Software & Enterprise",
        title: "Business Dashboard",
        description:
            "Insightful dashboards that convert business data into reports, visibility, and faster decisions.",
        icon: "BarChart3",
    },
    {
        category: "Software & Enterprise",
        title: "API Integration",
        description:
            "Connect CRMs, payment systems, marketing tools, dashboards, and third-party platforms securely.",
        icon: "Code2",
    },

    {
        category: "SEO & Performance Marketing",
        title: "Technical SEO",
        description:
            "Improve crawlability, indexing, speed, structure, and search visibility with technical precision.",
        icon: "Search",
    },
    {
        category: "SEO & Performance Marketing",
        title: "Local SEO",
        description:
            "Strengthen Google Business visibility, map rankings, local searches, and location-based leads.",
        icon: "MapPin",
    },
    {
        category: "SEO & Performance Marketing",
        title: "Enterprise SEO",
        description:
            "Scalable SEO systems for large websites, service pages, content hubs, and organic growth.",
        icon: "TrendingUp",
    },
    {
        category: "SEO & Performance Marketing",
        title: "Google Ads Management",
        description:
            "Conversion-focused Google Ads campaigns built for calls, leads, WhatsApp, and ROI.",
        icon: "Megaphone",
    },
    {
        category: "SEO & Performance Marketing",
        title: "Meta Ads Management",
        description:
            "Performance-driven Facebook and Instagram campaigns for leads, retargeting, and awareness.",
        icon: "Megaphone",
    },
    {
        category: "SEO & Performance Marketing",
        title: "Lead Generation Campaigns",
        description:
            "Full-funnel marketing systems built to attract, qualify, and convert high-intent prospects.",
        icon: "Target",
    },

    {
        category: "Creative Experience Design",
        title: "UI/UX Design",
        description:
            "Clean, intuitive, conversion-focused interfaces for websites, apps, dashboards, and products.",
        icon: "PenTool",
    },
    {
        category: "Creative Experience Design",
        title: "Product Design",
        description:
            "Strategic product experiences that align user needs, business goals, and usability.",
        icon: "LayoutPanelTop",
    },
    {
        category: "Creative Experience Design",
        title: "Graphic Design",
        description:
            "Premium visual assets for campaigns, digital creatives, brand communication, and marketing.",
        icon: "Brush",
    },
    {
        category: "Creative Experience Design",
        title: "Logo Design",
        description:
            "Professional logo concepts built around brand clarity, memorability, and strong identity.",
        icon: "BadgeCheck",
    },
    {
        category: "Creative Experience Design",
        title: "Brand Identity",
        description:
            "Complete brand systems including colors, typography, visual language, and brand guidelines.",
        icon: "Palette",
    },
    {
        category: "Creative Experience Design",
        title: "Motion & Video Design",
        description:
            "Modern motion graphics and videos that improve storytelling, engagement, and brand recall.",
        icon: "Zap",
    },
];

// CMS-editable content (key: home.capabilities). Falls back to these defaults.
type ServicesContent = Partial<{
    headingLine1: string;
    headingLine2: string;
    description: string;
}>;

export default function ServicesSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
    const content = raw as ServicesContent;
    const c = {
        headingLine1: content.headingLine1 ?? "End-to-End Digital Services",
        headingLine2: content.headingLine2 ?? "for Modern Organizations",
        description:
            content.description ??
            "From websites and apps to enterprise software, performance marketing, and creative design, Fillip Technologies builds digital systems that help businesses launch, automate, and scale.",
    };

    const [activeCategory, setActiveCategory] =
        useState<ServiceCategory>("Web Development");
    const [isExpanded, setIsExpanded] = useState(false);

    const filteredServices = useMemo(() => {
        return services.filter((service) => service.category === activeCategory);
    }, [activeCategory]);

    const visibleServices = isExpanded
        ? filteredServices
        : filteredServices.slice(0, 3);

    const handleCategoryChange = (category: ServiceCategory) => {
        setActiveCategory(category);
        setIsExpanded(false);
    };

    return (
        <section
            id="services"
            className="relative overflow-hidden pb-10 pt-22 sm:pb-12 sm:pt-24"
            aria-labelledby="services-heading"
        >
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(59,130,246,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59,130,246,0.08) 1px, transparent 1px)
            `,
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[140px]" />
            </div>

            <Image
                src="/images/capabilities-background.png"
                alt=""
                width={1536}
                height={1024}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[10%] -left-[16%] w-[clamp(380px,78vw,720px)] opacity-85"
            />

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mx-auto max-w-7xl px-6"
            >
                <div className="mx-auto max-w-4xl text-center">


                    <h2
                        id="services-heading"
                        className=" text-[28px] font-medium leading-[1.05] tracking-[-0.03em] text-heading md:text-[42px] lg:text-[48px]"
                    >
                        {c.headingLine1}
                        <br />
                        <span className="highlight-text">{c.headingLine2}</span>
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-slate-600">
                        {c.description}
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-6xl">
                    <div
                        role="tablist"
                        aria-label="Service categories"
                        className="flex gap-3 overflow-x-auto rounded-xl border border-white/60 bg-white/70 p-2 shadow-[0_15px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {categories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => handleCategoryChange(category)}
                                    className="relative shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeServiceTab"
                                            className="absolute inset-0 rounded-xl bg-blue-600 shadow-[0_12px_30px_rgba(37,99,235,0.22)]"
                                            transition={{
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 34,
                                            }}
                                        />
                                    )}

                                    <span
                                        className={`relative z-10 whitespace-nowrap ${isActive ? "text-white" : ""
                                            }`}
                                    >
                                        {category}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-12"
                    >
                        <motion.div
                            layout
                            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <AnimatePresence initial={false}>
                                {visibleServices.map((service) => (
                                    <ServiceCard key={service.title} service={service} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {filteredServices.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        <motion.button
                            type="button"
                            onClick={() => setIsExpanded((prev) => !prev)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-3 text-sm font-semibold text-blue-700 shadow-[0_12px_35px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-[0_18px_45px_rgba(37,99,235,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? (
                                <>
                                    View Less
                                    <ArrowLeft className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                </>
                            ) : (
                                <>
                                    View More
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

function ServiceCard({ service }: { service: Service }) {
    const Icon = iconMap[service.icon];

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className="group relative flex h-full min-h-[390px] overflow-hidden rounded-xl border border-white/60 bg-white/70 p-6 shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-blue-200 hover:shadow-[0_20px_70px_rgba(37,99,235,0.15)]"
        >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white via-white/70 to-blue-50/60 opacity-90" />

            <div className="absolute right-0 top-0 h-40 w-40 rounded bg-blue-500/10 blur-[70px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full w-full flex-col">
                <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-blue-50/70 p-2">
                    <motion.div
                        className="relative h-52 overflow-hidden rounded bg-white shadow-[0_12px_35px_rgba(37,99,235,0.10)]"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Image
                            src={serviceImages[service.title]}
                            alt={service.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-transparent" />

                        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/45 bg-white/80 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur-md">
                            <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                    </motion.div>
                </div>

                <span className="mb-4 inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {service.category}
                </span>

                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    {service.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                </p>

                <div className="mt-auto pt-7">
                    <a
                        href="#contact"
                        className="group/link inline-flex items-center text-sm font-semibold text-blue-700 transition-colors duration-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        aria-label={`Learn more about ${service.title}`}
                    >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}
