import { Check } from "lucide-react";
import { DetailIcon } from "./quoteDetailIcons";
import type { DetailCard } from "@/data/quote/detail";

/**
 * Shared, presentational "detail" sections for the Get-a-Quote pages. All are
 * server components (no hooks) and fully prop-driven so the Packages page and
 * every Custom industry page reuse them with their own content. Styling leans
 * on the site's primary→accent gradient and hover motion to pull the eye down
 * the page and make the detail worth reading.
 */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--primary)]">
      <span className="size-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
      {children}
    </span>
  );
}

/** Card grid describing what a set of packages includes / covers. */
export function WhatsIncluded({
  eyebrow = "What's Included",
  heading,
  subheading,
  cards,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  cards: DetailCard[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
      <header className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-[var(--heading)] md:text-4xl">
          {heading}
        </h2>
        {subheading ? (
          <p className="mt-4 text-lg leading-relaxed text-[var(--body)]">{subheading}</p>
        ) : null}
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
          >
            {/* accent bar reveals on hover */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm shadow-primary/20">
              <DetailIcon name={card.icon} className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-heading">{card.title}</h3>
            {card.description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-body">{card.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Numbered "how to choose the right package" guide with big ghost numerals. */
export function HowToChoose({
  eyebrow = "How to Choose",
  heading = "Picking the right package",
  steps,
}: {
  eyebrow?: string;
  heading?: string;
  steps: DetailCard[];
}) {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <header className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-[var(--heading)] md:text-4xl">
            {heading}
          </h2>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            >
              {/* oversized ghost numeral */}
              <span className="pointer-events-none absolute -right-2 -top-4 select-none bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 bg-clip-text text-8xl font-extrabold leading-none text-transparent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm shadow-primary/20">
                <DetailIcon name={step.icon} className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-base font-bold text-heading">{step.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-body">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** High-contrast trust band: headline stats + a checklist of reasons. */
export function WhyChooseFillip({
  eyebrow = "Why Fillip",
  heading = "Why teams choose Fillip Technologies",
  stats,
  points,
}: {
  eyebrow?: string;
  heading?: string;
  stats: { value: string; label: string }[];
  points: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] text-white">
      {/* glows for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-[360px] w-[360px] rounded-full blur-[130px]"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-[360px] w-[360px] rounded-full blur-[130px]"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-[var(--accent)]">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            {eyebrow}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
            {heading}
          </h2>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-white/25"
            >
              <div className="bg-gradient-to-r from-white to-[var(--accent)] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                {s.value}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-white/85">
              <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
                <Check size={13} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
