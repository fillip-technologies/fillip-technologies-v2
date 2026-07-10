import { Plus } from "lucide-react";

export type ServiceFaqData = {
  title: string;
  highlightedTitle: string;
  description: string;
  items: { question: string; answer: string }[];
};

// Generic, content-agnostic FAQ section reused across the CMS service-page
// templates (marketing, challenges, ...). Uses native <details>/<summary> so it
// stays a server component while remaining interactive (no client JS needed).
export default function ServiceFaqSection({ data }: { data: ServiceFaqData }) {
  if (!data) return null;
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <section id="faq" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container relative mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
            {data.title} <span className="highlight-text">{data.highlightedTitle}</span>
          </h2>
          {data.description ? (
            <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">{data.description}</p>
          ) : null}
        </div>

        <div className="mt-14 space-y-4">
          {items.map((item, i) => (
            <details
              key={`${item.question}-${i}`}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs [&_svg]:open:rotate-45"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-[var(--heading)]">
                {item.question}
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  <Plus size={16} className="transition-transform duration-300" />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-[var(--body)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
