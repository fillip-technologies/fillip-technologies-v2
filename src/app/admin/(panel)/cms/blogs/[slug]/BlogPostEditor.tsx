"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  saveBlogPost,
  setBlogPostPublished,
} from "@/server/content/blog-actions";
import type { BlogCmsPost } from "@/server/content/blog-registry";
import type { SaveState } from "@/server/content/types";

type Values = {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

function dateInput(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function BlogPostEditor({ post }: { post: BlogCmsPost }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState | null>(null);
  const [published, setPublished] = useState(post.published);
  const [values, setValues] = useState<Values>({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    author: post.author,
    publishedAt: dateInput(post.publishedAt),
    updatedAt: dateInput(post.updatedAt),
    readingTime: post.readingTime,
    category: post.category,
    tags: post.tags.join(", "),
    seoTitle: post.seo.title,
    seoDescription: post.seo.description,
    seoKeywords: post.seo.keywords,
  });

  const setField = (name: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const save = () => {
    startTransition(async () => {
      const res = await saveBlogPost(post.slug, values);
      setState(res);
      router.refresh();
    });
  };

  const togglePublished = () => {
    startTransition(async () => {
      const next = !published;
      const res = await setBlogPostPublished(post.slug, next);
      setState(res);
      if (res.ok) setPublished(next);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <Field label="Title" id="title">
            <input
              id="title"
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </Field>

          <Field label="Excerpt" id="excerpt">
            <textarea
              id="excerpt"
              value={values.excerpt}
              onChange={(e) => setField("excerpt", e.target.value)}
              rows={4}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </Field>

          <Field label="Content HTML" id="content">
            <textarea
              id="content"
              value={values.content}
              onChange={(e) => setField("content", e.target.value)}
              rows={22}
              className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-heading outline-none focus:border-primary"
            />
          </Field>

          <div className="rounded-lg border border-border bg-card/40 p-5">
            <h2 className="mb-4 text-sm font-semibold text-heading">SEO</h2>
            <div className="space-y-4">
              <Field label="SEO title" id="seoTitle">
                <input
                  id="seoTitle"
                  value={values.seoTitle}
                  onChange={(e) => setField("seoTitle", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
              <Field label="SEO description" id="seoDescription">
                <textarea
                  id="seoDescription"
                  value={values.seoDescription}
                  onChange={(e) => setField("seoDescription", e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
              <Field label="SEO keywords" id="seoKeywords">
                <input
                  id="seoKeywords"
                  value={values.seoKeywords}
                  onChange={(e) => setField("seoKeywords", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-border bg-card/40 p-5">
            <h2 className="mb-4 text-sm font-semibold text-heading">Publishing</h2>
            <div className="space-y-4">
              <Field label="Status" id="status">
                <button
                  id="status"
                  type="button"
                  onClick={togglePublished}
                  disabled={pending}
                  className={`w-full rounded-md border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
                    published
                      ? "border-border text-body hover:bg-card"
                      : "border-primary/40 text-primary hover:bg-primary/10"
                  }`}
                >
                  {published ? "Unpublish" : "Publish"}
                </button>
              </Field>
              <Field label="Published date" id="publishedAt">
                <input
                  id="publishedAt"
                  type="date"
                  value={values.publishedAt}
                  onChange={(e) => setField("publishedAt", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
              <Field label="Updated date" id="updatedAt">
                <input
                  id="updatedAt"
                  type="date"
                  value={values.updatedAt}
                  onChange={(e) => setField("updatedAt", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
              <Field label="Reading time" id="readingTime">
                <input
                  id="readingTime"
                  value={values.readingTime}
                  onChange={(e) => setField("readingTime", e.target.value)}
                  placeholder="Auto if blank"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card/40 p-5">
            <h2 className="mb-4 text-sm font-semibold text-heading">Details</h2>
            <div className="space-y-4">
              <Field label="Featured image" id="featuredImage">
                <ImageField
                  value={values.featuredImage}
                  onChange={(value) => setField("featuredImage", value)}
                />
              </Field>
              <Field label="Author" id="author">
                <input
                  id="author"
                  value={values.author}
                  onChange={(e) => setField("author", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
              <Field label="Category" id="category">
                <input
                  id="category"
                  value={values.category}
                  onChange={(e) => setField("category", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
              <Field label="Tags" id="tags">
                <textarea
                  id="tags"
                  value={values.tags}
                  onChange={(e) => setField("tags", e.target.value)}
                  rows={3}
                  placeholder="Comma or newline separated"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </Field>
            </div>
          </div>
        </aside>
      </div>

      <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-surface/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save changes"}
        </button>
        {state?.message ? (
          <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-500"}`}>{state.message}</p>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-body">
        {label}
      </label>
      {children}
    </div>
  );
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Upload failed.");
      onChange(data.url as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-card/40">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          )}
        </div>
        <div className="space-y-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary">
            {uploading ? "Uploading..." : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
                e.target.value = "";
              }}
            />
          </label>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="ml-2 text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/uploads/... or https://..."
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary"
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
