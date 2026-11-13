/** Shared validation and input styling for the hero form and the registration wizard. */

export const PHONE_RE = /^[0-9+()\-\s]{10,16}$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const fieldClass = (hasError: boolean) =>
  `mt-2 h-12 w-full rounded-xl border bg-white px-4 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
      : "border-slate-200 focus:border-primary focus:ring-primary/10"
  }`;
