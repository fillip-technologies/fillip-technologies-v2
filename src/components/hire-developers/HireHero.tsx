import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import type { HeroContent, HireImage } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { DynamicIcon, getIcon } from "./icons";

const BADGE_COLORS = ["#0242A2", "#0F6FFF", "#38BDF8", "#081C2E"];

export default function HireHero({ hero, image }: { hero: HeroContent; image?: HireImage | null }) {
  // Top padding clears the fixed navbar so it never sits over the photo.
  return (
    <section className="bg-white px-2 pt-24 pb-12 sm:px-3 lg:pt-28 lg:pb-16">
      <div className="relative overflow-hidden rounded-[28px] bg-white">
        {/* Photo area */}
        <div
          className="relative h-[360px] bg-cover bg-[position:68%_top] sm:h-[460px] lg:h-[600px] lg:bg-[position:center_top] xl:h-[680px]"
          style={{
            // Without a photo, the brand gradient beneath is shown on its own.
            backgroundImage: `${image ? `url("${image.src}"), ` : ""}radial-gradient(circle at 75% 20%, rgba(56,189,248,0.55), transparent 45%), radial-gradient(circle at 20% 10%, rgba(15,111,255,0.6), transparent 50%), linear-gradient(135deg, #081C2E 0%, #0242A2 55%, #0F6FFF 100%)`,
          }}
          role={image ? "img" : undefined}
          aria-label={image?.alt}
        >
          {/* Floating card — left */}
          <div className="absolute left-4 top-[34%] hidden items-center gap-3 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-[0_18px_40px_rgba(7,47,55,0.18)] backdrop-blur sm:flex lg:left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white">
              <DynamicIcon name={hero.floatingCards.left.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{hero.floatingCards.left.title}</p>
              <p className="text-xs text-slate-500">{hero.floatingCards.left.subtitle}</p>
            </div>
            <span className="absolute -right-2 -bottom-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F6FFF] text-white shadow-md">
              <Plus className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Floating card — right */}
          <div className="absolute right-4 top-[58%] z-10 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_40px_rgba(7,47,55,0.18)] backdrop-blur md:flex lg:right-10">
            <div className="flex -space-x-2">
              {hero.floatingCards.right.badges.map((t, i) => (
                <span
                  key={t}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                  style={{ background: BADGE_COLORS[i % BADGE_COLORS.length] }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{hero.floatingCards.right.title}</p>
              <p className="text-xs text-slate-500">{hero.floatingCards.right.subtitle}</p>
            </div>
          </div>

          {/* White wave — high on the left for the heading, dropping away before the faces */}
          <svg
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[45%] w-full sm:h-[50%]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0 40 C 300 0 480 110 680 220 C 880 320 1180 310 1440 295 L1440 320 L0 320 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Content on the white wave */}
        <div className="relative z-10 -mt-24 px-4 sm:-mt-40 sm:px-8 lg:-mt-56 lg:px-12 xl:-mt-64">
          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
                {hero.eyebrow}
              </span>

              <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
                <HighlightTitle title={hero.title} breakBeforeAfter />
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {hero.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0242A2] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(2,66,162,0.3)] transition-all duration-300 hover:bg-[#0F6FFF] hover:shadow-[0_12px_30px_rgba(15,111,255,0.35)]"
                >
                  {hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-[#0242A2] hover:text-[#0242A2]"
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            {/* Stats */}
            <dl className="grid grid-cols-3 gap-4 lg:justify-items-end lg:pb-2">
              {hero.stats.map((s) => (
                <div key={s.value} className="flex items-center gap-2.5">
                  <dt className="sr-only">{s.label.join(" ")}</dt>
                  <dd className="text-2xl font-bold text-slate-900 sm:text-3xl">{s.value}</dd>
                  <dd aria-hidden className="text-[11px] leading-tight text-slate-500 sm:text-xs">
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Trust points */}
          <ul className="mt-10 flex flex-wrap gap-2 border-t border-slate-100 pt-6 sm:gap-3">
            {hero.trustPoints.map(({ label, icon }) => {
              const Icon = getIcon(icon);
              return (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#0F6FFF]" />
                {label}
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
