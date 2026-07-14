"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { GraphicPortfolioContent } from "./content";

const filters = ["All", "Logo Design", "Brand Identity", "Print", "Packaging", "Social Media", "Illustration", "UI Design"];

// Accent hue applied per card by position (content stays editable).
const ACCENTS = ["#0242a2", "#DB2777", "#0242a2", "#38bdf8", "#059669", "#0242a2", "#7C3AED", "#0242a2"];

export default function GraphicPortfolio({ content }: { content: GraphicPortfolioContent }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const portfolioItems = content.items.map((item, i) => ({
    ...item,
    id: `${item.title}-${i}`,
    accent: ACCENTS[i % ACCENTS.length],
  }));

  const filtered = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="bg-[#f8fafc] text-[#0f172a] pt-12 pb-24 px-6 md:px-12 relative overflow-hidden border-t border-slate-100">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(2,66,162,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0242a2]/20 bg-[#0242a2]/6 text-[#0242a2] text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            >
              {content.badge}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0f172a]"
            >
              {content.headingLead}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0242a2 0%, #38bdf8 60%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {content.headingHighlight}
              </span>
            </motion.h2>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeFilter === f
                    ? "bg-[#0242a2] text-white border-[#0242a2] shadow-sm"
                    : "border-slate-200 text-slate-500 hover:border-[#0242a2]/30 hover:text-[#0242a2] bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-xl transition-all duration-300 bg-white"
                style={{ aspectRatio: "3/2.2" }}
              >
                {/* Real portfolio image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/80 transition-all duration-400" />

                {/* Tag (always visible) */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/90 shadow-sm border border-slate-100"
                    style={{
                      color: item.accent,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Arrow button */}
                <div className="absolute top-4 right-4 z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    style={{ background: item.accent }}
                  >
                    <ExternalLink size={13} className="text-white" />
                  </div>
                </div>

                {/* Info panel on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
                  <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
