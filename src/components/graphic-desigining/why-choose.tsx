"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Layout, Sliders, ArrowRight } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});

const steps = [
  {
    num: "01",
    title: "Creative Discovery",
    desc: "We research your target audience, analyze competitor visual spaces, and define a core creative concept.",
    accentColor: "from-pink-500 to-purple-500",
  },
  {
    num: "02",
    title: "Moodboards & Concepts",
    desc: "We present visual directions, color systems, and typographical pairings before writing a single path.",
    accentColor: "from-purple-500 to-indigo-500",
  },
  {
    num: "03",
    title: "High-Fidelity Creation",
    desc: "Our artists draw custom vectors, shape meshes, and set grids to build high-contrast visual assets.",
    accentColor: "from-indigo-500 to-blue-500",
  },
  {
    num: "04",
    title: "Editable Delivery",
    desc: "You receive clean, organized source packages in SVG, AI, PSD, and Figma with unlimited web licensing.",
    accentColor: "from-blue-500 to-cyan-500",
  },
];

const values = [
  {
    icon: Layout,
    title: "Pure Art Direction",
    desc: "We build original assets from scratch. Zero generic templates, zero repetitive layouts. Every pixel is uniquely yours.",
    accentColor: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-50 text-pink-600 border-pink-100",
  },
  {
    icon: Zap,
    title: "Agile Production Cycles",
    desc: "We match standard sprint timelines. High-quality visual drafts are delivered within days to support quick product iterations.",
    accentColor: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: Sliders,
    title: "Developer-Friendly Files",
    desc: "All source files are fully organized, named properly, and optimized (compressed SVG/PNG) for fast page loading.",
    accentColor: "from-indigo-500 to-purple-500",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
];

export default function WhyChooseGraphics() {
  return (
    <section className="bg-[#faf9f6] text-[#0f172a] py-32 px-6 md:px-12 border-b border-[#0f172a]/10 relative overflow-hidden">
      
      {/* Background dot grid */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-50 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      {/* Decorative aurora */}
      <div className="absolute left-[-120px] bottom-[-120px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-indigo-200/30 to-purple-200/20 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Step-by-Step Process */}
        <div className="mb-32">
          <div className="max-w-xl mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100/50 bg-indigo-50/80 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              ✦ Workflow
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              Our Creative{" "}
              <span className={`${dancingScript.className} text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600`}>
                Pipeline
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-soft hover:bg-white hover:border-slate-200 transition-all duration-300 overflow-hidden"
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${step.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl`} />

                {/* Step connector line (visible on lg) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-[1px] bg-slate-200 z-20" />
                )}

                {/* Outlined Number */}
                <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.accentColor} opacity-15 group-hover:opacity-40 transition-all duration-300 mb-6`}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">{step.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500 font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100/50 bg-indigo-50/80 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              ✦ Advantages
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight mb-6"
            >
              Why Work <br className="hidden lg:block" />
              <span className={`${dancingScript.className} text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600`}>
                With Us
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-sm md:text-base leading-relaxed font-light mb-8"
            >
              We design visuals that make companies look like multi-million dollar brands. Our work is clean, mathematically balanced, and aligned with modern SaaS and Tech design guidelines.
            </motion.p>

            <div className="space-y-4 mb-10">
              {["100% Custom Visuals", "Figma/SVG Vector Deliveries", "Flexible Iterations"].map((txt, i) => (
                <motion.div 
                  key={txt} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 text-slate-700 text-sm font-medium"
                >
                  <CheckCircle2 size={16} className="text-pink-500" />
                  <span>{txt}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="#estimate"
              className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0f172a] text-white hover:bg-slate-800 transition-colors text-sm font-semibold shadow-soft"
            >
              <span>Get Started</span>
              <ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-soft hover:bg-white hover:border-slate-200 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${v.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl`} />

                  <div className={`w-11 h-11 rounded-2xl border ${v.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                    <Icon size={18} className="stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">{v.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500 font-light">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
