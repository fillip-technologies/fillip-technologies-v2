"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HOME_UNITS, type UnitItem } from "@/data/home/defaults";

// Per-card styling stays code-side and is applied by position.
const UNIT_STYLES = [
  { logoSize: "h-12 w-40", plateBg: "bg-gradient-to-br from-purple-100/30 via-indigo-50/20 to-slate-50/40", logoOffset: -50 },
  { logoSize: "h-16 w-48", plateBg: "bg-gradient-to-br from-cyan-100/30 via-blue-50/20 to-slate-50/40", logoOffset: 0 },
];

type UnitOfContent = Partial<{
  headingLead: string;
  headingHighlight: string;
  description: string;
  items: UnitItem[];
}>;

export default function UnitOfSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as UnitOfContent;
  const c = {
    headingLead: content.headingLead ?? "A Unit",
    headingHighlight: content.headingHighlight ?? "Of",
    description:
      content.description ??
      "Fillip Technologies operates as a core digital development and execution wing under our group organizations, driving synergy across technical mentorship and advanced professional skill development.",
  };
  const items = content.items?.length ? content.items : HOME_UNITS;
  const units = items.map((u, i) => ({ ...u, ...UNIT_STYLES[i % UNIT_STYLES.length] }));

  return (
    <section className="pt-0 pb-24 px-6 md:px-12 bg-gradient-to-b from-[#f8fafc] to-white relative overflow-hidden border-t border-slate-100">
      {/* Decorative gradient blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-3xl pointer-events-none opacity-80" />
      <div className="absolute bottom-[10%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl pointer-events-none opacity-80" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2,66,162,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2,66,162,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {/* <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-900/5 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6">
            ✦ Group Collaboration
          </span> */}
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 uppercase">
            {c.headingLead} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{c.headingHighlight}</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed">
            {c.description}
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {units.map((unit, index) => (
            <motion.div
              key={unit.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col justify-between h-full overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 p-8 shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_70px_rgba(37,99,235,0.15)]"
            >
              {/* Glassmorphic card internal background overlays */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white via-white/80 to-blue-50/50 opacity-90 -z-10" />
              <div className="absolute right-0 top-0 h-40 w-40 rounded bg-blue-500/10 blur-[70px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

              <div>
                {/* Logo Brand Plate */}
                <div className={`relative h-32 w-full overflow-hidden rounded-2xl border border-blue-100/30 ${unit.plateBg} shadow-[0_12px_35px_rgba(37,99,235,0.06)] flex items-center justify-center p-6 mb-6`}>
                  {/* Badge */}
                  <div className="absolute right-4 top-4 z-20">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full">
                      {unit.badge}
                    </span>
                  </div>

                  {/* Image */}
                  <div
                    className={`relative ${unit.logoSize} transition-transform duration-500 group-hover:scale-105`}
                    style={unit.logoOffset ? { top: `${unit.logoOffset}px` } : undefined}
                  >
                    <Image
                      src={unit.logo}
                      alt={unit.title}
                      fill
                      sizes="224px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2 uppercase">
                  {unit.title}
                </h3>

                <span className="mb-4 inline-flex w-fit rounded-full border border-blue-100 bg-blue-50/70 px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                  {unit.subtitle}
                </span>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 font-light">
                  {unit.description}
                </p>
              </div>

              {/* Link CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <a
                  href={unit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-blue-700 transition-colors duration-300 hover:text-slate-900"
                >
                  Visit Website
                  <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
