"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import HardwareQuoteModalButton from "./HardwareQuoteModalButton";
import type { SecuritySupportContent } from "./content";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function SecuritySupport({ content }: { content: SecuritySupportContent }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-slate-950 sm:py-20 lg:py-22">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(14,165,233,0.06),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(37,99,235,0.05),transparent_30%)]" />

      <motion.div
        className="container relative z-10 mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <motion.div variants={itemVariants}>

            <h2 className="mt-6 max-w-2xl whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {content.heading}
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-base leading-8 text-slate-500 lg:pt-12"
          >
            {content.description}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-14 grid gap-7 md:grid-cols-3"
        >
          {content.solutions.map((solution) => (
            <motion.article
              key={solution.title}
              variants={itemVariants}
              className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.13)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={solution.image}
                  alt={solution.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
              </div>

              <div className="px-7 pb-8 pt-7">
                <h3 className="text-2xl font-black tracking-tight text-slate-950">
                  {solution.title}
                </h3>
                <p className="mt-4 min-h-[7rem] text-sm leading-7 text-slate-500">
                  {solution.description}
                </p>

                <HardwareQuoteModalButton
                  label="Get Quote"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950 transition-colors duration-300 hover:text-sky-700"
                  iconClassName="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
