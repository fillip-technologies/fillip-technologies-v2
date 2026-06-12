import { query } from "@/lib/db";
import type { ContactInput } from "./schema";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  source: string | null;
  status: string;
  created_at: string;
};

/** Insert a new lead and return the created row. */
export async function insertLead(input: ContactInput): Promise<Lead> {
  const rows = await query<Lead>(
    `INSERT INTO leads (name, email, phone, company, message, source)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      input.name,
      input.email,
      input.phone || null,
      input.company || null,
      input.message,
      input.source || null,
    ]
  );
  return rows[0];
}

/** List leads, newest first (for the admin dashboard). */
export async function listLeads(limit = 100): Promise<Lead[]> {
  return query<Lead>(
    `SELECT * FROM leads ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
}
