"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type { AIAutomationContent } from "@/lib/service-content/types";
import { reveal } from "./animations";

export default function WorkflowSection({
    data,
}: {
    data: AIAutomationContent["workflow"];
}) {
    return (
        <section className="relative py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    {...reveal}
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                        {data.badge}
                    </p>

                    <h2 className="mt-4 font-display text-5xl leading-none tracking-tight lg:text-6xl">
                        {data.title}{" "}
                        <em className="text-gradient not-italic">
                            {data.highlightedTitle}
                        </em>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
                        {data.description}
                    </p>
                </motion.div>

                <motion.div
                    {...reveal}
                    className="relative mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-7"
                >
                    {data.steps.map((item, i) => (
                        <div key={item} className="relative text-center">
                            <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-surface-elevated shadow-soft">
                                <span className="font-display text-xl text-primary">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>

                            <p className="mt-4 text-sm font-medium">{item}</p>

                            {i < data.steps.length - 1 && (
                                <ChevronRight className="absolute -right-3 top-6 hidden size-4 text-primary/40 lg:block" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}