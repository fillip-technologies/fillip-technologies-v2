"use client";

import { captureClientLocation } from "@/lib/capture-location";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/data/pricing";
import { calculateQuote, discountedPrice, formatINR, tierDiscount, type QuoteSelection } from "@/lib/quote";
import { DetailIcon } from "./quoteDetailIcons";
import { CATEGORY_ICONS } from "@/data/quote/detail";

type Picked = { packageId: string; addOns: { id: string; quantity: number }[] };
type Selections = Record<string, Picked>;
type Contact = { name: string; email: string; phone: string; company: string };

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string; fieldErrors?: Record<string, string[]> }
  | { kind: "success"; message: string; emailed: boolean };

function triggerDownload(base64: string, filename: string) {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function QuoteCalculator() {
  const [selections, setSelections] = useState<Selections>({});
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "", company: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const selectionList: QuoteSelection[] = useMemo(
    () =>
      Object.entries(selections).map(([categoryId, picked]) => ({
        categoryId,
        packageId: picked.packageId,
        addOns: picked.addOns,
      })),
    [selections]
  );

  const quote = useMemo(() => calculateQuote(selectionList), [selectionList]);

  function choosePackage(categoryId: string, packageId: string) {
    setSelections((prev) => {
      const next = { ...prev };
      if (prev[categoryId]?.packageId === packageId) {
        delete next[categoryId]; // clicking the selected package clears it
      } else {
        next[categoryId] = { packageId, addOns: prev[categoryId]?.addOns ?? [] };
      }
      return next;
    });
  }

  /** Set an add-on's quantity; a quantity of 0 removes it. */
  function setAddOnQuantity(categoryId: string, addOnId: string, quantity: number) {
    setSelections((prev) => {
      const picked = prev[categoryId];
      if (!picked) return prev; // add-ons require a chosen package
      const others = picked.addOns.filter((a) => a.id !== addOnId);
      const addOns = quantity > 0 ? [...others, { id: addOnId, quantity }] : others;
      return { ...prev, [categoryId]: { ...picked, addOns } };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (quote.isEmpty) {
      setStatus({ kind: "error", message: "Please select at least one package." });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const location = await captureClientLocation();
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, selections: selectionList, location }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.message || "Something went wrong. Please try again.",
          fieldErrors: data.errors,
        });
        return;
      }
      if (data.pdfBase64) triggerDownload(data.pdfBase64, data.filename || "Estimate.pdf");
      setStatus({ kind: "success", message: data.message, emailed: data.emailed });
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  const fieldErrors = status.kind === "error" ? status.fieldErrors : undefined;

  return (
    <div className="space-y-16">
      {/* Step 1 — choose services */}
      <div>
        <StepHeader
          n="1"
          title="Choose your services"
          subtitle="Tick the packages you need and skip the rest — your estimate builds automatically as you go."
        />

        <div className="mt-8 space-y-12">
        {SERVICE_CATEGORIES.map((category) => {
          const picked = selections[category.id];
          return (
            <section key={category.id} className="scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow-sm shadow-primary/20">
                  <DetailIcon name={CATEGORY_ICONS[category.id] ?? "LayoutGrid"} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-heading">{category.name}</h3>
                  <p className="text-sm text-body">{category.description}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {category.packages.map((pkg, pIndex) => {
                  const active = picked?.packageId === pkg.id;
                  const featured = category.packages.length === 3 && pIndex === 1;
                  const rate = tierDiscount(pIndex);
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => choosePackage(category.id, pkg.id)}
                      aria-pressed={active}
                      className={`group relative flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                        active
                          ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-sm"
                          : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
                      }`}
                    >
                      {featured ? (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Popular
                        </span>
                      ) : null}

                      <div className="font-bold text-heading">{pkg.name}</div>
                      {pkg.tagline ? <div className="text-xs text-body">{pkg.tagline}</div> : null}

                      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-2xl font-extrabold tracking-tight text-heading">
                          {formatINR(discountedPrice(pkg.price, rate))}
                        </span>
                        <span className="text-sm font-medium text-body/60 line-through">
                          {formatINR(pkg.price)}
                        </span>
                        <span className="text-xs font-medium text-body">
                          {pkg.billing === "monthly" ? "/mo" : "one-time"}
                        </span>
                        <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold text-green-600">
                          {Math.round(rate * 100)}% OFF
                        </span>
                      </div>
                      {pkg.bestFor ? (
                        <div className="mt-2 text-xs text-body">✓ Best for {pkg.bestFor}</div>
                      ) : null}

                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        {pkg.featureGroups.map((group) => (
                          <div key={group.title}>
                            <div className="text-[11px] font-bold uppercase tracking-wide text-primary">
                              {group.title}
                            </div>
                            <ul className="mt-1.5 space-y-1">
                              {group.items.map((item) => (
                                <li key={item} className="flex gap-2 text-xs text-body">
                                  <Check className="mt-0.5 size-3 flex-none text-primary" strokeWidth={3} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div
                        className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-heading group-hover:border-primary/50 group-hover:text-primary"
                        }`}
                      >
                        {active ? (
                          <>
                            <Check className="size-4" strokeWidth={3} /> Selected
                          </>
                        ) : (
                          "Select this package"
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Add-ons (only when a package is chosen and add-ons exist) */}
              {picked && category.addOns.length > 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-border bg-surface p-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-body">
                    Add-ons for {category.name}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {category.addOns.map((addOn) => {
                      const qty = picked.addOns.find((a) => a.id === addOn.id)?.quantity ?? 0;
                      const max = addOn.maxQuantity ?? 50;
                      const suffix = addOn.billing === "monthly" ? "/mo" : "";

                      // Quantity-based add-on (e.g. ₹1,000 per page) → stepper.
                      if (addOn.unit) {
                        return (
                          <div
                            key={addOn.id}
                            className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-sm transition-colors ${
                              qty > 0 ? "border-primary bg-primary/5" : "border-border bg-card"
                            }`}
                          >
                            <span className="text-heading">
                              {addOn.name}
                              <span className="block text-xs text-body">
                                {formatINR(addOn.price)}
                                {suffix} / {addOn.unit}
                                {qty > 0 ? ` · ${formatINR(addOn.price * qty)}${suffix}` : ""}
                              </span>
                            </span>
                            <div className="flex shrink-0 items-center gap-1">
                              <Stepper
                                value={qty}
                                max={max}
                                onChange={(v) => setAddOnQuantity(category.id, addOn.id, v)}
                              />
                            </div>
                          </div>
                        );
                      }

                      // Plain toggle add-on.
                      const checked = qty > 0;
                      return (
                        <label
                          key={addOn.id}
                          className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 text-sm transition-colors ${
                            checked ? "border-primary bg-primary/5" : "border-border bg-card"
                          }`}
                        >
                          <span className="flex items-center gap-2 text-heading">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => setAddOnQuantity(category.id, addOn.id, checked ? 0 : 1)}
                              className="size-4 accent-primary"
                            />
                            {addOn.name}
                          </span>
                          <span className="shrink-0 font-medium text-primary">
                            +{formatINR(addOn.price)}
                            {suffix}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </section>
          );
        })}
        </div>
      </div>

      {/* Step 2 — request the estimate by email */}
      <form
        id="get-estimate"
        onSubmit={handleSubmit}
        className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full blur-[110px]"
          style={{ background: "var(--glow-primary)" }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Pitch + total recap */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-primary">
              <span className="flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[9px] font-bold text-white">
                2
              </span>
              Free &amp; instant · no obligation
            </span>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Get your estimate emailed in seconds
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Drop your details and we&apos;ll send a polished PDF estimate — plus an instant copy to
              download. No obligation, and every number stays negotiable when we talk.
            </p>

            {quote.isEmpty ? (
              <p className="mt-5 rounded-xl border border-dashed border-border bg-surface p-4 text-sm text-body">
                Pick at least one package above and your itemised total will show up here.
              </p>
            ) : (
              <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-semibold text-heading">Your estimate</span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {quote.items.length} selected
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  {quote.items.map((item, i) => (
                    <div key={`${item.label}-${i}`} className="flex justify-between gap-3">
                      <span className="text-body">
                        {item.kind === "addon" ? "↳ " : ""}
                        {item.label}
                      </span>
                      <span className="shrink-0 text-heading">
                        {formatINR(item.price)}
                        {item.billing === "monthly" ? "/mo" : ""}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-1 border-t border-border pt-3">
                  {quote.oneTime.subtotal > 0 ? (
                    <>
                      <Row label="One-time subtotal" value={formatINR(quote.oneTime.subtotal)} />
                      <Row
                        label="Launch discount"
                        value={`− ${formatINR(quote.oneTime.discount)}`}
                        discount
                      />
                      {quote.gstRate > 0 ? (
                        <Row
                          label={`GST (${Math.round(quote.gstRate * 100)}%)`}
                          value={formatINR(quote.oneTime.gst)}
                        />
                      ) : null}
                      <Row label="One-time total" value={formatINR(quote.oneTime.total)} bold />
                    </>
                  ) : null}
                  {quote.monthly.subtotal > 0 ? (
                    <>
                      <Row label="Monthly subtotal" value={`${formatINR(quote.monthly.subtotal)}/mo`} />
                      <Row
                        label="Launch discount"
                        value={`− ${formatINR(quote.monthly.discount)}/mo`}
                        discount
                      />
                      {quote.gstRate > 0 ? (
                        <Row
                          label={`GST (${Math.round(quote.gstRate * 100)}%)`}
                          value={`${formatINR(quote.monthly.gst)}/mo`}
                        />
                      ) : null}
                      <Row label="Monthly total" value={`${formatINR(quote.monthly.total)}/mo`} bold />
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {/* Contact fields */}
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ContactField
                label="Name" name="name" value={contact.name}
                onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                errors={fieldErrors?.name} required
              />
              <ContactField
                label="Email" name="email" type="email" value={contact.email}
                onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                errors={fieldErrors?.email} required
              />
              <ContactField
                label="Phone" name="phone" value={contact.phone}
                onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
                errors={fieldErrors?.phone} required
              />
              <ContactField
                label="Company (optional)" name="company" value={contact.company}
                onChange={(v) => setContact((c) => ({ ...c, company: v }))}
                errors={fieldErrors?.company}
              />
            </div>

            {status.kind === "error" ? (
              <p className="mt-3 text-sm text-destructive">{status.message}</p>
            ) : null}
            {status.kind === "success" ? (
              <p className="mt-3 rounded-lg bg-primary/10 p-3 text-sm text-heading">{status.message}</p>
            ) : null}

            <button
              type="submit"
              disabled={status.kind === "submitting" || quote.isEmpty}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-5 py-3.5 font-semibold text-white shadow-sm transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.kind === "submitting" ? "Preparing your estimate…" : "Email me the estimate (PDF)"}
            </button>
            <p className="mt-2 text-center text-xs text-body">
              We&apos;ll email you the PDF and download a copy for you instantly.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function StepHeader({ n, title, subtitle }: { n: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-base font-bold text-white shadow-sm shadow-primary/20">
        {n}
      </span>
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-primary">Step {n}</div>
        <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">{title}</h2>
        <p className="mt-1 max-w-xl text-sm text-body">{subtitle}</p>
      </div>
    </div>
  );
}

function Stepper({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="flex size-7 items-center justify-center rounded-md border border-border text-heading hover:bg-muted"
      >
        −
      </button>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => {
          const v = Math.floor(Number(e.target.value));
          onChange(Math.min(Math.max(Number.isNaN(v) ? 0 : v, 0), max));
        }}
        className="w-12 rounded-md border border-border bg-transparent px-1 py-1 text-center text-sm text-heading outline-none focus:border-primary"
      />
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex size-7 items-center justify-center rounded-md border border-border text-heading hover:bg-muted"
      >
        +
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  discount,
}: {
  label: string;
  value: string;
  bold?: boolean;
  discount?: boolean;
}) {
  return (
    <div
      className={`flex justify-between gap-3 ${
        bold ? "font-semibold text-heading" : discount ? "font-medium text-green-600" : "text-body"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ContactField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  errors,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs text-body">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-heading outline-none focus:border-primary"
      />
      {errors?.length ? <p className="mt-1 text-xs text-destructive">{errors[0]}</p> : null}
    </div>
  );
}
