"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Globe, TrendingUp, Laptop, Cpu, BookOpen } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const chapters = [
  {
    year: "2018",
    roman: "I",
    title: "The Seed is Sown",
    dropCap: "F",
    story: "illip Technologies starts in a small incubation space with a core team of three digital visionaries and a goal to bridge the tech-marketing divide. We set up our first workflow systems and focused on building custom, client-centric web platforms.",
    quote: "We didn't have funding or fancy desks. We just had a vision that code and marketing must act as one.",
    icon: Sprout,
    image: "/images/saas-desk-setup.png",
    tabColor: "bg-blue-500",
    stats: [
      { label: "Core Team", value: "3 Experts" },
      { label: "Primary Tech", value: "HTML5, PHP, CSS" },
      { label: "Projects", value: "12 Completed" },
    ],
  },
  {
    year: "2020",
    roman: "II",
    title: "Transition to Digital",
    dropCap: "A",
    story: "s the world transitions, we support brick-and-mortar brands in shifting to robust e-commerce and secure, remote workflows. We designed custom payment integrations and secured databases to help companies withstand global disruption.",
    quote: "Disruption forced the world to adapt. We stood beside our clients to build resilience, remote systems, and e-commerce.",
    icon: Globe,
    image: "/images/How-we-work.png",
    tabColor: "bg-sky-500",
    stats: [
      { label: "Core Team", value: "15 Experts" },
      { label: "Primary Tech", value: "React, Node, PostgreSQL" },
      { label: "Projects", value: "45 Completed" },
    ],
  },
  {
    year: "2022",
    roman: "III",
    title: "Growth & Scaling",
    dropCap: "W",
    story: "e expand our expertise to custom software development and advanced branding, growing our team to 40+ professionals and moving to a larger headquarters. We established rigorous automation standards to match the expectations of larger enterprise partners.",
    quote: "Growth is not just about size. It is about standardizing excellence, automating pipelines, and moving to our main office.",
    icon: TrendingUp,
    image: "/images/capabilities-background.png",
    tabColor: "bg-indigo-500",
    stats: [
      { label: "Core Team", value: "40+ Experts" },
      { label: "Primary Tech", value: "Next.js, Tailwind, NestJS" },
      { label: "Projects", value: "95+ Completed" },
    ],
  },
  {
    year: "2024",
    roman: "IV",
    title: "Global Operations",
    dropCap: "E",
    story: "stablishing partnerships with global brands across 5+ countries, establishing our presence in international digital consulting. We redesigned workflows, built scalable portals, and proved that a client-first agency can deliver elite code worldwide.",
    quote: "Borders are constructs. True engineering talent speaks a universal language of quality and speed.",
    icon: Laptop,
    image: "/images/research-mockup.png",
    tabColor: "bg-purple-500",
    stats: [
      { label: "Core Team", value: "50+ Experts" },
      { label: "Primary Tech", value: "AWS, GCP, GraphQL, Python" },
      { label: "Projects", value: "140+ Completed" },
    ],
  },
  {
    year: "2026 & Beyond",
    roman: "V",
    title: "Next Gen AI & SaaS",
    dropCap: "P",
    story: "ushing boundaries with custom AI integrations, chatbot agents, and automated SaaS products to lead the next generation of tech. We believe AI will define modern product scaling, and we are already delivering the pipelines that make it happen.",
    quote: "AI will not replace strategy; it will amplify it. We are building the automated pipelines of tomorrow, today.",
    icon: Cpu,
    image: "/images/team/team1.png",
    tabColor: "bg-emerald-500",
    stats: [
      { label: "Core Team", value: "55+ Experts" },
      { label: "Primary Tech", value: "LangChain, OpenAI API, SaaS" },
      { label: "Projects", value: "150+ Completed" },
    ],
  },
];

