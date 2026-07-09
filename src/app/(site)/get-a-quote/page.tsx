import type { Metadata } from "next";
import { FileText, MousePointerClick, SlidersHorizontal } from "lucide-react";
import QuoteCalculator from "@/components/quote/QuoteCalculator";

export const metadata: Metadata = {
  title: "Get a Quote | Fillip Technologies",
  description:
    "Build a custom estimate for websites, SEO, social media, performance marketing, and software. Get the PDF emailed to you instantly.",
};

const steps = [
  { icon: MousePointerClick, label: "Pick the packages you need" },
  { icon: SlidersHorizontal, label: "Add any extras — total updates live" },
  { icon: FileText, label: "Get the PDF estimate emailed instantly" },
];

export default function GetAQuotePage() {
  return (
    <main className="relative">
      {/* Hero header */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
        {/* Grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-0 h-[340px] w-[340px] rounded-full blur-[120px]"
          style={{ background: "var(--glow-primary)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-0 h-[340px] w-[340px] rounded-full blur-[120px]"
          style={{ background: "var(--glow-accent)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--primary)]">
            Ready-Made Packages
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
            Build Your <span className="highlight-text">Instant Estimate</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--body)]">
            Pick the packages you need and add any extras — your total updates live. Enter your
            details and we&apos;ll email you a PDF estimate (and download a copy instantly). Final
            pricing is always negotiable when you visit our office or talk to us on a call.
          </p>

          {/* How it works */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/70 p-4 backdrop-blur-sm"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-medium text-[var(--heading)]">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
        <QuoteCalculator />
      </section>
    </main>
  );
}
