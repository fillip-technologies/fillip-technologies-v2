"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import IndustriesImpactBackground from "./IndustriesImpactBackground";
import { HOME_INDUSTRIES, type IndustryItem } from "@/data/home/defaults";

// CMS-editable content (key: home.industries). Falls back to these defaults.
type IndustriesContent = Partial<{
  eyebrow: string;
  heading: string;
  description: string;
  cards: IndustryItem[];
}>;

export default function IndustriesSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as IndustriesContent;
  const c = {
    eyebrow: content.eyebrow ?? "Industries",
    heading: content.heading ?? "Industries We Empower",
    description:
      content.description ??
      "We partner with businesses across diverse industries to build scalable digital products, AI-powered platforms and cloud-first solutions.",
  };
  const industries = content.cards?.length ? content.cards : HOME_INDUSTRIES;

  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-24">

      {/* Background Glow */}

      <IndustriesImpactBackground />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm uppercase tracking-[4px] text-cyan-300">
            {c.eyebrow}
          </span>

          <h2 className="mt-8 text-5xl font-bold text-slate-900 lg:text-6xl">
            {c.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {c.description}
          </p>
        </div>

        {/* Accordion */}

        <div className="flex flex-col md:flex-row md:h-[560px] gap-4">

          {industries.map((industry, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={industry.title}
                layout
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`relative w-full cursor-pointer overflow-hidden rounded-[32px]
                ${isActive
                    ? "md:flex-[5] h-[480px] md:h-full"
                    : "md:flex-1 h-20 md:h-full"
                  }`}
              >
                {/* Background Image */}

                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#04111E] via-[#04111E]/40 to-transparent" />

                {/* Dark overlay */}

                <div className="absolute inset-0 bg-black/20" />

                {/* Title for collapsed state */}

                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-end p-5 md:p-6"
                  >
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                      <h3 className="text-xl font-bold tracking-wide text-white md:hidden">
                        {industry.title}
                      </h3>

                      <h3
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                        className="hidden md:block text-2xl font-bold tracking-wide text-white"
                      >
                        {industry.title}
                      </h3>
                    </div>
                  </motion.div>
                )}

                {/* Active Content */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={industry.title}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15,
                      }}
                      className="absolute inset-0 flex items-end p-6 md:p-10 lg:p-14"
                    >
                      <div className="max-w-xl">

                        {/* Industry Number */}

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mb-6 hidden md:inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
                        >
                          <span className="text-lg font-semibold text-white">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </motion.div>

                        {/* Title */}

                        <motion.h3
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl md:text-5xl font-bold text-white"
                        >
                          {industry.title}
                        </motion.h3>

                        {/* Description */}

                        <motion.p
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3 md:mt-6 text-sm md:text-lg leading-6 md:leading-8 text-slate-300"
                        >
                          {industry.description}
                        </motion.p>

                        {/* Services */}

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6 md:mt-10 grid grid-cols-2 gap-3"
                        >
                          {industry.services.split("\n").map((s) => s.trim()).filter(Boolean).map((service) => (
                            <div
                              key={service}
                              className="rounded-xl md:rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 md:px-5 md:py-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/15"
                            >
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-cyan-400" />
                                <span className="text-xs md:text-base text-white">
                                  {service}
                                </span>
                              </div>
                            </div>
                          ))}
                        </motion.div>

                        {/* CTA */}

                        <Link href={industry.href} aria-label={`Explore ${industry.title} industry`}>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="group mt-6 md:mt-10 inline-flex items-center gap-2 md:gap-3 rounded-full bg-white px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-[#105278] transition-all duration-300 hover:gap-5 hover:bg-cyan-300"
                          >
                            Explore Industry
                          </motion.span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Glow */}

                <div className="absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
