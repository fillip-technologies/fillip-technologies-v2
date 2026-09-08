import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const blogPostSchema = new Schema(
  {
    id: { type: Number, default: null },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true, default: "" },
    content: { type: String, required: true, default: "" },
    featured_image: { type: String, default: "" },
    author: { type: String, required: true, default: "Fillip Technologies" },
    published_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    reading_time: { type: String, required: true, default: "1 min" },
    category: { type: String, default: "" },
    tags: { type: [String], default: [] },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: String, default: "" },
    },
    published: { type: Boolean, required: true, default: false },
    sort_order: { type: Number, required: true, default: 0 },
    created_at: { type: Date, required: true, default: Date.now },
    updated_db_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "blogs", versionKey: false, minimize: false }
);
blogPostSchema.index({ published: 1, published_at: -1, id: -1 });
blogPostSchema.index({ sort_order: 1, slug: 1 });

export type BlogPostDoc = InferSchemaType<typeof blogPostSchema>;
export const BlogPostModel: Model<BlogPostDoc> =
  (models.BlogPost as Model<BlogPostDoc>) ??
  model<BlogPostDoc>("BlogPost", blogPostSchema);
