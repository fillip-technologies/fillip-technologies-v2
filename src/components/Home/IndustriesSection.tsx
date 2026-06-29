"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Landmark,
} from "lucide-react";
import IndustriesImpactBackground, { INDUSTRIES_IMPACT_IMAGE } from "./IndustriesImpactBackground";

const industries = [
  {
    title: "Healthcare",
    image: INDUSTRIES_IMPACT_IMAGE,
    icon: HeartPulse,
    description:
      "Empowering hospitals and healthcare providers with AI-driven software, patient portals, hospital ERP, cloud infrastructure and digital transformation.",

    services: [
      "Hospital Management",
      "Patient Portal",
      "AI Automation",
      "Cloud Solutions",
    ],
  },

  {
    title: "Finance",
    image: "/images/finance.jpg",
    icon: Landmark,

    description:
      "Secure fintech platforms, banking software, analytics dashboards and intelligent automation for modern financial institutions.",

    services: [
      "Banking Software",
      "Fraud Detection",
      "FinTech Apps",
      "Data Analytics",
    ],
  },

  {
    title: "Education",
    image: "/images/education.jpg",
    icon: GraduationCap,

    description:
      "Interactive LMS platforms, student portals, AI learning assistants and digital education ecosystems.",

    services: [
      "Learning Platform",
      "Student ERP",
      "AI Tutor",
      "Assessment System",
    ],
  },

  {
    title: "Retail",
    image: "/images/retail.jpg",
    icon: ShoppingBag,

    description:
      "Omnichannel commerce solutions, inventory automation and customer engagement platforms.",

    services: [
      "E-Commerce",
      "POS System",
      "Inventory",
      "CRM",
    ],
  },

  {
    title: "Manufacturing",
    image: "/images/impact.jpg",
    icon: Brain,

    description:
      "Modern manufacturing powered by IoT, AI automation and cloud connected factory solutions.",

    services: [
      "ERP",
      "IoT",
      "Automation",
      "Dashboards",
    ],
  },
];

export default function IndustriesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-24">

      {/* Background Glow */}

      <IndustriesImpactBackground />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">

        <div className="mb-16 text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm uppercase tracking-[4px] text-cyan-300">
            Industries
          </span>

          <h2 className="mt-8 text-5xl font-bold text-slate-900 lg:text-6xl">
            Industries We Empower
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            We partner with businesses across diverse industries to build
            scalable digital products, AI-powered platforms and cloud-first
            solutions.
          </p>
        </div>

        {/* Accordion */}

        <div className="flex h-[560px] gap-4">

          {industries.map((industry, index) => {
            const Icon = industry.icon;
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
                className={`relative cursor-pointer overflow-hidden rounded-[32px]
                ${
                  isActive
                    ? "flex-[5]"
                    : "flex-1"
                }`}
              >
                {/* Background Image */}

                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#04111E] via-[#04111E]/40 to-transparent" />

                {/* Dark overlay */}

                <div className="absolute inset-0 bg-black/20" />

                {/* Vertical Title */}

                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col justify-end p-6"
                  >
                    <Icon className="mb-6 text-cyan-300" size={30} />

                    <h3
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                      className="text-2xl font-bold tracking-wide text-white"
                    >
                      {industry.title}
                    </h3>
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
                      className="absolute inset-0 flex items-end p-10 lg:p-14"
                    >
                      <div className="max-w-xl">

                        {/* Industry Number */}

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
                        >
                          <span className="text-lg font-semibold text-white">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </motion.div>

                        {/* Icon */}

                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                          <Icon size={34} className="text-cyan-300" />
                        </div>

                        {/* Title */}

                        <motion.h3
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-5xl font-bold text-white"
                        >
                          {industry.title}
                        </motion.h3>

                        {/* Description */}

                        <motion.p
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-6 text-lg leading-8 text-slate-300"
                        >
                          {industry.description}
                        </motion.p>

                        {/* Services */}

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-10 grid grid-cols-2 gap-4"
                        >
                          {industry.services.map((service) => (
                            <div
                              key={service}
                              className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/15"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                                <span className="text-white">
                                  {service}
                                </span>
                              </div>
                            </div>
                          ))}
                        </motion.div>

                        {/* CTA */}

                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#105278] transition-all duration-300 hover:gap-5 hover:bg-cyan-300"
                        >
                          Explore Industry

                          <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </motion.button>
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
