"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
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
    X,
    Zap,
} from "lucide-react";
import ConsultationForm from "@/components/form/ConsultationForm";
import { HOME_SERVICES, HOME_SERVICE_CATEGORIES, HOME_SERVICES_BG, type ServiceItem } from "@/data/home/defaults";

type Service = ServiceItem;

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

// CMS-editable content (key: home.capabilities). Falls back to these defaults.
type ServicesContent = Partial<{
    headingLine1: string;
    headingLine2: string;
    description: string;
    backgroundImage: string;
    services: ServiceItem[];
}>;

export default function ServicesSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
    const content = raw as ServicesContent;
    const c = {
        headingLine1: content.headingLine1 ?? "End-to-End Digital Services",
        headingLine2: content.headingLine2 ?? "for Modern Organizations",
        description:
            content.description ??
            "From websites and apps to enterprise software, performance marketing, and creative design, Fillip Technologies builds digital systems that help businesses launch, automate, and scale.",
        backgroundImage: content.backgroundImage || HOME_SERVICES_BG,
    };

    const services = content.services?.length ? content.services : HOME_SERVICES;
    // Tabs follow the fixed category set; any custom categories admins add still
    // render because filtering is by string match.
    const categories = HOME_SERVICE_CATEGORIES;

    const [activeCategory, setActiveCategory] =
        useState<string>(categories[0]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    const filteredServices = useMemo(() => {
        return services.filter((service) => service.category === activeCategory);
    }, [activeCategory, services]);

    const visibleServices = isExpanded
        ? filteredServices
        : filteredServices.slice(0, 3);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setIsExpanded(false);
    };

    useEffect(() => {
        if (!isConsultationOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsConsultationOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isConsultationOpen]);

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
                src={c.backgroundImage}
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
                                    <ServiceCard
                                        key={service.title}
                                        service={service}
                                        onGetStarted={() => setIsConsultationOpen(true)}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* {filteredServices.length > 3 && (
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
                )} */}
            </motion.div>

            <AnimatePresence>
                {isConsultationOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="services-consultation-title"
                        onMouseDown={() => setIsConsultationOpen(false)}
                    >
                        <motion.div
                            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] md:p-8"
                            initial={{ opacity: 0, y: 24, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.97 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onMouseDown={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                aria-label="Close consultation form"
                                onClick={() => setIsConsultationOpen(false)}
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="pr-12">
                                <h2
                                    id="services-consultation-title"
                                    className="text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-900 md:text-5xl"
                                >
                                    {"Let's Discuss Your"}
                                    <br />
                                    <span className="highlight-text">Next Project</span>
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                                    Tell us about your requirements and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <ConsultationForm
                                className="mt-8"
                                source="Services Get Started Modal"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ServiceCard({
    service,
    onGetStarted,
}: {
    service: Service;
    onGetStarted: () => void;
}) {
    const Icon = iconMap[service.icon as keyof typeof iconMap] ?? iconMap.Globe;

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
                            src={service.image || HOME_SERVICES_BG}
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
                    <button
                        type="button"
                        onClick={onGetStarted}
                        className="group/link inline-flex items-center text-sm font-semibold text-blue-700 transition-colors duration-300 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        aria-label={`Get started with ${service.title}`}
                    >
                        Get Started Today
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}
