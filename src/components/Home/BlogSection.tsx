"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import blogIndex from "@/data/blogs/index.json";
import type { BlogListItem } from "@/lib/schema";

const blogPosts = (blogIndex as BlogListItem[])
  .slice()
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3);

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// CMS-editable content (key: home.blog). Posts still auto-load from published
// blogs; only the heading/eyebrow/button label are editable.
type BlogContent = Partial<{
  eyebrow: string;
  heading: string;
  ctaLabel: string;
}>;

export default function BlogSection({ content: raw = {} }: { content?: Record<string, unknown> }) {
  const content = raw as BlogContent;
  const c = {
    eyebrow: content.eyebrow ?? "Our Blog",
    heading: content.heading ?? "Latest Blog",
    ctaLabel: content.ctaLabel ?? "View All Blogs",
  };

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  if (blogPosts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 lg:py-28"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full blur-[140px] opacity-40"
        style={{ background: "var(--glow-primary)" }}
      />
      <div
        className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[140px] opacity-30"
        style={{ background: "var(--glow-accent)" }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary text-center mb-3">
            {c.eyebrow}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-heading text-center">
            {c.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                relative
                flex
                flex-col
                overflow-hidden
                rounded-[32px]
                border
                border-border
                bg-card
                shadow-sm
                transition-shadow
                duration-300
                hover:shadow-md
              "
            >
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/11] w-full overflow-hidden bg-slate-100">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-100 px-8 text-center text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                    Fillip Technologies
                  </div>
                )}

                {post.category ? (
                  <div className="absolute right-6 top-6 rounded-full border border-primary/20 bg-white/90 px-3 py-1 text-[11px] font-bold text-primary backdrop-blur shadow-sm">
                    {post.category}
                  </div>
                ) : null}
              </Link>

              <div className="flex flex-1 flex-col justify-between px-8 pb-8 pt-7">
                <div>
                  <h3 className="text-xl font-bold leading-snug text-heading group-hover:text-primary transition-colors duration-300 mb-4">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-6 text-body">{post.excerpt}</p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-bold tracking-wider text-primary hover:underline mb-6"
                  >
                    READ MORE
                  </Link>
                </div>

                <div>
                  <div className="h-[1px] bg-border w-full mb-4" />
                  <div className="flex items-center text-xs text-body font-medium">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="mx-2">-</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(2,66,162,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(2,66,162,0.24)]"
          >
            {c.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
