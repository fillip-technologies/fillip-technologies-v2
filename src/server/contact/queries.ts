import { dbConnect } from "@/lib/db";
import { LeadModel } from "@/server/db/models";
import type { ContactInput } from "./schema";
import type { LeadLocation } from "./geo";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: string | null;
  message: string;
  source: string | null;
  location: LeadLocation | null;
  packageCategory: string | null;
  status: string;
  created_at: string;
};

/** Extra, optional lead fields captured server-side (not from the base form). */
export type LeadExtras = {
  location?: LeadLocation | null;
  packageCategory?: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toLead(doc: any): Lead {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone ?? null,
    company: doc.company ?? null,
    budget: doc.budget ?? null,
    message: doc.message,
    source: doc.source ?? null,
    location: (doc.location as LeadLocation) ?? null,
    packageCategory: doc.package_category ?? null,
    status: doc.status,
    created_at: new Date(doc.created_at).toISOString(),
  };
}

/** Insert a new lead and return the created row. */
export async function insertLead(input: ContactInput & LeadExtras): Promise<Lead> {
  await dbConnect();
  const doc = await LeadModel.create({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    company: input.company || null,
    budget: input.budget || null,
    message: input.message,
    source: input.source || null,
    location: input.location ?? null,
    package_category: input.packageCategory || null,
  });
  return toLead(doc.toObject());
}

/** List leads, newest first (for the admin dashboard). */
export async function listLeads(limit = 100): Promise<Lead[]> {
  await dbConnect();
  const docs = await LeadModel.find().sort({ created_at: -1 }).limit(limit).lean();
  return docs.map(toLead);
}
