"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { HireImage, SectionHeading, UseCase } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { DynamicIcon, getIcon } from "./icons";

function FlowDetails({ useCase }: { useCase: UseCase }) {
  return (
    <ol className="space-y-3">
      <li>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Business problem</p>
        <p className="mt-1 text-sm text-slate-700">{useCase.problem}</p>
      </li>
      <li>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0F6FFF]">AI solution</p>
        <p className="mt-1 text-sm font-medium text-slate-900">{useCase.solution}</p>
      </li>
      <li>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">In practice</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {useCase.applications.map((a) => (
            <li
              key={a}
              className="rounded-lg border border-blue-100 bg-blue-50/70 px-2.5 py-1 text-xs font-medium text-[#0242A2]"
            >
              {a}
            </li>
          ))}
        </ul>
      </li>
    </ol>
  );
}

export default function HireUseCases({
  content,
  image,
}: {
  content: SectionHeading & { items: UseCase[] };
  image?: HireImage | null;
}) {
  const [active, setActive] = useState(0);
  const items = content.items;
  const current = items[active];

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16">
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              <HighlightTitle title={content.title} />
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* Visual anchor */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[600px]">
            {image ? (
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            ) : (
              // Placeholder until a role photo is added to /public.
              <div
                aria-hidden
                className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
            )}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#081C2E]/70 via-[#081C2E]/10 to-transparent" />

            {/* Active use case — mobile: compact label; desktop: full flow panel */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur lg:hidden">
              <DynamicIcon name={current.icon} className="h-4 w-4 text-[#0F6FFF]" />
              <span className="text-sm font-semibold text-slate-900">{current.title}</span>
            </div>

            <div
              key={active}
              aria-live="polite"
              className="absolute bottom-6 left-6 right-6 hidden max-w-md animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-white/50 bg-white/95 p-6 shadow-[0_24px_60px_rgba(7,47,55,0.25)] backdrop-blur duration-300 lg:block"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white">
                  <DynamicIcon name={current.icon} className="h-5 w-5" />
                </span>
                <p className="text-lg font-semibold text-slate-900">{current.title}</p>
              </div>
              <FlowDetails useCase={current} />
            </div>
          </div>

          {/* Use-case selector */}
          <ul className="flex flex-col justify-center border-t border-slate-200">
            {items.map((uc, i) => {
              const Icon = getIcon(uc.icon);
              const isActive = i === active;
              return (
                <li key={uc.title} className="border-b border-slate-200">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group relative flex w-full items-center gap-4 py-5 text-left transition-colors duration-300 ${
                      isActive ? "text-[#0242A2]" : "text-slate-900 hover:text-[#0242A2]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute -bottom-px left-0 h-[2px] bg-gradient-to-r from-[#0242A2] to-[#38BDF8] transition-all duration-500 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white ring-transparent"
                          : "bg-blue-50 text-[#0242A2] ring-blue-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-semibold tabular-nums text-[#0F6FFF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-base font-semibold sm:text-lg">{uc.title}</span>
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                        isActive ? "translate-x-0 text-[#0F6FFF] opacity-100 max-lg:rotate-90" : "-translate-x-1 opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </button>

                  {/* Mobile/tablet: details expand inline under the active item */}
                  {isActive && (
                    <div className="animate-in fade-in pb-6 pl-15 duration-300 lg:hidden">
                      <FlowDetails useCase={uc} />
                    </div>
                  )}
                </li>
              );
            })}
            <li className="pt-6">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0242A2] transition-colors hover:text-[#0F6FFF]"
              >
                Have a different use case? Let&apos;s discuss it
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
