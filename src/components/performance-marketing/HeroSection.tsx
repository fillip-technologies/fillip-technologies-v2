"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PerformanceMarketingHeroContent } from "@/lib/service-content/types";

type HeroSectionProps = {
  data?: PerformanceMarketingHeroContent;
};

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-transparent pt-28 ">
      {/* Gradient Glow */}
      <div className="absolute left-1/2 top-1/2 h-[550px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center mt-10">
          <h1 className="text-5xl font-bold leading-[1.1] text-slate-900 md:text-5xl lg:text-6xl">
            {data?.title ?? "Elevate your brand with"}
            <br />
            Elite{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
              {data?.highlightedTitle ?? "Meta Ads"}
            </span>{" "}
            {data?.suffix ?? "Expertise"}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            {data?.description ?? (
              <>
                We help brands increase visibility, generate leads, and maximize
                conversions through strategic Meta advertising campaigns.
              </>
            )}
          </p>
        </div>


        {/* Visual Area */}
        <div className="relative mx-auto h-[450px] max-w-6xl">
          {/* CTA */}
          <div className="absolute left-10 top-16 hidden lg:block z-20">
            <button className="group flex items-center gap-3 rounded-full bg-blue-50 px-5 py-3 font-medium text-blue-600">
              {data?.cta ?? "Get Started Free"}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white transition group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </div>

          {/* Trust Card */}
          <div className="absolute right-10 top-10 hidden lg:block z-20">
            <div>
              <h3 className="text-5xl font-bold text-slate-900">
                {data?.metricValue ?? "2.3M+"}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {data?.metricLabel ?? (
                  <>
                    Trusted by thousand of users
                    <br />
                    across 20+ citites
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Glow Behind Meta */}
          <div className="absolute left-1/2 top-[180px] h-[350px] w-[550px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/40 via-cyan-200/30 to-purple-200/40 blur-3xl" />

          {/* Orbit */}
          <svg
            className="absolute left-1/2 top-[40px] -translate-x-1/2"
            width="900"
            height="340"
            viewBox="0 0 900 340"
            fill="none"
          >
            <path
              d="M120 300C220 60 680 60 780 300"
              stroke="#C7D2FE"
              strokeWidth="2"
            />
          </svg>

          {/* Meta Logo */}
          <div className="absolute left-1/2 top-[20px] z-10 -translate-x-1/2">
            <Image
              src={data?.image.src ?? "/images/meta.png"}
              alt={data?.image.alt ?? "Meta"}
              width={290}
              height={290}
              priority
              className="object-contain"
            />
          </div>

          {!data ? <>
          {/* Facebook */}
          <div className="absolute left-20 top-[210px] rotate-[-18deg]  ">
            <Image
              src="/images/facebook.png"
              alt="Facebook"
              width={82}
              height={82}
            />
          </div>

          {/* WhatsApp */}
          <div className="absolute left-[240px] top-[240px] rotate-[-15deg] ]">
            <Image
              src="/images/whatsapp.png"
              alt="WhatsApp"
              width={82}
              height={52}
            />
          </div>

          {/* Instagram */}
          <div className="absolute right-[250px] top-[212px] rotate-[15deg] ]">
            <Image
              src="/images/instagram.png"
              alt="Instagram"
              width={82}
              height={82}
            />
          </div>

          {/* Messenger */}
          <div className="absolute right-20 top-[230px] rounded-3xl bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <Image
              src="/images/performance-marketing/messenger.png"
              alt="Messenger"
              width={52}
              height={52}
            />
          </div>
          </> : null}

          {/* Arrow Down */}
          <div className="absolute left-1/2 top-[390px] -translate-x-1/2 text-blue-500">
            ↓
          </div>
        </div>


      </div>
    </section>
  );
}
