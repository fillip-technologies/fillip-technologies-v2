import "server-only";
import { dbConnect } from "@/lib/db";
import { QuoteModel } from "@/server/db/models";
import type { QuoteResult } from "@/lib/quote";
import type { QuoteRequestInput } from "./schema";

export type QuoteRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  one_time_total: number;
  monthly_total: number;
  emailed: boolean;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toQuote(doc: any): QuoteRow {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    company: doc.company ?? null,
    one_time_total: doc.one_time_total,
    monthly_total: doc.monthly_total,
    emailed: doc.emailed,
    created_at: new Date(doc.created_at).toISOString(),
  };
}

/** Persist a quote request + its priced breakdown. Returns the new row. */
export async function insertQuote(
  input: QuoteRequestInput,
  quote: QuoteResult,
  emailed: boolean
): Promise<QuoteRow> {
  await dbConnect();
  const doc = await QuoteModel.create({
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company || null,
    selections: input.selections,
    line_items: quote.items,
    one_time_total: quote.oneTime.total,
    monthly_total: quote.monthly.total,
    emailed,
  });
  return toQuote(doc.toObject());
}
