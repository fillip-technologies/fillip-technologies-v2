"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { Service } from "@/data/website-development";

type FaqSectionProps = {
  data?: Service["faq"];
};

const defaultData: NonNullable<Service["faq"]> = {
  eyebrow: "FAQs",
  title: "Frequently Asked",
  highlightedTitle: "Questions",
  items: [],
};

export default function FaqSection({ data = defaultData }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  if (!data.items?.length) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--surface)] py-24 lg:py-32"
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[440px] w-[440px] rounded-full opacity-30 blur-[130px]"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[440px] w-[440px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--primary)]">
            {data.eyebrow}
          </span>
          <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
            {data.title}{" "}
            <span className="highlight-text">{data.highlightedTitle}</span>
          </h2>
        </motion.div>

        {/* ── Accordion ──────────────────────────── */}
        <div className="mx-auto max-w-4xl space-y-3">
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                className={`
                  overflow-hidden rounded-2xl border bg-white
                  transition-all duration-300
                  ${isOpen
                    ? "border-[var(--primary)]/30 shadow-[0_8px_30px_rgba(2,66,162,0.10)]"
                    : "border-[var(--border)] shadow-sm hover:border-[var(--primary)]/20 hover:shadow-md"
                  }
                `}
              >
                {/* Question row */}
                <button
                  id={`faq-question-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-5 px-7 py-5 text-left"
                >
                  {/* Number */}
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 ${
                      isOpen
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--surface)] text-[var(--primary)]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Text */}
                  <span
                    className={`flex-1 text-base font-semibold leading-snug transition-colors duration-200 md:text-[17px] ${
                      isOpen ? "text-[var(--primary)]" : "text-[var(--heading)]"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? "border-[var(--primary)]/20 bg-[var(--primary)]/5 text-[var(--primary)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--body)]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--border)] px-7 pb-6 pt-5">
                        <div className="ml-13 pl-[52px]">
                          <p className="text-[15px] leading-relaxed text-[var(--body)]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
