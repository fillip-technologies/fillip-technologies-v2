"use client";

import Image from "next/image";
import type { PerformanceResultsContent } from "@/lib/service-content/types";

const defaults = [{ value: "+68%", label: "Qualified Leads" }, { value: "3.8x", label: "Average ROAS" }, { value: "-42%", label: "Cost Per Lead" }, { value: "+127%", label: "Revenue Growth" }];

export default function ResultsSection({ data }: { data?: PerformanceResultsContent }) {
  const metrics = data?.metrics?.length ? data.metrics : defaults;
  const positions = ["-left-8 top-8", "-right-6 top-1/2", "bottom-6 left-10", "-bottom-4 right-10"];
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative mx-auto max-w-7xl px-6"><div className="grid items-center gap-16 lg:grid-cols-2">
        <div><span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">{data?.badge ?? "RESULTS WE FOCUS ON"}</span><h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">{data?.title ?? "Growth You Can"}<span className="highlight-text block">{data?.highlightedTitle ?? "Actually Measure."}</span></h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--body)]">{data?.description ?? "Every campaign decision is optimized around qualified leads, lower acquisition costs, stronger conversion rates, and sustainable growth."}</p><div className="mt-10 grid grid-cols-2 gap-4">{metrics.map((metric) => <div key={metric.label} className="rounded-[24px] border border-[var(--border)] bg-white p-5"><div className="text-4xl font-bold text-[var(--heading)]">{metric.value}</div><p className="mt-2 text-sm text-[var(--body)]">{metric.label}</p></div>)}</div></div>
        <div className="relative">{metrics.map((metric, index) => <div key={metric.label} className={`absolute ${positions[index]} z-20 rounded-[24px] border border-[var(--border)] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]`}><p className="text-xs text-[var(--body)]">{metric.label}</p><p className="mt-1 text-3xl font-bold text-[var(--heading)]">{metric.value}</p></div>)}<div className="overflow-hidden rounded-[36px] border border-[var(--border)] bg-white p-4 shadow-[0_40px_120px_rgba(15,23,42,0.08)]"><Image src={data?.image?.src || "/images/results-dashboard.png"} alt={data?.image?.alt || "Results Dashboard"} width={900} height={700} className="rounded-[24px]" /></div></div>
      </div></div>
    </section>
  );
}
