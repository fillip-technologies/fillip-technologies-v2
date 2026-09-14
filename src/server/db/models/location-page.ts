import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const locationPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    enabled: { type: Boolean, required: true, default: true },
    service_key: { type: String, required: true },
    city: {
      name: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true, default: "India" },
    },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      canonical: { type: String, required: true },
      open_graph: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
      },
      robots: {
        index: { type: Boolean, required: true, default: true },
        follow: { type: Boolean, required: true, default: true },
      },
    },
    content: {
      hero: {
        title: { type: String, required: true },
        highlighted_title: { type: String, required: true },
        description: { type: String, required: true },
      },
      challenges: {
        badge: { type: String, required: true },
        title: { type: String, required: true },
        highlighted_title: { type: String, required: true },
        lead: { type: String, required: true },
        support: { type: String, required: true },
        description: { type: String, required: true },
      },
    },
    faq: {
      badge: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      items: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "location_pages", versionKey: false, minimize: false }
);

// `slug` is already indexed via `unique: true` on the field above — don't
// redeclare it here or Mongoose warns about a duplicate index.
locationPageSchema.index({ service_key: 1 });
locationPageSchema.index({ "city.name": 1 });
locationPageSchema.index({ service_key: 1, "city.name": 1 }, { unique: true });

export type LocationPageDoc = InferSchemaType<typeof locationPageSchema>;
export const LocationPageModel: Model<LocationPageDoc> =
  (models.LocationPage as Model<LocationPageDoc>) ??
  model<LocationPageDoc>("LocationPage", locationPageSchema);
