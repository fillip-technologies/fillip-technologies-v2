import "server-only";

import { dbConnect } from "@/lib/db";
import { ServiceCategoryModel, SiteContentModel } from "@/server/db/models";
import { WHATWEDO_SECTION_IDS } from "./whatwedo-sections";

/**
 * Data access for the `service_categories` collection — the source of truth for
 * *which* /what-we-do/<slug> category pages exist, their label, publish state
 * and order. Section content lives in site_content (`whatwedo.<slug>.<id>`).
 * Mirrors industry-registry.ts.
 */

export type Category = {
  slug: string;
  label: string;
  published: boolean;
  sortOrder: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCategory = (d: any): Category => ({
  slug: d.slug,
  label: d.label,
  published: d.published,
  sortOrder: d.sort_order,
});

/** All categories (published + drafts), ordered for the admin list. */
export async function listCategories(): Promise<Category[]> {
  await dbConnect();
  const docs = await ServiceCategoryModel.find().sort({ sort_order: 1, slug: 1 }).lean();
  return docs.map(toCategory);
}

/** Only published categories — for public nav/listing. */
export async function listPublishedCategories(): Promise<Category[]> {
  await dbConnect();
  const docs = await ServiceCategoryModel.find({ published: true })
    .sort({ sort_order: 1, slug: 1 })
    .lean();
  return docs.map(toCategory);
}

/** One category by slug, or null if it doesn't exist. */
export async function getCategory(slug: string): Promise<Category | null> {
  await dbConnect();
  const doc = await ServiceCategoryModel.findOne({ slug }).lean();
  return doc ? toCategory(doc) : null;
}

/** Insert a new draft category. Assumes slug/label are already validated. */
export async function insertCategory(slug: string, label: string): Promise<void> {
  await dbConnect();
  const last = await ServiceCategoryModel.findOne().sort({ sort_order: -1 }).lean();
  const sortOrder = (last?.sort_order ?? 0) + 1;
  await ServiceCategoryModel.create({ slug, label, published: false, sort_order: sortOrder });
}

/** Toggle publish state. */
export async function setPublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await ServiceCategoryModel.updateOne(
    { slug },
    { $set: { published, updated_at: new Date() } }
  );
}

/** Delete a category and all of its section content rows. */
export async function deleteCategory(slug: string): Promise<void> {
  await dbConnect();
  await ServiceCategoryModel.deleteOne({ slug });
  await SiteContentModel.deleteMany({
    key: { $in: WHATWEDO_SECTION_IDS.map((id) => `whatwedo.${slug}.${id}`) },
  });
}
