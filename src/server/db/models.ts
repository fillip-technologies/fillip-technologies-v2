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


const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    name: { type: String, default: null },
    // Bumped every time the password changes. Baked into the session JWT and
    // re-checked on each request, so a password change invalidates all existing
    // sessions (the old token's version no longer matches this one).
    session_version: { type: Number, required: true, default: 0 },
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

/* ------------------------------------------------------------------ blogs -- */
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


  /* ------------------------------------------------------ location pages -- */

const locationPageSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },

    service_key: {
      type: String,
      required: true,
    },

    city: {
      name: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
        default: "India",
      },
    },

    seo: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      canonical: {
        type: String,
        required: true,
      },

      open_graph: {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },

      robots: {
        index: {
          type: Boolean,
          required: true,
          default: true,
        },
        follow: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    },

    content: {
      hero: {
        title: {
          type: String,
          required: true,
        },
        highlighted_title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },

      challenges: {
        badge: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        highlighted_title: {
          type: String,
          required: true,
        },
        lead: {
          type: String,
          required: true,
        },
        support: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    },

    faq: {
      badge: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      items: [
        {
          question: {
            type: String,
            required: true,
          },

          answer: {
            type: String,
            required: true,
          },
        },
      ],
    },

    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },

    updated_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    collection: "location_pages",
    versionKey: false,
    minimize: false,
  }
);

locationPageSchema.index({ slug: 1 });
locationPageSchema.index({ service_key: 1 });
locationPageSchema.index({ "city.name": 1 });
locationPageSchema.index(
  {
    service_key: 1,
    "city.name": 1,
  },
  { unique: true }
);

export type LocationPageDoc = InferSchemaType<typeof locationPageSchema>;

export const LocationPageModel: Model<LocationPageDoc> =
  (models.LocationPage as Model<LocationPageDoc>) ??
  model<LocationPageDoc>("LocationPage", locationPageSchema);