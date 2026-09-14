"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/session";
import { slugify } from "@/lib/slug";
import { createExcerpt, parseDate, parseTags, readingTime } from "@/lib/blog-utils";
import {
  checkBlogSlugExists,
  getBlogCmsPost,
  insertBlogPost,
  patchBlogPost,
  setBlogPublished,
  removeBlogPost,
} from "./blog-registry";
import { UNAUTHORIZED } from "./types";
import type { SaveState } from "./types";

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
  if (!(await getSession())) return UNAUTHORIZED;

  const cleanTitle = String(title ?? "").trim();
  if (!cleanTitle) return { ok: false, message: "Enter a title for the blog post." };

  const cleanSlug = slugify(slug && slug.trim() ? slug : cleanTitle);
  if (!cleanSlug) return { ok: false, message: "Enter a valid slug (letters, numbers, dashes)." };

  try {
    if (await checkBlogSlugExists(cleanSlug)) {
      return { ok: false, message: `A blog with slug "${cleanSlug}" already exists.` };
    }
    await insertBlogPost(cleanSlug, cleanTitle);
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
  if (!(await getSession())) return UNAUTHORIZED;

  try {
    const post = await getBlogCmsPost(slug);
    if (!post) return { ok: false, message: "Unknown blog post." };

    const title = String(data.title ?? "").trim();
    if (!title) return { ok: false, message: "Title is required." };

    const content = String(data.content ?? "").trim();
    const explicitExcerpt = String(data.excerpt ?? "").trim();
    const excerpt = explicitExcerpt || createExcerpt(content);
    const publishedAt = parseDate(data.publishedAt, new Date(post.publishedAt));
    const updatedAt = parseDate(data.updatedAt, new Date(post.updatedAt));
    const manualReadingTime = String(data.readingTime ?? "").trim();
    const nextReadingTime = manualReadingTime || readingTime(content);
    const tags = parseTags(data.tags);

    const ok = await patchBlogPost(slug, {
      title,
      excerpt,
      content,
      featuredImage: String(data.featuredImage ?? "").trim(),
      author: String(data.author ?? "Fillip Technologies").trim() || "Fillip Technologies",
      publishedAt,
      updatedAt,
      readingTime: nextReadingTime,
      category: String(data.category ?? "").trim(),
      tags,
      seo: {
        title: String(data.seoTitle ?? "").trim() || title,
        description: String(data.seoDescription ?? "").trim() || excerpt,
        keywords: String(data.seoKeywords ?? "").trim() || tags.join(", "),
      },
    });

    if (!ok) return { ok: false, message: "Unknown blog post." };
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
  if (!(await getSession())) return UNAUTHORIZED;

  try {
    const ok = await setBlogPublished(slug, published);
    if (!ok) return { ok: false, message: "Unknown blog post." };
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
  if (!(await getSession())) return UNAUTHORIZED;

  try {
    const ok = await removeBlogPost(slug);
    if (!ok) return { ok: false, message: "Unknown blog post." };
    revalidateBlogPaths(slug);
    revalidatePath("/admin/cms/blogs");
    return { ok: true, message: "Blog post deleted." };
  } catch (err) {
    console.error("deleteBlogPost failed:", err);
    return { ok: false, message: "Something went wrong while deleting." };
  }
}
