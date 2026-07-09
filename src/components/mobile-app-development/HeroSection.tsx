"use client";

import Image from "next/image";
import type { MobileAppHeroContent } from "@/data/mobile-app-development";

type MobileAppHeroProps = {
  data: MobileAppHeroContent;
};

export default function MobileAppHero({ data }: MobileAppHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 lg:pt-28 pb-8">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(2,66,162,0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(2,66,162,0.12) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 20% 30%,
              rgba(2,66,162,.08),
              transparent 35%
            ),
            radial-gradient(
              circle at 80% 30%,
              rgba(56,189,248,.10),
              transparent 35%
            )
          `,
          backgroundSize: `
            80px 80px,
            80px 80px,
            auto,
            auto
          `,
        }}
      />

      {/* Main Glow */}
      <div className="absolute left-1/2 top-[42%] h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] lg:h-[700px] lg:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-200/25 via-cyan-200/20 to-blue-200/25 blur-[120px]" />

      {/* Corner Stars */}
      <div className="absolute left-8 top-10 hidden lg:block">
        <div className="h-3 w-3 rotate-45 bg-white shadow-[0_0_60px_rgba(255,255,255,1)]" />
      </div>

      <div className="absolute right-8 top-10 hidden lg:block">
        <div className="h-3 w-3 rotate-45 bg-white shadow-[0_0_60px_rgba(255,255,255,1)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Content */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl mt-6">
            {data.title}
            <br />
            <span className="bg-gradient-to-r from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] bg-clip-text text-transparent">
              {data.highlightedTitle}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            {data.description}
          </p>
        </div>

        {/* Visual Area */}
        <div
          className="
            hidden
            lg:block
            relative
            mx-auto
            mt-4
            lg:h-[350px]
            xl:h-[420px]
            2xl:h-[460px]
            max-w-7xl
          "
        >
          {/* Arc */}
          <svg
            className="absolute left-1/2 top-[60px] hidden -translate-x-1/2 lg:block"
            width="850"
            height="260"
            viewBox="0 0 850 260"
            fill="none"
          >
            <path
              d="M120 220C220 60 630 60 730 220"
              stroke="#BFDBFE"
              strokeWidth="2"
            />
          </svg>

          {/* Left Card */}
          <div className="absolute left-0 top-[150px] hidden xl:block rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="text-left">
              <h4 className="text-sm font-semibold text-slate-900">
                {data.leftCard.title}
              </h4>

              <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-slate-500">
                {data.leftCard.description}
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="absolute right-0 top-[140px] hidden xl:block rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-slate-900">
                {data.rightCard.value}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {data.rightCard.label}
              </p>
            </div>
          </div>

          {/* Phones */}
          <div className="absolute left-1/2 -top-12 -translate-x-1/2">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={1600}
              height={1200}
              priority
              className="
                w-[320px]
                sm:w-[450px]
                md:w-[550px]
                lg:w-[650px]
                xl:w-[750px]
                2xl:w-[850px]
                h-auto
                object-contain
                drop-shadow-[0_50px_100px_rgba(2,66,162,.18)]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
