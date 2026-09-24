"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  X,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers3,
  Cpu,
  Headphones,
  Sliders,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import type { MobileAppGrowthPartnerContent } from "@/data/mobile-app-development";

type EnterpriseGrowthPartnerSectionProps = {
  data?: MobileAppGrowthPartnerContent;
};

const defaultData: MobileAppGrowthPartnerContent = {
  badge: "BUSINESS GROWTH PARTNER",
  title: "Why Businesses Opt For",
  highlightedTitle: "Fillip Technologies As Their Business Growth Partner?",
  description:
    "App development is much more than developing an application. It is about building a mobile solution that helps you grow your business and delivers an excellent user experience. With Fillip Technologies, get innovative, strategic, and advanced technology-driven Android applications that ensure the security, scalability, and superior performance of your Android solution. As a well-recognized Android App Development Company, we help you develop applications that not only meet today’s requirements but also scale up to support your future endeavors.",
  subDescription:
    "Find out how an Android application developed by us differs from other mobile applications.",
  standardLabel: "Generic Android App",
  fillipLabel: "Android App by Fillip Technologies",
  rows: [
    { standard: "Generic UI", fillip: "Business-Centric UX" },
    { standard: "Slow Performance", fillip: "Optimized Performance" },
    { standard: "Basic Security", fillip: "Enterprise Security" },
    { standard: "Limited Features", fillip: "Fully Customized" },
    { standard: "Hard to Scale", fillip: "Future Ready" },
    { standard: "No AI", fillip: "AI-Integrated" },
    { standard: "Weak Support", fillip: "Dedicated Support" },
  ],
};

const categoryMeta = [
  {
    category: "User Experience",
    icon: Smartphone,
    tag: "Conversion-Led",
  },
  {
    category: "Speed & Performance",
    icon: Zap,
    tag: "Ultra-Fast Load",
  },
  {
    category: "Data & App Security",
    icon: ShieldCheck,
    tag: "Enterprise-Grade",
  },
  {
    category: "Customization & Scope",
    icon: Sliders,
    tag: "100% Tailored",
  },
  {
    category: "Scalability & Growth",
    icon: Layers3,
    tag: "Future Proof",
  },
  {
    category: "Modern AI Innovation",
    icon: Cpu,
    tag: "Smart Automation",
  },
  {
    category: "Post-Launch Support",
    icon: Headphones,
    tag: "Dedicated SLA",
  },
];

export default function EnterpriseGrowthPartnerSection({
  data = defaultData,
}: EnterpriseGrowthPartnerSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const badge = data?.badge || defaultData.badge;
  const title = data?.title || defaultData.title;
  const highlightedTitle = data?.highlightedTitle || defaultData.highlightedTitle;
  const description = data?.description || defaultData.description;
  const subDescription = data?.subDescription || defaultData.subDescription;
  const standardLabel = data?.standardLabel || defaultData.standardLabel;
  const fillipLabel = data?.fillipLabel || defaultData.fillipLabel;
  const rows = data?.rows?.length ? data.rows : defaultData.rows;

  return (
    <>
      <section
        ref={ref}
        className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white"
      >
        {/* Subtle High-Tech Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #2563eb 1px, transparent 1px),
              linear-gradient(to bottom, #2563eb 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Ambient Glowing Orbs */}
        <div
          className="pointer-events-none absolute -left-20 top-24 h-[500px] w-[500px] rounded-full opacity-30 blur-[150px]"
          style={{ background: "var(--glow-primary, #2563eb)" }}
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-24 h-[480px] w-[480px] rounded-full opacity-25 blur-[150px]"
          style={{ background: "var(--glow-accent, #4f46e5)" }}
        />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── HEADER SECTION ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[var(--heading)] sm:text-5xl lg:text-[52px]">
              {title}{" "}
              <span className="highlight-text block sm:inline">
                {highlightedTitle}
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>

            {subDescription && (
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
                {subDescription}
              </p>
            )}
          </motion.div>

          {/* ── SHOWCASE COMPARISON CONTAINER ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-14 sm:mt-18"
          >
            <div className="relative mx-auto max-w-5xl rounded-[32px] border border-slate-200/90 bg-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.09)] backdrop-blur-xl overflow-hidden">
              {/* Header Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 border-b border-slate-200/80">
                {/* Standard / Generic Header */}
                <div className="flex items-center justify-between gap-4 bg-slate-100/75 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-xs">
                      <X className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                        Traditional Approach
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-700">
                        {standardLabel}
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex rounded-md bg-red-50 border border-red-200/60 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                    High Friction
                  </span>
                </div>

                {/* Fillip Technologies Header (Elevated Gradient) */}
                <div className="relative flex items-center justify-between gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-5 text-white shadow-sm overflow-hidden">
                  {/* Subtle shine effect */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-xs shadow-xs">
                      <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-blue-100">
                        Fillip Technologies Standard
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {fillipLabel}
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                    <Sparkles className="h-3 w-3 fill-white text-white" /> Growth Partner
                  </span>
                </div>
              </div>

              {/* Rows List */}
              <div className="divide-y divide-slate-100/90">
                {rows.map((row, i) => {
                  const meta = categoryMeta[i] || {
                    category: `Feature ${i + 1}`,
                    icon: Sparkles,
                    tag: "Advantage",
                  };
                  const Icon = meta.icon;
                  const isHovered = hoveredRow === i;

                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 transition-all duration-200 ${
                        isHovered ? "bg-blue-50/40" : i % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      {/* Left: Generic Cell */}
                      <div className="flex items-center justify-between px-6 py-4.5">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-400 border border-red-100">
                            <X className="h-3.5 w-3.5 stroke-[2.5]" />
                          </div>
                          <div>
                            <span className="text-sm sm:text-base font-medium text-slate-500 line-through decoration-slate-300">
                              {row.standard}
                            </span>
                            <span className="block text-[11px] text-slate-400 font-normal sm:hidden">
                              {meta.category}
                            </span>
                          </div>
                        </div>

                        {/* Category Label (Desktop) */}
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-100/80 px-2.5 py-1 rounded-md">
                          <Icon className="h-3 w-3 text-slate-400" />
                          {meta.category}
                        </span>
                      </div>

                      {/* Right: Fillip Cell */}
                      <div
                        className={`flex items-center justify-between px-6 py-4.5 transition-colors duration-200 ${
                          isHovered ? "bg-blue-50/80" : "bg-blue-50/20"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/40">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </div>
                          <div>
                            <span className="text-sm sm:text-base font-bold text-slate-900">
                              {row.fillip}
                            </span>
                            <span className="block text-[11px] text-blue-600 font-medium sm:hidden">
                              {meta.tag}
                            </span>
                          </div>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-blue-100/80 border border-blue-200/60 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          {meta.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Card Footer Callout */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      Ready to build an app that drives real business growth?
                    </h4>
                    <p className="mt-1 text-sm text-slate-300">
                      Work with our senior engineers to build a scalable, AI-ready mobile solution.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>Talk to App Specialists</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationFormSection
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}
