"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import { createPortal } from "react-dom";

const canUseDOM = typeof document !== "undefined";

type ActionResult = { ok: boolean; message?: string };

/**
 * A button that asks for confirmation in an in-app dialog (no native
 * `confirm()`/`alert()`) before running an async server action. Calls `onDone`
 * on success so the parent can update optimistically.
 */
export default function ConfirmButton({
  label,
  icon,
  title,
  message,
  confirmLabel = "Confirm",
  action,
  onDone,
  variant = "default",
  className,
}: {
  label: ReactNode;
  icon?: ReactNode;
  title: string;
  message: string;
  confirmLabel?: string;
  action: () => Promise<ActionResult>;
  onDone?: () => void;
  variant?: "default" | "danger";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !pending) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, pending]);

  const confirm = () => {
    setError("");
    startTransition(async () => {
      const res = await action();
      if (res.ok) {
        setOpen(false);
        onDone?.();
      } else {
        setError(res.message || "Something went wrong.");
      }
    });
  };

  const trigger = className
    ? className
    : `inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium transition-colors disabled:opacity-60 ${
        variant === "danger" ? "text-rose-600 hover:bg-rose-50" : "text-heading hover:bg-muted"
      }`;

  const confirmBtn =
    variant === "danger"
      ? "bg-rose-600 text-white hover:bg-rose-700"
      : "bg-primary text-primary-foreground hover:opacity-90";

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        title={title}
        className={trigger}
      >
        {icon}
        {label}
      </button>

      {open && canUseDOM
        ? createPortal(
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
              onClick={(e) => {
                e.stopPropagation();
                if (!pending) setOpen(false);
              }}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-base font-semibold text-heading">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{message}</p>
                {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={pending}
                    className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-heading hover:bg-muted disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirm}
                    disabled={pending}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${confirmBtn}`}
                  >
                    {pending ? "Working…" : confirmLabel}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
