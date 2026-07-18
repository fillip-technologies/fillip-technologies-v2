import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LineChart, Plus, Target } from "lucide-react";
import { HOME_CASESTUDIES_BG } from "@/data/home/defaults";
import { getChallenges } from "@/data/challenges/index";
import type { ChallengeContent } from "@/data/challenges/index";

type ChallengePageProps = {
  data: ChallengeContent;
};

/**
 * Renderer for the "Challenges We Solve" detail pages. Case-study style, but
 * flat: consistent, moderate type scale and alternating section backgrounds
 * instead of heavy nested cards. Every section is populated from the challenge
 * content and guarded so a missing field simply drops its block.
 */
export default function ChallengePage({ data }: ChallengePageProps) {
  const related = getChallenges()
    .filter((challenge) => challenge.slug !== data.slug)
    .slice(0, 3);

  // Static pages carry a top-level `title`; DB/CMS pages don't (it lives on the
  // ServicePage record), so fall back to the hero copy so the heading is never
  // blank on any route.
  const heading =
    data.title ||
    [data.hero?.title, data.hero?.highlightedTitle].filter(Boolean).join(" ");
  const eyebrow = data.tags?.length ? `${data.tags[0]} Challenge` : "Challenge We Solve";
  const problemItems = data.problem.items ?? [];
  const cards = data.approach.cards ?? [];
  const stats = data.outcomes.stats ?? [];
  const whyItems = data.whyChooseUs?.items ?? [];
  const faqItems = data.faq?.items ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white py-28 lg:py-44">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0242a2 1px, transparent 1px), linear-gradient(to bottom, #0242a2 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <Image
          src={HOME_CASESTUDIES_BG}
          alt=""
          width={1536}
          height={1024}
          aria-hidden="true"
          className="pointer-events-none absolute -right-[12%] top-1/2 hidden w-[min(760px,52vw)] -translate-y-1/2 opacity-50 lg:block"
        />
        <div className="container relative mx-auto max-w-7xl px-6">
          <Link
            href="/challenges-we-solve"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
          >
            <ArrowLeft size={16} />
            All Challenges
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
              {eyebrow}
            </div>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-950 md:text-6xl">
              {heading}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600 md:text-2xl md:leading-10">
              {data.hero.description || data.summary}
            </p>
            {data.tags?.length ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--body)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Challenge + Solution */}
      <section className="bg-[#f8fafc] py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl border border-[var(--border)] bg-white p-8">
              <Target className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[var(--heading)]">
                The Challenge
              </h2>
              <p className="mt-4 leading-7 text-[var(--body)]">{data.problem.description}</p>
              {data.problem.secondaryDescription ? (
                <p className="mt-4 leading-7 text-[var(--body)]">
                  {data.problem.secondaryDescription}
                </p>
              ) : null}
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-white p-8">
              <LineChart className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[var(--heading)]">
                How We Solve It
              </h2>
              {data.approach.description ? (
                <p className="mt-4 leading-7 text-[var(--body)]">{data.approach.description}</p>
              ) : null}
              <div className="mt-6 grid gap-4">
                {cards.map((card) => (
                  <div key={card.title} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[var(--primary)]" />
                    <p className="leading-7 text-[var(--body)]">
                      <span className="font-semibold text-[var(--heading)]">{card.title}.</span>{" "}
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem breakdown */}
      {problemItems.length ? (
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              {data.problem.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                  {data.problem.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--heading)] md:text-4xl">
                {data.problem.title}{" "}
                <span className="text-[var(--primary)]">{data.problem.highlightedTitle}</span>
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {problemItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[var(--border)] bg-[#f8fafc] p-6"
                >
                  <h3 className="text-lg font-semibold text-[var(--heading)]">{item.title}</h3>
                  <p className="mt-2 leading-7 text-[var(--body)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Outcome */}
      {stats.length ? (
        <section className="bg-[#f8fafc] py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              {data.outcomes.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                  {data.outcomes.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--heading)] md:text-4xl">
                {data.outcomes.title}{" "}
                <span className="text-[var(--primary)]">{data.outcomes.highlightedTitle}</span>
              </h2>
              {data.outcomes.description ? (
                <p className="mt-4 leading-7 text-[var(--body)]">{data.outcomes.description}</p>
              ) : null}
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center"
                >
                  <div className="text-4xl font-bold tracking-[-0.03em] text-[var(--primary)]">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.06em] text-[var(--body)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Why Fillip */}
      {whyItems.length ? (
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              {data.whyChooseUs.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                  {data.whyChooseUs.eyebrow}
                </p>
              ) : null}
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--heading)] md:text-4xl">
                {data.whyChooseUs.title}{" "}
                <span className="text-[var(--primary)]">{data.whyChooseUs.highlightedTitle}</span>
              </h2>
              {data.whyChooseUs.description ? (
                <p className="mt-4 leading-7 text-[var(--body)]">{data.whyChooseUs.description}</p>
              ) : null}
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {whyItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[#f8fafc] p-6"
                >
                  <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--heading)]">{item.title}</h3>
                    <p className="mt-1.5 leading-7 text-[var(--body)]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {faqItems.length ? (
        <section className="bg-[#f8fafc] py-16 lg:py-24">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[var(--heading)] md:text-4xl">
                {data.faq.title}{" "}
                <span className="text-[var(--primary)]">{data.faq.highlightedTitle}</span>
              </h2>
              {data.faq.description ? (
                <p className="mt-4 leading-7 text-[var(--body)]">{data.faq.description}</p>
              ) : null}
            </div>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-[var(--border)] bg-white p-6 [&_svg]:open:rotate-45"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-[var(--heading)]">
                    {item.question}
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      <Plus size={16} className="transition-transform duration-300" />
                    </span>
                  </summary>
                  <p className="mt-4 leading-7 text-[var(--body)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related */}
      {related.length ? (
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">
                  More Challenges
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-[var(--heading)] md:text-4xl">
                  Explore Related Challenges
                </h2>
              </div>
              <Link
                href="/challenges-we-solve"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((challenge) => (
                <Link
                  key={challenge.slug}
                  href={`/challenges-we-solve/${challenge.slug}`}
                  className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {challenge.tags?.[0] ? (
                    <span className="w-fit rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                      {challenge.tags[0]}
                    </span>
                  ) : null}
                  <h3 className="mt-4 text-lg font-bold text-[var(--heading)]">{challenge.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[var(--body)]">
                    {challenge.menuDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
                    View challenge
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
