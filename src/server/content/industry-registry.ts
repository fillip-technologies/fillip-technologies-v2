import "server-only";

import { dbConnect } from "@/lib/db";
import { IndustryModel, SiteContentModel } from "@/server/db/models";
import { INDUSTRY_SECTION_IDS } from "./industry-sections";

/**
 * Data access for the `industries` collection. This is the source of truth for
 * *which* /industries/<slug> pages exist, their label, publish state and order.
 * Section content still lives in site_content (`industry.<slug>.<id>`).
 */

export type Industry = {
  slug: string;
  label: string;
  published: boolean;
  sortOrder: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toIndustry = (d: any): Industry => ({
  slug: d.slug,
  label: d.label,
  published: d.published,
  sortOrder: d.sort_order,
});

/** All industries (published + drafts), ordered for the admin list. */
export async function listIndustries(): Promise<Industry[]> {
  await dbConnect();
  const docs = await IndustryModel.find().sort({ sort_order: 1, slug: 1 }).lean();
  return docs.map(toIndustry);
}

/** Only published industries — for public nav/listing. */
export async function listPublishedIndustries(): Promise<Industry[]> {
  await dbConnect();
  const docs = await IndustryModel.find({ published: true })
    .sort({ sort_order: 1, slug: 1 })
    .lean();
  return docs.map(toIndustry);
}

/** One industry by slug, or null if it doesn't exist. */
export async function getIndustry(slug: string): Promise<Industry | null> {
  await dbConnect();
  const doc = await IndustryModel.findOne({ slug }).lean();
  return doc ? toIndustry(doc) : null;
}

/** Insert a new draft industry. Assumes slug/label are already validated. */
export async function insertIndustry(slug: string, label: string): Promise<void> {
  await dbConnect();
  const last = await IndustryModel.findOne().sort({ sort_order: -1 }).lean();
  const sortOrder = (last?.sort_order ?? 0) + 1;
  await IndustryModel.create({ slug, label, published: false, sort_order: sortOrder });
}

/** Toggle publish state. */
export async function setPublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await IndustryModel.updateOne(
    { slug },
    { $set: { published, updated_at: new Date() } }
  );
}

/** Delete an industry and all of its section content rows. */
export async function deleteIndustry(slug: string): Promise<void> {
  await dbConnect();
  await IndustryModel.deleteOne({ slug });
  // Clean up its CMS content (industry.<slug>.hero, .challenges, …).
  await SiteContentModel.deleteMany({
    key: { $in: INDUSTRY_SECTION_IDS.map((id) => `industry.${slug}.${id}`) },
  });
}
