import "server-only";

import { dbConnect } from "@/lib/db";
import { LocationPageModel } from "@/server/db/models";
import { snapshotRead } from "@/server/content/snapshot-cache";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Data access for the `location_pages` collection — admin-managed
 * "<service> in <city>" landing pages (e.g. /locations/web-development-patna).
 * Unlike industries/service-pages, the full page content lives directly on
 * this document (no split into site_content rows), since each location page
 * is a single self-contained record.
 */

export type LocationPage = {
  slug: string;
  enabled: boolean;
  serviceKey: string;
  city: { name: string; state: string; country: string };
  seo: {
    title: string;
    description: string;
    canonical: string;
    openGraph: { title: string; description: string; image: string };
    robots: { index: boolean; follow: boolean };
  };
  content: {
    hero: { title: string; highlightedTitle: string; description: string };
    challenges: {
      badge: string;
      title: string;
      highlightedTitle: string;
      lead: string;
      support: string;
      description: string;
    };
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  createdAt: string;
  updatedAt: string;
};

const toLocationPage = (d: any): LocationPage => ({
  slug: d.slug,
  enabled: d.enabled,
  serviceKey: d.service_key,
  city: {
    name: d.city?.name ?? "",
    state: d.city?.state ?? "",
    country: d.city?.country ?? "India",
  },
  seo: {
    title: d.seo?.title ?? "",
    description: d.seo?.description ?? "",
    canonical: d.seo?.canonical ?? "",
    openGraph: {
      title: d.seo?.open_graph?.title ?? "",
      description: d.seo?.open_graph?.description ?? "",
      image: d.seo?.open_graph?.image ?? "",
    },
    robots: {
      index: d.seo?.robots?.index ?? true,
      follow: d.seo?.robots?.follow ?? true,
    },
  },
  content: {
    hero: {
      title: d.content?.hero?.title ?? "",
      highlightedTitle: d.content?.hero?.highlighted_title ?? "",
      description: d.content?.hero?.description ?? "",
    },
    challenges: {
      badge: d.content?.challenges?.badge ?? "",
      title: d.content?.challenges?.title ?? "",
      highlightedTitle: d.content?.challenges?.highlighted_title ?? "",
      lead: d.content?.challenges?.lead ?? "",
      support: d.content?.challenges?.support ?? "",
      description: d.content?.challenges?.description ?? "",
    },
  },
  faq: {
    badge: d.faq?.badge ?? "",
    title: d.faq?.title ?? "",
    description: d.faq?.description ?? "",
    items: Array.isArray(d.faq?.items)
      ? d.faq.items.map((i: any) => ({ question: i.question ?? "", answer: i.answer ?? "" }))
      : [],
  },
  createdAt: d.created_at ? new Date(d.created_at).toISOString() : new Date().toISOString(),
  updatedAt: d.updated_at ? new Date(d.updated_at).toISOString() : new Date().toISOString(),
});

/** All location pages (enabled + disabled), ordered for the admin list. */
export async function listLocationPages(): Promise<LocationPage[]> {
  return snapshotRead(
    "locationpages:all",
    async () => {
      await dbConnect();
      const docs = await LocationPageModel.find()
        .sort({ service_key: 1, "city.name": 1 })
        .lean();
      return docs.map(toLocationPage);
    },
    []
  );
}

/** Only enabled location pages — for public listing/sitemaps. */
export async function listEnabledLocationPages(): Promise<LocationPage[]> {
  return snapshotRead(
    "locationpages:enabled",
    async () => {
      await dbConnect();
      const docs = await LocationPageModel.find({ enabled: true })
        .sort({ service_key: 1, "city.name": 1 })
        .lean();
      return docs.map(toLocationPage);
    },
    []
  );
}

/** One location page by slug, or null if it doesn't exist. */
export async function getLocationPage(slug: string): Promise<LocationPage | null> {
  return snapshotRead<LocationPage | null>(
    `locationpage:${slug}`,
    async () => {
      await dbConnect();
      const doc = await LocationPageModel.findOne({ slug }).lean();
      return doc ? toLocationPage(doc) : null;
    },
    null
  );
}

/** Look up an existing page by its (service, city) pair — used to enforce the compound-unique index before insert. */
export async function findLocationPageByServiceAndCity(
  serviceKey: string,
  cityName: string
): Promise<LocationPage | null> {
  await dbConnect();
  const doc = await LocationPageModel.findOne({
    service_key: serviceKey,
    "city.name": cityName,
  }).lean();
  return doc ? toLocationPage(doc) : null;
}

/** Insert a new location page. Assumes slug/uniqueness are already validated. */
export async function insertLocationPage(doc: {
  slug: string;
  serviceKey: string;
  city: { name: string; state: string; country: string };
  seo: LocationPage["seo"];
  content: LocationPage["content"];
  faq: LocationPage["faq"];
}): Promise<void> {
  await dbConnect();
  await LocationPageModel.create({
    slug: doc.slug,
    enabled: true,
    service_key: doc.serviceKey,
    city: doc.city,
    seo: {
      title: doc.seo.title,
      description: doc.seo.description,
      canonical: doc.seo.canonical,
      open_graph: {
        title: doc.seo.openGraph.title,
        description: doc.seo.openGraph.description,
        image: doc.seo.openGraph.image,
      },
      robots: { index: doc.seo.robots.index, follow: doc.seo.robots.follow },
    },
    content: {
      hero: {
        title: doc.content.hero.title,
        highlighted_title: doc.content.hero.highlightedTitle,
        description: doc.content.hero.description,
      },
      challenges: {
        badge: doc.content.challenges.badge,
        title: doc.content.challenges.title,
        highlighted_title: doc.content.challenges.highlightedTitle,
        lead: doc.content.challenges.lead,
        support: doc.content.challenges.support,
        description: doc.content.challenges.description,
      },
    },
    faq: {
      badge: doc.faq.badge,
      title: doc.faq.title,
      description: doc.faq.description,
      items: doc.faq.items,
    },
  });
}

/** Overwrite editable content on an existing page (everything except slug/service_key/city/enabled). */
export async function updateLocationPageContent(
  slug: string,
  patch: { seo: LocationPage["seo"]; content: LocationPage["content"]; faq: LocationPage["faq"] }
): Promise<void> {
  await dbConnect();
  await LocationPageModel.updateOne(
    { slug },
    {
      $set: {
        seo: {
          title: patch.seo.title,
          description: patch.seo.description,
          canonical: patch.seo.canonical,
          open_graph: {
            title: patch.seo.openGraph.title,
            description: patch.seo.openGraph.description,
            image: patch.seo.openGraph.image,
          },
          robots: { index: patch.seo.robots.index, follow: patch.seo.robots.follow },
        },
        content: {
          hero: {
            title: patch.content.hero.title,
            highlighted_title: patch.content.hero.highlightedTitle,
            description: patch.content.hero.description,
          },
          challenges: {
            badge: patch.content.challenges.badge,
            title: patch.content.challenges.title,
            highlighted_title: patch.content.challenges.highlightedTitle,
            lead: patch.content.challenges.lead,
            support: patch.content.challenges.support,
            description: patch.content.challenges.description,
          },
        },
        faq: {
          badge: patch.faq.badge,
          title: patch.faq.title,
          description: patch.faq.description,
          items: patch.faq.items,
        },
        updated_at: new Date(),
      },
    }
  );
}

/** Toggle whether the page is served publicly. */
export async function setLocationPageEnabled(slug: string, enabled: boolean): Promise<void> {
  await dbConnect();
  await LocationPageModel.updateOne({ slug }, { $set: { enabled, updated_at: new Date() } });
}

/** Permanently delete a location page. */
export async function deleteLocationPage(slug: string): Promise<void> {
  await dbConnect();
  await LocationPageModel.deleteOne({ slug });
}
