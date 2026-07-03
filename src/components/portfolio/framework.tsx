"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";

interface Industry {
  num: string;
  title: string;
  desc: string;
  color: string;
  accent: string;
  src: string;
  caseStudy: string;
  services: { title: string; desc: string }[];
}

const DEFAULT_INDUSTRIES: Industry[] = [
  {
    num: "01",
    title: "Education & E-Learning",
    desc: "Interactive e-learning environments, student information pipelines, and custom administrative portals that streamline admissions and course management.",
    color: "from-cyan-500/10 to-indigo-500/5",
    accent: "bg-cyan-500",
    src: "/images/portfolio/litera-mockup.png",
    caseStudy: "Litera Valley School Portal",
    services: [
      { title: "LMS Integration", desc: "Custom courseware and grading dashboard systems." },
      { title: "Student Dashboards", desc: "Interactive student portal interfaces." },
      { title: "Admission Pipelines", desc: "Digital registration and fee collection portals." },
      { title: "Responsive Web Apps", desc: "Mobile-first school content administration systems." }
    ]
  },
  {
    num: "02",
    title: "Healthcare & Wellness",
    desc: "HIPAA-compliant telemedicine platforms, doctor appointment bookings, and virtual consultations connecting patients with specialists instantly.",
    color: "from-pink-500/10 to-violet-500/5",
    accent: "bg-pink-500",
    src: "/images/portfolio/domus-mockup.png",
    caseStudy: "Domus Cure Telehealth App",
    services: [
      { title: "Telehealth Apps", desc: "Secure WebRTC-based remote consultation portals." },
      { title: "Appointment Systems", desc: "Live scheduling locks and SMS reminders." },
      { title: "Patient Records", desc: "Secure electronic health record integrations." },
      { title: "Doctor Dashboards", desc: "Custom workflows and clinical notes dashboards." }
    ]
  },
  {
    num: "03",
    title: "Real Estate & Architecture",
    desc: "Luxury visual catalogs, interactive site layout planners, and property search portals with high-definition rendering showcases.",
    color: "from-amber-500/10 to-orange-500/5",
    accent: "bg-amber-500",
    src: "/images/portfolio/sita-mockup.png",
    caseStudy: "Sita Interior Showcase",
    services: [
      { title: "Visual Catalogs", desc: "Luxury furniture and blueprint display grids." },
      { title: "Virtual Planners", desc: "Interactive room design layouts and search." },
      { title: "Lead Pipelines", desc: "Custom contact and project briefing engines." },
      { title: "Admin Inventories", desc: "Catalog databases and item control consoles." }
    ]
  },
  {
    num: "04",
    title: "Hospitality & Events",
    desc: "Bespoke hotel booking engines, resort wayfinding guides, interactive maps, and elegant event planner branding systems.",
    color: "from-emerald-500/10 to-teal-500/5",
    accent: "bg-emerald-500",
    src: "/images/portfolio/wedding-mockups.png",
    caseStudy: "Weddings72 Event Brand",
    services: [
      { title: "Booking Engines", desc: "Live booking calendars and reservation databases." },
      { title: "Event Portals", desc: "Luxury stationary packaging and invitation systems." },
      { title: "Wayfinding Guides", desc: "Interactive resort maps and visitor portals." },
      { title: "Experiential Branding", desc: "Visual branding and collateral design files." }
    ]
  }
];

const grainUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 15 } }
};

type FlatIndustry = {
  num: string; title: string; desc: string; image: string; caseStudy: string;
  svc1Title: string; svc1Desc: string; svc2Title: string; svc2Desc: string;
  svc3Title: string; svc3Desc: string; svc4Title: string; svc4Desc: string;
};
type IndustriesContent = Partial<{ eyebrow: string; heading: string; description: string; industries: FlatIndustry[] }>;

