import "server-only";
import { query } from "@/lib/db";
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

/** Persist a quote request + its priced breakdown. Returns the new row. */
export async function insertQuote(
  input: QuoteRequestInput,
  quote: QuoteResult,
  emailed: boolean
): Promise<QuoteRow> {
  const rows = await query<QuoteRow>(
    `INSERT INTO quotes
       (name, email, phone, company, selections, line_items, one_time_total, monthly_total, emailed)
     VALUES ($1, $2, $3, $4, $5::jsonb, $6::jsonb, $7, $8, $9)
     RETURNING id, name, email, phone, company, one_time_total, monthly_total, emailed, created_at`,
    [
      input.name,
      input.email,
      input.phone,
      input.company || null,
      JSON.stringify(input.selections),
      JSON.stringify(quote.items),
      quote.oneTime.total,
      quote.monthly.total,
      emailed,
    ]
  );
  return rows[0];
}
