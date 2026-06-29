"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialMediaHero() {
  return (
    <section className="relative overflow-hidden bg-[#f5f8ff] py-16 lg:py-24">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-[140px]" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-200/20 blur-[140px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Extra Dots */}
      <div
        className="absolute right-20 top-32 h-56 w-56 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5">
        <div className="grid items-center gap-8 lg:grid-cols-[45%_55%]">
          {/* LEFT */}
          <div>
           
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 max-w-[700px] text-[52px] font-bold leading-[1.05] text-slate-900 lg:text-[72px]"
            >
              Grow Your Audience With
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Social Media Marketing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 max-w-[520px] text-lg leading-relaxed text-slate-600"
            >
              Build your brand, generate quality leads and increase sales
              through
              <span className="font-semibold text-blue-600">
                {" "}
                high-converting social media campaigns
              </span>
              . We help businesses dominate Instagram, Facebook, LinkedIn,
              YouTube and more.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105">
                Call Us
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-500 hover:text-blue-600">
                View Case Studies
              </button>
            </motion.div>

           
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[620px] w-[620px]"
            >
              {/* Circle Ring */}
              <div className="absolute inset-0 rounded-full border border-slate-200" />
              <div className="absolute inset-[70px] rounded-full border border-slate-200" />

              {/* Dots */}
              <div
                className="absolute right-8 top-1/2 h-44 w-44 -translate-y-1/2 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(#cbd5e1 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />

              {/* Main Image */}
              <div className="absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/images/social-media.png"
                  alt="Social Media Marketing"
                  fill
                  priority
                  className="object-cover"
                />
              </div>



              {/* Decorative Dots */}
              <div className="absolute left-24 top-1/3 h-3 w-3 rounded-full bg-blue-500" />
              <div className="absolute right-24 top-1/2 h-3 w-3 rounded-full bg-blue-500" />
              <div className="absolute bottom-24 left-24 h-3 w-3 rounded-full bg-blue-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}