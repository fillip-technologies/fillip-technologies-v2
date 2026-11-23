"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CircleCheck,
  CircleCheckBig,
  GraduationCap,
  Hash,
  Info,
  KeyRound,
  Mail,
  MapPin,
  Percent,
  Phone,
  Receipt,
  TriangleAlert,
  User,
  UsersRound,
} from "lucide-react";
import {
  ACADEMIC_BATCHES,
  ENGINEERS_CLINIC,
  GENDERS,
  ID_CARD_MAX_MB,
  IMPORTANT_NOTES,
  INDIAN_STATES,
  INTERNSHIP_PHONE,
  LAST_PASSED_COURSES,
  MODE_OPTIONS,
  MODES,
  PREFILL_EVENT,
  REGISTRATION_FEE,
  REGISTRATION_FOCUS_ID,
  REGISTRATION_FORM_ID,
  TRACKS,
  type PrefillDetail,
  type Track,
} from "./constants";
import { FieldShell, IconInput, IconSelect, RadioCard, UploadField } from "./formFields";
import { Reveal } from "./motion";
import { EMAIL_RE, PHONE_RE } from "./formUtils";
import TermsDialog from "./TermsDialog";
import { TRACK_ICONS } from "./trackIcons";

/* ------------------------------------------------------------------ */
/* Types, initial state & validation                                   */
/* ------------------------------------------------------------------ */

type Stage = "form" | "payment" | "done";

type Details = {
  mode: string;
  college: string;
  course: string;
  batch: string;
  enrolment: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  altPhone: string;
  email: string;
  gender: string;
  state: string;
  city: string;
  lastCourse: string;
  percentage: string;
};

type Payment = { transactionId: string; reference: string; date: string };

type ErrorKey = keyof Details | keyof Payment | "track" | "idCard" | "agreed";
type Errors = Partial<Record<ErrorKey, string>>;

const INITIAL_DETAILS: Details = {
  mode: "",
  college: "",
  course: "",
  batch: "",
  enrolment: "",
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  altPhone: "",
  email: "",
  gender: "",
  state: "",
  city: "",
  lastCourse: "",
  percentage: "",
};

const INITIAL_PAYMENT: Payment = { transactionId: "", reference: "", date: "" };

/** Percentage (0–100, up to 2 decimals) or a letter grade such as A+ or O. */
const PERCENT_RE = /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?|O|[A-F][+-]?)$/i;
const ID_CARD_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ID_CARD_ACCEPT = ".jpg,.jpeg,.png,.pdf";

/** Form order, so focus goes to the first invalid field on screen. */
const DETAIL_ORDER: ErrorKey[] = [
  "track",
  "mode",
  "college",
  "course",
  "batch",
  "enrolment",
  "firstName",
  "phone",
  "altPhone",
  "idCard",
  "email",
  "gender",
  "state",
  "city",
  "lastCourse",
  "percentage",
  "agreed",
];

function idCardError(file: File | null): string | undefined {
  if (!file) return "Upload your college ID card.";
  if (!ID_CARD_TYPES.includes(file.type)) return "Use a JPG, PNG or PDF file.";
  if (file.size > ID_CARD_MAX_MB * 1024 * 1024) return `File must be smaller than ${ID_CARD_MAX_MB} MB.`;
  return undefined;
}

