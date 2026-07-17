"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { SaasHero as SaasHeroData } from "@/data/software-enterprise";
import { saasIcon } from "./icons";

/**
 * Hero for the SaaS-style Software & Enterprise layout. Copy, bullets and CTAs
 * are CMS-driven; the exploding console-stack mockup on the right is a fixed
 * visual signature of the template.
 */
export default function SaasHero({ data }: { data: SaasHeroData }) {
  const cardStackVariants = {
    hover: { transition: { staggerChildren: 0.1 } },
  };
  const backCardVariants = {
    initial: { x: 30, y: -30, rotate: 3, scale: 0.95 },
    hover: { x: 90, y: -70, rotate: 6, scale: 0.98, transition: { duration: 0.5, ease: "easeOut" as const } },
  };
  const middleCardVariants = {
    initial: { x: 0, y: 0, rotate: -2, scale: 1 },
    hover: { x: 0, y: -15, rotate: 0, scale: 1.02, transition: { duration: 0.5, ease: "easeOut" as const } },
  };
  const frontCardVariants = {
    initial: { x: -35, y: 35, rotate: -6, scale: 0.95 },
    hover: { x: -90, y: 70, rotate: -10, scale: 0.98, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-white">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-80" />

      {/* Ambient Lighting Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute right-[5%] top-[10%] h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-[130px] animate-pulse duration-[8000ms]" />
        <div className="absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Text content & Bullet matrices */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4.5 py-1.5 text-xs font-semibold text-blue-700 mb-6 shadow-[0_2px_12px_rgba(37,99,235,0.03)] backdrop-blur-xs hover:border-blue-300 transition-all cursor-default"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>{data.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl leading-[1.08] max-w-xl"
            >
              {data.title}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-650 to-blue-700 font-bold">
                {data.highlightedTitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-slate-500 max-w-xl"
            >
              {data.description}
            </motion.p>

            {/* Bullet Points Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full border-t border-slate-100 pt-6"
            >
              {data.bullets.map((bullet, i) => {
                const BulletIcon = saasIcon(bullet.icon);
                return (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-650">
                      <BulletIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{bullet.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-5 w-full sm:w-auto"
            >
              <Link
                href={data.primaryCta.href}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)] transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)] hover:scale-[1.02] overflow-hidden"
              >
                <span className="absolute inset-0 w-[40px] h-full bg-white/20 skew-x-[-20deg] translate-x-[-100px] group-hover:translate-x-[350px] transition-transform duration-[1200ms] ease-out pointer-events-none" />
                <span>{data.primaryCta.label}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="h-3 w-3 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                href={data.secondaryCta.href}
                className="group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors duration-300 hover:text-blue-600"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50/50 group-hover:scale-105">
                  <Play className="h-3.5 w-3.5 fill-current text-slate-500 group-hover:text-blue-600 ml-0.5 transition-colors" />
                </span>
                <span>{data.secondaryCta.label}</span>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive Exploding Layer Stack on Hover */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[500px] select-none">
            <motion.div
              variants={cardStackVariants}
              initial="initial"
              whileHover="hover"
              className="relative w-full max-w-[440px] h-[360px] cursor-pointer"
            >
              {/* Back Card */}
              <motion.div
                variants={backCardVariants}
                className="absolute inset-0 rounded-2xl border border-slate-200 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.03)] p-2.5 overflow-hidden origin-bottom-left"
              >
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                  <span className="text-[8px] font-bold text-slate-400 font-mono">DB CLUSTER / READ REPLICAS</span>
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <div className="relative h-full w-full rounded-b-xl overflow-hidden mt-1 bg-slate-100">
                  <Image
                    src="/images/enterprise-dashboard.png"
                    alt="Back-end engine cluster mockup"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </motion.div>

              {/* Middle Card */}
              <motion.div
                variants={middleCardVariants}
                className="absolute inset-0 rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_45px_rgba(2,66,162,0.06)] p-2.5 overflow-hidden origin-center z-10"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                  <div className="h-2 w-2 rounded-full bg-rose-450 bg-rose-400" />
                  <div className="h-2 w-2 rounded-full bg-amber-450 bg-amber-400" />
                  <div className="h-2 w-2 rounded-full bg-emerald-450 bg-emerald-400" />
                  <span className="text-[8px] font-mono text-slate-400 ml-2">dashboard.fillip.app</span>
                </div>
                <div className="relative h-full w-full rounded-b-xl overflow-hidden mt-1 bg-slate-50">
                  <Image
                    src="/images/saas-desk-setup.png"
                    alt="Platform front-end console mockup"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Front Card */}
              <motion.div
                variants={frontCardVariants}
                className="absolute inset-0 rounded-2xl border border-white/15 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.35)] p-5 backdrop-blur-md flex flex-col justify-between origin-top-right z-20 text-white"
              >
                <div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">S</div>
                      <span className="text-[10px] font-bold text-slate-200">Billing active</span>
                    </div>
                    <div className="h-5 w-7 rounded bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 p-0.5 flex flex-col justify-between border border-amber-200/30 opacity-90 shadow-sm">
                      <div className="grid grid-cols-3 gap-0.5 h-full w-full">
                        <div className="border-[0.5px] border-amber-600/30 rounded-xs" />
                        <div className="border-[0.5px] border-amber-600/30 rounded-xs" />
                        <div className="border-[0.5px] border-amber-600/30 rounded-xs" />
                        <div className="border-[0.5px] border-amber-600/30 rounded-xs" />
                        <div className="border-[0.5px] border-amber-600/30 rounded-xs" />
                        <div className="border-[0.5px] border-amber-600/30 rounded-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">LATEST PAYMENT</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white leading-none">$12,450.00</span>
                      <span className="text-[9px] text-emerald-450 font-bold">USD</span>
                    </div>
                    <span className="block text-[9px] text-slate-400 mt-1">From enterprise_id_4920</span>
                  </div>

                  <div className="h-8 w-full mt-4">
                    <svg className="w-full h-full overflow-visible">
                      <path
                        d="M0 20 Q 20 10, 45 25 T 90 5 T 135 15 T 180 8 T 220 3 T 260 12"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_4px_#10b981]"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl text-[9px] font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span>Node-4 routing active</span>
                  </span>
                  <span className="text-emerald-400 font-bold">99.99% OK</span>
                </div>
              </motion.div>
            </motion.div>

            <span className="absolute bottom-2 text-[10px] text-slate-400 font-medium font-mono select-none tracking-wider pointer-events-none">
              ✦ HOVER OVER THE CONSOLE STACK TO EXPLODE ENGINE LAYERS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
