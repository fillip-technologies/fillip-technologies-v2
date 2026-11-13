"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleCheckBig, Info, KeyRound, Receipt, UsersRound } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  ACADEMIC_BATCHES,
  ENGINEERS_CLINIC,
  GENDERS,
  IMPORTANT_NOTES,
  MODES,
  REGISTRATION_FEE,
  TERMS,
  PREFILL_EVENT,
  type PrefillDetail,
  TRACKS,
} from "./constants";
import { EMAIL_RE, fieldClass, PHONE_RE } from "./formUtils";

/* ------------------------------------------------------------------ */
/* Types & helpers                                                     */
/* ------------------------------------------------------------------ */

const STEPS = ["Terms", "Details", "Payment", "Done"] as const;
type Step = 0 | 1 | 2 | 3;

type Details = {
  name: string;
  phone: string;
  altPhone: string;
  email: string;
  gender: string;
  college: string;
  course: string;
  batch: string;
  domain: string;
  mode: string;
};

type Payment = {
  transactionId: string;
  reference: string;
  date: string;
};

type Errors = Partial<Record<keyof Details | keyof Payment | "terms", string>>;

const INITIAL_DETAILS: Details = {
  name: "",
  phone: "",
  altPhone: "",
  email: "",
  gender: "",
  college: "",
  course: "",
  batch: "",
  domain: "",
  mode: "",
};

const INITIAL_PAYMENT: Payment = { transactionId: "", reference: "", date: "" };

/** Today as YYYY-MM-DD in the visitor's local time zone. */
function todayLocal() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function validateDetails(d: Details): Errors {
  const e: Errors = {};
  if (!d.name.trim()) e.name = "Enter your full name.";
  if (!PHONE_RE.test(d.phone.trim())) e.phone = "Enter a valid contact number.";
  if (d.altPhone.trim() && !PHONE_RE.test(d.altPhone.trim())) e.altPhone = "Enter a valid number or leave this empty.";
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email address.";
  if (!d.gender) e.gender = "Select your gender.";
  if (!d.college.trim()) e.college = "Enter your college or university name.";
  if (!d.course.trim()) e.course = "Enter the course you are pursuing.";
  if (!d.batch) e.batch = "Select your batch / academic year.";
  if (!d.domain) e.domain = "Choose a domain.";
  if (!d.mode) e.mode = "Choose your preferred mode.";
  return e;
}

function validatePayment(p: Payment): Errors {
  const e: Errors = {};
  if (p.transactionId.trim().length < 4) e.transactionId = "Enter the transaction ID from your payment.";
  if (!p.date) e.date = "Select the payment date.";
  else if (p.date > todayLocal()) e.date = "Payment date can't be in the future.";
  return e;
}

/** Moves keyboard focus to the first field that has an error. */
function focusFirstError(errors: Errors) {
  const first = Object.keys(errors)[0];
  if (first) document.getElementById(`intern-${first}`)?.focus();
}

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                     */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`intern-${id}`} className="block text-sm font-semibold text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : <span className="font-normal text-slate-400"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`intern-${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

function GroupTitle({ letter, children }: { letter: string; children: ReactNode }) {
  return (
    <h4 className="flex items-center gap-3 text-base font-bold text-slate-950">
      <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-sm text-primary">{letter}</span>
      {children}
    </h4>
  );
}

