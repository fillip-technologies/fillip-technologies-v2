"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import ConsultationForm from "./ConsultationForm";

const emptySubscribe = () => () => {};

export default function ConsultationFormSection({
    showOnlyForm = false,
    className = "py-24",
    titleLine1 = "Let's Discuss Your",
    titleLine2 = "Next Project",
    description = "Tell us about your requirements and our team will get back to you within 24 hours.",
    isOpen = false,
    onClose,
}: {
    showOnlyForm?: boolean;
    className?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    // Modal mode is opt-in and keyed off onClose: pass it (with isOpen) to get
    // the section inside a dismissible overlay. Call sites that omit it render
    // exactly as before, as a normal in-page section.
    isOpen?: boolean;
    onClose?: () => void;
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

    // The decorative background video is ~1.7MB. It sits below the fold on
    // nearly every page, so defer loading it until the section approaches the
    // viewport instead of downloading it on every initial page load.
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const [videoInView, setVideoInView] = useState(false);

    useEffect(() => {
        const el = videoWrapRef.current;
        if (!el || videoInView) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setVideoInView(true);
                    io.disconnect();
                }
            },
            { rootMargin: "200px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [videoInView]);

    const isModal = typeof onClose === "function";

    // Escape to dismiss, and lock background scroll while the overlay is up.
    // Both are no-ops unless this instance is actually being used as a modal.
    useEffect(() => {
        if (!isModal || !isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose?.();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModal, isOpen, onClose]);

    if (isModal) {
        if (!isOpen) return null;
        // Renders the same section through a plain (non-modal) instance of this
        // component, so the overlay never duplicates the markup below.
        return (
            <div
                role="dialog"
                aria-modal="true"
                onClick={onClose}
                className="fixed inset-0 z-[100] flex overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:p-6"
            >
                <div
                    onClick={(event) => event.stopPropagation()}
                    className="relative m-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close consultation form"
                        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md transition hover:bg-white hover:text-slate-900"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <ConsultationFormSection
                        showOnlyForm={showOnlyForm}
                        className={className === "py-24" ? "py-12" : className}
                        titleLine1={titleLine1}
                        titleLine2={titleLine2}
                        description={description}
                    />
                </div>
            </div>
        );
    }

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
                        <div ref={videoWrapRef} className="relative min-h-[500px]" suppressHydrationWarning>
                            {mounted && videoInView && (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
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
