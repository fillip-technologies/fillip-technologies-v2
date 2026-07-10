import type { Service } from "@/data/website-development";

// Data-driven "Technology Stack" section — renders each service's own stack
// columns (title, description, technology pills) plus the "why this stack" note.
// Replaces the old hardcoded TechnologyStackSection.
export default function TechnologyStackBlock({ data }: { data: Service["technologyStack"] }) {
  if (!data) return null;
  const columns = Object.values(data.stacks ?? {});

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full blur-[140px] opacity-40 pointer-events-none"
        style={{ background: "var(--glow-accent)" }}
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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {columns.map((col, i) => (
            <div
              key={`${col.title}-${i}`}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-xs"
            >
              <h3 className="text-xl font-bold text-[var(--heading)]">{col.title}</h3>
              <p className="mt-2 leading-relaxed text-[var(--body)]">{col.description}</p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {(col.technologies ?? []).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-white px-3.5 py-1.5 text-sm font-semibold text-[var(--body)] shadow-2xs dark:bg-slate-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {data.whyTitle || data.whyDescription ? (
          <div className="mt-12 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <h3 className="text-xl font-semibold text-[var(--heading)]">{data.whyTitle}</h3>
            <p className="mt-2 max-w-3xl text-[var(--body)]">{data.whyDescription}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
