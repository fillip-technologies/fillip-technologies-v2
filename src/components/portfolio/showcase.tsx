"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Project {
  id: string;
  serial: string;
  title: string;
  category: string;
  client: string;
  desc: string;
  tag: string;
  src: string;
  url: string;
  link: string;
}

const grainUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const categories = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Graphic Design & Branding"
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "litera",
    serial: "01",
    title: "Litera Valley School",
    category: "Web Development",
    client: "Litera Valley Patna",
    desc: "A custom-engineered high-performance educational portal built for Patna's premier school, integrating student dashboards, admissions, and content systems.",
    tag: "EDUCATION PORTAL",
    src: "/images/portfolio/litera-mockup.png",
    url: "www.literavalleypatna.in",
    link: "https://www.literavalleypatna.in"
  },
  {
    id: "sita",
    serial: "02",
    title: "Sita Interior",
    category: "Web Development",
    client: "Sita Design Labs",
    desc: "A luxury portfolio catalog and high-end visualizer for luxury interior design, with dynamic rendering, modular filters, and gallery showcases.",
    tag: "INTERIOR ARCHITECTURE",
    src: "/images/portfolio/sita-mockup.png",
    url: "www.sitainterior.com",
    link: "#"
  },
  {
    id: "domus",
    serial: "03",
    title: "Domus Cure",
    category: "Mobile Apps",
    client: "Domus Health Group",
    desc: "A comprehensive telemedicine application connecting patients with healthcare professionals, integrating video calls, prescriptions, and diagnostics.",
    tag: "TELEHEALTH APP",
    src: "/images/portfolio/domus-mockup.png",
    url: "www.domuscure.org",
    link: "#"
  },
  {
    id: "abhijeet",
    serial: "04",
    title: "Dr Abhijeet Jha",
    category: "Graphic Design & Branding",
    client: "Dr. Jha Dermacare",
    desc: "Complete dermatological clinic branding, print collaterals, and premium visual identity matching a minimalist medical aesthetic.",
    tag: "CLINICAL BRANDING",
    src: "/images/portfolio/abhijeet-mockup.png",
    url: "www.drabhijeetjha.com",
    link: "#"
  },
  {
    id: "chaapak",
    serial: "05",
    title: "Chappak Resort",
    category: "Graphic Design & Branding",
    client: "Chappak Hospitality",
    desc: "Experiential hospitality branding, resort wayfinding print collateral, maps, and premium stationary systems.",
    tag: "RESORT BRAND IDENTITY",
    src: "/images/portfolio/chaapak-mockup.png",
    url: "www.chappakresorts.com",
    link: "#"
  },
  {
    id: "wedding",
    serial: "06",
    title: "Weddings72",
    category: "Graphic Design & Branding",
    client: "Weddings72 Planners",
    desc: "Bespoke high-end wedding planning stationery, invitation kits, and elegant luxury packaging designs.",
    tag: "EVENT STATIONERY",
    src: "/images/portfolio/wedding-mockups.png",
    url: "www.weddings72.com",
    link: "#"
  },
  {
    id: "technosys",
    serial: "07",
    title: "Technosys Management",
    category: "Mobile Apps",
    client: "Technosys IT Group",
    desc: "Corporate management and CRM application built for field sales tracking, internal task pipelines, and lead pipelines.",
    tag: "ENTERPRISE CRM APP",
    src: "/images/portfolio/technosys-mockup.png",
    url: "crm.technosys.co.in",
    link: "#"
  },
  {
    id: "patnazoo",
    serial: "08",
    title: "Patna Zoo Portal",
    category: "Web Development",
    client: "Bihar Forest Dept.",
    desc: "Ticketing platform, online booking system, and interactive map database serving millions of annual visitors for the Bihar Government.",
    tag: "GOVERNMENT PORTAL",
    src: "/images/patna-zoo-portal.png",
    url: "www.patnazoo.bihar.gov.in",
    link: "https://www.patnazoo.bihar.gov.in"
  }
];

type ShowcaseContent = Partial<{
  eyebrow: string;
  heading: string;
  projects: (Partial<Project> & { image?: string })[];
}>;

