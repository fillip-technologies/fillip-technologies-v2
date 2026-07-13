"use client";

import React from "react";
import type { MarketingIndustriesContent } from "@/data/marketing/types";

// Card background palette, applied cyclically by index (not CMS-editable).
const BG_PALETTE = [
  "bg-[#ddd9ff]",
  "bg-[#ffe2f6]",
  "bg-[#dff3ff]",
  "bg-[#e7ffe8]",
  "bg-[#fff0d7]",
  "bg-[#eee7ff]",
];

const FALLBACK: MarketingIndustriesContent = {
  badge: "INDUSTRIES WE SERVE",
  title: "Industries We Help",
  highlightedTitle: "Scale Digitally",
  items: [
    {
      name: "Healthcare",
      label: "Care",
      blurb:
        "Digital growth strategy for Healthcare businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: [
        "Clinic growth campaigns",
        "Doctor appointment leads",
        "Local SEO visibility",
      ],
    },
    {
      name: "Finance",
      label: "Trust",
      blurb:
        "Digital growth strategy for Finance businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: [
        "Lead generation funnels",
        "SEO for finance brands",
        "Conversion landing pages",
      ],
    },
    {
      name: "Retail",
      label: "Sales",
      blurb:
        "Digital growth strategy for Retail businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["E-commerce growth", "Shopping campaigns", "Store visibility"],
    },
    {
      name: "Education",
      label: "Admissions",
      blurb:
        "Digital growth strategy for Education businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Admission campaigns", "Institute SEO", "Student enquiries"],
    },
    {
      name: "Real Estate",
      label: "Property",
      blurb:
        "Digital growth strategy for Real Estate businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Buyer lead funnels", "Project promotions", "Local property SEO"],
    },
    {
      name: "Logistics",
      label: "B2B",
      blurb:
        "Digital growth strategy for Logistics businesses looking to generate better visibility, quality leads and measurable conversions.",
      points: ["Transport SEO", "B2B campaigns", "Lead funnel optimization"],
    },
  ],
};

type IndustriesWeServeCardsProps = {
  data?: MarketingIndustriesContent;
};

export default function IndustriesWeServeCards({
  data,
}: IndustriesWeServeCardsProps) {
  const content = data ?? FALLBACK;
  const industries = content.items;

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 md:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8eef7_1px,transparent_1px),linear-gradient(to_bottom,#e8eef7_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-[0.28em] text-blue-600">
            {content.badge}
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            {content.title}
            <span className="highlight-text block">{content.highlightedTitle}</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((item, index) => (
            <article key={item.name} className="relative">
              <div className="absolute right-0 top-0 z-20 rounded-bl-[28px] bg-white p-3">
                <span className="rounded-full border border-slate-400 bg-white px-5 py-2 text-xl font-medium text-slate-900">
                  {item.label}
                </span>
              </div>

              <div
                className={`relative min-h-[360px] overflow-hidden rounded-[32px] ${BG_PALETTE[index % BG_PALETTE.length]} p-7 shadow-sm transition-all duration-300  hover:shadow-xl`}
              >
                <h3 className="max-w-[72%] text-3xl font-medium tracking-tight text-slate-950 xl:text-4xl">
                  {item.name}
                </h3>

                <p className="mt-8 max-w-sm text-sm leading-6 text-slate-700">
                  {item.blurb}
                </p>

                <ul className="mt-6 space-y-4">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm font-medium text-slate-900"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-950" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* <div className="absolute bottom-6 left-7 right-6 flex items-center justify-between gap-4">
                  <p className="text-xl font-medium text-slate-950">
                    Growth Strategy
                  </p>

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 py-2 pl-4 pr-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Request a Proposal
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600">
                      <ArrowUpRight size={17} />
                    </span>
                  </a>
                </div> */}

                <div className="pointer-events-none absolute bottom-10 right-8 h-32 w-32 rounded-[34px] border-[20px] border-white/30" />
                <div className="pointer-events-none absolute bottom-24 right-20 h-20 w-20 rounded-[24px] border-[14px] border-white/25" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
