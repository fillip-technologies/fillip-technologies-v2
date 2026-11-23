"use client";

import type { RefObject } from "react";
import { X } from "lucide-react";
import { IMPORTANT_NOTES, TERMS } from "./constants";

/**
 * Terms & Conditions in a native <dialog> (focus trapping and Esc-to-close come
 * from the browser). Open it with dialogRef.current.showModal().
 */
export default function TermsDialog({
  dialogRef,
  onAgree,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onAgree: () => void;
}) {
  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="intern-terms-title"
      className="m-auto w-[calc(100%-32px)] max-w-2xl rounded-[28px] p-0 text-slate-700 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
        <h2 id="intern-terms-title" className="text-xl font-bold text-slate-950">
          Terms &amp; Conditions
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close terms and conditions"
          className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-6 py-6 sm:px-8">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-amber-700">Important notes</p>
        <ol className="mt-3 space-y-2.5">
          {IMPORTANT_NOTES.map(({ title, description }, i) => (
            <li key={title} className="flex gap-3 rounded-2xl bg-amber-50/70 p-4 text-sm leading-6">
              <span className="font-bold italic text-amber-700">({["i", "ii", "iii"][i]})</span>
              <span>
                <strong className="text-slate-900">{title}.</strong> {description}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-7 text-[12.5px] font-bold uppercase tracking-[0.06em] text-slate-500">Terms</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
          {TERMS.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
        <button
          type="button"
          onClick={close}
          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
        >
          Close
        </button>
        <button
          type="button"
          onClick={() => {
            onAgree();
            close();
          }}
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          I agree
        </button>
      </div>
    </dialog>
  );
}
