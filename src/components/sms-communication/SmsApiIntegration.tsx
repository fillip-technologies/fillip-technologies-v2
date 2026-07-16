"use client";

import React from "react";
import { Sparkles, Check, Layers, Share2, Smartphone } from "lucide-react";
import type { SmsApiContent } from "@/components/solutions/sms-content";

export default function SmsApiIntegration({ content }: { content: SmsApiContent }) {
  return (
    <section className="py-24 px-6 md:px-12 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow Orbs */}
      <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-slate-900 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-6">
            <Sparkles size={10} className="text-cyan-400 animate-pulse" /> {content.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">
            {content.headingLine1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-indigo-400">
              {content.headingLine2}
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT PANEL - FEATURES & CAPABILITIES */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-4">
                {content.leftTitle}
              </h3>
              <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                {content.leftDescription}
              </p>
            </div>

            <div className="space-y-6">
              {content.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-450 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL - ROUTING FLOW VISUALIZER DIAGRAM */}
          <div className="lg:col-span-6 flex flex-col border border-slate-800 bg-[#060b13]/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative justify-between overflow-hidden">
            <div className="absolute top-[-100px] right-[-100px] w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
            
            <div className="border-b border-slate-900 pb-4 mb-8">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                {content.flowSubtitle}
              </span>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide mt-1.5">
                {content.flowTitle}
              </h4>
            </div>

            {/* FLOW DIAGRAM STEPS */}
            <div className="space-y-8 relative flex-1 flex flex-col justify-center">

              {/* Step 1: Your Application */}
              <div className="flex items-center gap-5 relative group">
                <div className="size-11 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 z-10 shadow-lg">
                  <Layers size={18} />
                </div>
                <div>
                  <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                    {content.stepLabel} 01
                  </span>
                  <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {content.flow1Title}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-normal">
                    {content.flow1Desc}
                  </p>
                </div>
                {/* Connecting Line */}
                <div className="absolute left-[21px] top-11 bottom-[-32px] w-[1px] bg-gradient-to-b from-cyan-500 via-primary to-indigo-500 -z-0 opacity-60" />
              </div>

              {/* Step 2: Fillip Gateway */}
              <div className="flex items-center gap-5 relative group">
                <div className="size-11 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 z-10 shadow-lg">
                  <Share2 size={18} />
                </div>
                <div>
                  <span className="text-[8px] font-mono text-primary uppercase tracking-widest block font-bold">
                    {content.stepLabel} 02
                  </span>
                  <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {content.flow2Title}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-normal">
                    {content.flow2Desc}
                  </p>
                </div>
                {/* Connecting Line */}
                <div className="absolute left-[21px] top-11 bottom-[-32px] w-[1px] bg-gradient-to-b from-indigo-500 to-emerald-500 -z-0 opacity-60" />
              </div>

              {/* Step 3: Destination Phone */}
              <div className="flex items-center gap-5 relative group">
                <div className="size-11 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 z-10 shadow-lg">
                  <Smartphone size={18} />
                </div>
                <div>
                  <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                    {content.stepLabel} 03
                  </span>
                  <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {content.flow3Title}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-normal">
                    {content.flow3Desc}
                  </p>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-900 pt-6 mt-8 flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              <span>{content.footerLeft}</span>
              <span className="text-emerald-500 font-bold">{content.footerRight}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
