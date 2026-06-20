"use client";

import {
  Gauge,
  TrendingUp,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { Service } from "@/data/website-development";

const stats = [
  {
    icon: Gauge,
    value: "+90%",
    label: "Page Speed Score",
  },
  {
    icon: TrendingUp,
    value: "+42%",
    label: "Lead Generation Growth",
  },
  {
    icon: Search,
    value: "+68%",
    label: "Organic Traffic Increase",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Website Uptime",
  },
];

type BusinessOutcomesSectionProps = {
  data?: Service["outcomes"];
};

const defaultData: Service["outcomes"] = {
  eyebrow: "Business Outcomes",
  title: "Results That Drive",
  highlightedTitle: "Real Business Growth",
  description:
    "Every website we build is engineered to improve visibility, increase conversions, strengthen customer trust, and support long-term business growth.",
  stats: stats.map(({ value, label }) => ({ value, label })),
  leftPill: "ðŸš€ Faster Performance",
  rightPill: "ðŸ“ˆ Higher Conversions",
};

export default function BusinessOutcomesSection({
  data = defaultData,
}: BusinessOutcomesSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-32 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
            {data.eyebrow}
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-6xl">
            {data.title}
            <span className="highlight-text">
              {" "}
              {data.highlightedTitle}
            </span>
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
            {data.description}
          </p>
        </div>

        {/* Floating Metrics Panel */}
        <div className="relative mx-auto mt-20 max-w-6xl">
          {/* Background Blur */}
          <div
            className="absolute inset-0 rounded-[40px] blur-3xl opacity-30"
            style={{ background: "var(--gradient-primary)" }}
          />

          <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(15,23,42,0.12)]">
            {/* Top Glow Line */}
            <div
              className="h-[2px] w-full"
              style={{ background: "var(--gradient-primary)" }}
            />

            <div className="grid gap-0 md:grid-cols-4">
              {data.stats.map((item, index) => {
                const Icon = stats[index]?.icon ?? Gauge;

                return (
                  <div
                    key={item.label}
                    className={`relative px-8 py-12 text-center ${
                      index !== data.stats.length - 1
                        ? "border-b md:border-b-0 md:border-r border-[var(--border)]"
                        : ""
                    }`}
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
                      <Icon className="h-6 w-6 text-[var(--primary)]" />
                    </div>

                    <div className="mt-6 text-5xl font-bold tracking-[-0.04em] text-[var(--heading)]">
                      {item.value}
                    </div>

                    <div className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--body)]">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Decorative Pills */}
          <div className="absolute -left-6 top-10 hidden rounded-full border border-[var(--border)] bg-white px-4 py-2 shadow-lg lg:block">
            {data.leftPill}
          </div>

          <div className="absolute -right-6 bottom-10 hidden rounded-full border border-[var(--border)] bg-white px-4 py-2 shadow-lg lg:block">
            {data.rightPill}
          </div>
        </div>
      </div>
    </section>
  );
}
