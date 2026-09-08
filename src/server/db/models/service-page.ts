import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// `template` selects which fixed section schema + renderer the page uses.
// `category_slug` is the What-We-Do category it belongs under (drives the auto nav-link).
// Section content lives in site_content keyed `servicepage.<slug>.<sectionId>`.
const servicePageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    template: { type: String, required: true, default: "service" }, // service | mobile-app | …
    category_slug: { type: String, default: null },
    published: { type: Boolean, required: true, default: false },
    sort_order: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "service_pages", versionKey: false }
);
servicePageSchema.index({ sort_order: 1, slug: 1 });
servicePageSchema.index({ category_slug: 1 });

export type ServicePageDoc = InferSchemaType<typeof servicePageSchema>;
export const ServicePageModel: Model<ServicePageDoc> =
  (models.ServicePage as Model<ServicePageDoc>) ??
  model<ServicePageDoc>("ServicePage", servicePageSchema);
