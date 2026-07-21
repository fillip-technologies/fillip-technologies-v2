"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { HOME_FAQS, type FaqItem } from "@/data/home/defaults";

// CMS-editable content (key: home.faq). Falls back to these defaults.
type FaqContent = Partial<{
  heading: string;
  description: string;
  items: FaqItem[];
}>;

export default function Faq({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as FaqContent;
  const c = {
    heading: content.heading ?? "Frequently Asked Questions",
    description:
      content.description ??
      "Have questions about our digital services? We've got answers. Explore our FAQs or get in touch for custom requirements.",
  };
  const faqs = content.items?.length ? content.items : HOME_FAQS;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden pt-24 pb-8 lg:pt-28 lg:pb-8">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow Effects */}
      <div
        className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="relative z-10 container mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl uppercase">
            {c.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--body)]">
            {c.description}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[24px] border border-[var(--border)] bg-white/70 backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none"
              >
                <h3 className="text-base sm:text-lg font-bold text-[var(--heading)] pr-4">
                  {faq.question}
                </h3>

                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[var(--border)] text-[var(--primary)] transition-transform duration-300">
                  {open === index ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${open === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="px-8 pb-6 text-sm sm:text-base leading-relaxed text-[var(--body)] border-t border-slate-50 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
