"use client";

import {
    ArrowRight,
    X,
} from "lucide-react";
import { useState } from "react";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";
import type { MobileAppSolutionsContent } from "@/data/mobile-app-development";
import { mobileAppIcons } from "./icons";

type MobileAppSolutionsProps = {
    data: MobileAppSolutionsContent;
};

export default function MobileAppSolutions({ data }: MobileAppSolutionsProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <section className="relative overflow-hidden py-20 lg:py-22 pb-8">
            {/* Glow */}
            <div
                className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-primary)" }}
            />

            <div
                className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full blur-[140px]"
                style={{ background: "var(--glow-accent)" }}
            />

            <div className="container relative mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
                        {data.badge}
                    </span>

                    <h2 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-[var(--heading)] md:text-6xl">
                        {data.title}
                        <span className="highlight-text block">
                            {data.highlightedTitle}
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-[var(--body)]">
                        {data.description}
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {data.items.map((item, index) => {
                        const Icon = mobileAppIcons[item.icon];

                        return (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--primary)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
                            >
                                {/* Glow */}
                                <div
                                    className="absolute right-0 top-0 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                                    style={{ background: "var(--glow-primary)" }}
                                />

                                {/* Icon */}
                                <div
                                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl ${item.iconBg}`}
                                >
                                    <Icon className={`h-8 w-8 ${item.iconColor}`} />
                                </div>

                                {/* Number */}
                                <div className="absolute right-6 top-6 text-5xl font-bold text-slate-100">
                                    {String(
                                        index + 1
                                    ).padStart(2, "0")}
                                </div>

                                <h3 className="relative z-10 mt-8 text-2xl font-semibold leading-tight text-[var(--heading)]">
                                    {item.title}
                                </h3>

                                <p className="relative z-10 mt-4 leading-relaxed text-[var(--body)]">
                                    {item.description}
                                </p>

                                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                                    <span className="text-sm text-slate-500">
                                        {item.footerLabel}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(true)}
                                        className="flex items-center gap-2 font-medium text-[var(--primary)] transition hover:text-[var(--heading)]"
                                    >
                                        Discuss Your Project
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isFormOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Discuss your project"
                    onClick={() => setIsFormOpen(false)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2.5rem] bg-white"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            aria-label="Close form"
                            onClick={() => setIsFormOpen(false)}
                            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-slate-950"
                        >
                            <X className="size-5" />
                        </button>
                        <ConsultationFormSection showOnlyForm className="py-0" />
                    </div>
                </div>
            ) : null}
        </section>
    );
}
