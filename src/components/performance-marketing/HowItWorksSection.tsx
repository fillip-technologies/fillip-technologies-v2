"use client";

import Image from "next/image";
import type { PerformanceWorkflowContent } from "@/lib/service-content/types";

const defaults = [
  { title: "Research & Strategy", description: "We identify your audience, competitors, and growth opportunities before launching campaigns.", image: "/images/research-mockup.png", alt: "Research & Strategy" },
  { title: "Launch & Optimize", description: "Campaigns are launched, tested, and optimized continuously to improve performance and maximize returns.", image: "/images/launch-mockup.png", alt: "Launch & Optimize", cta: "Launch Campaign" },
  { title: "Scale & Grow", description: "Winning campaigns are scaled strategically to maximize revenue without wasting advertising budget.", image: "/images/scale-mockup.png", alt: "Scale & Grow" },
];

export default function HowItWorksSection({ data }: { data?: PerformanceWorkflowContent }) {
  const steps = data?.steps ?? defaults;
  const styles = ["-rotate-2 border-[var(--border)]", "border-[var(--primary)]", "rotate-2 border-[var(--border)]"];
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div><span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">{data?.badge ?? "HOW IT WORKS"}</span><h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">{data?.title ?? "We Make Campaign"}<br /><span className="highlight-text">{data?.highlightedTitle ?? "Growth Easy."}</span></h2></div>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--body)]">{data?.description ?? "From audience research to campaign scaling, our team handles every step needed to generate qualified leads and measurable business growth."}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => <div key={step.title} className={`${styles[index]} rounded-[36px] border bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0`}><div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-4"><Image src={step.image} alt={step.alt} width={600} height={400} className="h-[260px] w-full rounded-2xl object-cover" /></div><div className="mt-8"><h3 className="text-2xl font-semibold text-[var(--heading)]">{step.title}</h3><p className="mt-4 leading-relaxed text-[var(--body)]">{step.description}</p>{step.cta ? <button className="mt-6 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-medium text-white">{step.cta}</button> : null}</div></div>)}
        </div>
      </div>
    </section>
  );
}
