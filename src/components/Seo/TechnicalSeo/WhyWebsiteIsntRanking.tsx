"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { resolveIcon } from "./icons";
import type { MarketingChallengesContent } from "@/data/marketing/types";

const FALLBACK: MarketingChallengesContent = {
  badge: "TECHNICAL SEO CHALLENGES",
  title: "Why Your Website",
  highlightedTitle: "Isn't Ranking",
  para1:
    "Even great content cannot rank if search engines struggle to crawl, index, and understand your website correctly.",
  para2:
    "Technical SEO helps remove the barriers that stop important pages from being discovered, indexed, and trusted by search engines.",
  ctaText: "See How We Solve These Challenges",
  items: [
    {
      icon: "bot",
      title: "Crawlability Issues",
      description:
        "Search engines cannot efficiently discover important pages because of poor site architecture, broken internal linking, crawl restrictions, and technical barriers. Impact: Reduced Search Visibility.",
    },
    {
      icon: "search-x",
      title: "Indexing Problems",
      description:
        "Critical pages remain absent from search results due to duplicate URLs, noindex errors, incorrect canonicals, and indexing issues. Impact: Missing Search Traffic.",
    },
    {
      icon: "gauge",
      title: "Slow Site Performance",
      description:
        "Poor Core Web Vitals and slow loading experiences negatively impact rankings, engagement, conversions, and overall user satisfaction. Impact: Lower Rankings.",
    },
    {
      icon: "triangle-alert",
      title: "Technical SEO Errors",
      description:
        "Redirect chains, schema issues, broken links, duplicate content, and technical mistakes weaken website authority and search performance. Impact: Lost Organic Growth.",
    },
  ],
};

type WhyWebsiteIsntRankingProps = {
  data?: MarketingChallengesContent;
};

export default function WhyWebsiteIsntRanking({ data }: WhyWebsiteIsntRankingProps) {
  const content = data ?? FALLBACK;
  const challenges = content.items;

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
              {content.badge}
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.04em] text-[var(--heading)] md:text-4xl">
              {content.title}
              <br />
              <span className="highlight-text">{content.highlightedTitle}</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
              {content.para1}
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[var(--body)]">
              {content.para2}
            </p>

            <button className="group mt-8 inline-flex items-center gap-2 font-semibold text-[var(--primary)] transition-all hover:gap-3">
              {content.ctaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {challenges.map((item, index) => {
              const Icon = resolveIcon(item.icon);

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
