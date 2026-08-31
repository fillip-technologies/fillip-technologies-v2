import { resolveIcon } from "./icons";
import type { MarketingJourneyContent } from "@/data/marketing/types";

type CustomerJourneySectionProps = {
  data?: MarketingJourneyContent;
};

/**
 * "From Search to Sale" — the end-to-end customer journey, rendered as a
 * connected sequence of steps. Unlike the other sections on this template
 * there is no fallback content: pages that don't define `content.journey`
 * render nothing, so the 60 SEO pages sharing this template are unaffected.
 */
export default function CustomerJourneySection({
  data,
}: CustomerJourneySectionProps) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-20 md:px-8 md:py-24">
      {/* Same faint grid the industries section uses, so the light sections
          read as one continuous surface. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8eef7_1px,transparent_1px),linear-gradient(to_bottom,#e8eef7_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-5 text-sm font-semibold tracking-[0.28em] text-blue-600">
            {data.badge}
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl xl:text-6xl">
            {data.title}{" "}
            <span className="text-blue-600">{data.highlightedTitle}</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
            {data.description}
          </p>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.steps.map((step, index) => {
            const Icon = resolveIcon(step.icon);
            const isLast = index === data.steps.length - 1;

            return (
              <li
                key={step.number}
                className="group relative rounded-[24px] border border-blue-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >
                {/* Oversized watermark number, same treatment as the services cards */}
                <span className="pointer-events-none absolute -top-4 right-4 text-[88px] font-bold leading-none text-blue-600/[0.06]">
                  {step.number}
                </span>

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>

                <p className="relative mt-5 text-xs font-semibold tracking-[0.22em] text-blue-600">
                  {step.number}
                </p>

                <h3 className="relative mt-2 text-xl font-semibold tracking-tight text-slate-950">
                  {step.label}
                </h3>

                <p className="relative mt-3 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>

                {/* Connector arrow between steps — hidden on the last card and
                    whenever the grid wraps to a single column. */}
                {!isLast ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3.5 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm lg:flex"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>

        {data.footnote ? (
          <p className="mx-auto mt-14 max-w-3xl text-center text-base leading-relaxed text-slate-600">
            {data.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
