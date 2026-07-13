"use client";

import { motion, Variants } from "framer-motion";
import { Clock3, MonitorSmartphone, ShieldCheck, Wrench } from "lucide-react";
import type { SecurityBenefitsContent } from "./content";

// Icons applied to the benefit cards by position (content is CMS-managed).
const BENEFIT_ICONS = [Clock3, Wrench, MonitorSmartphone, ShieldCheck] as const;

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
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function SecurityBenefits({ content }: { content: SecurityBenefitsContent }) {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-slate-950 sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(14,165,233,0.06),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(37,99,235,0.05),transparent_28%)]" />

      <motion.div
        className="container relative z-10 mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-bold text-slate-500"
        >
          {content.eyebrow}
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="mt-6 max-w-2xl whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl"
        >
          {content.heading}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.benefits.map((benefit, index) => {
            const IconComp = BENEFIT_ICONS[index % BENEFIT_ICONS.length];

            return (
              <motion.div
                key={benefit.title || index}
                variants={itemVariants}
                className="max-w-xs"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-950 ring-1 ring-slate-200">
                  <IconComp className="size-6" />
                </div>

                <h3 className="mt-7 text-base font-black text-slate-950">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
