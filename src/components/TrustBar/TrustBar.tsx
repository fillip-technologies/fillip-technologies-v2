"use client";

import { Star, Users, BriefcaseBusiness, Award } from "lucide-react";

// CMS-editable content (key: home.trustedby). Falls back to these defaults.
type TrustBarContent = Partial<{
    headingLead: string;
    headingHighlight: string;
    description: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    ratingValue: string;
    ratingLabel: string;
    trustedLabel: string;
}>;

export default function TrustBar({ content: raw = {} }: { content?: Record<string, unknown> }) {
    const content = raw as TrustBarContent;
    const c = {
        headingLead: content.headingLead ?? "The Future Isn't Human or AI.",
        headingHighlight: content.headingHighlight ?? "It's Human + AI.",
        description:
            content.description ??
            "For 13+ years, we've helped businesses navigate technology change. Now, we're combining deep industry expertise with artificial intelligence to unlock the next generation of growth.",
        stat1Value: content.stat1Value ?? "3K+",
        stat1Label: content.stat1Label ?? "Clients Worldwide",
        stat2Value: content.stat2Value ?? "5K+",
        stat2Label: content.stat2Label ?? "Customer Satisfaction",
        stat3Value: content.stat3Value ?? "13+",
        stat3Label: content.stat3Label ?? "Years Experience",
        ratingValue: content.ratingValue ?? "4.9/5",
        ratingLabel: content.ratingLabel ?? "Average Rating",
        trustedLabel: content.trustedLabel ?? "Trusted By Businesses Across Industries",
    };

    return (
        <section className="relative bg-white py-20 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.1] tracking-[-0.03em] text-heading">
                        {c.headingLead}
                        <br />
                        <span className="highlight-text">
                            {c.headingHighlight}
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl">
                        {c.description}
                    </p>
                </div>

               

                 {/* Stats */}
                <div className="mt-12 grid grid-cols-2 gap-4 max-w-lg mx-auto md:max-w-none md:flex md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16">

                    {/* Clients */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] md:bg-transparent md:border-none md:p-0 md:shadow-none w-full md:w-auto">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                            <Users className="h-5 w-5 text-[#0F6FFF]" />
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {c.stat1Value}
                            </div>
                            <div className="text-sm text-slate-500">
                                {c.stat1Label}
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-10 w-px bg-slate-200 md:block" />

                    {/* Satisfaction */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] md:bg-transparent md:border-none md:p-0 md:shadow-none w-full md:w-auto">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {c.stat2Value}
                            </div>
                            <div className="text-sm text-slate-500">
                                {c.stat2Label}
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-10 w-px bg-slate-200 md:block" />

                    {/* Experience */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] md:bg-transparent md:border-none md:p-0 md:shadow-none w-full md:w-auto">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                            <BriefcaseBusiness className="h-5 w-5 text-emerald-600" />
                        </div>

                        <div>
                            <div className="text-2xl font-bold text-slate-900">
                                {c.stat3Value}
                            </div>
                            <div className="text-sm text-slate-500">
                                {c.stat3Label}
                            </div>
                        </div>
                    </div>

                    <div className="hidden h-10 w-px bg-slate-200 md:block" />

                    {/* Rating */}
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] md:bg-transparent md:border-none md:p-0 md:shadow-none w-full md:w-auto">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50">
                            <Award className="h-5 w-5 text-violet-600" />
                        </div>

                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-bold text-slate-900">
                                    {c.ratingValue}
                                </span>
                                <span className="text-xs text-amber-500 hidden sm:inline-block">
                                    ★★★★★
                                </span>
                            </div>
                            <div className="text-sm text-slate-500 flex items-center gap-1">
                                <span>{c.ratingLabel}</span>
                                <span className="text-[10px] text-amber-500 sm:hidden block leading-none">
                                    ★★★★★
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                 {/* Small Label */}
                <div className="mt-14 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {c.trustedLabel}
                    </p>
                </div>
            </div>
        </section>
    );
}
