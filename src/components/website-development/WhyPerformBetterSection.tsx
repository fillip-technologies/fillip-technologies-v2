"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, ShieldCheck, Zap } from "lucide-react";
import type { Service } from "@/data/website-development";

type WhyPerformBetterSectionProps = {
  data?: Service["whyPerformBetter"];
};

const defaultData: NonNullable<Service["whyPerformBetter"]> = {
  title: "Why Our Websites",
  highlightedTitle: "Perform Better",
  description:
    "Not all websites are designed for business success. Where standard websites depend on simple templates and basic functionality, a well-developed website is created to increase efficiency, help you establish yourself online, and facilitate growth. Here at Fillip Technologies, we design websites using speed, security, scalability, and SEO optimization to provide a superior experience for your users.",
  standardLabel: "Standard Website",
  fillipLabel: "Website by Fillip Technologies",
  rows: [
    { standard: "Template Based", fillip: "Fully Custom Developed" },
    { standard: "Basic Design", fillip: "Conversion-Focused UI" },
    { standard: "Slow Loading", fillip: "Lightning Fast" },
    { standard: "Poor SEO", fillip: "SEO-Optimized Structure" },
    { standard: "Limited Security", fillip: "Enterprise-Grade Security" },
    { standard: "Difficult to Scale", fillip: "Built for Growth" },
    { standard: "Generic Code", fillip: "Clean Scalable Code" },
  ],
};

export default function WhyPerformBetterSection({
  data = defaultData,
}: WhyPerformBetterSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const title = data.title || defaultData.title;
  const highlightedTitle = data.highlightedTitle || defaultData.highlightedTitle;
  const description = data.description || defaultData.description;
  const standardLabel = data.standardLabel || defaultData.standardLabel;
  const fillipLabel = data.fillipLabel || defaultData.fillipLabel;
  const rows = data.rows?.length ? data.rows : defaultData.rows;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 py-24 lg:py-32"
    >
      {/* Background Glows */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, rgba(37,99,235,0.15) 70%, transparent 100%)" }}
      />
      <div className="pointer-events-none absolute right-0 bottom-10 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* ── LEFT SIDE: Content Column (Sticky on Desktop) ────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <h2 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--heading)] md:text-5xl lg:text-[52px]">
              {title}{" "}
              <span className="highlight-text block mt-1">
                {highlightedTitle}
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              {description}
            </p>

            {/* Feature Highlight Pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
                <Zap className="h-3.5 w-3.5 fill-blue-600 text-blue-600" /> High Performance
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" /> Enterprise Security
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Comparison Card ────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300">
              
              {/* Card Header Bar */}
              <div className="grid grid-cols-2 divide-x divide-slate-200/80 border-b border-slate-200/80">
                {/* Standard Label */}
                <div className="flex items-center gap-2.5 rounded-tl-3xl bg-slate-100/80 px-4 sm:px-6 py-4.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-500">
                    <X className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">
                    {standardLabel}
                  </span>
                </div>

                {/* Fillip Label */}
                <div className="flex items-center gap-2.5 rounded-tr-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-4.5 text-white shadow-md">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
                    <ShieldCheck className="h-4 w-4 text-white stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
                    {fillipLabel}
                  </span>
                </div>
              </div>

              {/* Rows List */}
              <div className="divide-y divide-slate-100">
                {rows.map((row, i) => {
                  const isHovered = hoveredRow === i;

                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`grid grid-cols-2 divide-x divide-slate-100 transition-colors duration-200 ${
                        isHovered ? "bg-blue-50/50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                      } ${i === rows.length - 1 ? "rounded-b-3xl" : ""}`}
                    >
                      {/* Standard Cell */}
                      <div className="flex items-center gap-3 px-4 sm:px-6 py-4">
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-400">
                          <X className="h-3 w-3 stroke-[2.5]" />
                        </div>
                        <span className="text-xs font-medium text-slate-400 line-through decoration-slate-300 sm:text-sm">
                          {row.standard}
                        </span>
                      </div>

                      {/* Fillip Cell */}
                      <div
                        className={`flex items-center gap-3 px-4 sm:px-6 py-4 transition-colors duration-200 ${
                          isHovered ? "bg-blue-50/80" : "bg-blue-50/25"
                        } ${i === rows.length - 1 ? "rounded-br-3xl" : ""}`}
                      >
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/30">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 sm:text-sm">
                          {row.fillip}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


