"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Minus, Plus } from "lucide-react";
import type { Cta, CostFactor, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";

type CostContent = SectionHeading & { factors: CostFactor[]; flow: string[]; cta: { title: string; subtitle: string; button: Cta } };

function FactorScale({ scale }: { scale: CostFactor["scale"] }) {
  if (scale.kind === "options") {
    return (
      <ul className="flex flex-wrap gap-2">
        {scale.items.map((item) => (
          <li key={item} className="rounded-lg border border-blue-100 bg-blue-50/60 px-2.5 py-1 text-xs font-medium text-[#0242A2]">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  const stops = scale.stops ?? [scale.from, scale.to];
  return (
    <div>
      <div className="relative h-1.5 rounded-full bg-gradient-to-r from-blue-100 via-[#0F6FFF]/60 to-[#0242A2]">
        {stops.map((s, i) => (
          <span
            key={s}
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#0F6FFF] shadow"
            style={{ left: `${(i / (stops.length - 1)) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex justify-between gap-4 text-[11px] font-medium text-slate-500">
        {stops.map((s) => (
          <span key={s} className="last:text-right">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CostFlow({ flow, highlighted }: { flow: string[]; highlighted: number[] }) {
  const last = flow.length - 1;
  return (
    <ol aria-label="How cost is shaped" className="flex flex-col items-stretch">
      {flow.map((step, i) => {
        const isOn = highlighted.includes(i);
        const isResult = i === last;
        return (
          <li key={step} className="flex flex-col items-center">
            <div
              className={`w-full rounded-xl border px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isResult
                  ? "border-transparent bg-[#081C2E] text-white"
                  : isOn
                    ? "border-blue-200 bg-blue-50 text-[#0242A2] shadow-[0_8px_20px_rgba(15,111,255,0.12)]"
                    : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {step}
              {isOn && !isResult && <span className="sr-only"> (influenced by the selected factor)</span>}
            </div>
            {i < last && (
              <ArrowDown
                aria-hidden
                className={`my-1.5 h-4 w-4 transition-colors duration-300 ${isOn ? "text-[#0F6FFF]" : "text-slate-300"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function HireCost({ content }: { content: CostContent }) {
  const [active, setActive] = useState(0);
  const COST_FACTORS = content.factors;

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Left: explanation + flow */}
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              <HighlightTitle title={content.title} />
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            <div className="mt-8 hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:block">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Why pricing varies
              </p>
              <CostFlow flow={content.flow} highlighted={COST_FACTORS[active].influences} />
            </div>
          </div>

          {/* Right: interactive factors */}
          <div className="flex flex-col">
            <ul className="border-t border-slate-200">
              {COST_FACTORS.map((f, i) => {
                const isActive = i === active;
                return (
                  <li key={f.title} className="relative border-b border-slate-200">
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-[#0242A2] to-[#38BDF8] transition-transform duration-500 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <button
                      type="button"
                      id={`cost-trigger-${i}`}
                      aria-expanded={isActive}
                      aria-controls={`cost-panel-${i}`}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="flex w-full items-center gap-4 py-5 pl-5 pr-1 text-left"
                    >
                      <span className="w-6 text-xs font-semibold tabular-nums text-[#0F6FFF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`flex-1 text-base font-semibold transition-colors sm:text-lg ${isActive ? "text-[#0242A2]" : "text-slate-900"}`}>
                        {f.title}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive ? "border-transparent bg-[#0242A2] text-white" : "border-slate-200 text-slate-500"
                        }`}
                      >
                        {isActive ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                    <div
                      id={`cost-panel-${i}`}
                      role="region"
                      aria-labelledby={`cost-trigger-${i}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-5 pr-4 sm:pl-[3.75rem]">
                          <p className="text-sm leading-relaxed text-slate-600">{f.description}</p>
                          <div className="mt-4">
                            <FactorScale scale={f.scale} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Mobile/tablet flow */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 lg:hidden">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Why pricing varies</p>
              <CostFlow flow={content.flow} highlighted={COST_FACTORS[active].influences} />
            </div>

            {/* Small CTA */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{content.cta.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{content.cta.subtitle}</p>
              </div>
              <Link
                href={content.cta.button.href}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0242A2] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0F6FFF]"
              >
                {content.cta.button.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
