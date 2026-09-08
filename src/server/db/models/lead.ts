import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    company: { type: String, default: null },
    budget: { type: String, default: null },
    message: { type: String, required: true },
    source: { type: String, default: null },
    // Auto-captured visitor location: { source: "gps"|"ip", label, city, region,
    // country, lat, lng, accuracy, ip, isp }. Null when it couldn't be resolved.
    location: { type: Schema.Types.Mixed, default: null },
    // Lead category derived from the package/service the client selected (quote
    // flow). Falls back to source-based categorisation when absent.
    package_category: { type: String, default: null },
    // Career applications only: the uploaded resume as { url, filename, type }.
    // Null for every other lead source.
    resume: { type: Schema.Types.Mixed, default: null },
    status: { type: String, required: true, default: "new" }, // new | contacted | closed
    created_at: { type: Date, required: true, default: Date.now },
    // Soft-delete timestamp. Null/absent = active; a date = in the Bin (trash),
    // where it can be restored or permanently deleted.
    deleted_at: { type: Date, default: null },
  },
  { collection: "leads", versionKey: false }
);
leadSchema.index({ created_at: -1 });
leadSchema.index({ status: 1 });
leadSchema.index({ deleted_at: 1 });

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export const LeadModel: Model<LeadDoc> =
  (models.Lead as Model<LeadDoc>) ?? model<LeadDoc>("Lead", leadSchema);
