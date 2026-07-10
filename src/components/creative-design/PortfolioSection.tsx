import type { CreativeDesignContent } from "@/data/creative-design";

// Creative-design specific section: a showcase grid of portfolio tiles. Each
// tile shows an optional image, a category label, and a title.
export default function PortfolioSection({
  data,
}: {
  data: CreativeDesignContent["portfolio"];
}) {
  if (!data) return null;
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute left-0 top-24 h-[420px] w-[420px] rounded-full blur-[140px] opacity-40 pointer-events-none"
        style={{ background: "var(--glow-primary)" }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {data.eyebrow ? (
            <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              {data.eyebrow}
            </span>
          ) : null}

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
            {data.title} <span className="highlight-text">{data.highlightedTitle}</span>
          </h2>

          {data.description ? (
            <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">{data.description}</p>
          ) : null}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xs transition-all duration-300 hover:shadow-md"
            >
              <div className="relative h-52 w-full overflow-hidden bg-[var(--primary)]/5">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary)]/50"
                    style={{ background: "var(--glow-primary)" }}
                  >
                    {item.category || "Design"}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                {item.category ? (
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                    {item.category}
                  </span>
                ) : null}
                <h3 className="mt-2 text-lg font-bold text-[var(--heading)]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
