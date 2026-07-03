import { dbConnect } from "@/lib/db";
import { LeadModel } from "@/server/db/models";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toLead(doc: any): Lead {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone ?? null,
    company: doc.company ?? null,
    message: doc.message,
    source: doc.source ?? null,
    status: doc.status,
    created_at: new Date(doc.created_at).toISOString(),
  };
}

/** Insert a new lead and return the created row. */
export async function insertLead(input: ContactInput): Promise<Lead> {
  await dbConnect();
  const doc = await LeadModel.create({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    company: input.company || null,
    message: input.message,
    source: input.source || null,
  });
  return toLead(doc.toObject());
}

/** List leads, newest first (for the admin dashboard). */
export async function listLeads(limit = 100): Promise<Lead[]> {
  await dbConnect();
  const docs = await LeadModel.find().sort({ created_at: -1 }).limit(limit).lean();
  return docs.map(toLead);
}
