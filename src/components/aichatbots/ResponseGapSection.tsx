"use client";
import { motion } from "framer-motion";
import type { AIAutomationContent } from "@/lib/service-content/types";
import { reveal } from "./animations";
export default function ResponseGapSection({ data }: { data: AIAutomationContent["problem"] }) {
    return <section className="border-y border-border bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
            <motion.div {...reveal} className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{data.badge}</p>
                    <h2 className="mt-4 font-display text-5xl leading-[1] tracking-tight lg:text-6xl">{data.title}</h2>
                </div>
                <p className="max-w-md text-lg leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9">{data.description}</p>
            </motion.div><motion.div {...reveal} className="mt-16 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">{data.items.map((item, i) => <div key={item.title} className="border-b border-r border-border bg-background p-6 lg:p-8">
                <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-12 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p></div>)}
            </motion.div></div>
    </section>
}