export default function PortfolioShowcase({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as ShowcaseContent;
  const c = {
    eyebrow: content.eyebrow ?? "✦ Selected Case Studies",
    heading: content.heading ?? "Our Portfolio",
  };
  const projectsList: Project[] = content.projects?.length
    ? content.projects.map((p, i) => ({
        id: p.serial || String(i),
        serial: p.serial ?? "",
        title: p.title ?? "",
        category: p.category ?? "",
        client: p.client ?? "",
        desc: p.desc ?? "",
        tag: p.tag ?? "",
        src: p.image ?? "",
        url: p.url ?? "",
        link: p.link ?? "#",
      }))
    : DEFAULT_PROJECTS;

  const [activeTab, setActiveTab] = useState("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const runwayRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsList.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  // Monitor horizontal scroll of the runway to update the progress bar
  const handleRunwayScroll = () => {
    const target = runwayRef.current;
    if (target) {
      const width = target.scrollWidth - target.clientWidth;
      if (width > 0) {
        setScrollProgress((target.scrollLeft / width) * 100);
      }
    }
  };

  // Scroll the runway left/right smoothly on button click
  const scrollRunway = (direction: "left" | "right") => {
    const target = runwayRef.current;
    if (target) {
      const offset = direction === "left" ? -480 : 480;
      target.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Reset scroll and progress indicator when active tab changes
  useEffect(() => {
    const target = runwayRef.current;
    if (target) {
      target.scrollLeft = 0;
      setScrollProgress(0);
    }
  }, [activeTab]);

  return (
    <section id="portfolio-work" className="py-24 px-6 md:px-12 bg-[#f8fafc] relative overflow-hidden">
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 z-0" style={{
        backgroundImage: "radial-gradient(rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-900/5 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6">
              {c.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
              {c.heading}
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-2 w-full max-w-full md:max-w-2xl md:border md:border-slate-200 md:bg-white md:p-1.5 md:rounded-full md:shadow-sm relative">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`relative px-4 py-2 shrink-0 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 z-10 border md:border-none ${
                    isActive
                      ? "text-white border-slate-900"
                      : "text-slate-500 border-slate-200/80 bg-white hover:text-slate-800 md:bg-transparent md:border-none"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeShowcaseTab"
                      className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Navigation Buttons */}
        {filteredProjects.length > 1 && (
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={() => scrollRunway("left")}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollRunway("right")}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Horizontal Scroll Runway */}
        <div 
          ref={runwayRef}
          onScroll={handleRunwayScroll}
          className="flex overflow-x-auto gap-8 pb-12 pt-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="w-[85vw] sm:w-[500px] lg:w-[560px] shrink-0 bg-white border border-slate-200/80 rounded-[2rem] p-6 flex flex-col justify-between group hover:shadow-[0_24px_50px_rgba(15,23,42,0.06)] hover:border-slate-300 transition-all duration-500 snap-align-start"
              >
                
                {/* Browser Bezel Frame Wrapper */}
                <div className="flex flex-col">
                  {/* Browser Header dots */}
                  <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      
                      {/* Address Bar */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-md px-3 py-0.5 text-[8px] font-mono text-slate-400 ml-3 w-40 truncate">
                        https://{proj.url}
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">LIVE PREVIEW</span>
                  </div>

                  {/* Mockup Canvas */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 border border-slate-200 bg-slate-50 flex items-center justify-center shadow-inner">
                    {/* Grain Overlay */}
                    <div
                      className="absolute inset-0 mix-blend-overlay pointer-events-none z-10 opacity-[0.08]"
                      style={{ backgroundImage: grainUrl }}
                    />
                    <Image
                      src={proj.src}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority={idx < 2}
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col px-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {proj.serial} / {proj.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase border border-slate-200 bg-slate-50 px-2 py-0.5 rounded">
                      {proj.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-slate-900 group-hover:text-slate-950 transition-colors mb-2.5 leading-snug">
                    {proj.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
                    {proj.desc}
                  </p>

                  {/* Client and CTA Link */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400">
                      Client: <span className="text-slate-700 font-sans font-medium">{proj.client}</span>
                    </span>

                    {proj.link !== "#" ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 hover:text-cyan-700 font-bold uppercase tracking-wider transition-colors"
                      >
                        Visit Website
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-300 uppercase tracking-widest">
                        Case Study Active
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 text-slate-400 font-mono text-xs">
              No projects found in this category.
            </div>
          )}
        </div>

        {/* Runway Scroll Progress Bar */}
        {filteredProjects.length > 1 && (
          <div className="max-w-md mx-auto mt-6 flex flex-col items-center gap-4">
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-slate-900 rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">SCROLL OR DRAG TO VIEW MORE</span>
          </div>
        )}

      </div>
    </section>
  );
}
