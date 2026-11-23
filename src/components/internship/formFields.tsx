"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown, CloudUpload, FileCheck, X, type LucideIcon } from "lucide-react";

/*
 * Form building blocks for the internship forms, modelled on the National
 * Internship Portal's registration form: small upper-case labels with a red
 * asterisk and an inline hint, filled inputs with a leading icon, and a dashed
 * upload box.
 */

export function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[12.5px] font-bold uppercase tracking-[0.04em] text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
        {hint ? (
          <span className="ml-1.5 text-[11px] font-semibold normal-case tracking-normal text-primary/80">({hint})</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClass = (hasError: boolean, hasIcon: boolean, extraRight = false, textClass = "text-slate-900") =>
  `h-12 w-full rounded-xl border bg-slate-50/80 text-sm font-medium ${textClass} outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
    hasIcon ? "pl-11" : "pl-4"
  } ${extraRight ? "pr-10" : "pr-4"} ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
      : "border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-primary/10"
  }`;

function LeadingIcon({ icon: Icon }: { icon?: LucideIcon }) {
  return Icon ? (
    <Icon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
  ) : null;
}

/** Ties a control to its error message for assistive tech. */
export const describeError = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function IconInput({
  icon,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; icon?: LucideIcon; error?: string }) {
  return (
    <div className="relative">
      <LeadingIcon icon={icon} />
      <input {...props} {...describeError(props.id, error)} className={controlClass(!!error, !!icon)} />
    </div>
  );
}

export function IconSelect({
  icon,
  error,
  placeholder,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  icon?: LucideIcon;
  error?: string;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <LeadingIcon icon={icon} />
      <select
        {...props}
        {...describeError(props.id, error)}
        className={`${controlClass(!!error, !!icon, true, props.value ? "text-slate-900" : "text-slate-400")} cursor-pointer appearance-none`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-slate-900">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

/** Dashed "Choose file" box; shows the picked file with a remove button. */
export function UploadField({
  id,
  file,
  onChange,
  accept,
  error,
}: {
  id: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept: string;
  error?: string;
}) {
  if (file) {
    return (
      <div className="flex h-12 items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 pl-4 pr-1.5 text-sm">
        <span className="flex min-w-0 items-center gap-2 font-medium text-emerald-800">
          <FileCheck aria-hidden="true" className="size-[18px] shrink-0" />
          <span className="truncate">{file.name}</span>
        </span>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label={`Remove ${file.name}`}
          className="grid size-9 shrink-0 place-items-center rounded-lg text-emerald-800 transition hover:bg-emerald-100"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }
  return (
    <label
      className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-white text-sm font-semibold text-slate-600 transition focus-within:ring-4 hover:border-primary hover:text-primary ${
        error ? "border-red-300 focus-within:ring-red-500/10" : "border-slate-300 focus-within:border-primary focus-within:ring-primary/10"
      }`}
    >
      <CloudUpload aria-hidden="true" className="size-[18px]" />
      Choose file
      <input
        {...describeError(id, error)}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

/** Large selectable card used for radio choices (e.g. Online / Classroom). */
export function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  sub,
  hasError,
  id,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  sub: string;
  hasError?: boolean;
  id?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-primary/10 ${
        checked
          ? "border-primary bg-primary/[0.04]"
          : hasError
            ? "border-red-300 bg-white"
            : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        className="size-5 shrink-0 accent-primary"
      />
      <span>
        <span className={`block text-[15px] font-bold ${checked ? "text-primary" : "text-slate-900"}`}>{title}</span>
        <span className="block text-xs text-slate-500">{sub}</span>
      </span>
    </label>
  );
}
