import type { Metadata } from "next";
import type { BlogPost } from "@/lib/schema";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { blogPostingJsonLd } from "@/lib/seo/schema";

export function createBlogMetadata(blog: BlogPost): Metadata {
  const title = blog.seo.title || blog.title;
  const description = blog.seo.description || blog.excerpt;
  const canonical = `/blog/${blog.slug}`;

  return buildSeoMetadata({
    path: canonical,
    slug: blog.slug,
    kind: "blog",
    status: "published",
    title,
    description,
    canonical,
    keywords: blog.seo.keywords || blog.tags,
    openGraph: {
      title,
      description,
      type: "article",
      image: blog.featuredImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: blog.featuredImage,
    },
    robots: {
      index: true,
      follow: true,
    },
  });
}

export function createBlogJsonLd(blog: BlogPost) {
  return blogPostingJsonLd({
    title: blog.title,
    description: blog.seo.description || blog.excerpt,
    slug: blog.slug,
    image: blog.featuredImage,
    publishedAt: blog.publishedAt,
    updatedAt: blog.updatedAt,
    author: blog.author,
  });
}
