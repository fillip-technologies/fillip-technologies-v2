"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Compass, Lightbulb, ShieldCheck, Cpu } from "lucide-react";

const pillars = [
  {
    title: "Curiosity",
    description: "Always asking 'why', exploring new ideas, and seeking out better ways to solve complex challenges.",
    icon: Compass,
    color: "from-purple-500/10 to-indigo-500/10 dark:from-purple-500/15 dark:to-indigo-500/15",
    hoverColor: "from-purple-500/20 to-indigo-500/20 dark:from-purple-500/25 dark:to-indigo-500/25",
    iconColor: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    glow: "shadow-purple-500/5",
  },
  {
    title: "Creativity",
    description: "Thinking beyond conventional boundaries to craft solutions that are purposeful and visually stunning.",
    icon: Lightbulb,
    color: "from-sky-500/10 to-blue-500/10 dark:from-sky-500/15 dark:to-blue-500/15",
    hoverColor: "from-sky-500/20 to-blue-500/20 dark:from-sky-500/25 dark:to-blue-500/25",
    iconColor: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    glow: "shadow-sky-500/5",
  },
  {
    title: "Ownership",
    description: "Taking deep pride in our work, acting with high accountability, and driving projects to success.",
    icon: ShieldCheck,
    color: "from-blue-500/10 to-primary/10 dark:from-blue-500/15 dark:to-primary/15",
    hoverColor: "from-blue-500/20 to-primary/20 dark:from-blue-500/25 dark:to-primary/25",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    glow: "shadow-blue-500/5",
  },
  {
    title: "Innovation",
    description: "Challenging the status quo to transform forward-thinking concepts into real-world business value.",
    icon: Cpu,
    color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/15 dark:to-teal-500/15",
    hoverColor: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/25 dark:to-emerald-500/25",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    glow: "shadow-emerald-500/5",
  },
];

// CMS-editable content (key: page.our-culture.hero). Falls back to defaults.
type CultureHeroContent = Partial<{
  badge: string;
  headingLead: string;
  headingHighlight: string;
}>;

