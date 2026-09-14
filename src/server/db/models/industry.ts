import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const industrySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    sort_order: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "industries", versionKey: false }
);
industrySchema.index({ sort_order: 1, slug: 1 });

export type IndustryDoc = InferSchemaType<typeof industrySchema>;
export const IndustryModel: Model<IndustryDoc> =
  (models.Industry as Model<IndustryDoc>) ?? model<IndustryDoc>("Industry", industrySchema);