function Stepper({ step }: { step: Step }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Registration progress">
      {STEPS.map((label, i) => {
        const finished = step === STEPS.length - 1;
        const done = i < step || finished;
        const current = i === step && !finished;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none" aria-current={current ? "step" : undefined}>
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                done
                  ? "bg-emerald-500 text-white"
                  : current
                    ? "bg-primary text-white ring-4 ring-primary/15"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
            </span>
            <span className={`hidden text-sm font-semibold sm:inline ${done || current ? "text-slate-900" : "text-slate-400"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 ? (
              <span aria-hidden="true" className={`h-px min-w-3 flex-1 ${done ? "bg-emerald-400" : "bg-slate-200"}`} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5";
const secondaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400";

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

export default function RegistrationWizard() {
  const [step, setStep] = useState<Step>(0);
  const [accepted, setAccepted] = useState(false);
  const [details, setDetails] = useState<Details>(INITIAL_DETAILS);
  const [payment, setPayment] = useState<Payment>(INITIAL_PAYMENT);
  const [errors, setErrors] = useState<Errors>({});
  // True once the hero form has handed over the student's basic details.
  const [savedFromHero, setSavedFromHero] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The hero form and "Apply for this track" prefill fields here.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<PrefillDetail>).detail ?? {};
      const next: Partial<Details> = {};
      if (detail.name?.trim()) next.name = detail.name.trim();
      if (detail.phone?.trim()) next.phone = detail.phone.trim();
      if (detail.email?.trim()) next.email = detail.email.trim();
      if (detail.domain && TRACKS.some((t) => t.title === detail.domain)) next.domain = detail.domain;
      if (detail.mode && (MODES as readonly string[]).includes(detail.mode)) next.mode = detail.mode;
      if (!Object.keys(next).length) return;

      setDetails((d) => ({ ...d, ...next }));
      setErrors((e) => {
        const cleared = { ...e };
        for (const key of Object.keys(next) as (keyof Details)[]) delete cleared[key];
        return cleared;
      });
      if (next.name) setSavedFromHero(true);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const goTo = (next: Step) => {
    setErrors({});
    setStep(next);
    // Wait for the new step to render, then bring it into view and move focus to its heading.
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      headingRef.current?.focus({ preventScroll: true });
    });
  };

  const updateDetails = (field: keyof Details, value: string) => {
    setDetails((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const updatePayment = (field: keyof Payment, value: string) => {
    setPayment((p) => ({ ...p, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const a11y = (field: keyof Details | keyof Payment) => ({
    id: `intern-${field}`,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `intern-${field}-error` : undefined,
  });

  /* Step handlers */

  const proceedFromTerms = () => {
    if (!accepted) {
      setErrors({ terms: "Please accept the terms & conditions to continue." });
      document.getElementById("intern-terms")?.focus();
      return;
    }
    goTo(1);
  };

  const submitDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDetails(details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return focusFirstError(nextErrors);
    goTo(2);
  };

  const submitPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validatePayment(payment);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return focusFirstError(nextErrors);

    // TODO(backend): send { details, payment } to the registration API here
    // (e.g. POST /api/internship) and only move to "Done" once it succeeds.
    goTo(3);
  };

  const resetAll = () => {
    setAccepted(false);
    setSavedFromHero(false);
    setDetails(INITIAL_DETAILS);
    setPayment(INITIAL_PAYMENT);
    goTo(0);
  };

  const headingClass = "text-2xl font-bold tracking-tight text-slate-950 outline-none";
  const firstName = details.name.trim().split(/\s+/)[0];

  return (
    <div
      ref={cardRef}
      className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-9"
    >
      <Stepper step={step} />

      <div className="mt-8 border-t border-slate-100 pt-8">
        {/* ---------------- Step 1: Terms ---------------- */}
        {step === 0 ? (
          <div>
            <h3 ref={headingRef} tabIndex={-1} className={headingClass}>
              Read before you apply
            </h3>
            <p className="mt-2 text-sm text-slate-500">Accept the terms below to proceed to the registration form.</p>

            {savedFromHero ? (
              <p className="mt-4 flex gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800 ring-1 ring-emerald-200">
                <Check className="mt-1 size-4 shrink-0" strokeWidth={3} />
                <span>
                  Thanks{firstName ? `, ${firstName}` : ""}! Your details are saved. Accept the terms below to complete the rest of
                  the form.
                </span>
              </p>
            ) : null}

            {details.domain ? (
              <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-primary/[0.06] px-4 py-2 text-sm text-slate-600 ring-1 ring-primary/15">
                Selected track: <strong className="text-primary">{details.domain}</strong>
              </p>
            ) : null}

            <ol className="mt-6 space-y-3">
              {IMPORTANT_NOTES.map(({ title, description }, i) => (
                <li key={title} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <span className="mt-0.5 shrink-0 font-bold italic text-primary">({["i", "ii", "iii"][i]})</span>
                  <span>
                    <strong className="text-slate-900">{title}.</strong> {description}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-2xl border border-slate-200">
              <p className="border-b border-slate-200 px-5 py-3 text-sm font-bold text-slate-900">Terms &amp; Conditions</p>
              <ol
                tabIndex={0}
                aria-label="Terms and conditions"
                className="max-h-56 list-decimal space-y-2 overflow-y-auto py-4 pl-10 pr-5 text-sm leading-6 text-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {TERMS.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ol>
            </div>

            <label
              htmlFor="intern-terms"
              className={`mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm leading-6 transition ${
                accepted ? "border-primary/40 bg-primary/[0.04]" : errors.terms ? "border-red-300 bg-red-50/50" : "border-slate-200"
              }`}
            >
              <input
                id="intern-terms"
                type="checkbox"
                checked={accepted}
                onChange={(e) => {
                  setAccepted(e.target.checked);
                  setErrors({});
                }}
                aria-describedby={errors.terms ? "intern-terms-error" : undefined}
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <span className="text-slate-700">
                I have read and accept the <strong>terms &amp; conditions</strong> of Fillip Technologies.
                <span className="text-red-500"> *</span>
              </span>
            </label>
            {errors.terms ? (
              <p id="intern-terms-error" className="mt-2 text-sm text-red-600">
                {errors.terms}
              </p>
            ) : null}

            <div className="mt-8">
              <button type="button" onClick={proceedFromTerms} className={primaryBtn}>
                Proceed to form <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        ) : null}

        {/* ---------------- Step 2: Details ---------------- */}
        {step === 1 ? (
          <form noValidate onSubmit={submitDetails}>
            <h3 ref={headingRef} tabIndex={-1} className={headingClass}>
              Registration form
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Fields marked <span className="text-red-500">*</span> are required.
            </p>

            <div className="mt-8 space-y-10">
              <fieldset>
                <legend className="contents">
                  <GroupTitle letter="A">Personal details</GroupTitle>
                </legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Full name" required error={errors.name} className="sm:col-span-2">
                    <input
                      {...a11y("name")}
                      type="text"
                      autoComplete="name"
                      value={details.name}
                      onChange={(e) => updateDetails("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={fieldClass(!!errors.name)}
                    />
                  </Field>
                  <Field id="phone" label="Contact number" required error={errors.phone}>
                    <input
                      {...a11y("phone")}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={details.phone}
                      onChange={(e) => updateDetails("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className={fieldClass(!!errors.phone)}
                    />
                  </Field>
                  <Field id="altPhone" label="Alternate contact number" error={errors.altPhone}>
                    <input
                      {...a11y("altPhone")}
                      type="tel"
                      inputMode="tel"
                      value={details.altPhone}
                      onChange={(e) => updateDetails("altPhone", e.target.value)}
                      placeholder="Enter alternate number"
                      className={fieldClass(!!errors.altPhone)}
                    />
                  </Field>
                  <Field id="email" label="Email ID" required error={errors.email}>
                    <input
                      {...a11y("email")}
                      type="email"
                      autoComplete="email"
                      value={details.email}
                      onChange={(e) => updateDetails("email", e.target.value)}
                      placeholder="you@example.com"
                      className={fieldClass(!!errors.email)}
                    />
                  </Field>
                  <Field id="gender" label="Gender" required error={errors.gender}>
                    <select
                      {...a11y("gender")}
                      value={details.gender}
                      onChange={(e) => updateDetails("gender", e.target.value)}
                      className={fieldClass(!!errors.gender)}
                    >
                      <option value="">Select gender</option>
                      {GENDERS.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </fieldset>

              <fieldset>
                <legend className="contents">
                  <GroupTitle letter="B">College details</GroupTitle>
                </legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field id="college" label="College / University name" required error={errors.college} className="sm:col-span-2">
                    <input
                      {...a11y("college")}
                      type="text"
                      autoComplete="organization"
                      value={details.college}
                      onChange={(e) => updateDetails("college", e.target.value)}
                      placeholder="Enter your college name"
                      className={fieldClass(!!errors.college)}
                    />
                  </Field>
                  <Field id="course" label="Course currently pursuing" required error={errors.course}>
                    <input
                      {...a11y("course")}
                      type="text"
                      value={details.course}
                      onChange={(e) => updateDetails("course", e.target.value)}
                      placeholder="e.g. BCA, BBA, B.Tech"
                      className={fieldClass(!!errors.course)}
                    />
                  </Field>
                  <Field id="batch" label="Batch / Academic year" required error={errors.batch}>
                    <select
                      {...a11y("batch")}
                      value={details.batch}
                      onChange={(e) => updateDetails("batch", e.target.value)}
                      className={fieldClass(!!errors.batch)}
                    >
                      <option value="">Select your batch year</option>
                      {ACADEMIC_BATCHES.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </fieldset>

              <fieldset>
                <legend className="contents">
                  <GroupTitle letter="C">Internship details</GroupTitle>
                </legend>
                <div className="mt-5 grid gap-5">
                  <Field id="domain" label="Domain of interest" required error={errors.domain}>
                    <select
                      {...a11y("domain")}
                      value={details.domain}
                      onChange={(e) => updateDetails("domain", e.target.value)}
                      className={fieldClass(!!errors.domain)}
                    >
                      <option value="">Select your preferred domain</option>
                      {TRACKS.map((t) => (
                        <option key={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </Field>

                  <div role="radiogroup" aria-labelledby="intern-mode-label" aria-describedby={errors.mode ? "intern-mode-error" : undefined}>
                    <p id="intern-mode-label" className="text-sm font-semibold text-slate-700">
                      Preferred mode of internship <span className="text-red-500">*</span>
                    </p>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      {MODES.map((mode, i) => {
                        const checked = details.mode === mode;
                        return (
                          <label
                            key={mode}
                            className={`flex h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm font-medium transition ${
                              checked
                                ? "border-primary bg-primary/[0.05] text-primary"
                                : errors.mode
                                  ? "border-red-400 text-slate-700"
                                  : "border-slate-200 text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            <input
                              id={i === 0 ? "intern-mode" : undefined}
                              type="radio"
                              name="intern-mode"
                              value={mode}
                              checked={checked}
                              onChange={(e) => updateDetails("mode", e.target.value)}
                              className="size-4 accent-primary"
                            />
                            {mode}
                          </label>
                        );
                      })}
                    </div>
                    {errors.mode ? (
                      <p id="intern-mode-error" className="mt-2 text-sm text-red-600">
                        {errors.mode}
                      </p>
                    ) : null}
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button type="button" onClick={() => goTo(0)} className={secondaryBtn}>
                <ArrowLeft className="size-4" /> Back
              </button>
              <button type="submit" className={primaryBtn}>
                Register &amp; continue <ArrowRight className="size-4" />
              </button>
            </div>
          </form>
        ) : null}

        {/* ---------------- Step 3: Payment ---------------- */}
        {step === 2 ? (
          <form noValidate onSubmit={submitPayment}>
            <h3 ref={headingRef} tabIndex={-1} className={headingClass}>
              Registration payment
            </h3>
            <p className="mt-2 text-sm text-slate-500">Pay the registration fee and enter your transaction details.</p>

            <dl className="mt-6 grid gap-x-6 gap-y-3 rounded-2xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Name</dt>
                <dd className="font-semibold text-slate-900">{details.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="break-all font-semibold text-slate-900">{details.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Domain</dt>
                <dd className="font-semibold text-slate-900">{details.domain}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Mode</dt>
                <dd className="font-semibold text-slate-900">{details.mode}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/[0.04] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Registration amount</p>
                <p className="text-xs text-slate-500">Pay the registration fee to proceed</p>
              </div>
              <p className="text-3xl font-black text-primary">{REGISTRATION_FEE}/-</p>
            </div>

            {/* TODO: add the UPI ID / QR code / bank details students should pay to. */}
            <p className="mt-4 flex gap-2 text-xs leading-5 text-slate-500">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Use the payment details provided by the Fillip Technologies team. Need them? Call{" "}
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="font-semibold text-primary">
                  {siteConfig.phone}
                </a>
                .
              </span>
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id="transactionId" label="Transaction ID" required error={errors.transactionId} className="sm:col-span-2">
                <input
                  {...a11y("transactionId")}
                  type="text"
                  value={payment.transactionId}
                  onChange={(e) => updatePayment("transactionId", e.target.value)}
                  placeholder="Enter transaction ID"
                  className={fieldClass(!!errors.transactionId)}
                />
              </Field>
              <Field id="date" label="Payment date" required error={errors.date}>
                <input
                  {...a11y("date")}
                  type="date"
                  max={todayLocal()}
                  value={payment.date}
                  onChange={(e) => updatePayment("date", e.target.value)}
                  className={fieldClass(!!errors.date)}
                />
              </Field>
              <Field id="reference" label="Payment reference" error={errors.reference} hint="UPI reference or receipt number, if any.">
                <input
                  {...a11y("reference")}
                  type="text"
                  value={payment.reference}
                  onChange={(e) => updatePayment("reference", e.target.value)}
                  placeholder="Enter payment reference"
                  className={fieldClass(!!errors.reference)}
                />
              </Field>
            </div>

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button type="button" onClick={() => goTo(1)} className={secondaryBtn}>
                <ArrowLeft className="size-4" /> Back
              </button>
              <button type="submit" className={primaryBtn}>
                Submit registration <ArrowRight className="size-4" />
              </button>
            </div>
          </form>
        ) : null}

        {/* ---------------- Step 4: Done ---------------- */}
        {step === 3 ? (
          <div>
            <span className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <CircleCheckBig className="size-7" />
            </span>
            <h3 ref={headingRef} tabIndex={-1} className={`mt-5 ${headingClass}`}>
              Registration submitted
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Thank you{firstName ? `, ${firstName}` : ""}! Our team will verify your payment and get in touch on{" "}
              <strong className="text-slate-900">{details.email}</strong> or{" "}
              <strong className="text-slate-900">{details.phone}</strong>.
            </p>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">What happens next</p>
            <ol className="mt-4 space-y-3">
              {[
                {
                  icon: UsersRound,
                  title: "Batch allotment",
                  text: `You will be placed in ${details.mode === MODES[0] ? "an online batch" : "a classroom batch"} for ${details.domain}.`,
                },
                {
                  icon: Receipt,
                  title: "Routine & payment receipt",
                  text: "You will receive your class routine along with the payment receipt.",
                },
                {
                  icon: KeyRound,
                  title: `${ENGINEERS_CLINIC.name} login`,
                  text: `You will get your login details for the ${ENGINEERS_CLINIC.name} learning platform.`,
                },
              ].map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm leading-6">
                    <strong className="block text-slate-900">{title}</strong>
                    <span className="text-slate-600">{text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className={primaryBtn}>
                Back to home
              </Link>
              <button type="button" onClick={resetAll} className={secondaryBtn}>
                Register another student
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
