"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { AIAutomationContent } from "@/lib/service-content/types";

export default function ResultsSection({
    data,
}: {
    data: AIAutomationContent["results"];
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                "[data-ai-metric]",
                {
                    y: 28,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 78%",
                        once: true,
                    },
                }
            );
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={ref}
            className="bg-surface-dark py-20 text-white"
        >
            <div className="mx-auto max-w-7xl px-6">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-primary-glow">
                    {data.badge}
                </p>

                <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                    {data.metrics.map((metric) => (
                        <div
                            key={metric.label}
                            data-ai-metric
                            className="bg-surface-dark p-8 text-center"
                        >
                            <p className="font-display text-5xl text-white">
                                {metric.value}
                            </p>

                            <p className="mt-3 text-sm text-white/50">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}