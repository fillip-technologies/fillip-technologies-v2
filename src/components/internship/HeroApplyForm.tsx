"use client";

import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { MODES, PREFILL_EVENT, REGISTRATION_FEE, TRACKS, type PrefillDetail } from "./constants";
import { EMAIL_RE, fieldClass, PHONE_RE } from "./formUtils";

type Fields = Required<Pick<PrefillDetail, "name" | "phone" | "email" | "domain" | "mode">>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const INITIAL: Fields = { name: "", phone: "", email: "", domain: "", mode: "" };

function validate(f: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (!f.name.trim()) e.name = "Enter your full name.";
  if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid mobile number.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.domain) e.domain = "Choose a track.";
  if (!f.mode) e.mode = "Choose a mode.";
  return e;
}

/** Scrolls to the full registration form and focuses its first control. */
function goToRegistration() {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  // Let the smooth scroll start before moving focus, so focus doesn't jump the page.
  window.setTimeout(() => document.getElementById("intern-terms")?.focus({ preventScroll: true }), 600);
}

/**
 * Short application form in the hero. It does not submit anywhere itself: it
 * hands the details to the full registration form below (terms, college
 * details and payment are completed there).
 */
export default function HeroApplyForm() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saved, setSaved] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const a11y = (key: keyof Fields) => ({
    id: `hero-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `hero-${key}-error` : undefined,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`hero-${firstInvalid}`)?.focus();
      return;
    }
    const detail: PrefillDetail = { ...fields };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    setSaved(true);
    goToRegistration();
  };

  const error = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`hero-${key}-error`} className="mt-1.5 text-xs text-red-600">
        {errors[key]}
      </p>
    ) : null;

  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-[#0b6ad6] to-sky-400" />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Start your application</h2>
          <p className="mt-1 text-sm text-slate-500">Share a few details to begin.</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#f97316] to-[#f43f5e] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
          {REGISTRATION_FEE} registration
        </span>
      </div>

      {saved ? (
        <div className="mt-7 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200" role="status">
          <p className="flex items-center gap-2 font-semibold text-emerald-800">
            <Check className="size-4" strokeWidth={3} /> Details saved
          </p>
          <p className="mt-1.5 text-sm leading-6 text-emerald-900/80">
            Continue below: accept the terms, add your college details and pay the registration fee.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goToRegistration}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Continue registration <ArrowDown className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setSaved(false)}
              className="inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-emerald-800 hover:underline"
            >
              Edit details
            </button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-7 grid gap-4">
          <div>
            <label htmlFor="hero-name" className={labelClass}>
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              {...a11y("name")}
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter your full name"
              className={fieldClass(!!errors.name)}
            />
            {error("name")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hero-phone" className={labelClass}>
                Mobile number <span className="text-red-500">*</span>
              </label>
              <input
                {...a11y("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className={fieldClass(!!errors.phone)}
              />
              {error("phone")}
            </div>
            <div>
              <label htmlFor="hero-email" className={labelClass}>
                Email ID <span className="text-red-500">*</span>
              </label>
              <input
                {...a11y("email")}
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={fieldClass(!!errors.email)}
              />
              {error("email")}
            </div>
          </div>

          <div>
            <label htmlFor="hero-domain" className={labelClass}>
              Track <span className="text-red-500">*</span>
            </label>
            <select
              {...a11y("domain")}
              value={fields.domain}
              onChange={(e) => update("domain", e.target.value)}
              className={fieldClass(!!errors.domain)}
            >
              <option value="">Select your preferred track</option>
              {TRACKS.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title}
                </option>
              ))}
            </select>
            {error("domain")}
          </div>

          <fieldset aria-describedby={errors.mode ? "hero-mode-error" : undefined}>
            <legend className={labelClass}>
              Preferred mode <span className="text-red-500">*</span>
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {MODES.map((mode, i) => {
                const checked = fields.mode === mode;
                return (
                  <label
                    key={mode}
                    className={`flex h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 text-sm font-medium transition ${
                      checked
                        ? "border-primary bg-primary/[0.05] text-primary"
                        : errors.mode
                          ? "border-red-400 text-slate-700"
                          : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <input
                      id={i === 0 ? "hero-mode" : undefined}
                      type="radio"
                      name="hero-mode"
                      value={mode}
                      checked={checked}
                      onChange={(e) => update("mode", e.target.value)}
                      className="size-4 accent-primary"
                    />
                    {mode === MODES[1] ? "Classroom" : mode}
                  </label>
                );
              })}
            </div>
            {error("mode")}
          </fieldset>

          <button
            type="submit"
            className="mt-2 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(2,66,162,0.28)] transition hover:-translate-y-0.5"
          >
            Continue application <ArrowRight className="size-4" />
          </button>
          <p className="text-center text-xs leading-5 text-slate-500">
            Next: accept the terms, add college details and pay the registration fee.
          </p>
        </form>
      )}
    </div>
  );
}
