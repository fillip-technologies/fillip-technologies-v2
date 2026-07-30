"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// CMS-editable content (key: page.portfolio.showcase). Falls back to defaults.
type LogoItem = { name: string; image: string };
type ShowcaseContent = Partial<{
  eyebrow: string;
  heading: string;
  logos: LogoItem[];
}>;

export default function PortfolioShowcase({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as ShowcaseContent;
  const c = {
    eyebrow: content.eyebrow ?? "✦ Selected Case Studies",
    heading: content.heading ?? "Our Portfolio",
  };
  const logos = content.logos ?? [];

  return (
    <section id="portfolio-work" className="py-24 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden">
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="border-b border-slate-100 pb-8 mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-900/5 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6">
            {c.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            {c.heading}
          </h2>
        </div>

        {/* Logos Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key="logos-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {logos.length > 0 ? (
              logos.map((logo, idx) => (
                <motion.div
                  key={logo.name + idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.25) }}
                  className="group relative flex items-center justify-center p-6 bg-white border border-slate-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 ease-out w-full aspect-[4/3]"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      priority={idx < 15}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-slate-400 font-mono text-xs">
                No logos found.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
