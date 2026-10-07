import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Users } from "lucide-react";
import type { Cta, HireImage, IconItem, SectionHeading, TeamMember } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { getIcon } from "./icons";

type WhyFillipContent = SectionHeading & {
  badge: string;
  tile: string;
  benefits: IconItem[];
  team: TeamMember[][];
  ctas: [Cta, Cta];
};

function TeamPhoto({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <figure className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_14px_36px_rgba(7,47,55,0.12)]">
      <Image
        src={image}
        alt={`${name}, ${role} at Fillip Technologies`}
        fill
        sizes="(min-width: 1024px) 14vw, 30vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-[#081C2E]/85 to-transparent px-3 pt-8 pb-3 sm:block">
        <p className="text-xs font-semibold text-white">{name}</p>
        <p className="text-[11px] leading-tight text-white/75">{role}</p>
      </figcaption>
    </figure>
  );
}

export default function HireWhyFillip({ content, image }: { content: WhyFillipContent; image?: HireImage | null }) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-100/60 blur-[120px]"
      />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Team mosaic */}
          <div className="relative">
            {image ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            ) : (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {content.team.map((column, ci) => (
                <div
                  key={ci}
                  className={`flex flex-col gap-3 sm:gap-4 ${ci === 1 ? "mt-8 sm:mt-12" : ci === 2 ? "mt-16 sm:mt-24" : ""}`}
                >
                  {column.map((m) => (
                    <TeamPhoto key={m.name} {...m} />
                  ))}
                  {ci === 2 && (
                    <div className="flex aspect-[3/4] flex-col justify-end rounded-2xl bg-gradient-to-br from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] p-4 text-white shadow-[0_14px_36px_rgba(15,111,255,0.3)]">
                      <MapPin className="h-5 w-5 opacity-90" />
                      <p className="mt-3 text-sm font-semibold leading-snug sm:text-base">
                        {content.tile}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            )}

            {/* Trust badge */}
            <div className="absolute -top-4 left-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-[0_10px_25px_rgba(7,47,55,0.1)] sm:left-6">
              <Users className="h-4 w-4 text-[#0F6FFF]" />
              {content.badge}
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
              {content.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              <HighlightTitle title={content.title} />
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.description}
            </p>

            {/* Benefits: one bordered panel with hairline dividers */}
            <ul className="mt-10 grid overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-2 [&>li]:border-slate-200 [&>li:not(:last-child)]:border-b sm:[&>li:nth-last-child(2)]:border-b-0 sm:[&>li:nth-child(odd)]:border-r">
              {content.benefits.map(({ title, description, icon }, i) => {
                const Icon = getIcon(icon);
                return (
                  <li key={title} className="group relative p-5 transition-colors duration-300 hover:bg-blue-50/50 sm:p-6">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-gradient-to-b from-[#0242A2] to-[#38BDF8] transition-transform duration-300 group-hover:scale-y-100"
                    />
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0242A2] ring-1 ring-blue-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#0242A2] group-hover:to-[#38BDF8] group-hover:text-white group-hover:ring-transparent">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-slate-300 transition-colors group-hover:text-[#0F6FFF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={content.ctas[0].href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0242A2] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(2,66,162,0.3)] transition-all duration-300 hover:bg-[#0F6FFF]"
              >
                {content.ctas[0].label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.ctas[1].href}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-[#0242A2] hover:text-[#0242A2]"
              >
                {content.ctas[1].label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
