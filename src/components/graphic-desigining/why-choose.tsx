"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Lock, Clock, Repeat, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    icon: CheckCircle2,
    title: "100% Custom, Zero Templates",
    desc: "Every pixel is hand-crafted from scratch. We never use pre-made templates or clip art. Your brand stays unique.",
    color: "#0242a2",
    bg: "rgba(2, 66, 162, 0.05)",
    border: "rgba(2, 66, 162, 0.15)",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "First drafts within 48–72 hours. Full projects in days, not weeks. We match agile sprint timelines.",
    color: "#D97706",
    bg: "rgba(217, 119, 6, 0.05)",
    border: "rgba(217, 119, 6, 0.15)",
  },
  {
    icon: Repeat,
    title: "Unlimited Revisions",
    desc: "We iterate until you're 100% satisfied. No hidden revision costs, no cap on feedback rounds.",
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.05)",
    border: "rgba(5, 150, 105, 0.15)",
  },
  {
    icon: Lock,
    title: "Full Ownership Rights",
    desc: "All delivered files belong 100% to you. Commercial-use rights, source files (AI/PSD/Figma), no licensing fees.",
    color: "#DB2777",
    bg: "rgba(219, 39, 119, 0.05)",
    border: "rgba(219, 39, 119, 0.15)",
  },
  {
    icon: Clock,
    title: "Deadline Guaranteed",
    desc: "We commit to realistic deadlines and always deliver on time. No excuses, no delays, no last-minute surprises.",
    color: "#0891B2",
    bg: "rgba(8, 145, 178, 0.05)",
    border: "rgba(8, 145, 178, 0.15)",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Design Partner",
    desc: "A senior designer is assigned to every project — not a rotating junior team. Direct communication, always.",
    color: "#7C3AED",
    bg: "rgba(124, 58, 237, 0.05)",
    border: "rgba(124, 58, 237, 0.15)",
  },
];

const deliverables = [
  "Source Files (AI, PSD, Figma)",
  "SVG & PNG Exports",
  "Brand Guidelines PDF",
  "Web-Optimized Assets",
  "Print-Ready Files (300 DPI)",
  "Unlimited File Formats",
];

export default function WhyChooseGraphics() {
  return (
    <section className="bg-white text-[#0f172a] py-32 px-6 md:px-12 relative overflow-hidden border-t border-slate-100">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(2,66,162,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0242a2]/20 bg-[#0242a2]/6 text-[#0242a2] text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            ✦ Why Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0f172a]"
          >
            Design You Can{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0242a2 0%, #38bdf8 60%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Trust
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base max-w-lg mx-auto mt-5 leading-relaxed"
          >
            We don't just design — we build visual systems that perform, convert, and endure.
          </motion.p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative p-7 rounded-2xl border bg-white transition-all duration-300 cursor-default hover:shadow-md"
                style={{
                  background: reason.bg,
                  borderColor: reason.border,
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                  style={{ background: reason.color }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${reason.color}15`, border: `1px solid ${reason.color}25` }}
                >
                  <Icon size={18} style={{ color: reason.color }} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-2">{reason.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Deliverables + CTA row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Deliverables */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-slate-200 bg-[#f8fafc]"
          >
            <h3 className="text-xl font-bold text-[#0f172a] mb-6">
              What You Get With Every Project
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#0242a2]/10 border border-[#0242a2]/25 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={10} className="text-[#0242a2]" />
                  </div>
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-2xl overflow-hidden flex flex-col justify-between border border-[#0242a2]/20"
            style={{
              background: "linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)",
            }}
          >
            {/* Soft glow */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top right, rgba(56,189,248,0.25) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-extrabold text-[#0f172a] mb-3">
                Ready to Build Your Brand?
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-7">
                Get a free consultation and custom quote within 24 hours. No commitment required.
              </p>
              <Link
                href="#estimate"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #0242a2, #38bdf8)" }}
              >
                <span>Get Free Quote</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
