"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

// CMS-editable content (key: page.our-story.hero). Falls back to defaults.
type StoryHeroContent = Partial<{
  badge: string;
  headingLead: string;
  headingHighlight: string;
  subheadline: string;
}>;

export default function StoryHero({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as StoryHeroContent;
  const c = {
    badge: content.badge ?? "Volume 01: The Journey",
    headingLead: content.headingLead ?? "The Story of",
    headingHighlight: content.headingHighlight ?? "Fillip Technologies",
    subheadline:
      content.subheadline ??
      "Explore the milestones, minds, and methodologies that built our agency from a three-person workspace into a powerhouse of digital transformation.",
  };

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-28 text-heading lg:px-10 lg:py-36">
      {/* Continuous Brand Line Grid Background */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 66, 162, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 66, 162, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Background Soft Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />

      {/* Book Cover Frame */}
      <div className="pointer-events-none absolute inset-4 -z-10 flex items-center justify-center rounded-3xl border border-primary/20 sm:inset-6 md:inset-10">
        <div className="absolute inset-1 rounded-[22px] border-[3px] border-primary/5" />
      </div>

      {/* ================= LEFT CONSTELLATION ORBIT SYSTEM (PURE CSS/SVG) ================= */}
      <div className="hidden md:block absolute left-[-6%] lg:left-[2%] xl:left-[6%] top-[25%] w-[320px] h-[320px] -z-10 pointer-events-none select-none">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Glowing core */}
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-primary/15 to-accent/5 blur-2xl" />

          {/* Inner Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            className="absolute h-48 w-48 rounded-full border border-dashed border-primary/25"
          >
            {/* Inner Ring Node */}
            <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
          </motion.div>

          {/* Outer Dashed Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute h-72 w-72 rounded-full border border-dashed border-accent/20"
          >
            {/* Outer Ring Nodes */}
            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-3.5 h-3.5 bg-accent rounded-full shadow-[0_0_12px_#38bdf8]" />
            <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
          </motion.div>

          {/* Connecting digital lines */}
          <div className="absolute w-[180px] h-[1px] bg-gradient-to-r from-primary/20 to-transparent rotate-[45deg]" />
          <div className="absolute w-[240px] h-[1px] bg-gradient-to-r from-accent/15 to-transparent rotate-[-30deg]" />
        </div>
      </div>

      {/* ================= RIGHT CONSTELLATION ORBIT SYSTEM (PURE CSS/SVG) ================= */}
      <div className="hidden md:block absolute right-[-6%] lg:right-[2%] xl:right-[6%] top-[25%] w-[320px] h-[320px] -z-10 pointer-events-none select-none">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Glowing core */}
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-accent/15 to-indigo-500/5 blur-2xl" />

          {/* Inner Dashed Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            className="absolute h-52 w-52 rounded-full border border-dashed border-accent/25"
          >
            {/* Inner Ring Node */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_#38bdf8]" />
          </motion.div>

          {/* Outer Dashed Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 44, ease: "linear" }}
            className="absolute h-76 w-76 rounded-full border border-dashed border-primary/20"
          >
            {/* Outer Ring Nodes */}
            <div className="absolute right-0 top-1/3 h-3.5 w-3.5 translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <div className="absolute bottom-1/3 left-0 -translate-x-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#38bdf8]" />
          </motion.div>

          {/* Connecting digital lines */}
          <div className="absolute w-[180px] h-[1px] bg-gradient-to-l from-accent/20 to-transparent rotate-[30deg]" />
          <div className="absolute w-[240px] h-[1px] bg-gradient-to-l from-primary/15 to-transparent rotate-[-45deg]" />
        </div>
      </div>

      {/* Main Cover Title Column */}
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center relative z-10 px-4">
        
        {/* Cover Volume Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-soft"
        >
          <BookOpen className="size-4 text-primary" />
          {c.badge}
        </motion.div>

        {/* Embossed Book Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-heading sm:text-6xl md:text-7xl"
        >
          {c.headingLead}
          <span className="block mt-4 bg-gradient-to-r from-primary via-accent to-indigo-600 bg-clip-text text-transparent pb-3 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            {c.headingHighlight}
          </span>
        </motion.h1>

        {/* Embossed Separator */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-8 h-1 rounded-full bg-gradient-to-r from-primary/10 via-primary/60 to-primary/10"
        />

        {/* Cover Sub-Headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl text-lg font-medium leading-relaxed text-body sm:text-xl"
        >
          {c.subheadline}
        </motion.p>

      </div>
    </section>
  );
}
