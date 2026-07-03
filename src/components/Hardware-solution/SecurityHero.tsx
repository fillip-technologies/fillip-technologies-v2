"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Shield, Warehouse, Building } from "lucide-react";

const cards = [
  {
    image: "/images/hardware/card_office.png",
    icon: Building,
    label: "For Office",
  },
  {
    image: "/images/hardware/card_house.png",
    icon: Home,
    label: "For Houses",
  },
  {
    image: "/images/hardware/card_garage.png",
    icon: Warehouse,
    label: "For Garage",
  },
  {
    image: "/images/hardware/card_apartment.png",
    icon: Shield,
    label: "For Apartments",
  },
];

export default function SecurityHero() {
  return (
    <>
      {/* White spacer at the top of the page to show the navbar clearly */}
      <div className="h-24 lg:h-32 bg-white w-full relative z-30" />

      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[55vh] flex flex-col justify-between pt-16 pb-12">

        {/* CCTV Lens Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hardware/security_lens_bg.png"
            alt="CCTV camera infrared lens background"
            fill
            priority
            className="object-cover opacity-80"
          />
          {/* Dark radial overlay for text contrast and depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950 pointer-events-none" />
        </div>

        {/* Main Hero Slider Content */}
        <div className="container mx-auto max-w-7xl px-6 relative z-10 my-auto">
          <div className="relative w-full flex flex-col items-center text-center py-12 px-10">

            {/* Slide Navigation Chevrons */}
            <button
              type="button"
              className="absolute left-0 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer hidden md:flex"
              aria-label="Next slide"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Orange Shield Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              {/* <svg className="size-16 text-orange-500 drop-shadow-[0_4px_10px_rgba(249,115,22,0.2)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C12 2 3 5 3 11C3 17 12 22 12 22C12 22 21 17 21 11C21 5 12 2 12 2Z" />
                <text x="12" y="15" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="10.5" textAnchor="middle" fill="white">S</text>
              </svg> */}
            </motion.div>

            {/* Slide Text */}
            <div className="space-y-4 max-w-3xl">
              <motion.h1
                className="text-4xl font-extrabold sm:text-5xl md:text-6xl tracking-tight leading-tight text-white"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.05 }}
              >
                CCTV Systems <br className="sm:hidden" />
                & Access Control
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                We will select the optimum solution for all your problems. With us you will always feel safe.
              </motion.p>
            </div>

            {/* Small Orange Indicator Block */}
            {/* <motion.div
              className="mt-6 w-16 h-3 bg-orange-500 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            /> */}

          </div>
        </div>

        {/* Bottom Cards Row */}
        <div className="relative z-10 w-full mt-auto bg-slate-950/45 backdrop-blur-[2px] pt-8 pb-12 border-t border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {cards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
                    {/* Card Image Wrapper */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg bg-slate-900">
                      <Image
                        src={card.image}
                        alt={card.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-300" />

                      {/* White circle with orange icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-12 rounded-full bg-white flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                          <IconComp className="size-6 text-orange-500" />
                        </div>
                      </div>
                    </div>

                    {/* Text Label */}
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors duration-300 uppercase tracking-widest">
                      {card.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
