import { Check } from "lucide-react";

export type WhyChooseUsData = {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  items: { title: string; description: string }[];
};

// Generic, content-agnostic "why choose us" section reused across the CMS
// service-page templates (marketing, challenges, ...). Shape is a plain object,
// not tied to any one template's content type.
export default function WhyChooseUsSection({ data }: { data: WhyChooseUsData }) {
  if (!data) return null;
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <section id="why-choose-us" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {data.eyebrow ? (
            <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              {data.eyebrow}
            </span>
          ) : null}

          <h2 className="mt-6 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
            {data.title} <span className="highlight-text">{data.highlightedTitle}</span>
          </h2>

          {data.description ? (
            <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">{data.description}</p>
          ) : null}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="flex gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xs transition-all duration-300 hover:shadow-md"
            >
              <span className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <Check size={18} strokeWidth={3} />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[var(--heading)]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--body)]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
