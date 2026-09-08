import "server-only";

import { dbConnect } from "@/lib/db";
import { BlogPostModel } from "@/server/db/models";
import { invalidateSnapshotMany, snapshotRead } from "./snapshot-cache";
import type { BlogListItem, BlogPost } from "@/lib/schema";

type BlogSeo = {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
};

type BlogDbRecord = {
  id?: number | null;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  featured_image?: string | null;
  author?: string | null;
  published_at?: Date | string | null;
  updated_at?: Date | string | null;
  reading_time?: string | null;
  category?: string | null;
  tags?: string[] | null;
  seo?: BlogSeo | null;
  published?: boolean | null;
  sort_order?: number | null;
};

export type BlogCmsListItem = BlogListItem & {
  author: string;
  updatedAt: string;
  published: boolean;
  sortOrder: number;
};

export type BlogCmsPost = BlogPost & {
  published: boolean;
  sortOrder: number;
};

function iso(value: Date | string | null | undefined): string {
  if (!value) return new Date().toISOString();
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function toListItem(doc: BlogDbRecord): BlogCmsListItem {
  return {
    id: Number(doc.id ?? doc.sort_order ?? 0),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    featuredImage: String(doc.featured_image ?? ""),
    category: String(doc.category ?? ""),
    publishedAt: iso(doc.published_at),
    readingTime: String(doc.reading_time ?? "1 min"),
    author: String(doc.author ?? "Fillip Technologies"),
    updatedAt: iso(doc.updated_at ?? doc.published_at),
    published: Boolean(doc.published),
    sortOrder: Number(doc.sort_order ?? 0),
  };
}

function toPost(doc: BlogDbRecord): BlogCmsPost {
  const listItem = toListItem(doc);
  return {
    ...listItem,
    content: String(doc.content ?? ""),
    tags: Array.isArray(doc.tags) ? doc.tags.filter(Boolean).map(String) : [],
    seo: {
      title: String(doc.seo?.title ?? listItem.title),
      description: String(doc.seo?.description ?? listItem.excerpt),
      keywords: String(doc.seo?.keywords ?? ""),
    },
  };
}

export async function listBlogPosts(): Promise<BlogCmsListItem[]> {
  return snapshotRead(
    "blogs:all",
    async () => {
      await dbConnect();
      const docs = (await BlogPostModel.find()
        .sort({ published_at: -1, id: -1, sort_order: 1 })
        .lean()) as unknown as BlogDbRecord[];
      return docs.map(toListItem);
    },
    []
  );
}

export async function getBlogCmsPost(slug: string): Promise<BlogCmsPost | null> {
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;

  return snapshotRead<BlogCmsPost | null>(
    `blog-admin:${slug}`,
    async () => {
      await dbConnect();
      const doc = (await BlogPostModel.findOne({ slug }).lean()) as unknown as BlogDbRecord | null;
      return doc ? toPost(doc) : null;
    },
    null
  );
}

/* ----------------------------------------------------------------- writes -- */

// Cache keys that write operations must invalidate.
const LIST_KEYS = ["blogs:all", "blogs:published"];
const blogCacheKeys = (slug: string) => [...LIST_KEYS, `blog:${slug}`, `blog-admin:${slug}`];

export type BlogPatchFields = {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  readingTime: string;
  category: string;
  tags: string[];
  seo: { title: string; description: string; keywords: string };
};

/** Returns true if a post with this slug already exists. */
export async function checkBlogSlugExists(slug: string): Promise<boolean> {
  await dbConnect();
  const doc = await BlogPostModel.findOne({ slug }).select("_id").lean();
  return !!doc;
}

/** Insert a new, empty blog post draft. Invalidates list snapshot keys. */
export async function insertBlogPost(slug: string, title: string): Promise<void> {
  await dbConnect();
  const [lastByOrder, lastById] = await Promise.all([
    BlogPostModel.findOne().sort({ sort_order: -1 }).select("sort_order").lean(),
    BlogPostModel.findOne().sort({ id: -1 }).select("id").lean(),
  ]);
  const now = new Date();
  await BlogPostModel.create({
    id: Number((lastById as BlogDbRecord | null)?.id ?? 0) + 1,
    title,
    slug,
    excerpt: "",
    content: "",
    featured_image: "",
    author: "Fillip Technologies",
    published_at: now,
    updated_at: now,
    reading_time: "1 min",
    category: "Blog",
    tags: [],
    seo: { title, description: "", keywords: "" },
    published: false,
    sort_order: Number((lastByOrder as BlogDbRecord | null)?.sort_order ?? 0) + 1,
    created_at: now,
    updated_db_at: now,
  });
  await invalidateSnapshotMany(LIST_KEYS);
}

/** Update content fields on an existing post. Returns false when slug not found. */
export async function patchBlogPost(slug: string, fields: BlogPatchFields): Promise<boolean> {
  await dbConnect();
  const res = await BlogPostModel.updateOne(
    { slug },
    {
      $set: {
        title: fields.title,
        excerpt: fields.excerpt,
        content: fields.content,
        featured_image: fields.featuredImage,
        author: fields.author,
        published_at: fields.publishedAt,
        updated_at: fields.updatedAt,
        reading_time: fields.readingTime,
        category: fields.category,
        tags: fields.tags,
        seo: fields.seo,
        updated_db_at: new Date(),
      },
    }
  );
  if (res.matchedCount === 0) return false;
  await invalidateSnapshotMany(blogCacheKeys(slug));
  return true;
}

/** Publish or unpublish a post. Returns false when slug not found. */
export async function setBlogPublished(slug: string, published: boolean): Promise<boolean> {
  await dbConnect();
  const res = await BlogPostModel.updateOne(
    { slug },
    { $set: { published, updated_db_at: new Date() } }
  );
  if (res.matchedCount === 0) return false;
  await invalidateSnapshotMany(blogCacheKeys(slug));
  return true;
}

/** Permanently delete a post. Returns false when slug not found. */
export async function removeBlogPost(slug: string): Promise<boolean> {
  await dbConnect();
  const res = await BlogPostModel.deleteOne({ slug });
  if (res.deletedCount === 0) return false;
  await invalidateSnapshotMany(blogCacheKeys(slug));
  return true;
}
