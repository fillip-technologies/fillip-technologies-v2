"use client";

import { useSyncExternalStore } from "react";
import ConsultationForm from "./ConsultationForm";

const emptySubscribe = () => () => {};

export default function ConsultationFormSection({
    showOnlyForm = false,
    className = "py-24",
    titleLine1 = "Let's Discuss Your",
    titleLine2 = "Next Project",
    description = "Tell us about your requirements and our team will get back to you within 24 hours.",
}: {
    showOnlyForm?: boolean;
    className?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
}) {
    // Render the decorative background video only after hydration. Browser
    // extensions (e.g. video speed controllers) inject controls into <video>
    // elements before React hydrates, which otherwise triggers a hydration
    // mismatch on this subtree. useSyncExternalStore returns false during SSR
    // and the hydration pass, then true on the client — no effect setState.
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );

    if (showOnlyForm) {
        return (
            <div className="border border-slate-200/80 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-md relative overflow-hidden h-full">
                {/* Soft gradient backgrounds in form card */}
                <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="border-b border-slate-100 pb-4 mb-6">
                        <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
                            Send a Message
                        </h3>
                        <p className="text-xs text-slate-400 font-light mt-1">
                            Fill in the details below and we will get back to you with a detailed scope report.
                        </p>
                    </div>

                    <ConsultationForm />
                </div>
            </div>
        );
    }

    return (
        <section className={`relative overflow-hidden ${className}`}>
            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 blur-3xl" />

            <div className="container relative mx-auto max-w-7xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    {/* <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                        Free Consultation
                    </span> */}

                    <h2 className="mt-6 text-5xl font-bold leading-[1.05] text-slate-900 md:text-6xl">
                        {titleLine1}
                        <br />
                        <span className="highlight-text">
                            {titleLine2}
                        </span>
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        {description}
                    </p>
                </div>

                {/* Content */}
                <div className="mt-16 overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

                        {/* Form Column */}
                        <div className="p-8 md:p-10">
                            <ConsultationForm />
                        </div>

                        {/* Video Column */}
                        <div className="relative min-h-[500px]" suppressHydrationWarning>
                            {mounted && (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    suppressHydrationWarning
                                    className="absolute inset-0 h-full w-full object-cover"
                                >
                                    <source
                                        src="/images/consultation.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="text-sm uppercase tracking-[0.2em] text-white/70">
                                    Fillip Technologies
                                </div>

                                <h3 className="mt-3 text-3xl font-semibold">
                                    Building Intelligent Solutions
                                </h3>

                                <p className="mt-3 text-white/80">
                                    AI, Cloud, Software Engineering and Digital Growth
                                    Solutions designed for modern organizations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
