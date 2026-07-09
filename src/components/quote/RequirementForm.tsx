"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { QUOTE_INDUSTRIES } from "@/data/quote/industries";

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  projectType: string;
  budget: string;
  timeline: string;
  requirements: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success" };

const PROJECT_TYPES = ["New build", "Redesign", "New feature / module", "Maintenance & support", "Not sure yet"];
const BUDGETS = ["Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹3,00,000", "₹3,00,000+"];
const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "Flexible"];

export default function RequirementForm() {
  const params = useSearchParams();
  const presetIndustry = params.get("industry") ?? "";
  const presetPackage = params.get("package") ?? "";

  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: presetIndustry,
    projectType: "",
    budget: "",
    timeline: "",
    requirements: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) =>
    setFields((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (fields.requirements.trim().length < 10) {
      setStatus({ kind: "error", message: "Please describe your requirement (at least 10 characters)." });
      return;
    }
    setStatus({ kind: "submitting" });

    const industryName =
      QUOTE_INDUSTRIES.find((i) => i.slug === fields.industry)?.name || fields.industry;

    const message = [
      industryName ? `Industry: ${industryName}` : null,
      presetPackage ? `Interested package: ${presetPackage}` : null,
      fields.projectType ? `Project type: ${fields.projectType}` : null,
      fields.budget ? `Budget: ${fields.budget}` : null,
      fields.timeline ? `Timeline: ${fields.timeline}` : null,
      "",
      "Requirements:",
      fields.requirements.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          company: fields.company,
          message,
          source: "get-a-quote-requirement",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: data?.error || "Something went wrong. Please try again.",
        });
        return;
      }
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-heading">Requirement received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-body">
          Thanks! Our team will review your requirement and get back to you with a tailored quote
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required value={fields.name} onChange={(v) => set("name", v)} />
        <Field label="Email" type="email" required value={fields.email} onChange={(v) => set("email", v)} />
        <Field label="Phone" required value={fields.phone} onChange={(v) => set("phone", v)} />
        <Field label="Company (optional)" value={fields.company} onChange={(v) => set("company", v)} />

        <Select
          label="Industry"
          value={fields.industry}
          onChange={(v) => set("industry", v)}
          options={QUOTE_INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))}
        />
        <Select
          label="Project type"
          value={fields.projectType}
          onChange={(v) => set("projectType", v)}
          options={PROJECT_TYPES.map((t) => ({ value: t, label: t }))}
        />
        <Select
          label="Budget"
          value={fields.budget}
          onChange={(v) => set("budget", v)}
          options={BUDGETS.map((b) => ({ value: b, label: b }))}
        />
        <Select
          label="Timeline"
          value={fields.timeline}
          onChange={(v) => set("timeline", v)}
          options={TIMELINES.map((t) => ({ value: t, label: t }))}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="requirements" className="mb-1.5 block text-sm font-medium text-heading">
          Your requirement <span className="text-primary">*</span>
        </label>
        <textarea
          id="requirements"
          rows={5}
          required
          value={fields.requirements}
          onChange={(e) => set("requirements", e.target.value)}
          placeholder="Tell us about your project, key features, pages/modules, references, and anything else that helps us scope it."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-heading outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      {status.kind === "error" ? (
        <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{status.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status.kind === "submitting" ? "Sending…" : "Send requirement"}
        <Send className="h-4 w-4" />
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        We&apos;ll review your details and reply with a tailored quote. No spam, ever.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-heading">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-heading">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
