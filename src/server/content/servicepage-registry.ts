import "server-only";

import { dbConnect } from "@/lib/db";
import { ServicePageModel, SiteContentModel } from "@/server/db/models";
import { getContentData } from "./queries";
import {
  SERVICEPAGE_SECTION_IDS,
  getServicePageSectionSpec,
  serviceDefault,
} from "./servicepage-sections";
import type { Service } from "@/data/website-development";

/**
 * Data access for the `service_pages` collection — the source of truth for
 * *which* /services/<slug> detail pages exist, their title, template, category
 * and publish state. Section content lives in site_content
 * (`servicepage.<slug>.<id>`). Mirrors industry-registry.ts.
 */

export type ServicePage = {
  slug: string;
  title: string;
  template: string;
  categorySlug: string | null;
  published: boolean;
  sortOrder: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPage = (d: any): ServicePage => ({
  slug: d.slug,
  title: d.title,
  template: d.template ?? "service",
  categorySlug: d.category_slug ?? null,
  published: d.published,
  sortOrder: d.sort_order,
});

/** All service pages (published + drafts), ordered for the admin list. */
export async function listServicePages(): Promise<ServicePage[]> {
  await dbConnect();
  const docs = await ServicePageModel.find().sort({ sort_order: 1, slug: 1 }).lean();
  return docs.map(toPage);
}

/** One service page by slug, or null if it doesn't exist. */
export async function getServicePage(slug: string): Promise<ServicePage | null> {
  await dbConnect();
  const doc = await ServicePageModel.findOne({ slug }).lean();
  return doc ? toPage(doc) : null;
}

/** Published slugs — for generateStaticParams / listings. */
export async function listPublishedServiceSlugs(): Promise<string[]> {
  await dbConnect();
  const docs = await ServicePageModel.find({ published: true }).select("slug").lean();
  return docs.map((d) => d.slug);
}

/** Insert a new draft page. Assumes slug/title are already validated. */
export async function insertServicePage(
  slug: string,
  title: string,
  template: string,
  categorySlug: string | null
): Promise<void> {
  await dbConnect();
  const last = await ServicePageModel.findOne().sort({ sort_order: -1 }).lean();
  const sortOrder = (last?.sort_order ?? 0) + 1;
  await ServicePageModel.create({
    slug,
    title,
    template,
    category_slug: categorySlug,
    published: false,
    sort_order: sortOrder,
  });
}

/** Toggle publish state. */
export async function setServicePagePublished(slug: string, published: boolean): Promise<void> {
  await dbConnect();
  await ServicePageModel.updateOne(
    { slug },
    { $set: { published, updated_at: new Date() } }
  );
}

/** Delete a page and all of its section content rows. */
export async function deleteServicePage(slug: string): Promise<void> {
  await dbConnect();
  await ServicePageModel.deleteOne({ slug });
  await SiteContentModel.deleteMany({
    key: { $in: SERVICEPAGE_SECTION_IDS.map((id) => `servicepage.${slug}.${id}`) },
  });
}

/**
 * Assemble the full nested `Service` object for a page: each section's saved
 * content merged over its default (from `services` for seeded slugs, else blank),
 * then unflattened into the shape the components take.
 */
export async function getServicePageData(slug: string): Promise<Service> {
  const entries = await Promise.all(
    SERVICEPAGE_SECTION_IDS.map(async (id) => {
      const spec = getServicePageSectionSpec(id)!;
      const flat = await getContentData(
        `servicepage.${slug}.${id}`,
        spec.flatten(serviceDefault(slug, id))
      );
      return [id, spec.unflatten(flat)] as const;
    })
  );
  return { slug, ...Object.fromEntries(entries) } as Service;
}
