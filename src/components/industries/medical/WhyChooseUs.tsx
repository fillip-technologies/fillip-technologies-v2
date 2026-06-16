"use client";

import Image from "next/image";
import {
    Clock3,
    MapPin,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

const reasons = [
    {
        icon: Clock3,
        title: "Faster Patient Acquisition",
        description:
            "Healthcare-focused growth systems designed to reduce the gap between patient discovery and appointment booking.",
    },
    {
        icon: MapPin,
        title: "Precision Local Visibility",
        description:
            "Appear where patients actively search for treatments, specialists, and healthcare services in your area.",
    },
    {
        icon: ShieldCheck,
        title: "Trust Before Contact",
        description:
            "Professional websites, educational content, and social proof help patients trust your organization before they reach out.",
    },
    {
        icon: TrendingUp,
        title: "Measurable Growth",
        description:
            "Track enquiries, appointments, rankings, and engagement through transparent performance reporting.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-38">
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

            {/* Glow */}
            <div className="absolute left-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="container relative mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* LEFT IMAGE */}
                    <div className="relative flex justify-center">
                        <Image
                            src="/images/hourglass.png"
                            alt="Every Patient Opportunity Counts"
                            width={700}
                            height={700}
                            className="w-full max-w-[600px] object-contain"
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div>
                        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                            WHY CHOOSE US
                        </span>

                        <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                            Patients Are Searching
                            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                                {" "}
                                Right Now.
                            </span>{" "}
                            Will They Find You?
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Patients make healthcare decisions quickly. If your
                            website is invisible, outdated, or inactive online,
                            those opportunities often go to competitors instead.
                        </p>

                        {/* Reasons */}
                        <div className="mt-10 space-y-5">
                            {reasons.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={index}
                                        className="group rounded-3xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-[0_15px_50px_rgba(37,99,235,0.08)]"
                                    >
                                        <div className="flex gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                                                <Icon className="h-5 w-5 text-blue-600" />
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Quote Block */}

                    </div>

                </div>
            </div>
            <div className="mt-5  bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-10 text-center">
                <p className="mx-auto max-w-5xl text-3xl font-bold leading-snug text-slate-900">
                    Every moment a patient spends searching is an opportunity to choose your competitor.
                </p>

                <p className="mt-4 text-lg text-slate-600">
                    Make your practice the obvious choice.
                </p>
            </div>
        </section>
    );
}