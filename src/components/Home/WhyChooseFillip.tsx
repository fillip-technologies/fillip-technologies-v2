"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Brain,
  Briefcase,
  Rocket,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Strategy- First Thinking",
    description:
      "We work with you from strategy to execution, knowing your business challenges and goals to develop scalable digital solutions.",
    image: "/images/whychoose-strategy.png",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    description:
      "Whether it’s consultation, implementation, or ongoing maintenance, we’ve got you covered.",
    image: "/images/whychoose-delivery.png",
  },
  {
    icon: Users,
    title: "Experts Across Disciplines",
    description:
      "Working with expert strategists, designers, developers, and marketers specifically for you to generate real and meaningful outcomes.",
    image: "/images/whychoose-experts-v2.png",
  },
  {
    icon: Brain,
    title: "Human + AI Innovation",
    description:
      "We combine creativity, industry expertise, and AI-powered workflows to provide quicker, smarter, and scalable digital solutions.",
    image: "/images/whychoose-ai.png",
  },
];

// CMS-editable content (key: home.whychooseus). Falls back to these defaults.
type WhyChooseContent = Partial<{
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  ctaLabel: string;
}>;

export default function WhyChooseUsSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as WhyChooseContent;
  const c = {
    eyebrow: content.eyebrow ?? "Why Businesses Choose Fillip",
    headingLine1: content.headingLine1 ?? "Built For Growth.",
    headingLine2: content.headingLine2 ?? "Designed For Results.",
    description:
      content.description ??
      "We combine strategy, technology, design, and AI expertise to help businesses build, scale, and grow with confidence in a rapidly evolving digital world.",
    ctaLabel: content.ctaLabel ?? "Learn More",
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute left-0 top-20 h-[350px] w-[350px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--primary)]">
              {c.eyebrow}
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
              {c.headingLine1}
              <br />
              {c.headingLine2}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--body)]">
              {c.description}
            </p>
          </div>

          <button className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-medium text-[var(--heading)] transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg">
            {c.ctaLabel}

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,111,255,0.12)]"
              >
                {/* Full-contrast background image */}
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 320px"
                  className="pointer-events-none absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-white transition-all duration-300">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>

                <h3 className="relative z-10 mt-6 text-2xl font-bold leading-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">
                  {item.title}
                </h3>

                <p className="relative z-10 mt-4 text-[15px] font-medium leading-relaxed text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.8)]">
                  {item.description}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
