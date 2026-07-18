import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { QUOTE_INDUSTRIES, getIndustry } from "@/data/quote/industries";
import { IndustryIcon } from "@/components/quote/industryIcons";
import { formatINR } from "@/lib/quote";

export function generateStaticParams() {
  return QUOTE_INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const data = getIndustry(industry);
  if (!data) return {};
  return {
    title: `${data.name} Quotes | Fillip Technologies`,
    description: data.description,
  };
}

export default async function IndustryQuotePage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const data = getIndustry(industry);
  if (!data) notFound();

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
      {/* Header */}
      <header className="max-w-3xl">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <IndustryIcon name={data.icon} className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
          {data.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-[var(--primary)]">{data.tagline}</p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--body)]">{data.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {data.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-body"
            >
              {h}
            </span>
          ))}
        </div>
      </header>

      {/* Packages */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)] ${
              pkg.popular ? "border-primary bg-primary/[0.03] ring-1 ring-primary/20" : "border-border bg-card"
            }`}
          >
            {pkg.popular ? (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </span>
            ) : null}

            <h3 className="text-lg font-bold text-heading">{pkg.name}</h3>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold tracking-tight text-heading">
                {formatINR(pkg.price)}
              </span>
              {pkg.billing === "monthly" ? (
                <span className="text-sm font-medium text-body">/mo</span>
              ) : null}
            </div>

            <div className="mt-2 space-y-0.5 text-xs text-body">
              {pkg.timeline ? <p>Timeline: {pkg.timeline}</p> : null}
              {pkg.bestFor ? <p>Best for: {pkg.bestFor}</p> : null}
            </div>

            <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                pkg.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border text-heading hover:border-primary/50 hover:text-primary"
              }`}
            >
              Get this quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-heading">Need something more specific?</h2>
          <p className="mt-1.5 max-w-xl text-sm text-body">
            Tell us your exact requirements and we&apos;ll craft a tailored quote for your{" "}
            {data.name.toLowerCase()} project.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex flex-none items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Share your requirement
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
