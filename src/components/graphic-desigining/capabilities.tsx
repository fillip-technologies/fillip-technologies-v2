"use client";

import { motion } from "framer-motion";
import { Palette, Layers, FileText, Shapes, Sparkles, Package, ArrowUpRight } from "lucide-react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});

const items = [
  {
    icon: Palette,
    title: "Brand Visual Identity",
    desc: "Complete visual frameworks including wordmarks, custom color palettes, brand typography, and unified style guides.",
    tag: "Branding",
    accentColor: "from-pink-500 to-purple-600",
    iconBg: "bg-pink-50 text-pink-600 border-pink-100",
    hoverBorder: "group-hover:border-pink-200",
  },
  {
    icon: Sparkles,
    title: "Marketing & Ad Creatives",
    desc: "Conversion-focused assets for Facebook/Instagram ads, marketing banners, newsletters, and high-performance campaigns.",
    tag: "Social / Web",
    accentColor: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    hoverBorder: "group-hover:border-amber-200",
  },
  {
    icon: Layers,
    title: "Digital & Print Collaterals",
    desc: "Premium tactile designs for print brochures, posters, business cards, merchandise, and exhibition banners.",
    tag: "Print Media",
    accentColor: "from-blue-500 to-cyan-600",
    iconBg: "bg-blue-50 text-blue-600 border-blue-100",
    hoverBorder: "group-hover:border-blue-200",
  },
  {
    icon: Shapes,
    title: "Custom Vector Illustrations",
    desc: "Bespoke illustrations in isometric, flat, or hand-drawn vector formats designed exclusively for your website & digital platforms.",
    tag: "Art & Vectors",
    accentColor: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverBorder: "group-hover:border-emerald-200",
  },
  {
    icon: FileText,
    title: "Pitch Decks & Presentations",
    desc: "Expertly structured and designed corporate presentation templates, investor decks, annual reports, and infographics.",
    tag: "Corporate",
    accentColor: "from-indigo-500 to-violet-600",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    hoverBorder: "group-hover:border-indigo-200",
  },
  {
    icon: Package,
    title: "Product & Packaging Design",
    desc: "Eye-catching concepts for retail packaging, box layouts, product labels, and custom corporate merchandise.",
    tag: "Physical Goods",
    accentColor: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-50 text-rose-600 border-rose-100",
    hoverBorder: "group-hover:border-rose-200",
  },
];

export default function GraphicCapabilities() {
  return (
    <section id="capabilities" className="bg-[#faf9f6] text-[#0f172a] py-32 px-6 md:px-12 border-b border-[#0f172a]/10 relative overflow-hidden">

      {/* Background subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-50 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      {/* Decorative aurora */}
      <div className="absolute right-[-120px] top-[-120px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-200/30 to-pink-200/20 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-20">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-100/50 bg-indigo-50/80 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              ✦ Services & Deliverables
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              Design{" "}
              <span className={`${dancingScript.className} text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600`}>
                Solutions
              </span>
              <br />
              Crafted to Convert
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-slate-500 text-sm md:text-base leading-relaxed font-light"
          >
            We merge pure artistic expression with user research and conversion strategy. Every vector, color token, and layout exists for a singular purpose: to drive your business message home.
          </motion.p>
        </div>

        {/* Capabilities Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`group bg-white/90 backdrop-blur-md border border-white/50 p-8 md:p-9 rounded-3xl shadow-soft flex flex-col justify-between hover:bg-white ${item.hoverBorder} transition-all duration-300 relative overflow-hidden`}
              >
                {/* Gradient accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl`} />

                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-3.5 rounded-2xl border ${item.iconBg} group-hover:scale-110 transition-all duration-300 shadow-xs`}>
                      <Icon size={22} className="stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-slate-200/80 bg-slate-50 text-slate-500 uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-slate-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-500 font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-slate-800 transition-colors cursor-pointer group/link">
                  <span>Learn more</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
