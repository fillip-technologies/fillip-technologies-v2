"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const solutions = [
  {
    id: "01",
    title: "Business Websites",
    subtitle: "Leads & Credibility",
    description: "Professional websites designed to build trust, generate qualified leads, and establish a strong online presence.",
    image: "/images/proptru.png",
    color: "from-blue-500 to-indigo-600",
    bgAccent: "bg-blue-500/5 dark:bg-blue-500/10",
    borderAccent: "border-blue-500/20",
    textAccent: "text-blue-600 dark:text-blue-400",
    borderColor: "#2563eb",
    glow: "rgba(59, 130, 246, 0.12)",
  },
  {
    id: "02",
    title: "Ecommerce Websites",
    subtitle: "Sales & Conversions",
    description: "Online stores engineered for conversions, seamless user journeys, secure payments, and scalable catalog growth.",
    image: "/images/pharmaride.png",
    color: "from-pink-500 to-rose-600",
    bgAccent: "bg-pink-500/5 dark:bg-pink-500/10",
    borderAccent: "border-pink-500/20",
    textAccent: "text-pink-600 dark:text-pink-400",
    borderColor: "#db2777",
    glow: "rgba(244, 63, 94, 0.12)",
  },
  {
    id: "03",
    title: "Custom Web Apps",
    subtitle: "Portals & Workflows",
    description: "Tailored portals, dashboards, booking engines, and internal automation tools designed for your specific workflow.",
    image: "/images/domus.png",
    color: "from-emerald-500 to-teal-600",
    bgAccent: "bg-emerald-500/5 dark:bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    borderColor: "#059669",
    glow: "rgba(16, 185, 129, 0.12)",
  },
  {
    id: "04",
    title: "Landing Pages",
    subtitle: "Campaigns & Conversions",
    description: "High-converting single-page layouts optimized for marketing campaigns, advertisements, and quick lead capture.",
    image: "/images/weddding.png",
    color: "from-violet-500 to-purple-600",
    bgAccent: "bg-violet-500/5 dark:bg-violet-500/10",
    borderAccent: "border-violet-500/20",
    textAccent: "text-violet-600 dark:text-violet-400",
    borderColor: "#7c3aed",
    glow: "rgba(139, 92, 246, 0.12)",
  },
  {
    id: "05",
    title: "Website Redesign",
    subtitle: "Performance & Style Upgrade",
    description: "Transform outdated websites into modern, lightning-fast, responsive, and conversion-oriented digital assets.",
    image: "/images/litera.png",
    color: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-500/5 dark:bg-amber-500/10",
    borderAccent: "border-amber-500/20",
    textAccent: "text-amber-600 dark:text-amber-400",
    borderColor: "#d97706",
    glow: "rgba(245, 158, 11, 0.12)",
  },
];

