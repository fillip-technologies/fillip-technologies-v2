"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { EngagementModel as Model, HireImage, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { DynamicIcon, getIcon } from "./icons";

function Visual({ image, sizes }: { image?: HireImage | null; sizes: string }) {
  return image ? (
    <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
  ) : (
    // Placeholder until a role photo is added to /public.
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-to-br from-[#081C2E] via-[#0242A2] to-[#38BDF8]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(135deg, #081C2E, #0242A2 55%, #38BDF8)",
        backgroundSize: "48px 48px, 48px 48px, auto",
      }}
    />
  );
}

function ModelDetails({ model }: { model: Model }) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{model.purpose}</p>

      <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
        {model.facts.map((f) => (
          <div key={f.label} className="bg-white p-3.5">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{f.label}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{f.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-[#0F6FFF]">Ideal for</p>
      <ul className="mt-2.5 space-y-2">
        {model.bestFor.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0F6FFF]">
              <Check className="h-3 w-3" />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HireEngagementModels({
  content,
  image,
}: {
  content: SectionHeading & { models: Model[] };
  image?: HireImage | null;
}) {
  const [active, setActive] = useState(0);
  const models = content.models;
  const current = models[active];

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left: heading + selector */}
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              <HighlightTitle title={content.title} />
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            {/* Mobile/tablet: photo above the accordion */}
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
              <Visual image={image} sizes="100vw" />
            </div>

            <ul className="mt-8 space-y-3">
              {models.map((m, i) => {
                const Icon = getIcon(m.icon);
                const isActive = i === active;
                return (
                  <li
                    key={m.title}
                    className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "border-blue-200 bg-gradient-to-r from-blue-50/80 to-white shadow-[0_14px_36px_rgba(2,66,162,0.1)]"
                        : "border-slate-200 bg-white hover:border-blue-200"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#0242A2] to-[#38BDF8] transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <button
                      type="button"
                      id={`engagement-tab-${i}`}
                      aria-expanded={isActive}
                      aria-controls={`engagement-detail engagement-inline-${i}`}
                      onClick={() => setActive(i)}
                      className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white ring-transparent"
                            : "bg-blue-50 text-[#0242A2] ring-blue-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="text-[11px] font-semibold tabular-nums text-[#0F6FFF]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={`text-base font-semibold sm:text-lg ${isActive ? "text-[#0242A2]" : "text-slate-900"}`}>
                            {m.title}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-sm text-slate-500">{m.summary}</span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 lg:-rotate-90 ${
                          isActive ? "rotate-180 text-[#0F6FFF]" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile/tablet accordion panel */}
                    {isActive && (
                      <div
                        id={`engagement-inline-${i}`}
                        role="region"
                        aria-labelledby={`engagement-tab-${i}`}
                        className="animate-in fade-in px-4 pb-5 duration-300 sm:px-5 lg:hidden"
                      >
                        <ModelDetails model={m} />
                        <Link
                          href="/contact"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0242A2]"
                        >
                          Discuss this model
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: visual + details (desktop) */}
          <div
            id="engagement-detail"
            role="region"
            aria-live="polite"
            aria-labelledby={`engagement-tab-${active}`}
            className="hidden overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(7,47,55,0.08)] lg:flex lg:flex-col"
          >
            <div className="relative aspect-[16/8] w-full shrink-0">
              <Visual image={image} sizes="(min-width: 1024px) 55vw, 100vw" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#081C2E]/50 via-transparent to-transparent" />
              <div
                key={`label-${active}`}
                className="absolute bottom-5 left-5 inline-flex animate-in items-center gap-2.5 rounded-xl bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur fade-in slide-in-from-bottom-1 duration-300"
              >
                <DynamicIcon name={current.icon} className="h-4 w-4 text-[#0F6FFF]" />
                <span className="text-sm font-semibold text-slate-900">{current.title}</span>
              </div>
            </div>

            <div key={active} className="flex flex-1 animate-in flex-col p-7 fade-in slide-in-from-bottom-2 duration-300 xl:p-8">
              <ModelDetails model={current} />
              <Link
                href="/contact"
                className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#0242A2] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(2,66,162,0.3)] transition-all duration-300 hover:bg-[#0F6FFF]"
              >
                Discuss this model
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
