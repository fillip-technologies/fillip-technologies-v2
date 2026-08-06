import "server-only";

import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { dbConnect } from "@/lib/db";
import blogIndex from "@/data/blogs/index.json";
import { BlogPostModel } from "@/server/db/models";
import { snapshotRead } from "@/server/content/snapshot-cache";
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

const blogsDirectory = path.join(process.cwd(), "src", "data", "blogs");
const staticBlogIndex = sortLatestFirst(blogIndex as BlogListItem[]);

function sortLatestFirst<T extends { publishedAt: string; id: number }>(blogs: T[]) {
  return [...blogs].sort((a, b) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    return dateDiff || b.id - a.id;
  });
}

function iso(value: Date | string | null | undefined): string {
  if (!value) return new Date().toISOString();
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function toListItem(doc: BlogDbRecord): BlogListItem {
  return {
    id: Number(doc.id ?? doc.sort_order ?? 0),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    featuredImage: String(doc.featured_image ?? ""),
    category: String(doc.category ?? ""),
    publishedAt: iso(doc.published_at),
    readingTime: String(doc.reading_time ?? "1 min"),
  };
}

function toBlogPost(doc: BlogDbRecord): BlogPost {
  const listItem = toListItem(doc);
  return {
    ...listItem,
    content: String(doc.content ?? ""),
    author: String(doc.author ?? "Fillip Technologies"),
    updatedAt: iso(doc.updated_at ?? doc.published_at),
    tags: Array.isArray(doc.tags) ? doc.tags.filter(Boolean).map(String) : [],
    seo: {
      title: String(doc.seo?.title ?? listItem.title),
      description: String(doc.seo?.description ?? listItem.excerpt),
      keywords: String(doc.seo?.keywords ?? ""),
    },
  };
}

async function readStaticBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;
  const candidates = Array.from(
    new Set([
      slug,
      encodeURIComponent(slug).toLowerCase(),
      encodeURI(slug).toLowerCase(),
    ])
  );

  for (const candidate of candidates) {
    try {
      const file = await fs.readFile(path.join(blogsDirectory, `${candidate}.json`), "utf8");
      return JSON.parse(file) as BlogPost;
    } catch {
      continue;
    }
  }

  return null;
}

async function hasBlogRows(): Promise<boolean> {
  await dbConnect();
  return (await BlogPostModel.estimatedDocumentCount()) > 0;
}

export const getAllBlogs = cache(async (): Promise<BlogListItem[]> => {
  return snapshotRead(
    "blogs:published",
    async () => {
      await dbConnect();
      const docs = (await BlogPostModel.find({ published: true })
        .sort({ published_at: -1, id: -1, sort_order: 1 })
        .lean()) as unknown as BlogDbRecord[];

      if (docs.length === 0 && !(await hasBlogRows())) return staticBlogIndex;
      return sortLatestFirst(docs.map(toListItem));
    },
    staticBlogIndex
  );
});

export async function getLatestBlogs(limit = 3): Promise<BlogListItem[]> {
  return (await getAllBlogs()).slice(0, limit);
}

export const getBlogBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;

  return snapshotRead<BlogPost | null>(
    `blog:${slug}`,
    async () => {
      await dbConnect();
      const doc = (await BlogPostModel.findOne({ slug, published: true }).lean()) as unknown as BlogDbRecord | null;
      if (doc) return toBlogPost(doc);
      return (await hasBlogRows()) ? null : readStaticBlogBySlug(slug);
    },
    await readStaticBlogBySlug(slug)
  );
});

export async function getRelatedBlogs(blog: BlogPost, limit = 3): Promise<BlogListItem[]> {
  return (await getAllBlogs())
    .filter((item) => item.slug !== blog.slug)
    .filter((item) => item.category === blog.category || blog.tags.some((tag) => item.excerpt.toLowerCase().includes(tag.toLowerCase())))
    .slice(0, limit);
}

export async function getCategories(): Promise<string[]> {
  return Array.from(new Set((await getAllBlogs()).map((blog) => blog.category).filter(Boolean))).sort();
}

export async function getBlogsByCategory(category: string): Promise<BlogListItem[]> {
  const blogs = await getAllBlogs();
  if (!category || category === "all") return blogs;
  return blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
}

export function searchBlogs(query: string, blogs: BlogListItem[]): BlogListItem[] {
  const term = query.trim().toLowerCase();
  if (!term) return blogs;

  return blogs.filter((blog) =>
    [blog.title, blog.excerpt, blog.category].some((value) => value.toLowerCase().includes(term))
  );
}

export async function getAdjacentBlogs(slug: string) {
  const blogs = await getAllBlogs();
  const index = blogs.findIndex((blog) => blog.slug === slug);

  return {
    previous: index > 0 ? blogs[index - 1] : null,
    next: index >= 0 && index < blogs.length - 1 ? blogs[index + 1] : null,
  };
}
