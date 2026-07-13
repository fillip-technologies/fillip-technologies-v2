import "server-only";
import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

/**
 * Mongoose models for the whole app. Field names deliberately mirror the old
 * Postgres columns (snake_case) so the query modules and their consumers keep
 * the same shapes. Models are resolved via `models.X ?? model(...)` so Next.js
 * hot-reload doesn't re-register them (which would throw OverwriteModelError).
 */

/* ----------------------------------------------------------------- leads -- */
const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    company: { type: String, default: null },
    budget: { type: String, default: null },
    message: { type: String, required: true },
    source: { type: String, default: null },
    status: { type: String, required: true, default: "new" }, // new | contacted | closed
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "leads", versionKey: false }
);
leadSchema.index({ created_at: -1 });
leadSchema.index({ status: 1 });

export type LeadDoc = InferSchemaType<typeof leadSchema>;
export const LeadModel: Model<LeadDoc> =
  (models.Lead as Model<LeadDoc>) ?? model<LeadDoc>("Lead", leadSchema);


const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    name: { type: String, default: null },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "admin_users", versionKey: false }
);

export type AdminUserDoc = InferSchemaType<typeof adminUserSchema>;
export const AdminUserModel: Model<AdminUserDoc> =
  (models.AdminUser as Model<AdminUserDoc>) ?? model<AdminUserDoc>("AdminUser", adminUserSchema);

/* ---------------------------------------------------------- site_content -- */
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

/* ---------------------------------------------------------------- quotes -- */
const quoteSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: null },
    selections: { type: Schema.Types.Mixed, default: [] },
    line_items: { type: Schema.Types.Mixed, default: [] },
    one_time_total: { type: Number, required: true, default: 0 },
    monthly_total: { type: Number, required: true, default: 0 },
    emailed: { type: Boolean, required: true, default: false },
    created_at: { type: Date, required: true, default: Date.now },
  },
  { collection: "quotes", versionKey: false, minimize: false }
);

export type QuoteDoc = InferSchemaType<typeof quoteSchema>;
export const QuoteModel: Model<QuoteDoc> =
  (models.Quote as Model<QuoteDoc>) ?? model<QuoteDoc>("Quote", quoteSchema);

/* ------------------------------------------------------------ industries -- */
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

/* ------------------------------------------------- what-we-do categories -- */
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

/* --------------------------------------------------------- service pages -- */
// Admin-managed detail pages that back the "What We Do" mega-menu sub-links
// (e.g. /services/ecommerce-development). `template` selects which fixed section
// schema + renderer the page uses; `category_slug` is the What-We-Do category it
// belongs under (drives the auto nav-link). Section content lives in
// site_content keyed `servicepage.<slug>.<sectionId>`.
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