export default function CultureHero({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as CultureHeroContent;
  const c = {
    badge: content.badge ?? "Our Culture",
    headingLead: content.headingLead ?? "Shaping ideas through",
    headingHighlight: content.headingHighlight ?? "collaborative minds.",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-20 text-heading dark:bg-slate-950 dark:text-white lg:px-10 lg:pb-32 lg:pt-32">
      {/* Mesh Background Glows */}
      <div className="absolute top-[-10%] left-[60%] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/15 to-accent/20 blur-3xl opacity-70 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-[20%] -left-40 -z-10 size-[35rem] rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/2 pointer-events-none" />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] relative z-10">
        
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left lg:pl-8 xl:pl-14 pt-4"
          >
            {/* Glass pill badge */}
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/[0.03] px-4.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {c.badge}
            </span>

            {/* Premium Gradient Title */}
            <h1 className="text-[clamp(2.3rem,5vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.05em] text-heading dark:text-white max-w-2xl">
              {c.headingLead}
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-indigo-600 bg-clip-text text-transparent pb-3 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                {c.headingHighlight}
              </span>
            </h1>

            {/* Highlighted text paragraph */}
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-body dark:text-slate-400 max-w-xl">
              Culture at <span className="font-semibold text-heading dark:text-white border-b border-primary/30 pb-0.5">Fillip Technologies</span> revolves around the concepts of <span className="text-primary dark:text-blue-400 font-semibold">curiosity</span>, <span className="text-primary dark:text-blue-400 font-semibold">creativity</span>, <span className="text-primary dark:text-blue-400 font-semibold">ownership</span>, and <span className="text-primary dark:text-blue-400 font-semibold">innovation</span>. We think that ideas come out of collaboration among brilliant people who are willing to question the status quo.
            </p>
          </motion.div>

          {/* Right Column: Pixarzo-inspired 3-Column Offset Layout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex items-center justify-center lg:justify-center px-4"
          >
            {/* 3-Column Shape Canvas Container (Shifted further left using lg:-translate-x-28) */}
            <div className="relative w-full max-w-[568px] h-[470px] origin-center scale-[0.75] sm:scale-[0.85] lg:scale-[0.8] xl:scale-[0.95] lg:-translate-x-28">
              
              {/* Background Glow */}
              <div className="absolute inset-16 bg-gradient-to-tr from-primary/10 to-accent/5 blur-2xl rounded-full scale-90 pointer-events-none -z-10" />

              {/* === COLUMN 1 (LEFT) === */}
              {/* Row 1: (Empty) */}
              
              {/* Row 2: Lightbulb Card (Fully Rounded Left, Flat/Small Round Right) */}
              <div className="absolute top-[194px] left-0 w-[180px] h-[120px] overflow-hidden rounded-tl-[6.5rem] rounded-bl-[6.5rem] rounded-tr-2xl rounded-br-2xl bg-gradient-to-br from-primary to-accent text-white flex flex-col items-center justify-center p-4 shadow-lg shadow-primary/10 transition-transform duration-500 hover:scale-[1.03]">
                <div className="rounded-full bg-white/10 p-3.5 backdrop-blur-xs border border-white/20">
                  <Lightbulb className="size-7.5 text-yellow-300 animate-pulse" />
                </div>
                <p className="mt-2 text-xs font-bold tracking-wider text-white/90 uppercase">
                  Think Big
                </p>
              </div>

              {/* === COLUMN 2 (MIDDLE) === */}
              {/* Row 1: Workspace Image (Rounded Square) */}
              <div className="absolute top-0 left-[194px] w-[180px] h-[180px] overflow-hidden rounded-[1.8rem] border border-slate-200/50 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-md transition-transform duration-500 hover:scale-[1.03]">
                <Image 
                  src="/images/saas-desk-setup.png" 
                  alt="Workspace engineering" 
                  fill 
                  className="object-cover"
                  sizes="180px"
                  priority
                />
              </div>
              
              {/* Row 2: Team Member Capsule (Flat Top, Fully Rounded Bottom) */}
              <div className="absolute top-[194px] left-[194px] w-[180px] h-[270px] overflow-hidden rounded-b-full rounded-t-[1.5rem] border border-slate-200/50 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-lg transition-transform duration-500 hover:scale-[1.03] z-10">
                <Image 
                  src="/images/team/team1.png" 
                  alt="Team member" 
                  fill 
                  className="object-cover object-top"
                  sizes="180px"
                />
              </div>

              {/* === COLUMN 3 (RIGHT) === */}
              {/* Row 1: Research Mockup (Fully Rounded Right, Flat/Small Round Left) */}
              <div className="absolute top-0 left-[388px] w-[180px] h-[180px] overflow-hidden rounded-tr-[6.5rem] rounded-br-[6.5rem] rounded-tl-2xl rounded-bl-2xl border border-slate-200/50 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-md transition-transform duration-500 hover:scale-[1.03]">
                <Image 
                  src="/images/research-mockup.png" 
                  alt="Creative strategy" 
                  fill 
                  className="object-cover"
                  sizes="180px"
                />
              </div>

              {/* Row 2: Process Image (Flat Top, Fully Rounded Bottom) */}
              <div className="absolute top-[194px] left-[388px] w-[180px] h-[180px] overflow-hidden rounded-b-full rounded-t-[1.5rem] border border-slate-200/50 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-md transition-transform duration-500 hover:scale-[1.03]">
                <Image 
                  src="/images/How-we-work.png" 
                  alt="Collaboration process" 
                  fill 
                  className="object-cover"
                  sizes="180px"
                />
              </div>

            </div>
          </motion.div>

        </div>

        {/* 4-Pillars Card Deck */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/20 p-8 backdrop-blur-md shadow-sm transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900/15 hover:shadow-xl ${pillar.glow} flex flex-col justify-between min-h-[280px]`}
              >
                {/* Base gradient (always visible) */}
                <div className={`absolute inset-0 bg-gradient-to-br -z-10 transition-opacity duration-500 ${pillar.color}`} />
                {/* Hover gradient (darker on hover) */}
                <div className={`absolute inset-0 bg-gradient-to-br -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${pillar.hoverColor}`} />
                
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`rounded-2xl p-3.5 shadow-2xs transition-transform duration-300 group-hover:scale-110 border border-slate-100 dark:border-slate-800/80 ${pillar.badgeBg} bg-white dark:bg-slate-950`}>
                      <Icon className={`size-6.5 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-3xl font-extrabold tracking-tight text-slate-200 dark:text-slate-800/40 select-none">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-heading dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                    {pillar.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-body dark:text-slate-400">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
