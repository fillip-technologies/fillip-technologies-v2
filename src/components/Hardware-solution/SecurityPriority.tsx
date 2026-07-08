"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const cards = [
  {
    image: "/images/hardware/card_house.png",
    title: "For Homes",
    description: "Smart security systems designed to keep your family safe and your home protected.",
  },
  {
    image: "/images/hardware/card_office.png",
    title: "For Offices",
    description: "Scalable surveillance and access control for teams, visitors, and workplace assets.",
  },
  {
    image: "/images/hardware/card_garage.png",
    title: "For Warehouses",
    description: "Wide-area monitoring for inventory, loading zones, operations, and restricted spaces.",
  },
  {
    image: "/images/hardware/card_apartment.png",
    title: "For Apartments",
    description: "Connected CCTV and entry security for residents, shared spaces, and property teams.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function SecurityPriority() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextIndex = (activeIndex + 1) % cards.length;
  const visibleCards = [cards[activeIndex], cards[nextIndex]];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? cards.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % cards.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fb] py-20 text-slate-950 sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_84%_8%,rgba(37,99,235,0.08),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.42] bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[32%_68%]">
          <motion.div
            className="max-w-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
              <span className="text-sm font-black text-slate-950">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-slate-300" />
              <div className="flex gap-2 text-xs font-bold text-slate-300">
                {cards.map((card, index) => (
                  <button
                    key={card.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`transition-colors duration-300 ${
                      index === activeIndex ? "text-slate-950" : "hover:text-slate-500"
                    }`}
                    aria-label={`Show ${card.title}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl"
            >
              Protecting What
              <br />
              Matters Most
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xs text-sm leading-7 text-slate-500"
            >
              We deliver intelligent security solutions that adapt to your needs
              and keep you protected 24/7.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-3"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#071126] px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(2,8,23,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-700 hover:shadow-[0_24px_48px_rgba(14,165,233,0.22)]"
              >
                Contact Us
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
                  aria-label="Previous security solution"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700"
                  aria-label="Next security solution"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          <div className="overflow-hidden lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                {visibleCards.map((card) => {
                  return (
                    <article
                      key={card.title}
                      className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 34vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
                      </div>

                      <div className="px-7 pb-7 pt-7">
                        <h3 className="text-2xl font-black tracking-tight text-slate-950">
                          {card.title}
                        </h3>
                        <p className="mt-4 min-h-[4.5rem] text-sm leading-7 text-slate-500">
                          {card.description}
                        </p>

                        <Link
                          href="/contact"
                          className="mt-7 flex items-center justify-between text-sm font-bold text-slate-950 transition-colors duration-300 hover:text-sky-700"
                        >
                          <span>Contact Us</span>
                          <span className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300">
                            <ArrowRight className="size-4" />
                          </span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