export default function PortfolioIndustries({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as IndustriesContent;
  const c = {
    eyebrow: content.eyebrow ?? "✦ Industries We Serve",
    heading: content.heading ?? "Our Industries",
    description:
      content.description ??
      "We design and engineer bespoke software applications, web platforms, and design systems across core industry sectors.",
  };
  const industries: Industry[] = content.industries?.length
    ? content.industries.map((ind, i) => {
        const v = DEFAULT_INDUSTRIES[i % DEFAULT_INDUSTRIES.length];
        return {
          num: ind.num,
          title: ind.title,
          desc: ind.desc,
          color: v.color,
          accent: v.accent,
          src: ind.image,
          caseStudy: ind.caseStudy,
          services: [
            { title: ind.svc1Title, desc: ind.svc1Desc },
            { title: ind.svc2Title, desc: ind.svc2Desc },
            { title: ind.svc3Title, desc: ind.svc3Desc },
            { title: ind.svc4Title, desc: ind.svc4Desc },
          ].filter((s) => s.title || s.desc),
        };
      })
    : DEFAULT_INDUSTRIES;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 px-6 md:px-12 bg-[#f8fafc] text-slate-900 relative overflow-hidden transition-all duration-1000">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-25 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Shifting background glows */}
      {industries[activeIndex] && (
        <div className={`absolute left-[30%] top-[25%] w-[450px] h-[450px] rounded-full bg-gradient-to-br ${industries[activeIndex].color} blur-3xl pointer-events-none z-0 transition-all duration-1000`} />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title and Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-900/5 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6">
              {c.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase text-slate-950">
              {c.heading}
            </h2>
          </div>
          <p className="max-w-md text-slate-500 text-sm font-light leading-relaxed">
            {c.description}
          </p>
        </div>

        {/* Desktop Expandable Columns Accordion Layout */}
        <div className="hidden md:flex h-[600px] bg-white border border-slate-200/80 rounded-[2.5rem] overflow-hidden shadow-lg relative w-full">
          {industries.map((ind, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div
                key={ind.num}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`h-full relative overflow-hidden flex flex-col justify-between transition-colors duration-500 cursor-pointer border-r border-slate-200/60 last:border-r-0 ${
                  isActive ? "bg-white" : "bg-slate-50/50 hover:bg-slate-50/80"
                }`}
                animate={{ flex: isActive ? 4.5 : 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* Collapsed view content */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col items-center justify-between py-12 pointer-events-none"
                    >
                      <span className="font-mono text-xs text-slate-400 font-bold">{ind.num}</span>
                      <div className="uppercase tracking-widest text-slate-400 font-bold text-[11px] font-sans [writing-mode:vertical-lr] rotate-180">
                        {ind.title}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300">
                        <ArrowUpRight size={12} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded view content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="grid grid-cols-12 gap-8 p-12 h-full w-full items-center absolute inset-0 overflow-hidden"
                    >
                      {/* Left: Spec list */}
                      <div className="col-span-6 flex flex-col justify-between h-full py-2">
                        <div>
                          <span className="font-mono text-xs text-cyan-600 font-bold block mb-1">{ind.num} / INDUSTRY</span>
                          <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-3">{ind.title}</h3>
                          <p className="text-xs text-slate-500 font-light leading-relaxed mb-6">{ind.desc}</p>
                        </div>

                        {/* Staggered services */}
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                          className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-6"
                        >
                          {ind.services.map((ser, id) => (
                            <motion.div
                              key={id}
                              variants={itemVariants}
                              className="flex flex-col bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-colors"
                            >
                              <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                <span className={`w-1 h-1 rounded-full ${ind.accent}`} />
                                {ser.title}
                              </span>
                              <span className="text-[9px] text-slate-400 font-light leading-snug">{ser.desc}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Right: Mockup Image Frame */}
                      <div className="col-span-6 flex flex-col justify-center h-full py-2">
                        <div className="relative aspect-[16/10] w-full rounded-[1.5rem] overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
                          {/* Browser dots */}
                          <div className="absolute top-3 left-4 flex items-center gap-1 z-20">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>

                          <div
                            className="absolute inset-0 mix-blend-overlay pointer-events-none z-10 opacity-[0.08]"
                            style={{ backgroundImage: grainUrl }}
                          />
                          <Image
                            src={ind.src}
                            alt={ind.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 450px"
                            className="object-cover pointer-events-none"
                            priority
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between px-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            Featured Project: <span className="text-slate-600 font-sans font-medium">{ind.caseStudy}</span>
                          </span>
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Maximize2 size={8} /> LIVE_CASE_STUDY
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion Flow */}
        <div className="md:hidden flex flex-col border-t border-slate-200">
          {industries.map((ind, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div key={ind.num} className="border-b border-slate-200 py-6">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                      {ind.num} /
                    </span>
                    <h3 className={`text-xl font-bold uppercase tracking-tight ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                      {ind.title}
                    </h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                    isActive ? "bg-slate-900 text-white border-transparent" : "border-slate-200 text-slate-400"
                  }`}>
                    <ArrowUpRight size={12} className={isActive ? "translate-x-0.5 -translate-y-0.5" : ""} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden flex flex-col gap-6"
                    >
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        {ind.desc}
                      </p>

                      {/* Display Viewport in Mobile Accordion */}
                      <div className="relative w-full rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shadow-inner mb-4">
                          <div
                            className="absolute inset-0 mix-blend-overlay pointer-events-none z-10 opacity-[0.08]"
                            style={{ backgroundImage: grainUrl }}
                          />
                          <div className="relative w-full h-full">
                            <Image
                              src={ind.src}
                              alt={ind.title}
                              fill
                              sizes="100vw"
                              className="object-cover pointer-events-none"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                          <span>Featured: {ind.caseStudy}</span>
                        </div>
                      </div>

                      {/* Deliverables list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                        {ind.services.map((item, id) => (
                          <div key={id} className="flex flex-col bg-slate-50/50 border border-slate-100 p-3.5 rounded-2xl">
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${ind.accent}`} />
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-light leading-snug">
                              {item.desc}
                            </span>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
