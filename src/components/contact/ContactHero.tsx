"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-background px-6 pt-32 pb-16 text-heading lg:px-10 lg:pt-40 lg:pb-20">
      {/* Brand Line Grid Background */}
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

      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono text-primary uppercase tracking-widest mb-6">
            <Sparkles size={10} className="text-amber-500 animate-pulse" /> Start the Conversation
          </span> */}

          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-tight mb-6">
            Let&apos;s Build Something<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-indigo-600">
              Extraordinary Together.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-body text-sm md:text-base font-light leading-relaxed">
            Have a project in mind, need technical advice, or want to discuss a customized solution? Contact our engineering and strategy team below.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
