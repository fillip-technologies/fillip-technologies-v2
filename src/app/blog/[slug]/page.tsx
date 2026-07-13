/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BlogContent, { getTableOfContents } from "@/components/blog/BlogContent";
import BlogMeta from "@/components/blog/BlogMeta";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumb from "@/components/blog/Breadcrumb";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import ShareButtons from "@/components/blog/ShareButtons";
import { createBlogJsonLd, createBlogMetadata } from "@/lib/metadata";
import { getAdjacentBlogs, getAllBlogs, getBlogBySlug, getLatestBlogs, getRelatedBlogs } from "@/lib/blogs";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};
  return createBlogMetadata(blog);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const toc = getTableOfContents(blog.content);
  const relatedBlogs = getRelatedBlogs(blog);
  const latestBlogs = getLatestBlogs(4).filter((item) => item.slug !== blog.slug).slice(0, 3);
  const { previous, next } = getAdjacentBlogs(blog.slug);
  const jsonLd = createBlogJsonLd(blog);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-background">
        <section className="relative overflow-hidden py-20 lg:py-24">
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
          <div className="relative z-10 container mx-auto max-w-6xl px-6">
            <Breadcrumb current={blog.title} />
            <div className="max-w-4xl">
              {blog.category ? (
                <span className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {blog.category}
                </span>
              ) : null}
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-heading md:text-6xl">{blog.title}</h1>
              <p className="mt-6 text-lg leading-8 text-body">{blog.excerpt}</p>
              <div className="mt-8">
                <BlogMeta publishedAt={blog.publishedAt} readingTime={blog.readingTime} author={blog.author} />
              </div>
            </div>
          </div>
        </section>

        {blog.featuredImage ? (
          <div className="container mx-auto max-w-6xl px-6">
            <div className="aspect-[16/8] overflow-hidden rounded-[36px] bg-slate-100 shadow-sm">
              <img src={blog.featuredImage} alt={blog.title} className="h-full w-full object-cover" />
            </div>
          </div>
        ) : null}

        <section className="py-16 lg:py-20">
          <div className="container mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-[32px] border border-border bg-card p-6 shadow-sm md:p-10">
              <BlogContent content={blog.content} />

              <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-8">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Share</p>
                  <ShareButtons title={blog.title} slug={blog.slug} />
                </div>
                {blog.tags.length > 0 ? (
                  <div className="flex max-w-xl flex-wrap justify-end gap-2">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-body">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-12 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
                {previous ? (
                  <Link href={`/blog/${previous.slug}`} className="rounded-[24px] border border-border bg-background p-5 transition hover:border-primary/40">
                    <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </span>
                    <span className="font-bold text-heading">{previous.title}</span>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link href={`/blog/${next.slug}`} className="rounded-[24px] border border-border bg-background p-5 text-right transition hover:border-primary/40">
                    <span className="mb-2 flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="font-bold text-heading">{next.title}</span>
                  </Link>
                ) : null}
              </div>
            </article>

            <BlogSidebar toc={toc} latestBlogs={latestBlogs} />
          </div>

          <div className="container mx-auto max-w-7xl px-6">
            <RelatedBlogs blogs={relatedBlogs} />
          </div>
        </section>
      </main>
    </>
  );
}
