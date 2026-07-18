"use client";

import Image from "next/image";
import DiscussProjectButton from "@/components/shared/DiscussProjectButton";
import GetQuoteButton from "@/components/shared/GetQuoteButton";

type IndustryHeroProps = {
  data: {
    titleLines: string[];
    highlightedTitle: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustItems: string[];
    image: { src: string; alt: string };
  };
};

export default function IndustryHero({ data }: IndustryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-[clamp(5.75rem,7vw,7rem)] pb-[clamp(2rem,4vw,3.5rem)]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Soft Glow */}
      <div className="absolute left-1/2 top-20 h-[700px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="grid min-h-[clamp(580px,68vh,720px)] items-center gap-8 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="max-w-[650px]">
            {/* Badge */}
            {/* <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                Healthcare Digital Growth System
              </span>
            </div> */}

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[0.92] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              {data.titleLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                {data.highlightedTitle}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              {data.description}
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <DiscussProjectButton href={data.primaryCta.href} />
              <GetQuoteButton />
            </div>

            {/* Trust Row */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-slate-700">
              {data.trustItems.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[clamp(340px,52vw,720px)] w-full max-w-[1000px]">

              {/* Background Glow Behind Doctor */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100/40 via-cyan-100/30 to-transparent blur-3xl" />

              {/* Doctor Image */}
              {data.image.src ? (
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="relative z-10 object-contain object-center scale-[1.08] lg:scale-[1.2]"
                />
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
