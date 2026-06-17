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
  price: number; // line total (unit price × quantity)
  quantity: number;
  kind: "package" | "addon";
};

export type QuoteResult = {
  items: QuoteLineItem[];
  gstRate: number;
  oneTime: { subtotal: number; gst: number; total: number };
  monthly: { subtotal: number; gst: number; total: number };
  isEmpty: boolean;
};

const round = (n: number) => Math.round(n);

/**
 * Resolve raw selections into priced line items + totals. Unknown ids are
 * silently ignored, so a stale/forged payload can never inflate the price.
 */
export function calculateQuote(selections: QuoteSelection[]): QuoteResult {
  const items: QuoteLineItem[] = [];

  for (const sel of selections) {
    const category = findCategory(sel.categoryId);
    if (!category) continue;

    const pkg = findPackage(sel.categoryId, sel.packageId);
    if (pkg) {
      items.push({
        categoryName: category.name,
        label: pkg.name,
        billing: pkg.billing,
        price: pkg.price,
        quantity: 1,
        kind: "package",
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
      });
    }
  }

  const oneTimeSubtotal = items
    .filter((i) => i.billing === "one-time")
    .reduce((sum, i) => sum + i.price, 0);
  const monthlySubtotal = items
    .filter((i) => i.billing === "monthly")
    .reduce((sum, i) => sum + i.price, 0);

  const oneTimeGst = round(oneTimeSubtotal * GST_RATE);
  const monthlyGst = round(monthlySubtotal * GST_RATE);

  return {
    items,
    gstRate: GST_RATE,
    oneTime: {
      subtotal: oneTimeSubtotal,
      gst: oneTimeGst,
      total: oneTimeSubtotal + oneTimeGst,
    },
    monthly: {
      subtotal: monthlySubtotal,
      gst: monthlyGst,
      total: monthlySubtotal + monthlyGst,
    },
    isEmpty: items.length === 0,
  };
}

/** Format a number as Indian Rupees, e.g. 120000 -> "₹1,20,000". */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
