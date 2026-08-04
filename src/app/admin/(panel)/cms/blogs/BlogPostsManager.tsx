"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink, Plus, Trash2 } from "lucide-react";
import {
  createBlogPost,
  deleteBlogPost,
  setBlogPostPublished,
} from "@/server/content/blog-actions";
import type { BlogCmsListItem } from "@/server/content/blog-registry";

const previewSlug = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogPostsManager({ initial }: { initial: BlogCmsListItem[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const effectiveSlug = previewSlug(slug || title);
  const visiblePosts = initial.filter((post) => {
    if (filter === "published") return post.published;
    if (filter === "draft") return !post.published;
    return true;
  });

  const create = () => {
    setMsg(null);
    startTransition(async () => {
      const res = await createBlogPost(title, slug);
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok && res.slug) {
        setTitle("");
        setSlug("");
        router.push(`/admin/cms/blogs/${res.slug}`);
      }
    });
  };

  const togglePublish = (s: string, next: boolean) => {
    setMsg(null);
    startTransition(async () => {
      const res = await setBlogPostPublished(s, next);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  const remove = (s: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setMsg(null);
    startTransition(async () => {
      const res = await deleteBlogPost(s);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card/40 p-5">
        <h2 className="mb-3 text-sm font-semibold text-heading">Add a new blog post</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="blog-title" className="mb-1 block text-sm text-body">
              Title
            </label>
            <input
              id="blog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How AI Helps Small Businesses"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="blog-slug" className="mb-1 block text-sm text-body">
              Slug <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="blog-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto from title"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          URL: <code>/blog/{effectiveSlug || "..."}</code> - starts as an unpublished draft.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={create}
            disabled={pending || !title.trim()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
          >
            <Plus size={16} /> {pending ? "Creating..." : "Create draft"}
          </button>
          {msg ? (
            <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          label="All"
          count={initial.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterChip
          label="Published"
          count={initial.filter((post) => post.published).length}
          active={filter === "published"}
          onClick={() => setFilter("published")}
        />
        <FilterChip
          label="Drafts"
          count={initial.filter((post) => !post.published).length}
          active={filter === "draft"}
          onClick={() => setFilter("draft")}
        />
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {visiblePosts.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">
            {initial.length === 0 ? "No blog posts in the CMS database yet." : "No posts match this filter."}
          </li>
        ) : null}
        {visiblePosts.map((post) => (
          <li key={post.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <Link href={`/admin/cms/blogs/${post.slug}`} className="group min-w-0 flex-1">
              <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                {post.title}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    post.published ? "bg-green-500/15 text-green-600" : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </p>
              <p className="truncate text-sm text-muted-foreground">
                /blog/{post.slug} - {post.category || "Uncategorized"} - {formatDate(post.publishedAt)}
              </p>
            </Link>

            <div className="flex items-center gap-1">
              {post.published ? (
                <IconLink href={`/blog/${post.slug}`} title="View live blog">
                  <ExternalLink size={16} />
                </IconLink>
              ) : null}
              <button
                type="button"
                onClick={() => togglePublish(post.slug, !post.published)}
                disabled={pending}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  post.published
                    ? "border-border text-body hover:bg-card"
                    : "border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => remove(post.slug, post.title)}
                disabled={pending}
                title="Delete"
                className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
              <Link
                href={`/admin/cms/blogs/${post.slug}`}
                className="rounded-md p-2 text-muted-foreground hover:bg-card"
                title="Edit blog"
              >
                <ChevronRight size={18} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-body hover:bg-card"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-xs ${
          active ? "bg-primary/20 text-primary" : "bg-card text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function IconLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-heading"
    >
      {children}
    </a>
  );
}
