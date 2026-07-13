/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogListItem } from "@/lib/schema";
import BlogMeta from "@/components/blog/BlogMeta";

type BlogCardProps = {
  blog: BlogListItem;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/11] w-full overflow-hidden bg-slate-100">
        {blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 px-8 text-center text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Fillip Technologies
          </div>
        )}
        {blog.category ? (
          <span className="absolute right-6 top-6 rounded-full border border-primary/20 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary backdrop-blur shadow-sm">
            {blog.category}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-7">
        <div>
          <h3 className="mb-4 text-xl font-bold leading-snug text-heading transition-colors duration-300 group-hover:text-primary">
            <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h3>
          <p className="mb-6 line-clamp-3 text-sm leading-6 text-body">{blog.excerpt}</p>
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <BlogMeta publishedAt={blog.publishedAt} readingTime={blog.readingTime} />
        </div>
      </div>
    </article>
  );
}