function validateDetails(d: Details, idCard: File | null, agreed: boolean, trackId: string | null): Errors {
  const e: Errors = {};
  if (!trackId) e.track = "Choose your internship track.";
  if (!d.mode) e.mode = "Choose online or classroom.";
  if (!d.college.trim()) e.college = "Enter your college or university name.";
  if (!d.course.trim()) e.course = "Enter the course you are pursuing.";
  if (!d.batch) e.batch = "Select your batch / academic year.";
  if (!d.enrolment.trim()) e.enrolment = "Enter your enrolment number.";
  if (!d.firstName.trim()) e.firstName = "Enter your first name.";
  if (!PHONE_RE.test(d.phone.trim())) e.phone = "Enter a valid contact number.";
  if (d.altPhone.trim() && !PHONE_RE.test(d.altPhone.trim())) e.altPhone = "Enter a valid number or leave it empty.";
  const idErr = idCardError(idCard);
  if (idErr) e.idCard = idErr;
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email address.";
  if (!d.gender) e.gender = "Select your gender.";
  if (!d.state) e.state = "Select your state / UT.";
  if (!d.city.trim()) e.city = "Enter your city or district.";
  if (!d.lastCourse) e.lastCourse = "Select your last passed course.";
  if (!PERCENT_RE.test(d.percentage.trim())) e.percentage = "Enter a percentage like 78.5 or a grade like A+.";
  if (!agreed) e.agreed = "Please agree to the terms & conditions.";
  return e;
}

/** Today as YYYY-MM-DD in the visitor's local time zone. */
function todayLocal() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function validatePayment(p: Payment): Errors {
  const e: Errors = {};
  if (p.transactionId.trim().length < 4) e.transactionId = "Enter the transaction ID from your payment.";
  if (!p.date) e.date = "Select the payment date.";
  else if (p.date > todayLocal()) e.date = "Payment date can't be in the future.";
  return e;
}

function splitName(full: string): Partial<Details> {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], middleName: parts.slice(1, -1).join(" "), lastName: parts[parts.length - 1] };
}

const focusField = (key: ErrorKey) => document.getElementById(`intern-${key}`)?.focus();

/* ------------------------------------------------------------------ */
/* Small presentational pieces                                         */
/* ------------------------------------------------------------------ */

function StepHeading({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className="shrink-0 text-[13px] font-bold uppercase tracking-[0.08em] text-slate-800">{children}</h3>
      <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
      {action}
    </div>
  );
}

function Banner({ track, label, title, aside }: { track: Track | null; label: string; title: string; aside?: ReactNode }) {
  const Icon = track ? TRACK_ICONS[track.icon] : GraduationCap;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0242a2] via-[#0750bd] to-[#0b6ad6] px-5 py-5 text-white sm:px-7">
      <div aria-hidden="true" className="absolute -right-10 -top-14 size-44 rounded-full border-[28px] border-white/10" />
      <div className="relative flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
          <Icon className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-200">{label}</p>
          <p id={REGISTRATION_FOCUS_ID} tabIndex={-1} className="intern-display text-[1.4rem] leading-tight outline-none sm:text-[1.9rem]">
            {title}
          </p>
        </div>
        {aside}
      </div>
    </div>
  );
}

