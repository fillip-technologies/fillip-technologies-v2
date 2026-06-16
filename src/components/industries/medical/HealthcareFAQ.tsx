"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How long does it take to see results from healthcare SEO?",
        answer:
            "Most healthcare organizations begin seeing improvements in visibility and organic traffic within 3–6 months. The timeline depends on competition, website quality, and current search presence.",
    },
    {
        question: "Do you only work with hospitals and clinics?",
        answer:
            "No. We work with hospitals, multi-specialty clinics, diagnostic centers, healthcare startups, wellness brands, and independent healthcare providers.",
    },
    {
        question: "Why is a healthcare website important for patient acquisition?",
        answer:
            "Your website is often the first interaction patients have with your organization. A professional website builds trust, improves patient experience, and increases appointment conversions.",
    },
    {
        question: "Can social media really help generate patient appointments?",
        answer:
            "Yes. Consistent healthcare content improves brand awareness, patient trust, engagement, and keeps your organization top-of-mind when healthcare needs arise.",
    },
    {
        question: "Do paid ads work alongside SEO and social media?",
        answer:
            "Absolutely. Paid advertising creates immediate visibility while SEO and social media build long-term growth, making all channels work together as one patient acquisition system.",
    },
    {
        question: "What makes your healthcare growth approach different?",
        answer:
            "Instead of treating website development, SEO, and social media as separate services, we connect them into one complete growth system designed to increase patient enquiries and appointments.",
    },
];

export default function HealthcareFAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <div className="container mx-auto max-w-5xl px-6">
                {/* Heading */}
                <div className="text-center">
                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                        Frequently Asked Questions
                    </span>

                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Everything You Need To Know
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        Common questions healthcare providers ask before building
                        a digital growth system.
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
                                onClick={() =>
                                    setOpen(open === index ? null : index)
                                }
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
                                className={`grid transition-all duration-300 ${open === index
                                        ? "grid-rows-[1fr]"
                                        : "grid-rows-[0fr]"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-8 pb-6 text-slate-600 leading-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 rounded-[32px] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-10 text-center">
                    <h3 className="text-3xl font-bold text-slate-900">
                        Still Have Questions?
                    </h3>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        Let's discuss your healthcare organization, growth goals,
                        and how we can help generate more patient appointments.
                    </p>

                    <button className="mt-6 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
                        Book Free Strategy Call
                    </button>
                </div>
            </div>
        </section>
    );
}