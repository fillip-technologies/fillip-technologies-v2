"use client";

import React from "react";
import { motion } from "framer-motion";
import { Key, Target, Code, Repeat, Sparkles } from "lucide-react";

interface FeatureCard {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  color: string;
  glow: string;
  accent: string;
}

const features: FeatureCard[] = [
  {
    title: "Transactional Alerts & OTPs",
    desc: "Deploy two-factor authentication codes, booking verifications, and invoice receipts in under 3 seconds.",
    icon: Key,
    color: "text-cyan-500",
    glow: "rgba(6, 182, 212, 0.12)",
    accent: "bg-cyan-500/10 border-cyan-500/20"
  },
  {
    title: "Promotional Broadcasts",
    desc: "Draft marketing campaigns, schedule bulk product announcements, and distribute coupon codes instantly.",
    icon: Target,
    color: "text-indigo-500",
    glow: "rgba(99, 102, 241, 0.12)",
    accent: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    title: "Developer REST APIs",
    desc: "Robust REST, HTTP, and SMPP endpoints that allow you to integrate SMS triggers into any codebase in 5 lines of code.",
    icon: Code,
    color: "text-emerald-500",
    glow: "rgba(16, 185, 129, 0.12)",
    accent: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    title: "Intelligent Fallback Routing",
    desc: "Our smart system switches operator pipelines dynamically to avoid congestion and maintain 99.9% deliverability.",
    icon: Repeat,
    color: "text-pink-500",
    glow: "rgba(236, 72, 153, 0.12)",
    accent: "bg-pink-500/10 border-pink-500/20"
  }
];

export default function SmsFeatures() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Soft Background grid */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
            <Sparkles size={10} className="text-indigo-500" /> Advanced Capabilities
          </span> */}
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            Communication Engineered<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-600">
              For Perfect Delivery.
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">
            Our gateway is equipped with multiple operator tie-ups and direct router pipes, giving you low latencies and bulletproof delivery analytics.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative border border-slate-200/80 bg-slate-50/50 rounded-[2rem] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.03)] hover:border-slate-300 transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Glow Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${feature.glow} 0%, transparent 65%)`
                  }}
                />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className={`p-3 rounded-2xl border w-fit mb-6 ${feature.accent}`}>
                      <Icon className={`size-5 ${feature.color}`} />
                    </div>

                    <h3 className="text-base font-bold text-slate-800 mb-3 uppercase tracking-wide">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
