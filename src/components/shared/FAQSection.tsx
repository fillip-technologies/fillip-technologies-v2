
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  badge?: string;
  title: string;
  description: string;
  faqs: FAQ[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
};

export default function FAQSection({
  badge = "Frequently Asked Questions",
  title,
  description,
  faqs,
  ctaTitle = "Still Have Questions?",
  ctaDescription = "Let's discuss your requirements and help you find the right solution.",
  ctaButtonText = "Book Free Consultation",
}: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            {badge}
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[24px] border border-slate-200 bg-white transition-all"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between px-8 py-6 text-left"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>

                {open === index ? (
                  <Minus className="h-5 w-5 text-blue-600" />
                ) : (
                  <Plus className="h-5 w-5 text-slate-500" />
                )}
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-8 pb-6 leading-8 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-16 rounded-[32px] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-10 text-center">
          <h3 className="text-3xl font-bold text-slate-900">
            {ctaTitle}
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            {ctaDescription}
          </p>

          <button className="mt-6 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
            {ctaButtonText}
          </button>
        </div> */}
      </div>
    </section>
  );
}

