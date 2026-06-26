"use client";

import { motion } from "framer-motion";
import { Target, Eye, Compass } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-[#fbf9f4] py-24 pb-32 text-heading dark:bg-slate-950 dark:text-white border-t border-slate-200/40 dark:border-slate-800/40">
      
      {/* Decorative Book Page corner folds backgrounds */}
      <div className="absolute bottom-0 right-0 -z-10 w-48 h-48 bg-gradient-to-tl from-slate-200/30 to-transparent dark:from-slate-900/10 pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        
        {/* Afterword Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary dark:text-blue-400">
            AFTERWORD
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif">
            The Next Chapter
          </h2>
          <div className="mt-4 mx-auto h-0.5 w-16 bg-primary/30 dark:bg-blue-500/30" />
        </div>

        {/* 3-Column Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-300/40 dark:divide-slate-800/40">
          
          {/* Mission Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between pt-8 md:pt-0 md:px-6 first:pl-0"
          >
            <div>
              <div className="flex items-center gap-2 text-primary dark:text-blue-400 mb-4">
                <Target className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Mission</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                To empower modern brands with high-performance custom engineering and search optimization, transforming complex operational workflows and marketing budgets into measurable business growth.
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section I</span>
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
              <div className="flex items-center gap-2 text-primary dark:text-blue-400 mb-4">
                <Eye className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Vision</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                To establish ourselves as a global benchmark for digital execution, proving that client transparency, clean scalable code, and creative engineering can consistently win on the international stage.
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section II</span>
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
              <div className="flex items-center gap-2 text-primary dark:text-blue-400 mb-4">
                <Compass className="size-4.5" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Our Creed</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                We make commitments, not excuses. We work with absolute accountability, refuse code shortcuts, and measure our agency's reputation directly by the scalability and success of the products we launch.
              </p>
            </div>
            <span className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section III</span>
          </motion.div>

        </div>

        {/* Closing Handwritten Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 pt-10 border-t border-slate-300/40 dark:border-slate-800/40 flex flex-col items-center justify-center text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-slate-450 dark:text-slate-500 mb-1">
            Signed in code and character,
          </span>
          <span className="font-serif italic text-2xl sm:text-3xl text-primary dark:text-blue-400 tracking-wide select-none">
            The Fillip Team
          </span>
        </motion.div>

      </div>
    </section>
  );
}
