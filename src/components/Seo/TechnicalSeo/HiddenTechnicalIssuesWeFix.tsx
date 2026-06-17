"use client";

import { CheckCircle2 } from "lucide-react";

const issues = [
  {
    number: "01",
    title: "Crawlability Problems",
    description:
      "Broken internal links, orphan pages, crawl restrictions and poor architecture prevent search engines from discovering important content.",
    impact: "Poor Search Discovery",
  },
  {
    number: "02",
    title: "Indexing Errors",
    description:
      "Noindex directives, canonical conflicts and duplicate URLs stop valuable pages from appearing in search results.",
    impact: "Lost Organic Traffic",
  },
  {
    number: "03",
    title: "Core Web Vitals",
    description:
      "Slow loading pages, CLS issues and poor performance metrics impact rankings and user experience.",
    impact: "Lower Rankings",
  },
  {
    number: "04",
    title: "Schema & Structured Data",
    description:
      "Missing or invalid schema reduces search visibility and rich result opportunities.",
    impact: "Reduced SERP Visibility",
  },
  {
    number: "05",
    title: "Redirect Issues",
    description:
      "Redirect chains, loops and broken redirects waste crawl budget and hurt performance.",
    impact: "Crawl Budget Waste",
  },
  {
    number: "06",
    title: "Duplicate Content",
    description:
      "Content duplication and URL conflicts weaken authority and create ranking confusion.",
    impact: "Reduced Authority",
  },
];

export default function HiddenTechnicalIssuesWeFix() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div
        className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-primary)" }}
      />

      <div
        className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-primary">
            TECHNICAL SEO AUDIT
          </span>

          <h2 className="mt-8 text-h2 font-bold tracking-tight text-heading">
            Hidden Technical{" "}
            <span className="highlight-text">
              Issues We Fix
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-body text-body">
            Many websites lose rankings not because of content quality,
            but because technical SEO issues prevent search engines
            from properly crawling, indexing and evaluating the site.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {issues.map((item) => (
            <div
              key={item.number}
              className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-border
              bg-card
              p-8
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-primary/30
              hover:shadow-[0_25px_80px_var(--glow-primary)]
            "
            >
              {/* Number */}

              <span className="absolute right-8 top-6 text-6xl font-bold text-muted opacity-40">
                {item.number}
              </span>

              {/* Icon */}

              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>

              {/* Title */}

              <h3 className="max-w-[220px] text-xl font-semibold text-heading">
                {item.title}
              </h3>

              {/* Description */}

              <p className="mt-5 text-body text-muted-foreground leading-7">
                {item.description}
              </p>

              {/* Divider */}

              <div className="my-8 h-px bg-border" />

              {/* Footer */}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {item.impact}
                </span>

                <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
