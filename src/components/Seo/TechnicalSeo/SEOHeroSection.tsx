"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import type { TechnicalSeoHeroContent } from "@/lib/service-content/types";
import DiscussProjectButton from "@/components/shared/DiscussProjectButton";
import GetQuoteButton from "@/components/shared/GetQuoteButton";

type SEOHeroSectionProps = {
    data?: TechnicalSeoHeroContent;
};

export default function SEOHeroSection({ data }: SEOHeroSectionProps) {
    return (
        <section className="relative overflow-hidden pt-32 pb-24">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #2563eb 1px, transparent 1px),
            linear-gradient(to bottom, #2563eb 1px, transparent 1px)
          `,
                    backgroundSize: "70px 70px",
                }}
            />

            {/* Glow */}
            <div className="absolute left-0 top-20 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[140px]" />

            <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />

            {/* SEO Outline Text */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 top-10 text-[260px] font-black leading-none text-slate-100">
                    SEO
                </div>

                <div className="absolute right-0 bottom-0 text-[220px] font-black leading-none text-slate-100">
                    SEO
                </div>
            </div>

            <div className="container relative mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left */}
                    <div>
                        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                            {data?.badge ?? "SEO SERVICES"}
                        </span>

                        <h1 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-slate-900 md:text-7xl">
                            {data ? (
                                <>
                                    {data.title}{" "}
                                    <span className="text-blue-600">
                                        {data.highlightedTitle}
                                    </span>
                                </>
                            ) : (
                                <>
                                    Let{" "}
                                    <span>
                                        <span className="text-[#4285F4]">G</span>
                                        <span className="text-[#EA4335]">o</span>
                                        <span className="text-[#FBBC05]">o</span>
                                        <span className="text-[#4285F4]">g</span>
                                        <span className="text-[#34A853]">l</span>
                                        <span className="text-[#EA4335]">e</span>
                                    </span>{" "}
                                    Find Your Business.
                                </>
                            )}
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                            {data?.description ?? (
                                <>
                                    Increase visibility, attract qualified traffic, and generate
                                    consistent leads through data-driven SEO strategies.
                                </>
                            )}
                        </p>

                        {/* Search Bar */}
                        <div className="mt-10 flex h-16 max-w-xl items-center rounded-full border border-slate-200 bg-white px-6 shadow-lg">
                            <Search className="h-5 w-5 text-slate-400" />

                            <span className="ml-4 text-slate-700">
                                {data?.searchText ?? "Best SEO Agency Near Me"}
                            </span>

                            <div className="ml-auto h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <Search className="h-4 w-4 text-white" />
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-10 flex flex-wrap gap-4">
                            <DiscussProjectButton />
                            <GetQuoteButton />
                        </div>

                        
                    </div>

                    {/* Right */}
                    <div className="relative flex justify-center">
                        {/* Glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-[350px] w-[350px] rounded-full bg-blue-500/15 blur-[120px]" />
                        </div>

                        {/* Rings */}
                        <div className="absolute h-[520px] w-[520px] rounded-full border border-blue-100" />
                        <div className="absolute h-[420px] w-[420px] rounded-full border border-blue-100" />
                        <div className="absolute h-[320px] w-[320px] rounded-full border border-blue-100" />

                        {/* SEO Image */}
                        <Image
                            src={data?.image?.src ?? "/images/seo-magnifier.png"}
                            alt={data?.image?.alt ?? "SEO Illustration"}
                            width={650}
                            height={650}
                            className="relative z-10 max-w-[320px]"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}
