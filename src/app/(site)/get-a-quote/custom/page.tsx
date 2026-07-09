import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QUOTE_INDUSTRIES } from "@/data/quote/industries";
import { IndustryIcon } from "@/components/quote/industryIcons";
import { formatINR } from "@/lib/quote";

export const metadata: Metadata = {
  title: "Custom Quotes by Industry | Fillip Technologies",
  description:
    "Pick your industry — hospital, doctor, real estate, education, e-commerce or restaurant — to see packages tailored to how you operate.",
};

export default function CustomOverviewPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
      <header className="max-w-3xl">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--primary)]">
          Custom by Industry
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
          Solutions Tailored to <span className="highlight-text">Your Industry</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
          Every industry works differently. Choose yours to see packages built around your real
          workflows — with pricing that stays negotiable when we talk.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTE_INDUSTRIES.map((ind) => {
          const from = Math.min(...ind.packages.map((p) => p.price));
          return (
            <Link
              key={ind.slug}
              href={`/get-a-quote/custom/${ind.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IndustryIcon name={ind.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-xl font-bold text-heading">{ind.name}</h3>
              <p className="mt-1.5 text-sm text-body">{ind.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {ind.highlights.slice(0, 3).map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-body"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-body">
                  From <span className="font-bold text-heading">{formatINR(from)}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View packages
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
