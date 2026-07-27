/**
 * Pure quote-calculation logic shared by the client calculator (live preview)
 * and the server (authoritative recompute before generating the PDF).
 *
 * Keep this free of server-only / client-only imports so both can use it.
 */
import {
  type Billing,
  findAddOn,
  findCategory,
  findPackage,
  GST_RATE,
} from "@/data/pricing";

/** A chosen add-on with its quantity (1 for plain toggle add-ons). */
export type SelectedAddOn = { id: string; quantity: number };

/** What the client sends: per chosen category, a package and any add-ons. */
export type QuoteSelection = {
  categoryId: string;
  packageId: string;
  addOns: SelectedAddOn[];
};

export type QuoteLineItem = {
  categoryName: string;
  label: string;
  billing: Billing;
  price: number; // line total at list price (unit price × quantity)
  quantity: number;
  kind: "package" | "addon";
  discountRate: number; // fraction taken off this line (tiered for packages)
};

/** Per-billing money breakdown, after the launch discount is applied. */
export type QuoteTotals = {
  subtotal: number; // list price, before discount
  discount: number; // amount taken off by the launch discount
  discounted: number; // subtotal − discount (the taxable value)
  gst: number; // GST charged on the discounted value
  total: number; // discounted + gst
};

export type QuoteResult = {
  items: QuoteLineItem[];
  gstRate: number;
  discountRate: number;
  oneTime: QuoteTotals;
  monthly: QuoteTotals;
  isEmpty: boolean;
};

const round = (n: number) => Math.round(n);

/** Flat launch discount used by the main packages calculator (25% off). */
export const DISCOUNT_RATE = 0.25;

/**
 * Tiered discounts for the custom "by industry" packages — the cheapest tier
 * gets the smallest cut, the top tier the biggest. Indexed by tier position.
 */
export const INDUSTRY_TIER_DISCOUNTS = [0.1, 0.15, 0.25] as const;

/** Discount rate for an industry package by its tier position (0-based). */
export function tierDiscount(index: number): number {
  return INDUSTRY_TIER_DISCOUNTS[Math.min(index, INDUSTRY_TIER_DISCOUNTS.length - 1)];
}

/**
 * A list price with a discount applied, rounded to the nearest ₹500 so the
 * displayed "you pay" figure always reads as a clean round number.
 */
export function discountedPrice(listPrice: number, rate: number = DISCOUNT_RATE): number {
  return Math.round((listPrice * (1 - rate)) / 500) * 500;
}

/**
 * Build the discounted money breakdown for one billing bucket. Each line is
 * discounted at its own rate (packages are tiered), so the discount is summed
 * per item rather than applied as a single flat rate.
 */
function totalsFor(items: QuoteLineItem[], billing: Billing): QuoteTotals {
  const lines = items.filter((i) => i.billing === billing);
  const subtotal = lines.reduce((sum, i) => sum + i.price, 0);
  const discount = round(lines.reduce((sum, i) => sum + i.price * i.discountRate, 0));
  const discounted = subtotal - discount;
  const gst = round(discounted * GST_RATE);
  return { subtotal, discount, discounted, gst, total: discounted + gst };
}

/**
 * Resolve raw selections into priced line items + totals. Unknown ids are
 * silently ignored, so a stale/forged payload can never inflate the price.
 */
export function calculateQuote(selections: QuoteSelection[]): QuoteResult {
  const items: QuoteLineItem[] = [];

  for (const sel of selections) {
    const category = findCategory(sel.categoryId);
    if (!category) continue;

    const pkgIndex = category.packages.findIndex((p) => p.id === sel.packageId);
    const pkg = findPackage(sel.categoryId, sel.packageId);
    if (pkg) {
      items.push({
        categoryName: category.name,
        label: pkg.name,
        billing: pkg.billing,
        price: pkg.price,
        quantity: 1,
        kind: "package",
        discountRate: tierDiscount(pkgIndex),
      });
    }

    for (const sa of sel.addOns ?? []) {
      const addOn = findAddOn(sel.categoryId, sa.id);
      if (!addOn) continue;
      // Quantity only applies to per-unit add-ons; clamp to a sane range.
      const max = addOn.maxQuantity ?? 50;
      const quantity = addOn.unit
        ? Math.min(Math.max(Math.floor(sa.quantity) || 1, 1), max)
        : 1;
      items.push({
        categoryName: category.name,
        label: addOn.unit ? `${addOn.name} × ${quantity}` : addOn.name,
        billing: addOn.billing,
        price: addOn.price * quantity,
        quantity,
        kind: "addon",
        discountRate: DISCOUNT_RATE, // add-ons keep the flat launch discount
      });
    }
  }

  return {
    items,
    gstRate: GST_RATE,
    discountRate: DISCOUNT_RATE,
    oneTime: totalsFor(items, "one-time"),
    monthly: totalsFor(items, "monthly"),
    isEmpty: items.length === 0,
  };
}

/** Format a number as Indian Rupees, e.g. 120000 -> "₹1,20,000". */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
