"use client";

import Image from "next/image";
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white py-24 text-heading lg:py-32">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0242a2 1px, transparent 1px), linear-gradient(to bottom, #0242a2 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Image
        src="/images/our-story-new.png"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        priority
        className="pointer-events-none absolute -right-[12%] top-1/2 hidden w-[min(760px,52vw)] -translate-y-1/2 object-contain opacity-50 lg:block"
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm"
          >
            <BookOpen className="size-4 text-primary" />
            {c.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 md:text-7xl"
          >
            {c.headingLead}{" "}
            <span className="highlight-text">{c.headingHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            {c.subheadline}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
