import { Check } from "lucide-react";
import type { SoftwareEnterpriseContent } from "@/data/software-enterprise";

// SE-specific section: the "how we work together" engagement-model cards. Not
// part of the shared `Service` template — unique to software-enterprise pages.
export default function EngagementModelsSection({
  data,
}: {
  data: SoftwareEnterpriseContent["engagementModels"];
}) {
  if (!data) return null;
  const models = data.models ?? [];
  if (models.length === 0) return null;

  return (
    <section id="engagement-models" className="relative overflow-hidden py-24 lg:py-32">
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
          {models.map((model, i) => (
            <div
              key={`${model.title}-${i}`}
              className="flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xs transition-all duration-300 hover:shadow-md"
            >
              {model.badge ? (
                <span className="w-fit rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                  {model.badge}
                </span>
              ) : null}

              <h3 className="mt-4 text-xl font-bold text-[var(--heading)]">{model.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-[var(--body)]">{model.description}</p>

              {model.points?.length ? (
                <ul className="mt-6 space-y-3 border-t border-[var(--border)] pt-6">
                  {model.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--body)]">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
