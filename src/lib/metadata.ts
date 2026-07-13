import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { BlogPost } from "@/lib/schema";

export function createBlogMetadata(blog: BlogPost): Metadata {
  const title = blog.seo.title || blog.title;
  const description = blog.seo.description || blog.excerpt;
  const canonical = `/blog/${blog.slug}`;
  const images = blog.featuredImage ? [blog.featuredImage] : undefined;

  return {
    title,
    description,
    keywords: blog.seo.keywords || blog.tags,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt || blog.publishedAt,
      authors: [blog.author],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createBlogJsonLd(blog: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo.description || blog.excerpt,
    image: blog.featuredImage ? [blog.featuredImage] : undefined,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      "@type": "Organization",
      name: blog.author || "Fillip Technologies",
    },
    publisher: {
      "@type": "Organization",
      name: "Fillip Technologies",
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${blog.slug}`,
    },
  };
}
