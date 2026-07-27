import { dbConnect } from "@/lib/db";
import { LeadModel } from "@/server/db/models";
import { CAREER_SOURCE } from "./lead-sources";
import type { ContactInput } from "./schema";
import type { LeadLocation } from "./geo";

/** An uploaded resume attached to a career-application lead. */
export type LeadResume = {
  url: string;
  filename: string;
  type: string;
};

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
  resume: LeadResume | null;
  status: string;
  created_at: string;
  deletedAt: string | null;
};

/** Extra, optional lead fields captured server-side (not from the base form). */
export type LeadExtras = {
  location?: LeadLocation | null;
  packageCategory?: string | null;
  resume?: LeadResume | null;
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
    resume: (doc.resume as LeadResume) ?? null,
    status: doc.status,
    created_at: new Date(doc.created_at).toISOString(),
    deletedAt: doc.deleted_at ? new Date(doc.deleted_at).toISOString() : null,
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
    resume: input.resume ?? null,
  });
  return toLead(doc.toObject());
}

/**
 * List active (non-binned) leads, newest first (for the admin dashboard). Career
 * applications have their own admin section, so `excludeCareers` keeps them out
 * of the general leads list. The export APIs pass no options and still receive
 * every non-binned lead. `{ deleted_at: null }` also matches legacy docs that
 * predate the field (the field is simply absent on them).
 */
export async function listLeads(
  limit = 100,
  opts: { excludeCareers?: boolean } = {}
): Promise<Lead[]> {
  await dbConnect();
  const query: Record<string, unknown> = { deleted_at: null };
  if (opts.excludeCareers) query.source = { $ne: CAREER_SOURCE };
  const docs = await LeadModel.find(query).sort({ created_at: -1 }).limit(limit).lean();
  return docs.map(toLead);
}

/** Fetch a single lead by id. Returns null for an unknown or malformed id. */
export async function getLeadById(id: string): Promise<Lead | null> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return null; // avoid Mongoose cast errors
  await dbConnect();
  const doc = await LeadModel.findById(id).lean();
  return doc ? toLead(doc) : null;
}

/** List active career-application leads, newest first (for the Careers section). */
export async function listCareerLeads(limit = 200): Promise<Lead[]> {
  await dbConnect();
  const docs = await LeadModel.find({ source: CAREER_SOURCE, deleted_at: null })
    .sort({ created_at: -1 })
    .limit(limit)
    .lean();
  return docs.map(toLead);
}

/** List binned (soft-deleted) leads, most-recently-binned first (for the Bin). */
export async function listTrashedLeads(limit = 300): Promise<Lead[]> {
  await dbConnect();
  const docs = await LeadModel.find({ deleted_at: { $ne: null } })
    .sort({ deleted_at: -1 })
    .limit(limit)
    .lean();
  return docs.map(toLead);
}

/** Update a lead's status. Returns false if no lead matched the id. */
export async function updateLeadStatus(id: string, status: string): Promise<boolean> {
  await dbConnect();
  const res = await LeadModel.updateOne({ _id: id }, { $set: { status } });
  return res.matchedCount > 0;
}

// `strict: false` on these writes ensures `deleted_at` is persisted even if a
// stale Mongoose model schema is cached (dev HMR keeps the old model in the
// global registry), which would otherwise strip the field from the update.

/** Move a lead to the Bin (soft delete). Returns false if no lead matched. */
export async function trashLead(id: string): Promise<boolean> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return false;
  await dbConnect();
  const res = await LeadModel.updateOne(
    { _id: id },
    { $set: { deleted_at: new Date() } },
    { strict: false }
  );
  return res.matchedCount > 0;
}

/** Restore a lead from the Bin. Returns false if no lead matched. */
export async function restoreLead(id: string): Promise<boolean> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return false;
  await dbConnect();
  const res = await LeadModel.updateOne(
    { _id: id },
    { $set: { deleted_at: null } },
    { strict: false }
  );
  return res.matchedCount > 0;
}

/** Permanently delete a lead. Returns false for an unknown or malformed id. */
export async function deleteLead(id: string): Promise<boolean> {
  if (!/^[a-f0-9]{24}$/i.test(id)) return false; // avoid Mongoose cast errors
  await dbConnect();
  const res = await LeadModel.deleteOne({ _id: id });
  return res.deletedCount > 0;
}
