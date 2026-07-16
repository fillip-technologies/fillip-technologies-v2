"use client";

import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import type { SmsPricingContent } from "@/components/solutions/sms-content";

export default function SmsPricing({ content }: { content: SmsPricingContent }) {
  const [volume, setVolume] = useState(50000);

  // Dynamic volume specs tier logic. Thresholds stay in code; the text shown for
  // each tier is CMS-managed.
  const getVolumeSpecs = (vol: number) => {
    if (vol >= 500000) {
      return {
        routeType: content.tier4RouteType,
        setupTime: content.tier4SetupTime,
        support: content.tier4Support,
        badge: content.tier4Badge
      };
    } else if (vol >= 100000) {
      return {
        routeType: content.tier3RouteType,
        setupTime: content.tier3SetupTime,
        support: content.tier3Support,
        badge: content.tier3Badge
      };
    } else if (vol >= 25000) {
      return {
        routeType: content.tier2RouteType,
        setupTime: content.tier2SetupTime,
        support: content.tier2Support,
        badge: content.tier2Badge
      };
    } else {
      return {
        routeType: content.tier1RouteType,
        setupTime: content.tier1SetupTime,
        support: content.tier1Support,
        badge: content.tier1Badge
      };
    }
  };

  const specs = getVolumeSpecs(volume);

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute left-1/3 bottom-[-150px] w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-400/5 to-indigo-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
            <Sparkles size={10} className="text-cyan-500" /> Dynamic Billing Calculator
          </span> */}
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            {content.headingLine1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-600">
              {content.headingLine2}
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Dynamic Calculator widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">

          {/* CALCULATOR SLIDER PANEL (Left column) */}
          <div className="lg:col-span-7 border border-slate-200/80 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col justify-between">

            <div>
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {content.estimateLabel}
                </span>
                <span className="text-2xl font-black font-mono text-primary">
                  {volume.toLocaleString()} <span className="text-xs text-slate-400 font-normal">{content.smsUnit}</span>
                </span>
              </div>

              {/* Range Input Slider */}
              <div className="relative mb-10 pt-2">
                <input
                  type="range"
                  min={5000}
                  max={1000000}
                  step={5000}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                {/* Visual marks */}
                <div className="flex justify-between text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-3.5">
                  <span>{content.mark1}</span>
                  <span>{content.mark2}</span>
                  <span>{content.mark3}</span>
                  <span>{content.mark4}</span>
                </div>
              </div>

              {/* Dynamic Rates Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {content.routeTypeLabel}
                  </span>
                  <span className="text-lg font-bold text-slate-900 block leading-tight">
                    {specs.routeType}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {content.setupTimeLabel}
                  </span>
                  <span className="text-lg font-bold text-slate-900 block leading-tight">
                    {specs.setupTime}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {content.supportLabel}
                  </span>
                  <span className="text-xs font-bold font-mono text-cyan-700 bg-cyan-50 border border-cyan-100 rounded-full px-3 py-0.5 inline-block mt-0.5">
                    {specs.support}
                  </span>
                </div>
              </div>
            </div>

            {/* Volume Tiers Legend */}
            <div className="border-t border-slate-100 pt-6 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex flex-wrap gap-x-6 gap-y-2">
              <span>{content.legend1}</span>
              <span>{content.legend2}</span>
              <span>{content.legend3}</span>
              <span>{content.legend4}</span>
            </div>

          </div>

          {/* PACKAGE DETAILS CARD (Right column) */}
          <div className="lg:col-span-5 border border-slate-200/80 bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-100px] right-[-100px] w-52 h-52 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-2xl pointer-events-none" />

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15 mb-6">
                {content.featuresBadge}
              </span>

              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6">
                {content.includedTitle}
              </h3>

              <ul className="space-y-4 mb-8">
                {content.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-350 font-light leading-relaxed">
                    <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`/contact?package=sms&plan=${specs.badge}&volume=${volume}`}
              className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <span>{content.ctaLabel}</span>
              <ArrowRight size={13} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
