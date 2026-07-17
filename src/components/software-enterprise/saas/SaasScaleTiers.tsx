"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SaasScaleTiers as SaasScaleTiersData } from "@/data/software-enterprise";
import { saasIcon } from "./icons";

/**
 * Scaling-tiers section. Header, tiers, per-tier metrics and the architecture
 * node list are all CMS-driven. Node icons are resolved from string keys.
 */
export default function SaasScaleTiers({ data }: { data: SaasScaleTiersData }) {
  const tiers = data.tiers ?? [];
  const initial = tiers[1]?.id ?? tiers[0]?.id ?? "";
  const [activeTier, setActiveTier] = useState(initial);
  const selectedTier = tiers.find((t) => t.id === activeTier) ?? tiers[0];

  if (!selectedTier) return null;

  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/40 border-y border-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[5%] top-[10%] h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[90px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-cyan-400/5 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{data.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{data.title}</h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">{data.description}</p>
        </div>

        {/* Tab Selectors */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 rounded-full border border-slate-150 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
            {tiers.map((t) => {
              const isActive = activeTier === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTier(t.id)}
                  className="relative rounded-full px-6 py-2.5 text-xs md:text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-primary focus:outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSaasTierTab"
                      className="absolute inset-0 rounded-full bg-blue-600 shadow-[0_8px_20px_rgba(2,66,162,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-100 bg-white p-8 md:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.02)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center"
            >
              {/* Left: text + metrics */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 md:text-3xl leading-tight">{selectedTier.title}</h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-500">{selectedTier.description}</p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-100 pt-6 mt-8">
                  {selectedTier.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{metric.label}</span>
                      <span className="text-sm font-extrabold text-slate-800 mt-1">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-xs font-semibold text-white shadow-soft transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02]"
                  >
                    <span>Get a Proposal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: architecture nodes */}
              <div className="lg:border-l lg:border-slate-100 lg:pl-10 flex flex-col gap-6 w-full">
                <div className="text-left bg-slate-50/50 p-4 border border-slate-100/50 rounded-2xl">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">System Architecture</span>
                  <h4 className="text-xs font-extrabold text-slate-800">{selectedTier.architecture.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{selectedTier.architecture.desc}</p>
                </div>

                <div className="flex flex-col gap-4 relative">
                  {selectedTier.architecture.nodes.map((node, i) => {
                    const NodeIcon = saasIcon(node.icon);
                    return (
                      <div key={i} className="flex items-center gap-4 relative">
                        {i < selectedTier.architecture.nodes.length - 1 && (
                          <div className="absolute left-6 top-10 bottom-[-16px] w-[1.5px] bg-slate-200" />
                        )}
                        <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border border-white shadow-sm text-slate-500 bg-slate-100">
                          <NodeIcon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-700 block">{node.label}</span>
                          <span className="text-[10px] text-slate-400 block">
                            {i === 0 ? "Entrypoint Gateway" : i === selectedTier.architecture.nodes.length - 1 ? "Data Persistence Layer" : "Computational Process"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
