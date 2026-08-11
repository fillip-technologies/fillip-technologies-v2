import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";
import type { CaseStudy } from "@/server/content/casestudy-registry";
import GrowthChart from "./GrowthChart";

/**
 * Shared template for every /case-studies/<slug> page. Content comes straight
 * from the self-contained case-study document. Each section renders only when it
 * has content, so partially-filled case studies still look complete.
 */
export default function CaseStudyPageView({
  data,
  related,
}: {
  data: CaseStudy;
  related: { slug: string; title: string; industry: string; href: string; image: string; result: string }[];
}) {
  const { hero, results, brands, challenges, strategy, journey, outcome, cta } = data;

  return (
    <main className="bg-[#f8fafc]">
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0242a2 1px, transparent 1px), linear-gradient(to bottom, #0242a2 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {hero.heroImage ? (
          <Image
            src={hero.heroImage}
            alt={hero.imageAlt || ""}
            width={1536}
            height={1024}
            aria-hidden="true"
            className="pointer-events-none absolute -right-[12%] top-1/2 hidden w-[min(760px,52vw)] -translate-y-1/2 opacity-50 lg:block"
          />
        ) : null}

        <div className="container relative mx-auto max-w-7xl px-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
          >
            <ArrowLeft size={16} />
            All Case Studies
          </Link>

          <div className="mt-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
              {data.industry ? `${data.industry} — ${hero.eyebrow}` : hero.eyebrow}
            </span>
            <h1 className="mt-7 text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-slate-950 md:text-7xl">
              {hero.title || data.title}
            </h1>
            {hero.description ? (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{hero.description}</p>
            ) : null}
            {hero.resultBadge ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white">
                <TrendingUp size={16} />
                {hero.resultBadge}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- metrics */}
      {results.items.length ? (
        <section className="relative z-10 -mt-14">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid gap-4 rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:grid-cols-2 lg:grid-cols-4">
              {results.items.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold tracking-[-0.04em] text-[var(--primary)] md:text-5xl">
                    {m.value}
                  </div>
                  <div className="mt-2 text-sm font-medium leading-6 text-[var(--body)]">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------------------------- brands */}
      {brands.logos.length || brands.heading ? (
        <section className="py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6 text-center">
            {brands.heading ? (
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-4xl">
                {brands.heading}
              </h2>
            ) : null}
            {brands.description ? (
              <p className="mx-auto mt-5 max-w-3xl leading-8 text-[var(--body)]">{brands.description}</p>
            ) : null}
            {brands.logos.length ? (
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {brands.logos.map((b, i) => (
                  <div
                    key={i}
                    className="flex h-24 items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-6 shadow-sm"
                  >
                    {b.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logo} alt={b.name} className="max-h-12 w-auto object-contain" />
                    ) : (
                      <span className="text-sm font-semibold text-[var(--heading)]">{b.name}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* --------------------------------------------- challenges + strategy */}
      {challenges.items.length || strategy.items.length ? (
        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {challenges.items.length ? (
                <div className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm md:p-10">
                  <Target className="h-7 w-7 text-[var(--primary)]" />
                  <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                    {challenges.heading || "The Challenge"}
                  </h2>
                  {challenges.intro ? (
                    <p className="mt-4 leading-8 text-[var(--body)]">{challenges.intro}</p>
                  ) : null}
                  <ul className="mt-6 grid gap-4">
                    {challenges.items.map((c, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[var(--primary)]" />
                        <span className="leading-7 text-[var(--body)]">{c.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {strategy.items.length ? (
                <div className="rounded-[32px] border border-[var(--border)] bg-[var(--primary)] p-8 text-white shadow-sm md:p-10">
                  <CheckCircle2 className="h-7 w-7" />
                  <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em]">
                    {strategy.heading || "How We Solved It"}
                  </h2>
                  {strategy.intro ? <p className="mt-4 leading-8 text-white/85">{strategy.intro}</p> : null}
                  <ul className="mt-6 grid gap-4">
                    {strategy.items.map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-white/90" />
                        <span className="leading-7 text-white/90">{s.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------- journey */}
      {journey.chartValues.length || journey.phases.length ? (
        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                The Growth Process
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
                {journey.heading || "The Growth Journey"}
              </h2>
              {journey.subheading ? (
                <p className="mt-5 leading-8 text-[var(--body)]">{journey.subheading}</p>
              ) : null}
            </div>

            {journey.chartValues.length ? (
              <div className="mt-14 rounded-[32px] border border-[var(--border)] bg-[#f8fafc] p-6 md:p-10">
                <GrowthChart values={journey.chartValues} label={journey.chartLabel} />
              </div>
            ) : null}

            {journey.phases.length ? (
              <div className="mt-16 grid gap-6 md:grid-cols-2">
                {journey.phases.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
                  >
                    {p.period ? (
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                        {p.period}
                      </div>
                    ) : null}
                    <h3 className="mt-2 text-xl font-bold text-[var(--heading)]">{p.title}</h3>
                    {p.description ? (
                      <p className="mt-3 text-sm leading-7 text-[var(--body)]">{p.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------- outcome */}
      {outcome.paragraphs.length ? (
        <section className="py-20 lg:py-28">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
              {outcome.heading || "The Outcome"}
            </h2>
            <div className="mt-8 space-y-6">
              {outcome.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-8 text-[var(--body)]">
                  {p.text}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ----------------------------------------------------------------- cta */}
      {cta.heading || cta.buttonLabel ? (
        <section className="pb-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-[32px] bg-[var(--primary)] px-8 py-16 text-center text-white md:px-16">
              {cta.heading ? (
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-[-0.04em] md:text-4xl">
                  {cta.heading}
                </h2>
              ) : null}
              {cta.description ? (
                <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/85">{cta.description}</p>
              ) : null}
              {cta.buttonLabel ? (
                <Link
                  href={cta.buttonHref || "/contact"}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[var(--primary)] transition hover:gap-3"
                >
                  {cta.buttonLabel}
                  <ArrowRight size={18} />
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ----------------------------------------------------- related studies */}
      {related.length ? (
        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                  More Case Studies
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                  Explore Related Results
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((study) => (
                <Link
                  key={study.slug}
                  href={study.href}
                  className="group overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {study.image ? (
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    {study.result ? (
                      <div className="absolute bottom-5 left-5 text-sm font-bold text-white">
                        {study.result}
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    {study.industry ? (
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                        {study.industry}
                      </div>
                    ) : null}
                    <h3 className="mt-2 text-xl font-bold text-[var(--heading)]">{study.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
