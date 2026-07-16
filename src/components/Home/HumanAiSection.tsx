"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const differences = [
  {
    before: "Manual Processes",
    after: "Intelligent Automation",
  },
  {
    before: "Slow Decision Making",
    after: "Real-Time Insights",
  },
  {
    before: "Repetitive Tasks",
    after: "Faster Execution",
  },
  {
    before: "Disconnected Data",
    after: "Connected Intelligence",
  },
  {
    before: "Human Effort",
    after: "Human + AI Collaboration",
  },
];

type HumanAIContent = Partial<{
  eyebrow: string;
  heading: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  footer: string;
  rows: { before: string; after: string }[];
  backgroundImage1: string;
  backgroundImage2: string;
}>;

export default function HumanAISection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as HumanAIContent;
  const c = {
    eyebrow: content.eyebrow ?? "HUMAN × INTELLIGENCE",
    heading: content.heading ?? "How We Work Today",
    description:
      content.description ??
      "More Than A Company, We Are Your Growth Partner. We support every project with proper research, planning, and business-oriented implementation. By merging human creativity with AI, we accelerate task execution and ultimately drive successful outcomes.",
    beforeLabel: content.beforeLabel ?? "Before",
    afterLabel: content.afterLabel ?? "Today",
    footer: content.footer ?? "The future isn't Human or AI. It's Human × Intelligence.",
    backgroundImage1: content.backgroundImage1 || "/images/AI-BACK.png",
    backgroundImage2: content.backgroundImage2 || "/images/ai.png",
  };
  const rows = content.rows?.length ? content.rows : differences;

  return (
    <section className="relative overflow-hidden py-20">
      <Image
        src={c.backgroundImage1}
        alt=""
        width={1024}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 z-0 w-[min(72vw,520px)] rotate-[28deg] opacity-25 blur-[1px] [mask-image:radial-gradient(circle_at_42%_55%,black_0%,black_42%,transparent_78%)]"
      />

      <Image
        src={c.backgroundImage2}
        alt=""
        width={1536}
        height={1064}
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-36 w-auto object-contain sm:h-[15.5rem] lg:h-[23rem]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary text-center">
            {c.eyebrow}
          </p>

          <h2 className="text-heading text-5xl font-semibold text-center">
            {c.heading}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-center text-body">
            {c.description}
          </p>
        </div>

        <div className="relative rounded-3xl border border-border">
          <div className="pointer-events-none absolute -right-1 -top-4 text-[12px] text-primary ai-star">
            ✦
          </div>
          <div className="pointer-events-none absolute right-4 -top-2 text-[8px] text-accent ai-star-delayed">
            ✧
          </div>

          <div className="overflow-hidden rounded-3xl">
            <div className="grid grid-cols-[1fr_auto_1fr] border-b border-border bg-surface/50 px-6 py-4">
              <span className="font-medium text-heading">{c.beforeLabel}</span>
              <span />
              <span className="text-right font-medium text-heading">
                {c.afterLabel}
              </span>
            </div>

            {rows.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border px-6 py-5 last:border-0"
              >
                <span className="text-body">
                  {item.before}
                </span>

                <ArrowRight
                  size={16}
                  className="text-primary"
                />

                <span className="text-right text-heading font-medium">
                  {item.after}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-center text-body">
          {c.footer}
        </p>
      </div>
    </section>
  );
}
