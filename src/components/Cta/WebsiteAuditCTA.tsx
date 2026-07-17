"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import ConsultationFormSection from "@/components/form/ConsultationFormSection";

export default function WebsiteAuditCTA() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <section className="py-10 lg:py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[28px] border border-[var(--border)] bg-white px-8 py-8 lg:flex-row">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
                Website Audit
              </span>

              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--heading)] md:text-2xl">
                Your Website Might Be Losing Customers.
                <span className="highlight-text">{" Let's Find Out."}</span>
              </h2>

              <p className="mt-2 text-sm text-[var(--body)]">
                Get expert insights on performance, SEO, user experience, and conversion opportunities.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--heading)] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Website Audit

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Website audit consultation form"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close website audit form"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto">
            <button
              type="button"
              aria-label="Close website audit form"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:text-slate-950"
            >
              <X className="size-5" />
            </button>
            <ConsultationFormSection showOnlyForm className="p-0" />
          </div>
        </div>
      ) : null}
    </>
  );
}
