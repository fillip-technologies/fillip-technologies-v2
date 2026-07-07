"use client";

import { motion } from "framer-motion";
import { Target, Eye, Compass } from "lucide-react";

// CMS-editable content (key: page.our-story.missionvision). Falls back to defaults.
type MissionVisionContent = Partial<{
  eyebrow: string;
  heading: string;
  missionText: string;
  visionText: string;
  creedText: string;
  signatureLead: string;
  signatureName: string;
}>;

export default function MissionVision({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as MissionVisionContent;
  const c = {
    eyebrow: content.eyebrow ?? "AFTERWORD",
    heading: content.heading ?? "Pioneering the Agentic Future",
    missionText:
      content.missionText ??
      "To empower modern brands with high-performance custom engineering, future-proof agentic AI systems, and search optimization, transforming complex operational workflows and marketing budgets into measurable business growth.",
    visionText:
      content.visionText ??
      "To establish ourselves as a global benchmark for digital execution and next-generation agentic AI, proving that client transparency, clean scalable code, and forward-looking automation can consistently win on the international stage.",
    creedText:
      content.creedText ??
      "We make commitments, not excuses. We work with absolute accountability, leverage AI responsibly to amplify human intelligence, refuse code shortcuts, and measure our agency's reputation directly by the scalability and success of the products we launch.",
    signatureLead: content.signatureLead ?? "Signed in code and character,",
    signatureName: content.signatureName ?? "The Fillip Team",
  };

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24 pb-32 text-heading">
      
      {/* Decorative Book Page corner folds backgrounds */}
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-48 w-48 bg-gradient-to-tl from-primary/10 to-transparent" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        
        {/* Afterword Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {c.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
            {c.heading}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-primary/30" />
        </div>

        {/* 3-Column Ledger Grid */}
        <div className="grid grid-cols-1 items-stretch gap-10 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          
          {/* Mission Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6 first:pl-0"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Target className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Mission</span>
              </div>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                {c.missionText}
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section I</span>
          </motion.div>

          {/* Vision Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Eye className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Vision</span>
              </div>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                {c.visionText}
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section II</span>
          </motion.div>

          {/* Creed Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Compass className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Creed</span>
              </div>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                {c.creedText}
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Section III</span>
          </motion.div>

        </div>

        {/* Closing Handwritten Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 flex flex-col items-center justify-center border-t border-border pt-10 text-center"
        >
          <span className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {c.signatureLead}
          </span>
          <span className="select-none text-2xl font-semibold tracking-wide text-primary sm:text-3xl">
            {c.signatureName}
          </span>
        </motion.div>

      </div>
    </section>
  );
}
