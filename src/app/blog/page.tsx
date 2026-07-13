import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogHero from "@/components/blog/BlogHero";
import BlogSearch from "@/components/blog/BlogSearch";
import { getBlogsByCategory, getCategories, searchBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog | Fillip Technologies",
  description: "Read the latest insights from Fillip Technologies on technology, digital marketing, software, AI, design, and business growth.",
  alternates: {
    canonical: "/blog",
  },
};

const pageSize = 9;

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const category = params.category ?? "all";
  const currentPage = Math.max(Number(params.page ?? "1"), 1);

  const categoryBlogs = getBlogsByCategory(category);
  const filteredBlogs = searchBlogs(query, categoryBlogs);
  const totalPages = Math.max(Math.ceil(filteredBlogs.length / pageSize), 1);
  const safePage = Math.min(currentPage, totalPages);
  const blogs = filteredBlogs.slice((safePage - 1) * pageSize, safePage * pageSize);

  const createPageHref = (page: number) => {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set("q", query);
    if (category !== "all") nextParams.set("category", category);
    if (page > 1) nextParams.set("page", String(page));
    return nextParams.toString() ? `/blog?${nextParams.toString()}` : "/blog";
  };

  return (
    <>
      <BlogHero
        title="Latest Blog"
        description="Practical insights on technology, digital transformation, marketing, software development, design, and business growth."
      />

      <main className="bg-background py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <form action="/blog" className="mx-auto mb-8 max-w-2xl">
            {category !== "all" ? <input type="hidden" name="category" value={category} /> : null}
            <BlogSearch value={query} />
          </form>

          <div className="mb-12">
            <BlogCategories categories={getCategories()} activeCategory={category} query={query} />
          </div>

          <BlogGrid blogs={blogs} />

          {totalPages > 1 ? (
            <div className="mt-14 flex items-center justify-center gap-3">
              {safePage > 1 ? (
                <Link href={createPageHref(safePage - 1)} className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-heading hover:border-primary hover:text-primary">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              ) : null}
              <span className="rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-body">
                Page {safePage} of {totalPages}
              </span>
              {safePage < totalPages ? (
                <Link href={createPageHref(safePage + 1)} className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-heading hover:border-primary hover:text-primary">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
