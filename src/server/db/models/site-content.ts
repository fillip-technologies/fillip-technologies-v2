import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const siteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "site_content", versionKey: false, minimize: false }
);

export type SiteContentDoc = InferSchemaType<typeof siteContentSchema>;
export const SiteContentModel: Model<SiteContentDoc> =
  (models.SiteContent as Model<SiteContentDoc>) ??
  model<SiteContentDoc>("SiteContent", siteContentSchema);
