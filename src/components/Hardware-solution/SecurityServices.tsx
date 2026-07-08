"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Bell, Cloud, Moon, Play, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Instant notifications for any suspicious activity.",
  },
  {
    icon: Moon,
    title: "Night Vision",
    description: "Clear monitoring even in complete darkness.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Securely store and access footage anytime, anywhere.",
  },
];

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

export default function SecurityServices() {
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
            <p className="text-sm font-bold text-slate-500">/ Our Promise</p>

            <h2 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              Smart technology.
              <br />
              Stronger protection.
            </h2>

            <p className="mt-8 max-w-sm text-sm leading-7 text-slate-500">
              We combine intelligent technology with real-time monitoring to
              deliver unmatched security and complete peace of mind.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071126] shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/hardware/security_lens_bg.png"
                  alt="CCTV camera monitoring preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/20 to-slate-950/82" />
              </div>

              <Link
                href="/contact"
                aria-label="Watch security video"
                className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-950 shadow-[0_18px_42px_rgba(2,8,23,0.28)] transition-all duration-300 hover:scale-105 hover:bg-sky-50"
              >
                <Play className="ml-1 size-8 fill-current" />
              </Link>

              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                    <ShieldCheck className="size-5 text-cyan-200" />
                  </div>
                  <p className="max-w-56 text-base font-bold leading-snug">
                    See how Fillip Technologies keeps you protected
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors duration-300 hover:text-white"
                >
                  Watch Video
                  <span className="flex size-7 items-center justify-center rounded-full border border-white/20">
                    <Play className="ml-0.5 size-3 fill-current" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1"
          >
            {features.map((feature) => {
              const IconComp = feature.icon;

              return (
                <div key={feature.title} className="flex gap-5">
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
