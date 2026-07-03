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
      "Every project starts with understanding your business goals, market opportunities, and customer journey before execution begins.",
    featured: true,
    image: "/images/4.png",
    imageClass: "-right-8 -top-8 h-108 w-56",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    description:
      "From websites and mobile applications to AI solutions and digital marketing, everything is delivered under one roof.",
    image: "/images/12.png",
    imageClass: "-bottom-10 -right-10 h-108 w-56",
  },
  {
    icon: Users,
    title: "Experts Across Disciplines",
    description:
      "Work with experienced designers, developers, marketers, and strategists focused on measurable business outcomes.",
    image: "/images/ai.png",
    imageClass: "-left-10 -top-8 h-108 w-56",
  },
  {
    icon: Brain,
    title: "Human + AI Innovation",
    description:
      "We combine industry expertise with AI-powered workflows to create smarter, faster, and scalable solutions.",
    image: "/images/3.png",
    imageClass: "-bottom-12 -left-8 h-108 w-56",
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
                className={`group relative overflow-hidden rounded-[28px] border border-[var(--border)] p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,111,255,0.08)] ${item.featured
                    ? "bg-[var(--surface)]"
                    : "bg-white"
                  }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  width={220}
                  height={280}
                  className={`pointer-events-none absolute object-cover opacity-35 transition-all duration-300 group-hover:opacity-45 ${item.imageClass}`}
                />

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-white transition-all duration-300">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>

                <h3 className="relative z-10 mt-6 text-2xl font-semibold leading-tight text-[var(--heading)]">
                  {item.title}
                </h3>

                <p className="relative z-10 mt-4 text-[15px] leading-relaxed text-[var(--body)]">
                  {item.description}
                </p>

                <button className="group/btn relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                  Learn More

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
