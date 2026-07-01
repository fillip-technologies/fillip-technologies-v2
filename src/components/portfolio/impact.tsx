"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Users, TrendingUp, CheckCircle2, Quote, ArrowUpRight, Sparkles } from "lucide-react";

interface Metric {
  value: string;
  label: string;
  desc: string;
  icon: React.ComponentType<any>;
  glowColor: string;
  accentClass: string;
  badgeText: string;
}

interface Testimonial {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  stat: string;
  statLabel: string;
  projectUrl: string;
  industry: string;
  bgGradient: string;
  accentColor: string;
}

const metrics: Metric[] = [
  {
    value: "45+",
    label: "Projects Delivered",
    desc: "High-performance custom web apps, mobile apps, and branding identities engineered to scale.",
    icon: Award,
    glowColor: "rgba(6, 182, 212, 0.12)",
    accentClass: "text-cyan-500 border-cyan-500/20 bg-cyan-500/10",
    badgeText: "98% On-Time"
  },
  {
    value: "2.4M+",
    label: "Active Users Engaged",
    desc: "Millions of monthly interactions handled securely across client portals and public websites.",
    icon: Users,
    glowColor: "rgba(99, 102, 241, 0.12)",
    accentClass: "text-indigo-500 border-indigo-500/20 bg-indigo-500/10",
    badgeText: "High-Throughput"
  },
  {
    value: "0.4s",
    label: "Average Page Load",
    desc: "Lightning fast speed optimized using next-gen asset delivery and strict core web vitals.",
    icon: TrendingUp,
    glowColor: "rgba(16, 185, 129, 0.12)",
    accentClass: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
    badgeText: "Grade-A Performance"
  },
  {
    value: "96%",
    label: "Client Retention",
    desc: "Long-term relationships built on collaborative planning, transparent scopes, and success.",
    icon: CheckCircle2,
    glowColor: "rgba(236, 72, 153, 0.12)",
    accentClass: "text-pink-500 border-pink-500/20 bg-pink-500/10",
    badgeText: "Top Tier Support"
  }
];

const testimonials: Testimonial[] = [
  {
    id: "litera",
    client: "Administration & IT Team",
    company: "Litera Valley Patna",
    role: "Portal Overseers",
    quote: "Fillip Technologies built a high-performance educational portal that completely transformed our enrollment pipeline. The system handles thousands of concurrent student applications without a hitch, and the management dashboard is incredibly intuitive.",
    stat: "+140% Admissions",
    statLabel: "Increase in online applications year-over-year",
    projectUrl: "www.literavalleypatna.in",
    industry: "Education Technology",
    bgGradient: "from-cyan-500/10 via-transparent to-indigo-500/5",
    accentColor: "cyan"
  },
  {
    id: "sita",
    client: "S. K. Sinha",
    company: "Sita Interior",
    role: "Founder & Lead Architect",
    quote: "Our interactive digital showroom catalog changed the way we pitch to high-ticket corporate and residential clients. The modular catalog and search filters are exceptionally smooth, giving us a true edge.",
    stat: "3x Conversions",
    statLabel: "Improvement in qualified design leads",
    projectUrl: "www.sitainterior.com",
    industry: "Architecture & Design",
    bgGradient: "from-amber-500/10 via-transparent to-orange-500/5",
    accentColor: "amber"
  },
  {
    id: "domus",
    client: "Dr. A. K. Sharma",
    company: "Domus Cure",
    role: "Director of Clinical Operations",
    quote: "We needed a secure, HIPAA-compliant telehealth application. Fillip delivered an excellent WebRTC calling architecture that connects our emergency doctors and patients in less than three seconds. Highly recommended.",
    stat: "99.99% Uptime",
    statLabel: "Maintained for all remote video consultations",
    projectUrl: "www.domuscure.org",
    industry: "Telehealth & Medicine",
    bgGradient: "from-pink-500/10 via-transparent to-violet-500/5",
    accentColor: "pink"
  },
  {
    id: "wedding",
    client: "Creative Design Lead",
    company: "Weddings72",
    role: "Executive Planner",
    quote: "Fillip's branding team completely nailed the high-end luxury aesthetic. From gold-foiled print assets to beautiful invitations, our new visual identity perfectly communicates the quality we provide.",
    stat: "100% Match",
    statLabel: "Consistency in digital and print branding assets",
    projectUrl: "www.weddings72.com",
    industry: "Luxury Hospitality",
    bgGradient: "from-emerald-500/10 via-transparent to-teal-500/5",
    accentColor: "emerald"
  }
];

export default function PortfolioImpact() {
  const [activeStory, setActiveStory] = useState(testimonials[0].id);

  const selectedStory = testimonials.find((t) => t.id === activeStory) || testimonials[0];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Decorative Orbs */}
      <div className="absolute left-1/3 bottom-[-150px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-400/5 to-indigo-400/5 blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 top-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-pink-400/5 to-violet-400/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
            <Sparkles size={10} className="text-cyan-500" /> Proof in Performance
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            Real Projects.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-pink-600">
              Measurable Success.
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">
            We don&apos;t just build interfaces; we engineer digital products that drive engagement, scale operations, and deliver real return on investment.
          </p>
        </div>

        {/* METRICS DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx}
                className="group relative border border-slate-200/80 bg-white/60 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.04)] hover:border-slate-300 transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Glow Background Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${m.glowColor} 0%, transparent 65%)`
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl border ${m.accentClass.split(" ").slice(1).join(" ")}`}>
                      <Icon className={`size-5 ${m.accentClass.split(" ")[0]}`} />
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${m.accentClass}`}>
                      {m.badgeText}
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2 font-mono">
                    {m.value}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
                    {m.label}
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CLIENT SUCCESS STORY MODULE */}
        <div className="border border-slate-200/80 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 shadow-md relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[380px]">
            
            {/* Story selector / Tabs */}
            <div className="lg:w-1/3 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 lg:pr-8">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6 block">
                ✦ Select Client Impact Case
              </span>
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
                {testimonials.map((t) => {
                  const isActive = t.id === activeStory;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveStory(t.id)}
                      className={`text-left shrink-0 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 bg-transparent"
                      }`}
                    >
                      {t.company}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Testimonial Active Display Area */}
            <div className="lg:w-2/3 flex flex-col justify-between relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStory.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col h-full justify-between gap-8"
                >
                  
                  {/* Text & Quote Content */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        {selectedStory.industry}
                      </span>
                      <Quote className="size-8 text-slate-200" />
                    </div>

                    <p className="text-base md:text-xl font-light text-slate-700 leading-relaxed italic mb-6">
                      &ldquo;{selectedStory.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                          {selectedStory.client}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {selectedStory.role}, <span className="text-slate-600 font-sans font-medium">{selectedStory.company}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Stats Highlight Panel */}
                  <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex gap-4 items-center">
                      <div className="bg-slate-900 text-white rounded-2xl px-5 py-3 text-center min-w-32 shadow-sm">
                        <span className="text-xl font-black font-mono tracking-tight block">
                          {selectedStory.stat}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                          Key Deliverable Impact
                        </span>
                        <span className="text-[11px] text-slate-400 font-light">
                          {selectedStory.statLabel}
                        </span>
                      </div>
                    </div>

                    {selectedStory.projectUrl && (
                      <a
                        href={`https://${selectedStory.projectUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 hover:text-indigo-700 font-bold uppercase tracking-wider transition-colors group/link mt-2 sm:mt-0"
                      >
                        Inspect Showcase Page
                        <ArrowUpRight size={13} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    )}
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
