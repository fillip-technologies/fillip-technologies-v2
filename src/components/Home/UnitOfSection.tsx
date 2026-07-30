"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HOME_UNITS, type UnitItem } from "@/data/home/defaults";

const UNIT_STYLES = [
  { logoSize: "h-16 w-48", plateBg: "bg-gradient-to-br from-cyan-100/40 via-blue-50/30 to-white", logoOffset: 0 },
  { logoSize: "h-12 w-40", plateBg: "bg-gradient-to-br from-indigo-100/40 via-blue-50/30 to-white", logoOffset: 0 },
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
  const primaryUnit = units[0];

  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-white px-6 py-14 md:px-12 md:py-18">
      <Image
        src="/images/FSA-logo-2.png"
        alt=""
        width={340}
        height={170}
        aria-hidden="true"
        className="pointer-events-none absolute left-[-150px] top-[58%] z-0 hidden -translate-y-1/2 opacity-[0.1] md:block"
      />
      <Image
        src="/images/FSA-logo-2.png"
        alt=""
        width={560}
        height={280}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-1/2 z-0 hidden -translate-y-1/2 opacity-[0.1] md:block"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.2]"
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

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900 md:text-5xl">
            {c.headingLead}{" "}
            <span className="bg-gradient-to-r from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              {c.headingHighlight}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            {c.description}
          </p>
          {primaryUnit?.link && (
            <a
              href={primaryUnit.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0242A2] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_16px_36px_rgba(2,66,162,0.22)] transition hover:bg-slate-900"
            >
              Visit Website
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="grid gap-6">
          {units.map((unit, index) => (
            <motion.div
              key={unit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-3xl border border-blue-100 bg-slate-50 p-6 shadow-[0_15px_45px_rgba(2,66,162,0.08)] transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(37,99,235,0.14)] sm:p-8"
            >
              <div className={`relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl border border-blue-100/70 ${unit.plateBg} p-6 shadow-[0_12px_35px_rgba(37,99,235,0.06)]`}>
                <div className="absolute right-4 top-4 z-20">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-blue-700">
                    {unit.badge}
                  </span>
                </div>

                <div
                  className={`relative ${unit.logoSize} transition-transform duration-500 group-hover:scale-105`}
                  style={unit.logoOffset ? { top: `${unit.logoOffset}px` } : undefined}
                >
                  {unit.logo && (
                    <Image
                      src={unit.logo}
                      alt={unit.title}
                      fill
                      sizes="224px"
                      className="object-contain"
                    />
                  )}
                </div>
              </div>

              <div className="mt-7">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
                  {unit.title}
                </h3>
                <span className="mt-3 inline-flex w-fit rounded-full border border-blue-100 bg-white px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  {unit.subtitle}
                </span>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {unit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
