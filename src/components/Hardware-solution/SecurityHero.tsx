"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { SecurityHeroContent } from "./content";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function SecurityHero({ content }: { content: SecurityHeroContent }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#020817] text-white">
        <div className="absolute inset-0">
          <Image
            src={content.backgroundImage}
            alt="Advanced CCTV surveillance background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_28%] sm:object-[72%_24%] lg:object-[center_20%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.96)_0%,rgba(2,8,23,0.86)_42%,rgba(2,8,23,0.38)_68%,rgba(2,8,23,0.06)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_30%,rgba(37,99,235,0.32),transparent_34%),radial-gradient(circle_at_86%_22%,rgba(14,165,233,0.12),transparent_30%)]" />
          <div className="absolute -left-24 top-28 size-72 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute right-0 top-16 size-96 rounded-full bg-cyan-400/8 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/45 via-white/22 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#020817] to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
          <div className="relative flex min-h-[520px] items-start">
            <motion.div
              className="max-w-3xl text-center lg:max-w-5xl xl:max-w-7xl lg:text-left"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100 shadow-[0_0_30px_rgba(56,189,248,0.16)] backdrop-blur"
              >
                <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                {content.badge}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="text-balance text-4xl font-black leading-[1.03] tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-6xl xl:text-[4.75rem]"
              >
                {content.heading}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0"
              >
                {content.description}
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#061329]/85 px-7 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(2,8,23,0.35)] ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-sky-500/20 hover:ring-sky-300/40 hover:shadow-[0_24px_60px_rgba(56,189,248,0.22)] sm:w-auto"
                >
                  {content.primaryCtaLabel}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(2,8,23,0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/45 hover:bg-white/15 hover:shadow-[0_22px_55px_rgba(14,165,233,0.18)] sm:w-auto"
                >
                  {content.secondaryCtaLabel}
                  <PlayCircle className="size-5 transition-transform duration-300 group-hover:scale-110" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

      
      </section>
    </>
  );
}
