"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PortfolioCta() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Soft auroras */}
      <div className="absolute left-10 bottom-[-100px] w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-400/10 to-indigo-400/5 blur-3xl pointer-events-none" />
      <div className="absolute right-10 top-[-100px] w-96 h-96 rounded-full bg-gradient-to-bl from-pink-400/10 to-violet-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Banner card */}
        <div className="border border-slate-200/80 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-12 md:p-20 text-center shadow-lg relative overflow-hidden">
          
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <Sparkles size={10} className="text-amber-500" /> Let's Co-create
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase leading-tight mt-6">
            Ideas shaped into<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-600">
              functional realities.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500 text-sm md:text-base font-light leading-relaxed mb-10">
            Have a custom web application, enterprise app, or branding design project in mind? Reach out to our design and engineering team to get a detailed technical scope report.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link 
              href="/contact" 
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Start a Project
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/quote" 
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Free Scoping
            </Link>
          </div>

          {/* Micro badges below */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 border-t border-slate-100 pt-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            <span>✦ Detailed Scoping Report</span>
            <span>✦ Custom Engineering</span>
            <span>✦ Design Mockups Included</span>
          </div>

        </div>

      </div>
    </section>
  );
}
