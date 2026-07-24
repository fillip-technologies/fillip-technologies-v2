"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, X } from "lucide-react";
import ConsultationForm from "@/components/form/ConsultationForm";

type HardwareQuoteModalButtonProps = {
  label?: string;
  className?: string;
  iconClassName?: string;
  source?: string;
};

export default function HardwareQuoteModalButton({
  label = "Get Quote",
  className = "",
  iconClassName = "size-4",
  source = "Hardware Solutions Quote Modal",
}: HardwareQuoteModalButtonProps) {
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
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <span>{label}</span>
        <FileText className={iconClassName} />
      </button>

      {open
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hardware-quote-modal-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close quote form"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.28)] md:p-8">
            <button
              type="button"
              aria-label="Close quote form"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-12">
              <h2
                id="hardware-quote-modal-title"
                className="text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-900 md:text-5xl"
              >
                Get Quote
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                Tell us about your hardware requirement and our team will get back to you within 24 hours.
              </p>
            </div>

            <ConsultationForm className="mt-8" source={source} />
          </div>
        </div>,
        document.body
      )
        : null}
    </>
  );
}
