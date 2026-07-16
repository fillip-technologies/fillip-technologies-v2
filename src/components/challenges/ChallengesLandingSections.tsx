"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Search } from "lucide-react";
import { motion } from "framer-motion";
import type { ChallengeContent, ChallengeListingContent } from "@/data/challenges/index";

type ChallengesLandingSectionsProps = {
  listing: ChallengeListingContent;
  challenges: ChallengeContent[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ChallengesLandingSections({
  listing,
  challenges,
}: ChallengesLandingSectionsProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#edf5ff] via-[#f8fbff] to-white py-24 lg:py-32">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          }}
        />
        <div className="absolute left-10 top-20 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-20 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-[var(--primary)]/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {listing.hero.eyebrow}
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {listing.hero.title}
                <br />
                <span className="text-[var(--primary)]">{listing.hero.highlightedTitle}</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                {listing.hero.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#challenge-grid"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:gap-3 hover:bg-[#063b88]"
                >
                  {listing.hero.primaryCta}
                  <ArrowRight size={17} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
                >
                  {listing.hero.secondaryCta}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Search size={17} className="text-[var(--primary)]" />
                    Growth diagnosis
                  </div>
                  <BarChart3 size={18} className="text-cyan-500" />
                </div>
                <div className="grid gap-3">
                  {challenges.map((challenge, index) => (
                    <Link
                      key={challenge.slug}
                      href={`/challenges-we-solve/${challenge.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900">{challenge.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {challenge.menuDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="challenge-grid" className="relative overflow-hidden py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Growth Challenges
            </span>
            <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
              Choose The Problem <span className="highlight-text">Closest To Yours</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
              Each challenge page explains the symptoms, root causes, solution path, and outcomes.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {challenges.map((challenge, index) => (
              <motion.article
                key={challenge.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group flex min-h-[310px] flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-wrap justify-end gap-2">
                    {challenge.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--body)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-[var(--heading)]">
                  {challenge.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-[var(--body)]">
                  {challenge.summary}
                </p>
                <Link
                  href={`/challenges-we-solve/${challenge.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-all duration-300 group-hover:gap-3"
                >
                  Explore Solution
                  <ArrowRight size={16} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--surface)] py-24 lg:py-32">
        <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full blur-[140px] opacity-40 pointer-events-none" style={{ background: "var(--glow-primary)" }} />
        <div className="container relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
                {listing.process.eyebrow}
              </span>
              <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
                {listing.process.title}{" "}
                <span className="highlight-text">{listing.process.highlightedTitle}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
                {listing.process.description}
              </p>
            </div>

            <div className="grid gap-5 lg:col-span-7">
              {listing.process.steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex gap-5 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-xs"
                >
                  <span className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    <CheckCircle2 size={19} />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--heading)]">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-[var(--body)]">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ChallengeFinalCta({ data }: { data: ChallengeListingContent["finalCta"] }) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#081C2E] px-8 py-14 text-center shadow-2xl shadow-blue-500/10 md:px-14 lg:py-18">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-[120px]" />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
              {data.eyebrow}
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              {data.title} <span className="text-cyan-300">{data.highlightedTitle}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {data.description}
            </p>
            <Link
              href={data.href}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#081C2E] transition-all duration-300 hover:gap-3 hover:bg-cyan-200"
            >
              {data.cta}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
