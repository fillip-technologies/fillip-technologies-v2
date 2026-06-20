"use client";

import Image from "next/image";
import {
  Rocket,
  Target,
  TrendingDown,
  Settings,
  Search,
  FileText,
  ArrowRight,
} from "lucide-react";
import type { Service } from "@/data/website-development";

const challenges = [
  {
    icon: Rocket,
    title: "Slow Performance",
    description:
      "Visitors abandon websites that take too long to load, reducing engagement and conversions.",
  },
  {
    icon: Target,
    title: "Poor User Experience",
    description:
      "Confusing layouts and difficult navigation create friction and decrease customer trust.",
  },
  {
    icon: TrendingDown,
    title: "Low Conversion Rates",
    description:
      "Many websites attract visitors but fail to convert them into leads, inquiries, or customers.",
  },
  {
    icon: Settings,
    title: "Limited Scalability",
    description:
      "Outdated systems struggle to support growing traffic, content, and business requirements.",
  },
  {
    icon: Search,
    title: "Weak SEO Foundation",
    description:
      "Without proper technical SEO, websites remain difficult to discover through search engines.",
  },
  {
    icon: FileText,
    title: "Difficult Content Management",
    description:
      "Complex backend systems make updates time-consuming and limit marketing agility.",
  },
];

type WhyWebsitesUnderperformProps = {
  data?: Service["challenges"];
};

const defaultData: Service["challenges"] = {
  eyebrow: "Business Website Challenges",
  title: "Most Websites Look Good.",
  highlightedTitle: "Few Generate Real Results.",
  description:
    "Many businesses invest in websites that appear modern but fail to attract customers, generate leads, improve visibility, or support long-term growth.",
  secondaryDescription:
    "At Fillip Technologies, we build websites engineered for performance, discoverability, scalability, and measurable business outcomes.",
  cta: "See How We Solve These Challenges",
  items: challenges.map(({ title, description }) => ({ title, description })),
};

export default function WhyWebsitesUnderperform({
  data = defaultData,
}: WhyWebsitesUnderperformProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-24 lg:py-10">
      {/* Background Glow */}
      <div
        className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <Image
        src="/images/background.png"
        alt=""
        width={1536}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[min(58vw,620px)] max-w-none select-none opacity-60"
        sizes="(max-width: 768px) 70vw, 620px"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left Content */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
              {data.eyebrow}
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.04em] text-[var(--heading)] md:text-4xl">
              {data.title}
              <br />
              <span className="highlight-text">
                {data.highlightedTitle}
              </span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
              {data.description}
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[var(--body)]">
              {data.secondaryDescription}
            </p>

            <button className="group mt-8 inline-flex items-center gap-2 font-semibold text-[var(--primary)] transition-all hover:gap-3">
              {data.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {data.items.map((item, index) => {
              const Icon = challenges[index]?.icon ?? Rocket;

              return (
                <div
                  key={index}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-7
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[var(--primary)]
                    hover:shadow-[0_20px_60px_rgba(15,111,255,0.12)]
                  "
                >
                  {/* Glow */}
                  <div
                    className="
                      absolute
                      -right-10
                      -top-10
                      h-24
                      w-24
                      rounded-full
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                    style={{
                      background: "var(--glow-primary)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="
                      relative
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      transition-all
                      duration-300
                      group-hover:border-[var(--primary)]
                    "
                  >
                    <Icon
                      className="
                        h-5
                        w-5
                        text-[var(--primary)]
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-[var(--heading)]">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-[var(--body)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