function InfoCard({ track }: { track: Track | null }) {
  const Icon = track ? TRACK_ICONS[track.icon] : GraduationCap;
  return (
    <aside className="rounded-[28px] border-2 border-sky-100 bg-gradient-to-b from-white to-sky-50/50 p-3.5 shadow-[0_20px_50px_rgba(2,66,162,0.08)] lg:sticky lg:top-28">
      <div className="relative h-44 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#081C2E] via-[#0b2c52] to-[#0242a2] p-5 text-white">
        {track ? (
          <>
            <Image src={track.image} alt="" fill sizes="360px" className="object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <Icon aria-hidden="true" className="absolute -right-3 -top-3 size-32 text-white/10" />
          </>
        )}
        <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
            <CircleCheck className="size-3.5" /> Registration {REGISTRATION_FEE}
          </span>
          <span className="whitespace-nowrap rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-900">
            Online / Classroom
          </span>
        </div>
      </div>

      <div className="px-2.5 pb-2 pt-5">
        <h4 className="intern-display text-[1.45rem] leading-tight text-slate-950">{track ? track.title : "Fillip Internship Programme"}</h4>
        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          Register for a guided, hands-on internship with Fillip Technologies Pvt. Ltd.
        </p>

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Programme benefits:</p>
        <ul className="mt-3 space-y-2.5 text-sm font-medium text-slate-700">
          {[
            "Training + Internship certificates",
            `${ENGINEERS_CLINIC.name} platform access`,
            "Mentor guidance & practical tasks",
            "Online or classroom batches",
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700">Before you register:</p>
        <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
          {IMPORTANT_NOTES.map(({ title }) => (
            <li key={title} className="flex gap-2.5">
              <TriangleAlert className="mt-0.5 size-[18px] shrink-0 text-amber-500" />
              {title}
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-slate-200/80 pt-4 text-sm">
          <a
            href={`tel:${INTERNSHIP_PHONE.display.replace(/\s/g, "")}`}
            className="flex items-center gap-2 whitespace-nowrap font-semibold text-slate-800 hover:text-primary"
          >
            <Phone className="size-4 shrink-0 text-primary" /> Support: {INTERNSHIP_PHONE.display}
          </a>
        </div>
      </div>
    </aside>
  );
}

const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold uppercase tracking-[0.06em] transition";
const secondaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400";

/* ------------------------------------------------------------------ */
/* Flow                                                                */
/* ------------------------------------------------------------------ */

export default function RegistrationFlow() {
  const [trackId, setTrackId] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("form");
  const [details, setDetails] = useState<Details>(INITIAL_DETAILS);
  const [idCard, setIdCard] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [payment, setPayment] = useState<Payment>(INITIAL_PAYMENT);
  const [errors, setErrors] = useState<Errors>({});

  const formTopRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDialogElement>(null);

  const track = TRACKS.find((t) => t.id === trackId) ?? null;

  /** Brings step 2 into view and moves focus to its banner title. */
  const revealForm = () =>
    requestAnimationFrame(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById(REGISTRATION_FOCUS_ID)?.focus({ preventScroll: true });
    });

  // The hero form and "Apply for this track" prefill the registration here.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<PrefillDetail>).detail ?? {};
      const picked = TRACKS.find((t) => t.title === detail.domain);
      if (picked) setTrackId(picked.id);

      const next: Partial<Details> = {};
      if (detail.name?.trim()) Object.assign(next, splitName(detail.name));
      if (detail.phone?.trim()) next.phone = detail.phone.trim();
      if (detail.email?.trim()) next.email = detail.email.trim();
      if (detail.mode && (MODES as readonly string[]).includes(detail.mode)) next.mode = detail.mode;
      if (Object.keys(next).length) setDetails((d) => ({ ...d, ...next }));
      setErrors({});
      setStage("form");
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const update = (key: keyof Details, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const updatePayment = (key: keyof Payment, value: string) => {
    setPayment((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onIdCard = (file: File | null) => {
    const err = file ? idCardError(file) : undefined;
    setIdCard(err ? null : file);
    setErrors((e) => ({ ...e, idCard: err }));
  };

  const selectTrack = (id: string) => {
    setTrackId(id);
    setErrors((e) => ({ ...e, track: undefined }));
  };

  const complete = Object.keys(validateDetails(details, idCard, agreed, trackId)).length === 0;

  const submitDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDetails(details, idCard, agreed, trackId);
    setErrors(nextErrors);
    const first = DETAIL_ORDER.find((k) => nextErrors[k]);
    if (first) return focusField(first);
    setStage("payment");
    revealForm();
  };

  const submitPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validatePayment(payment);
    setErrors(nextErrors);
    const first = (["transactionId", "date"] as const).find((k) => nextErrors[k]);
    if (first) return focusField(first);

    // TODO(backend): send { track, details, idCard, payment } to the registration
    // API here (e.g. POST /api/internship, multipart for the ID card) and only
    // move to "done" once it succeeds.
    setStage("done");
    revealForm();
  };

  const resetAll = () => {
    setTrackId(null);
    setStage("form");
    setDetails(INITIAL_DETAILS);
    setIdCard(null);
    setAgreed(false);
    setPayment(INITIAL_PAYMENT);
    setErrors({});
    requestAnimationFrame(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }));
  };

  const fullName = [details.firstName, details.middleName, details.lastName].map((s) => s.trim()).filter(Boolean).join(" ");
  const modeTitle = MODE_OPTIONS.find((m) => m.value === details.mode)?.title ?? details.mode;

  return (
    <div className="space-y-10">
      {/* ---------------- Form / payment / done (always visible) ---------------- */}
      <div ref={formTopRef} id={REGISTRATION_FORM_ID} className="scroll-mt-28">
          <StepHeading>
            {stage === "form"
              ? "Registration form"
              : stage === "payment"
                ? `Registration payment (${REGISTRATION_FEE})`
                : "Registration submitted"}
          </StepHeading>

          <Reveal onMount key={stage} y={28}>
          <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="intern-glass rounded-[28px] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-7">
              {/* ===== Details ===== */}
              {stage === "form" ? (
                <>
                  <Banner
                    track={track}
                    label={track ? "Registration track" : "Internship registration"}
                    title={track ? track.title : "Choose your track below"}
                  />
                  <form noValidate onSubmit={submitDetails} className="mt-7 space-y-7 px-1 sm:px-1.5">
                    {/* Track (first field) */}
                    <fieldset>
                      <legend className="mb-2 block text-[12.5px] font-bold uppercase tracking-[0.04em] text-slate-700">
                        Choose your track <span className="text-red-500">*</span>
                      </legend>
                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-describedby={errors.track ? "intern-track-error" : undefined}>
                        {TRACKS.map((t, i) => {
                          const checked = trackId === t.id;
                          const Icon = TRACK_ICONS[t.icon];
                          return (
                            <label
                              key={t.id}
                              className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-white transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/20 ${
                                checked
                                  ? "border-primary shadow-[0_12px_28px_-12px_rgba(2,66,162,0.45)]"
                                  : errors.track
                                    ? "border-red-300"
                                    : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <input
                                id={i === 0 ? "intern-track" : undefined}
                                type="radio"
                                name="intern-track"
                                value={t.id}
                                checked={checked}
                                onChange={() => selectTrack(t.id)}
                                className="sr-only"
                              />
                              <span className="relative block h-20 w-full overflow-hidden sm:h-24">
                                <Image
                                  src={t.image}
                                  alt=""
                                  fill
                                  sizes="(max-width: 1024px) 45vw, 190px"
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                                <span className="absolute bottom-2 left-2.5 grid size-8 place-items-center rounded-lg bg-white/95 text-primary shadow">
                                  <Icon className="size-4" />
                                </span>
                                {checked ? (
                                  <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-primary text-white ring-2 ring-white">
                                    <Check className="size-3.5" strokeWidth={3} />
                                  </span>
                                ) : null}
                              </span>
                              <span className={`px-3 py-2.5 text-sm font-semibold leading-snug ${checked ? "text-primary" : "text-slate-900"}`}>
                                {t.name}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {errors.track ? (
                        <p id="intern-track-error" className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.track}
                        </p>
                      ) : null}
                    </fieldset>

                    <fieldset>
                      <legend className="mb-2 block text-[12.5px] font-bold uppercase tracking-[0.04em] text-slate-700">
                        Preferred mode of internship <span className="text-red-500">*</span>
                      </legend>
                      <div className="grid gap-3 sm:grid-cols-2" aria-describedby={errors.mode ? "intern-mode-error" : undefined}>
                        {MODE_OPTIONS.map((m, i) => (
                          <RadioCard
                            key={m.value}
                            id={i === 0 ? "intern-mode" : undefined}
                            name="intern-mode"
                            value={m.value}
                            checked={details.mode === m.value}
                            onChange={(v) => update("mode", v)}
                            title={m.title}
                            sub={m.sub}
                            hasError={!!errors.mode}
                          />
                        ))}
                      </div>
                      {errors.mode ? (
                        <p id="intern-mode-error" className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.mode}
                        </p>
                      ) : null}
                    </fieldset>

                    {/* College details (highlighted box) */}
                    <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-4 sm:p-5">
                      <FieldShell id="intern-college" label="Name of college / university" required error={errors.college}>
                        <IconInput
                          id="intern-college"
                          icon={Building2}
                          autoComplete="organization"
                          value={details.college}
                          onChange={(e) => update("college", e.target.value)}
                          placeholder="Enter your college or university name"
                          error={errors.college}
                        />
                      </FieldShell>
                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <FieldShell id="intern-course" label="Course" required error={errors.course}>
                          <IconInput
                            id="intern-course"
                            icon={GraduationCap}
                            value={details.course}
                            onChange={(e) => update("course", e.target.value)}
                            placeholder="e.g. BCA, B.Tech"
                            error={errors.course}
                          />
                        </FieldShell>
                        <FieldShell id="intern-batch" label="Batch / Year" required error={errors.batch}>
                          <IconSelect
                            id="intern-batch"
                            icon={CalendarDays}
                            value={details.batch}
                            onChange={(e) => update("batch", e.target.value)}
                            placeholder="Select batch"
                            options={ACADEMIC_BATCHES}
                            error={errors.batch}
                          />
                        </FieldShell>
                        <FieldShell id="intern-enrolment" label="Enrolment no." required error={errors.enrolment}>
                          <IconInput
                            id="intern-enrolment"
                            icon={Hash}
                            value={details.enrolment}
                            onChange={(e) => update("enrolment", e.target.value)}
                            placeholder="Student ID"
                            error={errors.enrolment}
                          />
                        </FieldShell>
                      </div>
                    </div>

                    {/* Personal details */}
                    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-3">
                      <FieldShell id="intern-firstName" label="First name" required error={errors.firstName}>
                        <IconInput
                          id="intern-firstName"
                          icon={User}
                          autoComplete="given-name"
                          value={details.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                          placeholder="First name"
                          error={errors.firstName}
                        />
                      </FieldShell>
                      <FieldShell id="intern-middleName" label="Middle name">
                        <IconInput
                          id="intern-middleName"
                          autoComplete="additional-name"
                          value={details.middleName}
                          onChange={(e) => update("middleName", e.target.value)}
                          placeholder="Middle name"
                        />
                      </FieldShell>
                      <FieldShell id="intern-lastName" label="Last name">
                        <IconInput
                          id="intern-lastName"
                          autoComplete="family-name"
                          value={details.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                          placeholder="Last name"
                        />
                      </FieldShell>

                      <FieldShell id="intern-phone" label="Contact number" required error={errors.phone}>
                        <IconInput
                          id="intern-phone"
                          icon={Phone}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={details.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="Contact number"
                          error={errors.phone}
                        />
                      </FieldShell>
                      <FieldShell id="intern-altPhone" label="Alternate number" error={errors.altPhone}>
                        <IconInput
                          id="intern-altPhone"
                          icon={Phone}
                          type="tel"
                          inputMode="tel"
                          value={details.altPhone}
                          onChange={(e) => update("altPhone", e.target.value)}
                          placeholder="Optional"
                          error={errors.altPhone}
                        />
                      </FieldShell>
                      <FieldShell
                        id="intern-idCard"
                        label="College ID"
                        required
                        hint={`< ${ID_CARD_MAX_MB}MB · jpg/png/pdf`}
                        error={errors.idCard}
                      >
                        <UploadField id="intern-idCard" file={idCard} onChange={onIdCard} accept={ID_CARD_ACCEPT} error={errors.idCard} />
                      </FieldShell>
                    </div>

                    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                      <FieldShell id="intern-email" label="Email" required error={errors.email}>
                        <IconInput
                          id="intern-email"
                          icon={Mail}
                          type="email"
                          autoComplete="email"
                          value={details.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          error={errors.email}
                        />
                      </FieldShell>
                      <FieldShell id="intern-gender" label="Gender" required error={errors.gender}>
                        <IconSelect
                          id="intern-gender"
                          icon={UsersRound}
                          value={details.gender}
                          onChange={(e) => update("gender", e.target.value)}
                          placeholder="Select gender"
                          options={GENDERS}
                          error={errors.gender}
                        />
                      </FieldShell>
                      <FieldShell id="intern-state" label="State / UT" required error={errors.state}>
                        <IconSelect
                          id="intern-state"
                          icon={MapPin}
                          value={details.state}
                          onChange={(e) => update("state", e.target.value)}
                          placeholder="Select state"
                          options={INDIAN_STATES}
                          error={errors.state}
                        />
                      </FieldShell>
                      <FieldShell id="intern-city" label="City / District" required error={errors.city}>
                        <IconInput
                          id="intern-city"
                          icon={MapPin}
                          autoComplete="address-level2"
                          value={details.city}
                          onChange={(e) => update("city", e.target.value)}
                          placeholder="e.g. Patna"
                          error={errors.city}
                        />
                      </FieldShell>
                      <FieldShell id="intern-lastCourse" label="Last passed course" required error={errors.lastCourse}>
                        <IconSelect
                          id="intern-lastCourse"
                          icon={BookOpen}
                          value={details.lastCourse}
                          onChange={(e) => update("lastCourse", e.target.value)}
                          placeholder="Select course"
                          options={LAST_PASSED_COURSES}
                          error={errors.lastCourse}
                        />
                      </FieldShell>
                      <FieldShell
                        id="intern-percentage"
                        label="Percentage / Grade"
                        required
                        hint="do not include % sign"
                        error={errors.percentage}
                      >
                        <IconInput
                          id="intern-percentage"
                          icon={Percent}
                          inputMode="decimal"
                          value={details.percentage}
                          onChange={(e) => update("percentage", e.target.value)}
                          placeholder="e.g. 78.5 or A+"
                          error={errors.percentage}
                        />
                      </FieldShell>
                    </div>

                    {/* Agree + submit */}
                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                          <input
                            id="intern-agreed"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => {
                              setAgreed(e.target.checked);
                              setErrors((er) => ({ ...er, agreed: undefined }));
                            }}
                            aria-invalid={errors.agreed ? true : undefined}
                            aria-describedby={errors.agreed ? "intern-agreed-error" : undefined}
                            className="mt-1 size-[18px] shrink-0 cursor-pointer accent-primary"
                          />
                          <span>
                            <label htmlFor="intern-agreed" className="cursor-pointer">
                              I agree to the
                            </label>{" "}
                            <button
                              type="button"
                              onClick={() => termsRef.current?.showModal()}
                              className="font-semibold text-primary underline underline-offset-2"
                            >
                              Terms &amp; Conditions
                            </button>{" "}
                            of Fillip Technologies.<span className="text-red-500"> *</span>
                          </span>
                        </div>
                        {errors.agreed ? (
                          <p id="intern-agreed-error" className="mt-1 text-xs font-medium text-red-600">
                            {errors.agreed}
                          </p>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        aria-disabled={!complete}
                        className={`${primaryBtn} shrink-0 ${
                          complete
                            ? "intern-glare bg-primary text-white shadow-[0_12px_26px_rgba(2,66,162,0.25)] hover:-translate-y-0.5"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        Register &amp; continue <ArrowRight className="size-4" />
                      </button>
                    </div>

                    <p className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-5 text-sm text-slate-500">
                      <span>
                        Need help?{" "}
                        <a href={`tel:${INTERNSHIP_PHONE.display.replace(/\s/g, "")}`} className="font-semibold text-primary">
                          Call {INTERNSHIP_PHONE.display}
                        </a>
                      </span>
                      <span className="text-xs">Fields marked * are required.</span>
                    </p>
                  </form>
                </>
              ) : null}

              {/* ===== Payment ===== */}
              {stage === "payment" ? (
                <>
                  <Banner
                    track={track}
                    label="Registration payment"
                    title={fullName || track?.title || ""}
                    aside={<span className="shrink-0 text-2xl font-black sm:text-3xl">{REGISTRATION_FEE}</span>}
                  />
                  <form noValidate onSubmit={submitPayment} className="mt-7 space-y-6 px-1 sm:px-1.5">
                    <dl className="grid gap-x-6 gap-y-3 rounded-2xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
                      {[
                        ["Track", track?.title ?? ""],
                        ["Mode", modeTitle],
                        ["College", details.college],
                        ["Email", details.email],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{k}</dt>
                          <dd className="mt-0.5 break-words font-semibold text-slate-900">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* TODO: add the UPI ID / QR code / bank details students should pay to. */}
                    <p className="flex gap-2.5 rounded-2xl border border-primary/15 bg-primary/[0.04] p-4 text-sm leading-6 text-slate-600">
                      <Info className="mt-0.5 size-[18px] shrink-0 text-primary" />
                      <span>
                        Pay the {REGISTRATION_FEE} registration fee using the payment details provided by the Fillip
                        Technologies team, then enter the transaction details below. Need them? Call{" "}
                        <a href={`tel:${INTERNSHIP_PHONE.display.replace(/\s/g, "")}`} className="font-semibold text-primary">
                          {INTERNSHIP_PHONE.display}
                        </a>
                        .
                      </span>
                    </p>

                    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                      <FieldShell id="intern-transactionId" label="Transaction ID" required error={errors.transactionId} className="sm:col-span-2">
                        <IconInput
                          id="intern-transactionId"
                          icon={Receipt}
                          value={payment.transactionId}
                          onChange={(e) => updatePayment("transactionId", e.target.value)}
                          placeholder="Enter transaction ID"
                          error={errors.transactionId}
                        />
                      </FieldShell>
                      <FieldShell id="intern-date" label="Payment date" required error={errors.date}>
                        <IconInput
                          id="intern-date"
                          icon={CalendarDays}
                          type="date"
                          max={todayLocal()}
                          value={payment.date}
                          onChange={(e) => updatePayment("date", e.target.value)}
                          error={errors.date}
                        />
                      </FieldShell>
                      <FieldShell id="intern-reference" label="Payment reference" hint="UPI ref / receipt no.">
                        <IconInput
                          id="intern-reference"
                          icon={Hash}
                          value={payment.reference}
                          onChange={(e) => updatePayment("reference", e.target.value)}
                          placeholder="Optional"
                        />
                      </FieldShell>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setErrors({});
                          setStage("form");
                          revealForm();
                        }}
                        className={secondaryBtn}
                      >
                        <ArrowLeft className="size-4" /> Edit details
                      </button>
                      <button
                        type="submit"
                        className={`${primaryBtn} intern-glare bg-primary text-white shadow-[0_12px_26px_rgba(2,66,162,0.25)] hover:-translate-y-0.5`}
                      >
                        Submit payment details <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </form>
                </>
              ) : null}

              {/* ===== Done ===== */}
              {stage === "done" ? (
                <div className="px-1 py-2 sm:px-1.5">
                  <span className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <CircleCheckBig className="size-7" />
                  </span>
                  <h4 id={REGISTRATION_FOCUS_ID} tabIndex={-1} className="intern-display mt-5 text-[1.9rem] leading-tight text-slate-950 outline-none">
                    Registration submitted
                  </h4>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                    Thank you{details.firstName ? `, ${details.firstName.trim()}` : ""}! Our team will verify your payment and get
                    in touch on <strong className="text-slate-900">{details.email}</strong> or{" "}
                    <strong className="text-slate-900">{details.phone}</strong>.
                  </p>

                  <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">What happens next</p>
                  <ol className="mt-4 space-y-3">
                    {[
                      {
                        icon: UsersRound,
                        title: "Batch allotment",
                        text: `You will be placed in ${details.mode === MODES[0] ? "an online batch" : "a classroom batch"} for ${track?.title ?? "your track"}.`,
                      },
                      { icon: Receipt, title: "Routine & payment receipt", text: "You will receive your class routine along with the payment receipt." },
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
                    <Link href="/" className={`${primaryBtn} bg-primary text-white`}>
                      Back to home
                    </Link>
                    <button type="button" onClick={resetAll} className={secondaryBtn}>
                      Register another student
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <InfoCard track={track} />
          </div>
          </Reveal>
      </div>

      <TermsDialog dialogRef={termsRef} onAgree={() => {
        setAgreed(true);
        setErrors((e) => ({ ...e, agreed: undefined }));
      }} />
    </div>
  );
}
