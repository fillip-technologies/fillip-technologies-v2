import type { IconItem, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { getIcon } from "./icons";

export default function HireCapabilities({ content }: { content: SectionHeading & { items: IconItem[] } }) {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-20 lg:py-28">
      {/* Faint grid + glow, continuing the hero's language */}
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(2,66,162,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,66,162,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/30 via-cyan-200/30 to-blue-200/30 blur-[120px]"
      />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            <HighlightTitle title={content.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.description}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map(({ title, description, icon }, i) => {
            const Icon = getIcon(icon);
            return (
            <li
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(7,47,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(2,66,162,0.14)] sm:p-7"
            >
              {/* Hover wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* Accent line */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0242A2] ring-1 ring-blue-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#0242A2] group-hover:to-[#38BDF8] group-hover:text-white group-hover:ring-transparent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-3xl font-bold tabular-nums text-slate-100 transition-colors duration-300 group-hover:text-blue-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold leading-snug text-slate-900">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{description}</p>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
