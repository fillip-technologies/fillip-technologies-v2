"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function GrowthStoriesSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-22">
      {/* Glow */}
      <div
        className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
            SUCCESS STORIES
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
            Growth Stories.
            <span className="highlight-text block">
              Not Marketing Claims.
            </span>
          </h2>

          <p className="mt-5 text-lg text-[var(--body)]">
            Real campaign outcomes driven by strategy, optimization,
            and continuous performance improvement.
          </p>
        </div>

        {/* Featured Story */}
        <div className="mt-16 overflow-hidden rounded-[40px] border border-[var(--border)] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.06)]">
          <div className="grid items-center lg:grid-cols-2">
            {/* Left */}
            <div className="p-10 lg:p-14">
              <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
                Featured Campaign
              </span>

              <h3 className="mt-6 text-4xl font-bold text-[var(--heading)]">
              Abhyanand Super 30
              </h3>

              <p className="mt-4 text-lg text-[var(--body)]">
                Strategic Meta advertising campaigns designed to
                increase visibility, engagement, and ticket enquiries.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-4xl font-bold text-[var(--heading)]">
                    +214%
                  </div>
                  <p className="mt-2 text-sm text-[var(--body)]">
                    Enquiries
                  </p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-[var(--heading)]">
                    3.6x
                  </div>
                  <p className="mt-2 text-sm text-[var(--body)]">
                    ROAS
                  </p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-[var(--heading)]">
                    -38%
                  </div>
                  <p className="mt-2 text-sm text-[var(--body)]">
                    CPL
                  </p>
                </div>
              </div>

              <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-white">
                View Full Story
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            {/* Right Image */}
            <div className="p-6">
              <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-4">
                <Image
                  src="/images/case-study-main.png"
                  alt="Case Study"
                  width={900}
                  height={700}
                  className="rounded-[24px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Small Stories */}
        
      </div>
    </section>
  );
}