export default function WebsiteSolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeSol = solutions[activeTab];

  return (
    <section className="relative overflow-hidden py-24 lg:py-26">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full blur-[140px] opacity-40 transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${activeSol.glow} 0%, transparent 70%)` }}
        />
        <div
          className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full blur-[140px] opacity-40 transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${activeSol.glow} 0%, transparent 70%)` }}
        />
      </div>

      <div className="container relative mx-auto max-w-8xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)] dark:bg-slate-900 dark:border-slate-800">
            WHAT WE DO
          </span>

          <h2 className="mt-5 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
            End-to-End Website Solutions
            <br />
            for Modern Businesses
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[var(--body)] max-w-3xl mx-auto">
            From business websites and ecommerce stores to custom web
            applications, we create digital experiences that build trust,
            generate leads, and support growth.
          </p>
        </div>

        {/* Single Frame Panel */}
        <div className="relative overflow-hidden rounded-[32px] border border-slate-150 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 transition-all duration-500">
          {/* Decorative light leak inside panel */}
          <div
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
            style={{ background: `radial-gradient(circle, var(--glow-primary) 0%, transparent 70%)` }}
          />

          <div className="grid lg:grid-cols-12 items-stretch">
            {/* Left Column: Solution Selector */}
            <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-center gap-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 z-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)] mb-2 lg:mb-0">
                Our Capabilities
              </span>

              {/* Horizontal Scroll on Mobile, Vertical List on Desktop */}
              <div className="flex overflow-x-auto pb-4 gap-3 lg:pb-0 lg:flex-col lg:overflow-x-visible">
                {solutions.map((sol, index) => {
                  const isActive = activeTab === index;
                  return (
                    <button
                      key={sol.id}
                      onClick={() => setActiveTab(index)}
                      onMouseEnter={() => setActiveTab(index)}
                      className={`group relative flex items-center justify-between text-left p-4 pl-6 rounded-r-2xl border-l-4 transition-all duration-300 cursor-pointer shrink-0 w-[280px] lg:w-full select-none ${isActive
                          ? `bg-slate-50 border-y-transparent border-r-transparent dark:bg-slate-805`
                          : "border-transparent bg-transparent hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                        }`}
                      style={isActive ? { borderLeftColor: sol.borderColor } : {}}
                    >
                      <div className="flex items-center gap-4">
                        {/* Badge */}
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold border transition-all duration-300 ${isActive
                              ? `bg-gradient-to-br ${sol.color} text-white border-transparent shadow-md`
                              : "bg-slate-50 border-slate-100 text-slate-400 dark:bg-slate-805 dark:border-slate-700"
                            }`}
                        >
                          {sol.id}
                        </span>

                        <div>
                          <h4 className={`font-semibold text-lg transition-colors duration-300 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-650 dark:text-slate-400"}`}>
                            {sol.title}
                          </h4>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                            {sol.subtitle}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`h-5 w-5 transition-all duration-300 hidden lg:block ${isActive
                            ? `${sol.textAccent} translate-x-0.5 -translate-y-0.5`
                            : "text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-slate-400"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Preview Panel */}
            <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between bg-slate-50/20 dark:bg-slate-950/25 z-10">
              {/* Title & Description */}
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${activeSol.bgAccent} ${activeSol.textAccent} border ${activeSol.borderAccent}`}>
                  Solution Overview
                </span>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {activeSol.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-650 dark:text-slate-400">
                  {activeSol.description}
                </p>
              </div>

              {/* Browser Window Frame with Screenshot */}
              <div className="mt-8 relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg group/image bg-white dark:bg-slate-900">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-450" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  <div className="mx-auto w-1/3 h-5 rounded-md bg-slate-100 dark:bg-slate-900 text-[9px] text-center text-slate-400 dark:text-slate-500 flex items-center justify-center pointer-events-none border border-slate-150 dark:border-slate-800">
                    filliptechnologies.com
                  </div>
                </div>
                <div className="absolute inset-0 bg-slate-950/5 z-10 pointer-events-none group-hover/image:opacity-0 transition-opacity" />
                <Image
                  src={activeSol.image}
                  alt={activeSol.title}
                  width={900}
                  height={600}
                  className="h-[280px] w-full object-cover transition-all duration-700 group-hover/image:scale-[1.03] group-hover/image:rotate-0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-8 md:p-12 border border-slate-800 shadow-2xl">
            {/* Light leaks */}
            <div className="absolute right-0 bottom-0 -mb-20 -mr-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
            <div className="absolute left-1/4 top-0 -mt-20 h-48 w-48 rounded-full bg-[var(--primary)]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                  TAILORED SOLUTIONS
                </span>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Need Something Custom?
                </h3>

                <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
                  Don&apos;t see your requirement listed above? We build
                  tailored website solutions for healthcare, education,
                  real estate, startups, agencies, and many other
                  industries.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-slate-950 shadow-lg transition duration-300 hover:bg-slate-50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                Discuss Your Project
                <ArrowUpRight className="h-5 w-5 text-slate-950" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
