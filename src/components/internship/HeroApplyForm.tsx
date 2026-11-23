"use client";

import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, Layers, Mail, Phone, User } from "lucide-react";
import {
  MODE_OPTIONS,
  PREFILL_EVENT,
  REGISTRATION_FEE,
  REGISTRATION_FOCUS_ID,
  REGISTRATION_FORM_ID,
  TRACKS,
  type PrefillDetail,
} from "./constants";
import { FieldShell, IconInput, IconSelect, RadioCard } from "./formFields";
import { EMAIL_RE, PHONE_RE } from "./formUtils";

type Fields = Required<Pick<PrefillDetail, "name" | "phone" | "email" | "domain" | "mode">>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const INITIAL: Fields = { name: "", phone: "", email: "", domain: "", mode: "" };
const ORDER: (keyof Fields)[] = ["name", "phone", "email", "domain", "mode"];

function validate(f: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (!f.name.trim()) e.name = "Enter your full name.";
  if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid mobile number.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.domain) e.domain = "Choose a track.";
  if (!f.mode) e.mode = "Choose a mode.";
  return e;
}

/** Scrolls to the registration form (step 2) and focuses its heading. */
function goToRegistration() {
  // Give the registration form a moment to render the prefilled step first.
  window.setTimeout(() => {
    const target = document.getElementById(REGISTRATION_FORM_ID) ?? document.getElementById("apply");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
  window.setTimeout(() => document.getElementById(REGISTRATION_FOCUS_ID)?.focus({ preventScroll: true }), 700);
}

/**
 * Short application form in the hero. It does not submit anywhere itself: it
 * hands the details to the full registration form below.
 */
export default function HeroApplyForm() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saved, setSaved] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const firstInvalid = ORDER.find((k) => nextErrors[k]);
    if (firstInvalid) {
      document.getElementById(`hero-${firstInvalid}`)?.focus();
      return;
    }
    const detail: PrefillDetail = { ...fields };
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    setSaved(true);
    goToRegistration();
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_30px_70px_-20px_rgba(2,30,80,0.25)] ring-1 ring-slate-200/70 sm:p-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-[#0b6ad6] to-sky-400" />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="intern-display text-[1.5rem] leading-tight text-[#0b1733]">Start your application</h2>
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
            Continue below: add your college details, upload your ID card and agree to the terms.
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
          <FieldShell id="hero-name" label="Full name" required error={errors.name}>
            <IconInput
              id="hero-name"
              icon={User}
              autoComplete="name"
              value={fields.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter your full name"
              error={errors.name}
            />
          </FieldShell>

          <div className="grid gap-4 sm:grid-cols-2">
            <FieldShell id="hero-phone" label="Mobile number" required error={errors.phone}>
              <IconInput
                id="hero-phone"
                icon={Phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Mobile number"
                error={errors.phone}
              />
            </FieldShell>
            <FieldShell id="hero-email" label="Email" required error={errors.email}>
              <IconInput
                id="hero-email"
                icon={Mail}
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                error={errors.email}
              />
            </FieldShell>
          </div>

          <FieldShell id="hero-domain" label="Track" required error={errors.domain}>
            <IconSelect
              id="hero-domain"
              icon={Layers}
              value={fields.domain}
              onChange={(e) => update("domain", e.target.value)}
              placeholder="Select your preferred track"
              options={TRACKS.map((t) => t.title)}
              error={errors.domain}
            />
          </FieldShell>

          <fieldset aria-describedby={errors.mode ? "hero-mode-error" : undefined}>
            <legend className="mb-2 block text-[12.5px] font-bold uppercase tracking-[0.04em] text-slate-700">
              Preferred mode <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {MODE_OPTIONS.map((m, i) => (
                <RadioCard
                  key={m.value}
                  id={i === 0 ? "hero-mode" : undefined}
                  name="hero-mode"
                  value={m.value}
                  checked={fields.mode === m.value}
                  onChange={(v) => update("mode", v)}
                  title={m.title}
                  sub={m.sub}
                  hasError={!!errors.mode}
                />
              ))}
            </div>
            {errors.mode ? (
              <p id="hero-mode-error" className="mt-1.5 text-xs font-medium text-red-600">
                {errors.mode}
              </p>
            ) : null}
          </fieldset>

          <button
            type="submit"
            className="intern-glare mt-2 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_14px_30px_rgba(2,66,162,0.28)] transition hover:-translate-y-0.5"
          >
            Continue application <ArrowRight className="size-4" />
          </button>
          <p className="text-center text-xs leading-5 text-slate-500">
            Next: college details, ID card upload and the {REGISTRATION_FEE} registration fee.
          </p>
        </form>
      )}
    </div>
  );
}
