"use client";

import { useEffect, useState } from "react";
import { resolveIcon } from "./icons";
import type { MarketingToolsContent } from "@/data/marketing/types";

const FALLBACK: MarketingToolsContent = {
  eyebrow: "TOOLS & TECHNOLOGIES",
  title: "Technical SEO Tools",
  highlightedTitle: "We Work With",
  description:
    "We use trusted SEO platforms, audit systems and technical frameworks to improve crawling, indexing, performance and search visibility.",
  items: [
    { name: "Google Search Console", icon: "search" },
    { name: "Google Analytics 4", icon: "chart" },
    { name: "PageSpeed Insights", icon: "gauge" },
    { name: "Screaming Frog", icon: "bot" },
    { name: "Schema Markup", icon: "file" },
    { name: "Ahrefs", icon: "link" },
    { name: "Semrush", icon: "activity" },
    { name: "Robots.txt", icon: "shield" },
    { name: "XML Sitemap", icon: "globe" },
    { name: "Log File Analysis", icon: "database" },
    { name: "Lighthouse", icon: "gauge" },
    { name: "Technical Audit", icon: "network" },
    { name: "JSON-LD", icon: "code" },
    { name: "Canonical Tags", icon: "link" },
    { name: "Core Web Vitals", icon: "activity" },
    { name: "Crawl Mapping", icon: "bot" },
    { name: "Index Coverage", icon: "search" },
    { name: "Site Architecture", icon: "network" },
  ],
};

// Split the flat tools list into carousel rows of up to 6.
function chunk<T>(arr: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += size) rows.push(arr.slice(i, i + size));
  return rows;
}

type TechnicalSeoToolsSectionProps = {
  data?: MarketingToolsContent;
};

export default function TechnicalSeoToolsSection({
  data,
}: TechnicalSeoToolsSectionProps) {
  const content = data ?? FALLBACK;
  const logoRows = chunk(content.items, 6);

  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    if (logoRows.length <= 1) return;
    const timer = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % logoRows.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [logoRows.length]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 md:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8eef7_1px,transparent_1px),linear-gradient(to_bottom,#e8eef7_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1300px] text-center">
        <p className="mb-4 text-sm font-semibold tracking-[0.28em] text-blue-600">
          {content.eyebrow}
        </p>

        <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
          {content.title}
          <span className="highlight-text block">{content.highlightedTitle}</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {content.description}
        </p>

        <div className="relative mx-auto mt-16 h-[170px] max-w-6xl overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          {logoRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`absolute inset-0 flex items-center justify-center gap-5 transition-all duration-700 ease-out ${
                activeRow === rowIndex
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm"
              }`}
            >
              {row.map((tool) => {
                const Icon = resolveIcon(tool.icon);

                return (
                  <div
                    key={tool.name}
                    className="group flex h-[118px] min-w-[165px] flex-col items-center justify-center rounded-[28px] border border-blue-100 bg-white/90 px-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={28} />
                    </div>

                    <p className="text-sm font-semibold leading-5 text-slate-800">
                      {tool.name}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {logoRows.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveRow(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeRow === index ? "w-8 bg-blue-600" : "w-2 bg-blue-200"
              }`}
              aria-label={`Show tools row ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
