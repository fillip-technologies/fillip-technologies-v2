"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/db";
import { getSession } from "@/server/auth/session";
import { BlogPostModel } from "@/server/db/models";
import type { SaveState } from "./types";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createExcerpt(content: string): string {
  const text = textFromHtml(content);
  if (text.length <= 170) return text;
  return `${text.slice(0, 167).replace(/\s+\S*$/, "")}...`;
}

function readingTime(content: string): string {
  const words = textFromHtml(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function parseDate(value: unknown, fallback: Date): Date {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((tag) => tag.trim()).filter(Boolean);
  return String(value ?? "")
    .split(/[\n,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function revalidateBlogPaths(slug: string): void {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function createBlogPost(
  title: string,
  slug?: string
): Promise<SaveState & { slug?: string }> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  const cleanTitle = String(title ?? "").trim();
  if (!cleanTitle) {
    return { ok: false, message: "Enter a title for the blog post." };
  }

  const cleanSlug = slugify(slug && slug.trim() ? slug : cleanTitle);
  if (!cleanSlug) {
    return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };
  }

  try {
    await dbConnect();
    const existing = await BlogPostModel.findOne({ slug: cleanSlug }).select("slug").lean();
    if (existing) {
      return { ok: false, message: `A blog with slug "${cleanSlug}" already exists.` };
    }

    const [lastByOrder, lastById] = await Promise.all([
      BlogPostModel.findOne().sort({ sort_order: -1 }).lean(),
      BlogPostModel.findOne().sort({ id: -1 }).lean(),
    ]);
    const now = new Date();
    const sortOrder = Number(lastByOrder?.sort_order ?? 0) + 1;
    const id = Number(lastById?.id ?? 0) + 1;

    await BlogPostModel.create({
      id,
      title: cleanTitle,
      slug: cleanSlug,
      excerpt: "",
      content: "",
      featured_image: "",
      author: "Fillip Technologies",
      published_at: now,
      updated_at: now,
      reading_time: "1 min",
      category: "Blog",
      tags: [],
      seo: { title: cleanTitle, description: "", keywords: "" },
      published: false,
      sort_order: sortOrder,
      created_at: now,
      updated_db_at: now,
    });

    revalidatePath("/admin/cms/blogs");
    return { ok: true, message: "Draft created. Add content, then publish when ready.", slug: cleanSlug };
  } catch (err) {
    console.error("createBlogPost failed:", err);
    return { ok: false, message: "Something went wrong while creating the blog post." };
  }
}

export async function saveBlogPost(
  slug: string,
  data: Record<string, unknown>
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  try {
    await dbConnect();
    const post = await BlogPostModel.findOne({ slug }).lean();
    if (!post) {
      return { ok: false, message: "Unknown blog post." };
    }

    const title = String(data.title ?? "").trim();
    if (!title) {
      return { ok: false, message: "Title is required." };
    }

    const content = String(data.content ?? "").trim();
    const explicitExcerpt = String(data.excerpt ?? "").trim();
    const excerpt = explicitExcerpt || createExcerpt(content);
    const publishedAt = parseDate(data.publishedAt, post.published_at ?? new Date());
    const updatedAt = parseDate(data.updatedAt, post.updated_at ?? publishedAt);
    const manualReadingTime = String(data.readingTime ?? "").trim();
    const nextReadingTime = manualReadingTime || readingTime(content);
    const tags = parseTags(data.tags);

    await BlogPostModel.updateOne(
      { slug },
      {
        $set: {
          title,
          excerpt,
          content,
          featured_image: String(data.featuredImage ?? "").trim(),
          author: String(data.author ?? "Fillip Technologies").trim() || "Fillip Technologies",
          published_at: publishedAt,
          updated_at: updatedAt,
          reading_time: nextReadingTime,
          category: String(data.category ?? "").trim(),
          tags,
          seo: {
            title: String(data.seoTitle ?? "").trim() || title,
            description: String(data.seoDescription ?? "").trim() || excerpt,
            keywords: String(data.seoKeywords ?? "").trim() || tags.join(", "),
          },
          updated_db_at: new Date(),
        },
      }
    );

    revalidateBlogPaths(slug);
    revalidatePath("/admin/cms/blogs");
    revalidatePath(`/admin/cms/blogs/${slug}`);
    return { ok: true, message: "Saved. Blog content has been refreshed." };
  } catch (err) {
    console.error("saveBlogPost failed:", err);
    return { ok: false, message: "Something went wrong while saving the blog post." };
  }
}

export async function setBlogPostPublished(
  slug: string,
  published: boolean
): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  try {
    await dbConnect();
    const post = await BlogPostModel.findOne({ slug }).select("slug").lean();
    if (!post) {
      return { ok: false, message: "Unknown blog post." };
    }

    await BlogPostModel.updateOne(
      { slug },
      { $set: { published, updated_db_at: new Date() } }
    );
    revalidateBlogPaths(slug);
    revalidatePath("/admin/cms/blogs");
    return {
      ok: true,
      message: published ? "Published. The blog post is live." : "Unpublished. The blog post is hidden.",
    };
  } catch (err) {
    console.error("setBlogPostPublished failed:", err);
    return { ok: false, message: "Something went wrong." };
  }
}

export async function deleteBlogPost(slug: string): Promise<SaveState> {
  if (!(await getSession())) {
    return { ok: false, message: "Not authorized." };
  }

  try {
    await dbConnect();
    const post = await BlogPostModel.findOne({ slug }).select("slug").lean();
    if (!post) {
      return { ok: false, message: "Unknown blog post." };
    }

    await BlogPostModel.deleteOne({ slug });
    revalidateBlogPaths(slug);
    revalidatePath("/admin/cms/blogs");
    return { ok: true, message: "Blog post deleted." };
  } catch (err) {
    console.error("deleteBlogPost failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
