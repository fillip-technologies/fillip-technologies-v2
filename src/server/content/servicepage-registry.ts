import "server-only";

import { dbConnect } from "@/lib/db";
import { ServicePageModel, SiteContentModel } from "@/server/db/models";
import { getContentData } from "./queries";
import { snapshotRead } from "./snapshot-cache";
import { getTemplateSchema } from "./servicepage-schema";
import { templateUrlPrefix } from "./servicepage-templates";

/* eslint-disable @typescript-eslint/no-explicit-any */

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
  urlPrefix: string; // public URL prefix for the page's template
};

const toPage = (d: any): ServicePage => ({
  slug: d.slug,
  title: d.title,
  template: d.template ?? "service",
  categorySlug: d.category_slug ?? null,
  published: d.published,
  sortOrder: d.sort_order,
  urlPrefix: templateUrlPrefix(d.template ?? "service"),
});

/** All service pages (published + drafts), ordered for the admin list. */
export async function listServicePages(): Promise<ServicePage[]> {
  return snapshotRead(
    "servicepages:all",
    async () => {
      await dbConnect();
      const docs = await ServicePageModel.find().sort({ sort_order: 1, slug: 1 }).lean();
      return docs.map(toPage);
    },
    []
  );
}

/** One service page by slug, or null if it doesn't exist. */
export async function getServicePage(slug: string): Promise<ServicePage | null> {
  return snapshotRead<ServicePage | null>(
    `servicepage:${slug}`,
    async () => {
      await dbConnect();
      const doc = await ServicePageModel.findOne({ slug }).lean();
      return doc ? toPage(doc) : null;
    },
    null
  );
}

/** Published slugs — for generateStaticParams / listings. */
export async function listPublishedServiceSlugs(): Promise<string[]> {
  return snapshotRead(
    "servicepages:published-slugs",
    async () => {
      await dbConnect();
      const docs = await ServicePageModel.find({ published: true }).select("slug").lean();
      return docs.map((d) => d.slug);
    },
    []
  );
}

/**
 * Public hrefs (`<urlPrefix>/<slug>`) of every *published* service page. Used to
 * filter mega-menu sub-links so links to drafts or deleted pages never render in
 * the public nav (they'd 404 on click).
 */
export async function getPublishedServiceHrefs(): Promise<Set<string>> {
  return snapshotRead<Set<string>>(
    "servicepages:published-hrefs",
    async () => {
      await dbConnect();
      const docs = await ServicePageModel.find({ published: true })
        .select("slug template")
        .lean();
      return new Set(
        docs.map((d) => `${templateUrlPrefix(d.template ?? "service")}/${d.slug}`)
      );
    },
    new Set<string>(),
    // A Set isn't JSON-serialisable: cache it as an array, rehydrate on read.
    {
      serialize: (set) => [...set],
      deserialize: (raw) => new Set(Array.isArray(raw) ? (raw as string[]) : []),
    }
  );
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

/** Delete a page and all of its section content rows (any template). */
export async function deleteServicePage(slug: string): Promise<void> {
  await dbConnect();
  await ServicePageModel.deleteOne({ slug });
  await SiteContentModel.deleteMany({ key: { $regex: `^servicepage\\.${slug}\\.` } });
}

/**
 * Assemble the full nested content object for a page from its template's
 * sections: each section's saved content merged over its default, then
 * unflattened into the shape the renderer takes. Shape depends on `template`
 * (Service for "service", MobileAppDevelopmentContent for "mobile-app").
 */
export async function getServicePageData(
  slug: string,
  template: string
): Promise<Record<string, any>> {
  const schema = getTemplateSchema(template);
  const entries = await Promise.all(
    schema.sectionIds.map(async (id) => {
      const spec = schema.getSpec(id)!;
      const flat = await getContentData(
        `servicepage.${slug}.${id}`,
        spec.flatten(schema.default(slug, id))
      );
      return [id, spec.unflatten(flat)] as const;
    })
  );
  return { slug, ...Object.fromEntries(entries) };
}
