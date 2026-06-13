"use client";

import { ArrowUpRight } from "lucide-react";

export default function NeedGuidanceSection() {
    return (
        <section className="py-12">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center justify-between gap-8  bg-white px-8 py-8 lg:flex-row">

                    <div>
                        <div className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
                            Need Guidance?
                        </div>

                        <h3 className="mt-2 text-2xl font-semibold text-[var(--heading)]">
                            Confused About What Your Business Needs?
                        </h3>

                        <p className="mt-2 max-w-3xl text-[var(--body)]">
                            Some businesses need a website. Others need SEO, mobile apps,
                            AI solutions, or growth marketing. Let's identify the right strategy first.
                        </p>
                    </div>

                    {/* CTA */}
                    <button className="group flex flex-col items-center">
                        <img
                            src="/images/ai-assistant.png"
                            alt="AI Assistant"
                            className="h-38 w-38 object-contain transition-transform duration-300 group-hover:scale-105"
                        />

                        <span className="mt-2 text-sm font-semibold text-[var(--heading)] transition-colors group-hover:text-[var(--primary)]">
                            Talk To Experts →
                        </span>
                    </button>

                </div>
            </div>
        </section>
    );
}