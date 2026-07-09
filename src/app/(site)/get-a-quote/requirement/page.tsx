import type { Metadata } from "next";
import { Suspense } from "react";
import RequirementForm from "@/components/quote/RequirementForm";

export const metadata: Metadata = {
  title: "Share Your Requirement | Fillip Technologies",
  description:
    "Tell us your exact requirements — industry, budget, timeline and scope — and we'll craft a tailored quote for your project.",
};

export default function RequirementPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
      <header className="mb-8 max-w-2xl">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--primary)]">
          Custom Requirement
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--heading)] md:text-5xl">
          Tell Us What You <span className="highlight-text">Need Built</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--body)]">
          Not sure which package fits? Share your requirement and we&apos;ll craft a tailored quote
          around your goals, budget, and timeline.
        </p>
      </header>

      <Suspense fallback={null}>
        <RequirementForm />
      </Suspense>
    </section>
  );
}
