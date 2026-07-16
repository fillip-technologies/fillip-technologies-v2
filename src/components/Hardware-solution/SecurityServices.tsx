"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Bell, Cloud, Moon } from "lucide-react";
import type { SecurityServicesContent } from "./content";

// Icons applied to the feature rows by position (content is CMS-managed).
const FEATURE_ICONS = [Bell, Moon, Cloud] as const;

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

export default function SecurityServices({ content }: { content: SecurityServicesContent }) {
  return (
    <section
      id="our-services"
      className="relative overflow-hidden bg-white py-20 text-slate-950 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.07),transparent_28%),radial-gradient(circle_at_84%_20%,rgba(15,23,42,0.04),transparent_30%)]" />

      <motion.div
        className="container relative z-10 mx-auto max-w-7xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.08fr_1fr] lg:gap-16">
          <motion.div variants={itemVariants} className="max-w-md">
            <p className="text-sm font-bold text-slate-500">{content.eyebrow}</p>

            <h2 className="mt-6 whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              {content.heading}
            </h2>

            <p className="mt-8 max-w-sm text-sm leading-7 text-slate-500">
              {content.description}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071126] shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={content.image}
                  alt="CCTV camera monitoring preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1"
          >
            {content.features.map((feature, index) => {
              const IconComp = FEATURE_ICONS[index % FEATURE_ICONS.length];

              return (
                <div key={feature.title || index} className="flex gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-950 ring-1 ring-slate-100">
                    <IconComp className="size-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-950">
                      {feature.title}
                    </h3>
                    <p className="mt-2 max-w-56 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
