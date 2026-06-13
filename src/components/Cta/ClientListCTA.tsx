"use client";

import Image from "next/image";

export default function ClientListCTA() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="animate-border-glow group flex flex-col items-center justify-between gap-8 rounded-xl border bg-white px-8 py-8 transition-all duration-300 lg:flex-row lg:px-10">
          
          {/* Content */}
          <div className="max-w-3xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
              Your Next Step
            </span>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--heading)] md:text-3xl">
              Can We Add Your Business To Our Client List Next?
            </h2>

            <p className="mt-3 leading-relaxed text-[var(--body)]">
              Join startups, growing businesses, and enterprises that trust
              Fillip Technologies to build, scale, and innovate with confidence.
              The next business we help grow could be yours.
            </p>
          </div>

          {/* CTA */}
          <button className="group/cta flex shrink-0 flex-col items-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(15,111,255,0.35) 0%, transparent 70%)",
                }}
              />

              <Image
                src="/images/ai-assistant.png"
                alt="Talk To Experts"
                width={110}
                height={110}
                className="relative object-contain transition-transform duration-300 group-hover/cta:scale-105"
              />
            </div>

            <span className="mt-2 text-sm font-semibold text-[var(--heading)] transition-colors duration-300 group-hover/cta:text-[var(--primary)]">
              Let's Build Together →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}