"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { IndustryPackage } from "@/data/quote/industries";
import { discountedPrice, formatINR, tierDiscount } from "@/lib/quote";

/**
 * Interactive industry package cards. One card is highlighted at a time; it
 * starts on the "popular" tier but the highlight shifts to whichever card the
 * visitor clicks, so the choice always feels like theirs.
 */
export default function IndustryPackages({ packages }: { packages: IndustryPackage[] }) {
  const popularIndex = Math.max(
    0,
    packages.findIndex((p) => p.popular)
  );
  const [selected, setSelected] = useState(popularIndex);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg, i) => {
        const active = selected === i;
        const rate = tierDiscount(i);
        return (
          <div
            key={pkg.id}
            role="button"
            tabIndex={0}
            aria-pressed={active}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected(i);
              }
            }}
            className={`relative flex cursor-pointer flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)] ${
              active
                ? "border-primary bg-primary/[0.04] ring-2 ring-primary/30 shadow-sm"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            {pkg.popular ? (
              <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            ) : null}

            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-heading">{pkg.name}</h3>
              <span
                aria-hidden
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                }`}
              >
                {active ? <Check size={12} strokeWidth={3} /> : null}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-3xl font-extrabold tracking-tight text-heading">
                {formatINR(discountedPrice(pkg.price, rate))}
              </span>
              <span className="text-base font-medium text-body/60 line-through">
                {formatINR(pkg.price)}
              </span>
              {pkg.billing === "monthly" ? (
                <span className="text-sm font-medium text-body">/mo</span>
              ) : null}
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-bold text-green-600">
                {Math.round(rate * 100)}% OFF
              </span>
            </div>

            {pkg.bestFor ? (
              <div className="mt-2 text-xs text-body">Best for: {pkg.bestFor}</div>
            ) : null}

            <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/get-a-quote/requirement"
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                active
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border text-heading hover:border-primary/50 hover:text-primary"
              }`}
            >
              Get this quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
