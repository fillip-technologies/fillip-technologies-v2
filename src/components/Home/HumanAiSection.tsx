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

<<<<<<< HEAD
export default function HumanAISection() {
=======
type HumanAIContent = Partial<{
  eyebrow: string;
  heading: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  footer: string;
  rows: { before: string; after: string }[];
}>;

export default function HumanAISection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as HumanAIContent;
  const c = {
    eyebrow: content.eyebrow ?? "HUMAN × INTELLIGENCE",
    heading: content.heading ?? "How We Work Today",
    description:
      content.description ??
      "AI doesn't replace expertise. It removes repetitive work, accelerates execution, and helps teams make better decisions.",
    beforeLabel: content.beforeLabel ?? "Before",
    afterLabel: content.afterLabel ?? "Today",
    footer: content.footer ?? "The future isn't Human or AI. It's Human × Intelligence.",
  };
  const rows = content.rows?.length ? content.rows : differences;

>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
  return (
    <section className="relative overflow-hidden py-20">
      <Image
        src="/images/ai.png"
        alt=""
        width={1536}
        height={1064}
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-36 w-auto object-contain sm:h-[15.5rem] lg:h-[23rem]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary text-center">
<<<<<<< HEAD
            HUMAN × INTELLIGENCE
          </p>

          <h2 className="text-heading text-3xl font-semibold text-center">
            How We Work Today
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-center text-body">
            AI doesn&apos;t replace expertise. It removes repetitive work,
            accelerates execution, and helps teams make better decisions.
=======
            {c.eyebrow}
          </p>

          <h2 className="text-heading text-3xl font-semibold text-center">
            {c.heading}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-center text-body">
            {c.description}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
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
<<<<<<< HEAD
              <span className="font-medium text-heading">Before</span>
              <span />
              <span className="text-right font-medium text-heading">
                Today
              </span>
            </div>

            {differences.map((item, index) => (
=======
              <span className="font-medium text-heading">{c.beforeLabel}</span>
              <span />
              <span className="text-right font-medium text-heading">
                {c.afterLabel}
              </span>
            </div>

            {rows.map((item, index) => (
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
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
<<<<<<< HEAD
          The future isn&apos;t Human or AI. It&apos;s Human × Intelligence.
=======
          {c.footer}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
        </p>
      </div>
    </section>
  );
}
