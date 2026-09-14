import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const serviceCategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    group: { type: String, required: false, default: "whatwedo" },
    // Optional blurb shown under the column header (used by the Solutions menu).
    description: { type: String, required: false, default: "" },
    published: { type: Boolean, required: true, default: false },
    sort_order: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "service_categories", versionKey: false }
);
serviceCategorySchema.index({ sort_order: 1, slug: 1 });

export type ServiceCategoryDoc = InferSchemaType<typeof serviceCategorySchema>;
export const ServiceCategoryModel: Model<ServiceCategoryDoc> =
  (models.ServiceCategory as Model<ServiceCategoryDoc>) ??
  model<ServiceCategoryDoc>("ServiceCategory", serviceCategorySchema);