export default function StoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChapter = chapters[activeIndex];

  return (
    <section id="story-book-section" className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/20">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative">
        
        {/* Book Outer Wrapper: Leather binding effect */}
        <div className="relative mx-auto max-w-[960px] bg-slate-800 dark:bg-slate-900 border-[8px] sm:border-[12px] border-slate-700 dark:border-slate-800 rounded-[2.5rem] p-1.5 sm:p-3 shadow-2xl">
          
          {/* Inner Book Cover Shadow */}
          <div className="absolute inset-0 rounded-[1.8rem] shadow-[inset_0_4px_24px_rgba(0,0,0,0.5)] pointer-events-none z-20" />
          
          {/* Bookmark Tabs (Desktop Right Margin) */}
          <div className="hidden lg:flex absolute right-[-48px] top-12 flex-col gap-3.5 z-30">
            {chapters.map((chapter, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={chapter.year}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    w-[52px] h-[38px] rounded-r-xl border-y border-r border-black/10 flex items-center justify-center
                    font-extrabold text-[12px] text-white shadow-md cursor-pointer hover:w-[58px] transition-all duration-300
                    ${chapter.tabColor}
                    ${isActive ? "w-[62px] hover:w-[62px] shadow-lg shadow-black/25 translate-x-1" : ""}
                  `}
                >
                  {chapter.year.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Book Horizontal Tabs (Mobile & Tablet) */}
          <div className="flex lg:hidden flex-wrap gap-2 justify-center mb-4 relative z-30 px-2 pt-2">
            {chapters.map((chapter, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={chapter.year}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm cursor-pointer transition-all duration-200
                    ${chapter.tabColor}
                    ${isActive ? "ring-2 ring-white/50 scale-105" : "opacity-75"}
                  `}
                >
                  {chapter.year}
                </button>
              );
            })}
          </div>

          {/* Book Body / Pages Spread */}
          <div className="relative min-h-[550px] lg:min-h-[500px] bg-[#fbf9f4] dark:bg-slate-900 border border-black/10 rounded-[1.8rem] overflow-hidden flex flex-col lg:flex-row shadow-inner">
            
            {/* Center spine split line shadow (Desktop Only) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[6px] bg-gradient-to-r from-slate-300/40 via-slate-400/60 to-slate-300/40 dark:from-slate-950/40 dark:via-slate-950/70 dark:to-slate-950/40 -translate-x-1/2 z-25 pointer-events-none hidden lg:block" />

            {/* Left Page Soft Shadow Fold (Desktop Only) */}
            <div className="absolute top-0 bottom-0 right-1/2 left-0 pointer-events-none z-20 bg-gradient-to-r from-transparent to-slate-950/[0.04] dark:to-black/[0.15] hidden lg:block" />

            {/* Right Page Soft Shadow Fold (Desktop Only) */}
            <div className="absolute top-0 bottom-0 left-1/2 right-0 pointer-events-none z-20 bg-gradient-to-l from-transparent to-slate-950/[0.04] dark:to-black/[0.15] hidden lg:block" />

            {/* Animate Page Flipping Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex flex-col lg:flex-row items-stretch"
              >
                
                {/* ================= LEFT PAGE (THE NARRATIVE) ================= */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:pr-12 flex flex-col justify-between relative z-10">
                  <div>
                    {/* Chapter Title Badge */}
                    <div className="flex items-center gap-2 text-primary dark:text-blue-400">
                      <BookOpen className="size-4" />
                      <span className="text-[11px] font-extrabold uppercase tracking-widest">
                        Chapter {activeChapter.roman}
                      </span>
                    </div>

                    {/* Milestone title */}
                    <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">
                      {activeChapter.title}
                    </h3>
                    
                    <div className="mt-3.5 h-0.5 w-14 bg-primary/20 dark:bg-blue-500/20" />

                    {/* Book drop-cap narrative */}
                    <p className="mt-6 text-base sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-350 first-letter:float-left first-letter:text-5xl first-letter:font-extrabold first-letter:text-primary dark:first-letter:text-blue-400 first-letter:mr-2.5 first-letter:mt-1 first-letter:bg-primary/[0.05] dark:first-letter:bg-blue-500/10 first-letter:px-3 first-letter:py-1 first-letter:rounded-lg">
                      {activeChapter.story}
                    </p>
                  </div>

                  {/* Handwritten-style quote block */}
                  <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/80">
                    <p className="text-sm sm:text-base font-serif italic text-primary dark:text-blue-400 pl-4 border-l-2 border-primary/20 dark:border-blue-500/20">
                      "{activeChapter.quote}"
                    </p>
                  </div>
                </div>

                {/* ================= RIGHT PAGE (THE SCRAPBOOK) ================= */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:pl-12 bg-[#fcfbf9]/60 dark:bg-slate-900/40 flex flex-col justify-between items-center relative z-10 border-t lg:border-t-0 lg:border-l border-slate-200/30 dark:border-slate-800/30">
                  
                  {/* Polaroid Photo Frame */}
                  <div className="relative w-full max-w-[290px] bg-white dark:bg-slate-800 p-3 pb-8 rounded-lg shadow-lg border border-slate-200/30 dark:border-slate-700 rotate-[1.5deg] group hover:rotate-0 transition-transform duration-300">
                    
                    {/* Sticky Tape Effect Top-Left */}
                    <div className="absolute top-[-10px] left-[-20px] w-14 h-5.5 bg-yellow-100/40 dark:bg-yellow-950/20 backdrop-blur-xs border border-yellow-200/10 rotate-[-28deg] shadow-sm pointer-events-none" />
                    
                    {/* Sticky Tape Effect Top-Right */}
                    <div className="absolute top-[-8px] right-[-18px] w-14 h-5.5 bg-yellow-100/40 dark:bg-yellow-950/20 backdrop-blur-xs border border-yellow-200/10 rotate-[22deg] shadow-sm pointer-events-none" />

                    {/* Image Area */}
                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-slate-50 dark:bg-slate-900">
                      <Image 
                        src={activeChapter.image} 
                        alt={activeChapter.title} 
                        fill 
                        className="object-cover transition-transform duration-500 scale-102 group-hover:scale-100"
                        sizes="290px"
                      />
                    </div>

                    {/* Polaroid Handwritten Caption */}
                    <div className="mt-3.5 text-center">
                      <span className="font-serif italic text-xs tracking-wider text-slate-500 dark:text-slate-400">
                        {activeChapter.title} - {activeChapter.year}
                      </span>
                    </div>
                  </div>

                  {/* Chapter Scorecard Ledger */}
                  <div className="w-full mt-8 bg-white/70 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-xl p-4.5 shadow-xs">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      Chapter Ledger Details
                    </h4>
                    
                    <div className="space-y-2">
                      {activeChapter.stats.map((stat, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-500 dark:text-slate-400">
                            {stat.label}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
