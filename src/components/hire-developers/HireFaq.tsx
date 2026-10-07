"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import type { FaqItem, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";

export default function HireFaq({ content }: { content: SectionHeading & { items: FaqItem[] } }) {
  const faqs = content.items;
  // One answer open at a time; -1 = all closed.
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              <HighlightTitle title={content.title} />
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            <div className="mt-8 border-l-2 border-blue-100 pl-5">
              <p className="text-sm font-semibold text-slate-900">Still have a question?</p>
              <Link
                href="/contact"
                className="group mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-[#0242A2] transition-colors hover:text-[#0F6FFF]"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: accordion */}
          <ul className="border-t border-slate-200">
            {faqs.map((faq, i) => {
              const isOpen = i === open;
              return (
                <li key={faq.question} className="border-b border-slate-200">
                  <h3>
                    <button
                      type="button"
                      id={`faq-trigger-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-start gap-4 py-5 text-left sm:gap-5 sm:py-6"
                    >
                      <span className="mt-1 w-6 shrink-0 text-xs font-semibold tabular-nums text-[#0F6FFF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-base font-semibold leading-snug transition-colors sm:text-lg ${
                          isOpen ? "text-[#0242A2]" : "text-slate-900 group-hover:text-[#0242A2]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-transparent bg-[#0242A2] text-white"
                            : "border-slate-200 text-slate-500 group-hover:border-blue-200 group-hover:text-[#0242A2]"
                        }`}
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-10 pr-10 text-sm leading-relaxed text-slate-600 sm:pl-11 sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
