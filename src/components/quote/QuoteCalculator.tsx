"use client";

import { useMemo, useState } from "react";
import { SERVICE_CATEGORIES } from "@/data/pricing";
import { calculateQuote, formatINR, type QuoteSelection } from "@/lib/quote";

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
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, selections: selectionList }),
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
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* Left: service selection */}
      <div className="space-y-10">
        {SERVICE_CATEGORIES.map((category) => {
          const picked = selections[category.id];
          return (
            <section key={category.id}>
              <h2 className="text-h3 font-semibold text-heading">{category.name}</h2>
              <p className="mt-1 text-small text-body">{category.description}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {category.packages.map((pkg) => {
                  const active = picked?.packageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => choosePackage(category.id, pkg.id)}
                      aria-pressed={active}
                      className={`flex h-full flex-col rounded-xl border p-5 text-left transition-all ${
                        active
                          ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-heading">{pkg.name}</div>
                          {pkg.tagline ? (
                            <div className="text-xs text-body">{pkg.tagline}</div>
                          ) : null}
                        </div>
                        <span
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                            active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                          }`}
                          aria-hidden
                        >
                          {active ? "✓" : ""}
                        </span>
                      </div>

                      <div className="mt-3 text-xl font-bold text-primary">
                        {formatINR(pkg.price)}
                        {pkg.billing === "monthly" ? (
                          <span className="text-sm font-medium text-body">/mo</span>
                        ) : null}
                      </div>
                      {pkg.timeline ? (
                        <div className="mt-1 text-xs text-body">Timeline: {pkg.timeline}</div>
                      ) : null}
                      {pkg.bestFor ? (
                        <div className="mt-2 text-xs text-body">Best for: {pkg.bestFor}</div>
                      ) : null}

                      <ul className="mt-3 space-y-1 border-t border-border pt-3">
                        {pkg.featureGroups
                          .flatMap((g) => g.items)
                          .slice(0, 5)
                          .map((item) => (
                            <li key={item} className="flex gap-2 text-xs text-body">
                              <span className="text-primary">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
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

      {/* Right: sticky summary + contact form */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-heading">Your estimate</h3>

          {quote.isEmpty ? (
            <p className="mt-3 text-sm text-body">
              Select packages on the left to build your estimate.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {quote.items.map((item, i) => (
                <div key={`${item.label}-${i}`} className="flex justify-between gap-3 text-sm">
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

              <div className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                {quote.oneTime.subtotal > 0 ? (
                  <>
                    <Row label="One-time subtotal" value={formatINR(quote.oneTime.subtotal)} />
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

          <p className="mt-4 rounded-lg bg-primary/5 p-3 text-xs text-body">
            This is an indicative estimate. Final pricing is negotiable when you visit our office or
            talk to us on a call.
          </p>

          {/* Contact fields */}
          <div className="mt-5 space-y-3">
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
            className="mt-5 w-full rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity disabled:opacity-50"
          >
            {status.kind === "submitting" ? "Preparing your estimate…" : "Email me the estimate (PDF)"}
          </button>
          <p className="mt-2 text-center text-xs text-body">
            We&apos;ll email you the PDF and download a copy for you instantly.
          </p>
        </form>
      </aside>
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

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${bold ? "font-semibold text-heading" : "text-body"}`}>
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
