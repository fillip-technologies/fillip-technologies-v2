"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function PerformancePhilosophySection() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-22">
            {/* Background Glow */}
            <div
                className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-primary)" }}
            />

            <div
                className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-accent)" }}
            />

            <div className="container relative mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left Content */}
                    <div>
                        <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
                            OUR PERFORMANCE PHILOSOPHY
                        </span>

                        <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-5xl">
                            <span className="whitespace-nowrap">
                                Outperform Competitors.
                            </span>

                            <span className="block whitespace-nowrap text-[var(--primary)]">
                                Don't Outspend Them.
                            </span>
                        </h2>

                        <div className="mt-8 border-l-4 border-[var(--primary)] pl-6">
                            <p className="text-xl font-medium leading-relaxed text-[var(--heading)]">
                                Most businesses increase advertising budgets when
                                results decline.
                            </p>

                            <p className="mt-3 text-lg text-[var(--body)]">
                                We improve strategy when results matter.
                            </p>
                        </div>

                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--body)]">
                            Successful Meta campaigns are built on audience insights,
                            creative testing, conversion tracking, and continuous
                            optimization — not simply bigger budgets.
                        </p>

                        {/* Pillars */}
                        {/* <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Audience Intelligence",
                "Creative Testing",
                "Conversion Tracking",
                "Continuous Optimization",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-4 transition-all duration-300 hover:border-[var(--primary)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--primary)]" />
                  <span className="font-medium text-[var(--heading)]">
                    {item}
                  </span>
                </div>
              ))}
            </div> */}

                        {/* Mini Metrics */}

                    </div>

                    {/* Right Visual */}
                    <div className="relative flex justify-center">
                        {/* Floating Metric */}
                        <div className="absolute left-0 top-10 z-20 rounded-3xl border border-[var(--border)] bg-white px-5 py-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                            <div className="text-xs text-[var(--body)]">
                                Qualified Leads
                            </div>
                            <div className="mt-1 text-3xl font-bold text-[var(--heading)]">
                                +68%
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <div
                                className="absolute inset-0 rounded-full blur-[100px]"
                                style={{ background: "var(--glow-primary)" }}
                            />

                            <Image
                                src="/images/chess-startegy.png"
                                alt="Performance Marketing Strategy"
                                width={900}
                                height={900}
                                className="relative z-10  max-w-[510px]"
                            />
                            <div className="mx-auto mt-2 w-fit rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--heading)] shadow-sm">
                                ♟ Smart strategy beats bigger budgets
                            </div>
                        </div>

                        {/* Floating Metric */}
                        <div className="absolute bottom-10 right-0 z-20 rounded-3xl border border-[var(--border)] bg-white px-5 py-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                            <div className="text-xs text-[var(--body)]">
                                Average ROAS
                            </div>
                            <div className="mt-1 text-3xl font-bold text-[var(--heading)]">
                                3.8x
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}