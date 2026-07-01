"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function SmsPricing() {
  const [volume, setVolume] = useState(50000);

  // Price tier logic
  const getRateAndSavings = (vol: number) => {
    let rate = 0.15;
    if (vol >= 500000) {
      rate = 0.10;
    } else if (vol >= 100000) {
      rate = 0.12;
    } else if (vol >= 25000) {
      rate = 0.13;
    }

    const standardCost = vol * 0.15;
    const actualCost = vol * rate;
    const savings = standardCost - actualCost;

    return {
      rate,
      actualCost,
      savings
    };
  };

  const { rate, actualCost, savings } = getRateAndSavings(volume);

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
            Paid Packages Built<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-600">
              For Scale & Savings.
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">
            Drag the volume slider to calculate your rate and see how much you save with our wholesale carrier connections.
          </p>
        </div>

        {/* Dynamic Calculator widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">

          {/* CALCULATOR SLIDER PANEL (Left column) */}
          <div className="lg:col-span-7 border border-slate-200/80 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col justify-between">

            <div>
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Estimated Monthly SMS
                </span>
                <span className="text-2xl font-black font-mono text-primary">
                  {volume.toLocaleString()} <span className="text-xs text-slate-400 font-normal">SMS</span>
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
                  <span>5k</span>
                  <span>100k</span>
                  <span>500k</span>
                  <span>1M+</span>
                </div>
              </div>

              {/* Dynamic Rates Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-wider block mb-1">
                    Rate per SMS
                  </span>
                  <span className="text-2xl font-black font-mono text-slate-900">
                    ₹{rate.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-wider block mb-1">
                    Estimated Cost
                  </span>
                  <span className="text-2xl font-black font-mono text-slate-900">
                    ₹{Math.floor(actualCost).toLocaleString()}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="text-[10px] font-mono text-slate-455 uppercase tracking-wider block mb-1">
                    Discount Savings
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-3.5 py-0.5 inline-block mt-0.5">
                    -₹{Math.floor(savings).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Volume Tiers Legend */}
            <div className="border-t border-slate-100 pt-6 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex flex-wrap gap-x-6 gap-y-2">
              <span>● &lt;25k: ₹0.15</span>
              <span>● 25k-100k: ₹0.13</span>
              <span>● 100k-500k: ₹0.12</span>
              <span>● 500k+: ₹0.10</span>
            </div>

          </div>

          {/* PACKAGE DETAILS CARD (Right column) */}
          <div className="lg:col-span-5 border border-slate-200/80 bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-100px] right-[-100px] w-52 h-52 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-2xl pointer-events-none" />

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15 mb-6">
                All-Inclusive Features
              </span>

              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6">
                What is included
              </h3>

              <ul className="space-y-4 mb-8">
                {[
                  "DLT Header / Sender ID Registration Support",
                  "Unicode SMS Support (Multiple Languages)",
                  "Real-Time Live Webhook Delivery Reports",
                  "Direct Carrier Route with Smart Failover",
                  "No Setup Fee & Credits Never Expire",
                  "Standard REST APIs & Developer SDKs"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-350 font-light leading-relaxed">
                    <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`/contact?package=sms&volume=${volume}`}
              className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <span>Get Started Now</span>
              <ArrowRight size={13} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
