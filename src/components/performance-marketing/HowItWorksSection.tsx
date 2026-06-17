"use client";

import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Glow */}
      <div
        className="absolute left-0 top-20 h-[350px] w-[350px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-20 h-[350px] w-[350px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
              HOW IT WORKS
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
              We Make Campaign
              <br />
              <span className="highlight-text">
                Growth Easy.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-[var(--body)]">
            From audience research to campaign scaling, our team handles
            every step needed to generate qualified leads and measurable
            business growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="-rotate-2 rounded-[36px] border border-[var(--border)] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0">
            <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <Image
                src="/images/research-mockup.png"
                alt="Research & Strategy"
                width={600}
                height={400}
                className="h-[260px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-[var(--heading)]">
                Research & Strategy
              </h3>

              <p className="mt-4 leading-relaxed text-[var(--body)]">
                We identify your audience, competitors, and growth
                opportunities before launching campaigns.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[36px] border border-[var(--primary)] bg-white p-5 shadow-[0_30px_80px_rgba(15,111,255,0.12)] transition-all duration-300 hover:-translate-y-2">
            <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <Image
                src="/images/launch-mockup.png"
                alt="Launch & Optimize"
                width={600}
                height={400}
                className="h-[260px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-[var(--heading)]">
                Launch & Optimize
              </h3>

              <p className="mt-4 leading-relaxed text-[var(--body)]">
                Campaigns are launched, tested, and optimized
                continuously to improve performance and maximize
                returns.
              </p>

              <button className="mt-6 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white">
                Launch Campaign →
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rotate-2 rounded-[36px] border border-[var(--border)] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0">
            <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-4">
              <Image
                src="/images/scale-mockup.png"
                alt="Scale & Grow"
                width={600}
                height={400}
                className="h-[260px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-[var(--heading)]">
                Scale & Grow
              </h3>

              <p className="mt-4 leading-relaxed text-[var(--body)]">
                Winning campaigns are scaled strategically to maximize
                revenue without wasting advertising budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
