import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Users } from "lucide-react";
import type { HireImage, SectionHeading } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";

type SpecialistsContent = SectionHeading & {
  caption: { title: string; subtitle: string };
  items: { title: string; description: string }[];
};

export default function HireSpecialists({ content, image }: { content: SpecialistsContent; image?: HireImage | null }) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#081C2E] via-[#0242A2] to-[#0F6FFF] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              {image ? (
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              ) : (
                // Placeholder until a role photo is added to /public.
                <div
                  aria-hidden
                  className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
              )}
              {/* Soft brand tint at the base */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#081C2E]/55 via-[#0242A2]/10 to-transparent" />

              {/* Organic curved edge facing the content (desktop) */}
              <svg
                aria-hidden
                className="absolute inset-y-0 right-0 hidden h-full w-14 lg:block"
                viewBox="0 0 56 800"
                preserveAspectRatio="none"
              >
                <path d="M56 0 L56 800 L40 800 C 4 620 4 180 40 0 Z" fill="#f8fafc" />
              </svg>

              {/* Caption card */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-3.5 shadow-[0_18px_40px_rgba(7,47,55,0.18)] backdrop-blur sm:right-auto sm:max-w-xs lg:bottom-6 lg:left-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0242A2] to-[#38BDF8] text-white">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{content.caption.title}</p>
                  <p className="text-xs text-slate-500">{content.caption.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              <HighlightTitle title={content.title} />
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            {/* Editorial list, two columns on larger screens */}
            <ul className="mt-10 grid border-t border-slate-200 sm:grid-cols-2 sm:gap-x-8">
              {content.items.map(({ title, description }, i) => (
                <li
                  key={title}
                  className="group relative border-b border-slate-200 py-5 transition-colors duration-300"
                >
                  {/* Accent bar */}
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-0 h-[2px] w-0 bg-gradient-to-r from-[#0242A2] to-[#38BDF8] transition-all duration-500 group-hover:w-full"
                  />
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 text-xs font-semibold tabular-nums text-[#0F6FFF]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="flex items-center justify-between gap-3 text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0242A2]">
                        {title}
                        <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-[#0F6FFF] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0242A2] transition-colors hover:text-[#0F6FFF]"
            >
              Not sure which specialist you need? Talk to us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
