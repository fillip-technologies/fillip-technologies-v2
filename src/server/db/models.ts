/**
 * Mongoose models for the whole app. Each model lives in its own file under
 * ./models/ for locality. This barrel re-exports them all so existing imports
 * from "@/server/db/models" continue to work unchanged.
 *
 * Field names deliberately mirror the old Postgres columns (snake_case) so the
 * query modules and their consumers keep the same shapes. Models are resolved
 * via `models.X ?? model(...)` so Next.js hot-reload doesn't re-register them
 * (which would throw OverwriteModelError).
 */

export type { LeadDoc } from "./models/lead";
export { LeadModel } from "./models/lead";

export type { AdminUserDoc } from "./models/admin-user";
export { AdminUserModel } from "./models/admin-user";

export type { SiteContentDoc } from "./models/site-content";
export { SiteContentModel } from "./models/site-content";

export type { QuoteDoc } from "./models/quote";
export { QuoteModel } from "./models/quote";

export type { IndustryDoc } from "./models/industry";
export { IndustryModel } from "./models/industry";

export type { ServiceCategoryDoc } from "./models/service-category";
export { ServiceCategoryModel } from "./models/service-category";

export type { ServicePageDoc } from "./models/service-page";
export { ServicePageModel } from "./models/service-page";

export type { BlogPostDoc } from "./models/blog-post";
export { BlogPostModel } from "./models/blog-post";

export type { LocationPageDoc } from "./models/location-page";
export { LocationPageModel } from "./models/location-page";

export type { CaseStudyDoc } from "./models/case-study";
export { CaseStudyModel } from "./models/case-study";
