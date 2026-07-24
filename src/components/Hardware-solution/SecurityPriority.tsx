"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HardwareQuoteModalButton from "./HardwareQuoteModalButton";
import type { SecurityPriorityContent } from "./content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function SecurityPriority({ content }: { content: SecurityPriorityContent }) {
  const cards = content.cards;
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
              className="whitespace-pre-line text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl"
            >
              {content.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xs text-sm leading-7 text-slate-500"
            >
              {content.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex items-center gap-3"
            >
              <HardwareQuoteModalButton
                label="Get Quote"
                className="group inline-flex items-center gap-3 rounded-full bg-[#071126] px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(2,8,23,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-700 hover:shadow-[0_24px_48px_rgba(14,165,233,0.22)]"
                iconClassName="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />

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

                        <HardwareQuoteModalButton
                          label="Get Quote"
                          className="mt-7 flex items-center justify-between text-sm font-bold text-slate-950 transition-colors duration-300 hover:text-sky-700"
                          iconClassName="size-4"
                        />
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
