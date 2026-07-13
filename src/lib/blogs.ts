import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import blogIndex from "@/data/blogs/index.json";
import type { BlogListItem, BlogPost } from "@/lib/schema";

const blogsDirectory = path.join(process.cwd(), "src", "data", "blogs");

function sortLatestFirst<T extends { publishedAt: string; id: number }>(blogs: T[]) {
  return [...blogs].sort((a, b) => {
    const dateDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    return dateDiff || b.id - a.id;
  });
}

export function getAllBlogs(): BlogListItem[] {
  return sortLatestFirst(blogIndex as BlogListItem[]);
}

export function getLatestBlogs(limit = 3): BlogListItem[] {
  return getAllBlogs().slice(0, limit);
}

export const getBlogBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
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
});

export function getRelatedBlogs(blog: BlogPost, limit = 3): BlogListItem[] {
  return getAllBlogs()
    .filter((item) => item.slug !== blog.slug)
    .filter((item) => item.category === blog.category || blog.tags.some((tag) => item.excerpt.toLowerCase().includes(tag.toLowerCase())))
    .slice(0, limit);
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllBlogs().map((blog) => blog.category).filter(Boolean))).sort();
}

export function getBlogsByCategory(category: string): BlogListItem[] {
  if (!category || category === "all") return getAllBlogs();
  return getAllBlogs().filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
}

export function searchBlogs(query: string, blogs = getAllBlogs()): BlogListItem[] {
  const term = query.trim().toLowerCase();
  if (!term) return blogs;

  return blogs.filter((blog) =>
    [blog.title, blog.excerpt, blog.category].some((value) => value.toLowerCase().includes(term))
  );
}

export function getAdjacentBlogs(slug: string) {
  const blogs = getAllBlogs();
  const index = blogs.findIndex((blog) => blog.slug === slug);

  return {
    previous: index > 0 ? blogs[index - 1] : null,
    next: index >= 0 && index < blogs.length - 1 ? blogs[index + 1] : null,
  };
}
