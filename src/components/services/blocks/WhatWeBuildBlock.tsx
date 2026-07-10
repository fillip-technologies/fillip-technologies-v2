import type { Service } from "@/data/website-development";

// Data-driven "What We Build" section — renders each service's own capability
// cards (title, description, optional metric + tags). Replaces the old hardcoded
// WhatWeBuildSection so the content is per-page and CMS-editable.
export default function WhatWeBuildBlock({ data }: { data: Service["whatWeBuild"] }) {
  if (!data) return null;
  const cards = data.cards ?? [];

  return (
    <section id="what-we-build" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full blur-[140px] opacity-40 pointer-events-none"
        style={{ background: "var(--glow-primary)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {data.eyebrow ? (
            <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              {data.eyebrow}
            </span>
          ) : null}

          <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
            {data.title}{" "}
            <span className="highlight-text">{data.highlightedTitle}</span>
          </h2>

          {data.description ? (
            <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">{data.description}</p>
          ) : null}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={`${card.title}-${i}`}
              className="flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xs transition-all duration-300 hover:shadow-md"
            >
              {card.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
              ) : null}

              <div className="flex flex-1 flex-col p-7">
              {card.eyebrow ? (
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                  {card.eyebrow}
                </span>
              ) : null}

              <h3 className="mt-2 text-xl font-bold text-[var(--heading)]">{card.title}</h3>

              <p className="mt-3 flex-1 leading-relaxed text-[var(--body)]">
                {card.description}
              </p>

              {card.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--body)] dark:bg-slate-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              {card.metric ? (
                <div className="mt-5 inline-flex w-fit items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-semibold text-[var(--primary)]">
                  {card.metric}
                </div>
              ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
