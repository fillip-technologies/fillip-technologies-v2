import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { QUOTE_INDUSTRIES, getIndustry } from "@/data/quote/industries";
import { IndustryIcon } from "@/components/quote/industryIcons";
import IndustryPackages from "@/components/quote/IndustryPackages";
import { PlanMatrix } from "@/components/quote/FeatureComparison";
import {
  WhatsIncluded,
  HowToChoose,
  WhyChooseFillip,
} from "@/components/quote/QuoteDetailSections";
import {
  HOW_TO_CHOOSE,
  WHY_CHOOSE_STATS,
  WHY_CHOOSE_POINTS,
  type DetailCard,
} from "@/data/quote/detail";

// Icons cycled across an industry's highlight cards (all exist in the icon map).
const HIGHLIGHT_ICONS = ["ListChecks", "Target", "TrendingUp", "Goal"];

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

  const includedCards: DetailCard[] = data.highlights.map((h, i) => ({
    icon: HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length],
    title: h,
  }));

  return (
    <main>
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

      {/* Packages (interactive — highlight shifts to the selected card) */}
      <IndustryPackages packages={data.packages} />

      {/* Plan comparison */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-heading">Which plan is right for you?</h2>
        <p className="mt-1.5 text-sm text-body">
          Every feature laid out side by side — spot exactly where each tier levels up and pick without second-guessing.
        </p>
        <div className="mt-6">
          <PlanMatrix packages={data.packages} />
        </div>
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
          href="/get-a-quote/requirement"
          className="inline-flex flex-none items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Share your requirement
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      </section>

      {/* What's included for this industry */}
      <WhatsIncluded
        eyebrow="What's Included"
        heading={`Built for ${data.name.toLowerCase()}`}
        subheading={data.tagline}
        cards={includedCards}
      />

      {/* How to choose + why choose Fillip */}
      <HowToChoose heading="How to choose the right package" steps={HOW_TO_CHOOSE} />
      <WhyChooseFillip stats={WHY_CHOOSE_STATS} points={WHY_CHOOSE_POINTS} />
    </main>
  );
}
