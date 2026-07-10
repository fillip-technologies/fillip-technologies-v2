"use client";

import Image from "next/image";
import type { PerformancePhilosophyContent } from "@/lib/service-content/types";

type Props = { data?: PerformancePhilosophyContent };

export default function PerformancePhilosophySection({ data }: Props) {
  const metrics = data?.metrics ?? [
    { label: "Qualified Leads", value: "+68%" },
    { label: "Average ROAS", value: "3.8x" },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-22">
      <div className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: "var(--glow-primary)" }} />
      <div className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: "var(--glow-accent)" }} />
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">{data?.badge ?? "OUR PERFORMANCE PHILOSOPHY"}</span>
            <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
              <span className="whitespace-nowrap">{data?.title ?? "Outperform Competitors."}</span>
              <span className="highlight-text block whitespace-nowrap">{data?.highlightedTitle ?? "Don't Outspend Them."}</span>
            </h2>
            <div className="mt-8 border-l-4 border-[var(--primary)] pl-6">
              <p className="text-xl font-medium leading-relaxed text-[var(--heading)]">{data?.lead ?? "Most businesses increase advertising budgets when results decline."}</p>
              <p className="mt-3 text-lg text-[var(--body)]">{data?.support ?? "We improve strategy when results matter."}</p>
            </div>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--body)]">{data?.description ?? "Successful campaigns are built on audience insights, creative testing, conversion tracking, and continuous optimization, not simply bigger budgets."}</p>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute left-0 top-10 z-20 rounded-3xl border border-[var(--border)] bg-white px-5 py-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
              <div className="text-xs text-[var(--body)]">{metrics[0].label}</div><div className="mt-1 text-3xl font-bold text-[var(--heading)]">{metrics[0].value}</div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-[100px]" style={{ background: "var(--glow-primary)" }} />
              <Image src="/images/chess-startegy.png" alt="Performance Marketing Strategy" width={900} height={900} className="relative z-10 max-w-[510px]" />
              <div className="mx-auto mt-2 w-fit rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--heading)] shadow-sm">{data?.caption ?? "Smart strategy beats bigger budgets"}</div>
            </div>
            <div className="absolute bottom-10 right-0 z-20 rounded-3xl border border-[var(--border)] bg-white px-5 py-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
              <div className="text-xs text-[var(--body)]">{metrics[1].label}</div><div className="mt-1 text-3xl font-bold text-[var(--heading)]">{metrics[1].value}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
