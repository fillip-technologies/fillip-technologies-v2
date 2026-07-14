"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { GraphicHeroContent } from "./content";

const categories = [
  { name: "Logo Design", color: "#0242a2", emoji: "⬡" },
  { name: "Brand Identity", color: "#7C3AED", emoji: "◈" },
  { name: "Print Design", color: "#0891B2", emoji: "▦" },
  { name: "Packaging", color: "#059669", emoji: "◉" },
  { name: "Motion Graphics", color: "#D97706", emoji: "◎" },
  { name: "Illustration", color: "#DB2777", emoji: "✦" },
  { name: "UI Design", color: "#0242a2", emoji: "▣" },
  { name: "Social Media", color: "#7C3AED", emoji: "◆" },
];

export default function GraphicHero({ content }: { content: GraphicHeroContent }) {
  const stats = content.stats;
  return (
    <section className="relative bg-[#f8fafc] text-[#0f172a] overflow-hidden pt-12 pb-12 lg:pt-16 lg:pb-16">

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, #0f172a 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, #0f172a 4%, transparent) 1px, transparent 1px)",
          backgroundSize: "clamp(3.25rem, 5vw, 9rem) clamp(3.25rem, 5vw, 9rem)",
        }}
      />

      {/* Soft glow blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(2,66,162,0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)" }}
      />

      {/* Floating accent shapes */}
      <div className="absolute top-32 left-[4%] pointer-events-none hidden lg:block z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[#0242a2]/15 text-5xl select-none"
        >
          ✦
        </motion.div>
      </div>

      {/* ====== OUTER CONTAINER ====== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">

        {/* ====== TWO-COLUMN GRID ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text Content ── */}
          <div className="flex flex-col">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#0242a2]/20 bg-[#0242a2]/6 backdrop-blur-sm">
                <Sparkles size={14} className="text-[#0242a2]" />
                <span className="text-[#0242a2] text-xs font-semibold uppercase tracking-[0.2em]">
                  {content.badge}
                </span>
                <Star size={10} className="text-[#0242a2]/50 fill-[#0242a2]/50" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[82px] font-extrabold leading-[0.92] tracking-tight mb-6"
            >
              <span className="text-[#0f172a]">{content.headingLine1}</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #0242a2 0%, #38bdf8 55%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {content.headingLine2}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
            >
              {content.descriptionLead}{" "}
              <span className="text-[#0242a2] font-semibold">{content.descriptionHighlight}</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href={content.primaryCtaHref}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #0242a2, #38bdf8)" }}
              >
                <span>{content.primaryCtaLabel}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={content.secondaryCtaHref}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-[#0242a2]/20 bg-white text-[#0242a2] hover:bg-[#0242a2]/5 transition-all duration-300 text-sm font-semibold shadow-sm"
              >
                <span>{content.secondaryCtaLabel}</span>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200 pt-8"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-2xl md:text-3xl font-extrabold"
                    style={{
                      background: i % 2 === 0
                        ? "linear-gradient(135deg, #0242a2, #38bdf8)"
                        : "linear-gradient(135deg, #7C3AED, #0242a2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-slate-400 text-xs font-medium leading-tight">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Graphic Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center py-6"
          >
            {/* Blue glow behind the image */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(2,66,162,0.22) 0%, rgba(56,189,248,0.12) 50%, transparent 75%)",
              }}
            />

            {/* Floating pill — top-left of image */}
            {/* <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -top-3 left-6 z-20 px-3.5 py-1.5 rounded-full border border-[#0242a2]/20 bg-white shadow-md text-[#0242a2] text-xs font-semibold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#0242a2] animate-pulse" />
              Figma · Illustrator
            </motion.div> */}

            {/* Floating stat card — bottom-right of image */}
            {/* <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -bottom-3 right-6 z-20 px-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-lg"
            >
              <div className="text-[10px] text-slate-400 font-medium mb-0.5 uppercase tracking-wide">Projects Done</div>
              <div
                className="text-2xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #0242a2, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                500+
              </div>
            </motion.div> */}

            {/* Main image */}
            <div className="relative w-full max-w-[500px] mx-auto">
              <div className="relative">
                <Image
                  src={content.image}
                  alt={content.imageAlt}
                  width={500}
                  height={480}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>{/* end two-column grid */}

        {/* ── MARQUEE CATEGORIES STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative overflow-hidden mt-8"
        >
          <div
            className="flex gap-3 w-max"
            style={{ animation: "marquee-ltr 30s linear infinite" }}
          >
            {[...categories, ...categories].map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200 bg-white shadow-sm shrink-0 cursor-default hover:border-[#0242a2]/30 transition-colors duration-300"
              >
                <span style={{ color: cat.color }} className="text-lg leading-none">{cat.emoji}</span>
                <span className="text-slate-600 text-sm font-medium whitespace-nowrap">{cat.name}</span>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none z-10" />
        </motion.div>

      </div>{/* end outer container */}

      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
