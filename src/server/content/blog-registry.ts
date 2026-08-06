import "server-only";

import { dbConnect } from "@/lib/db";
import { BlogPostModel } from "@/server/db/models";
import { snapshotRead } from "./snapshot-cache";
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
