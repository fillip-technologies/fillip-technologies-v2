// components/ResultsSection.tsx

"use client";

import Image from "next/image";

export default function ResultsSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Glow */}
      <div
        className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
              RESULTS WE FOCUS ON
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-[1] tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
              Growth You Can
              <span className="highlight-text block">
                Actually Measure.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--body)]">
              Every campaign decision is optimized around business
              outcomes that matter — qualified leads, lower acquisition
              costs, stronger conversion rates, and sustainable growth.
            </p>

            {/* Metrics */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                <div className="text-4xl font-bold text-[var(--heading)]">
                  +68%
                </div>
                <p className="mt-2 text-sm text-[var(--body)]">
                  Qualified Leads
                </p>
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                <div className="text-4xl font-bold text-[var(--heading)]">
                  3.8x
                </div>
                <p className="mt-2 text-sm text-[var(--body)]">
                  Average ROAS
                </p>
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                <div className="text-4xl font-bold text-[var(--heading)]">
                  -42%
                </div>
                <p className="mt-2 text-sm text-[var(--body)]">
                  Cost Per Lead
                </p>
              </div>

              <div className="rounded-[24px] border border-[var(--border)] bg-white p-5">
                <div className="text-4xl font-bold text-[var(--heading)]">
                  +127%
                </div>
                <p className="mt-2 text-sm text-[var(--body)]">
                  Revenue Growth
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            {/* Floating Card */}
            <div className="absolute -left-8 top-8 z-20 rounded-[24px] border border-[var(--border)] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs text-[var(--body)]">
                Qualified Leads
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--heading)]">
                +68%
              </p>
            </div>

            {/* Dashboard */}
            <div className="overflow-hidden rounded-[36px] border border-[var(--border)] bg-white p-4 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <Image
                src="/images/results-dashboard.png"
                alt="Results Dashboard"
                width={900}
                height={700}
                className="rounded-[24px]"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -right-6 top-1/2 z-20 rounded-[24px] border border-[var(--border)] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs text-[var(--body)]">
                Average ROAS
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--heading)]">
                3.8x
              </p>
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-10 z-20 rounded-[24px] border border-[var(--border)] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs text-[var(--body)]">
                Lower CPL
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--heading)]">
                -42%
              </p>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-4 right-10 z-20 rounded-[24px] border border-[var(--border)] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs text-[var(--body)]">
                Revenue Growth
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--heading)]">
                +127%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
