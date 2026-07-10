"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink, Eye, Plus, Trash2 } from "lucide-react";
import {
  createServicePage,
  deleteServicePage,
  setServicePagePublishedAction,
} from "@/server/content/servicepage-actions";

type ServicePage = {
  slug: string;
  title: string;
  template: string;
  categorySlug: string | null;
  published: boolean;
  sortOrder: number;
  urlPrefix: string;
};
type Category = { slug: string; label: string };
type Template = { id: string; label: string; urlPrefix: string };

const previewSlug = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function ServicePagesManager({
  initial,
  categories,
  templates,
}: {
  initial: ServicePage[];
  categories: Category[];
  templates: Template[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [template, setTemplate] = useState(templates[0]?.id ?? "service");
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug ?? "");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  // "all" shows every page; otherwise filter the list to one category.
  const [filter, setFilter] = useState<string>("all");

  const effectiveSlug = previewSlug(slug || title);
  const labelFor = (s: string | null) => categories.find((c) => c.slug === s)?.label ?? "—";
  const selectedPrefix = templates.find((t) => t.id === template)?.urlPrefix ?? "/services";

  // Only offer filters for categories that actually have pages, plus a count.
  const countFor = (s: string) => initial.filter((p) => p.categorySlug === s).length;
  const visiblePages = filter === "all" ? initial : initial.filter((p) => p.categorySlug === filter);

  const create = () => {
    setMsg(null);
    startTransition(async () => {
      const res = await createServicePage(title, categorySlug, template, slug);
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok && res.slug) {
        setTitle("");
        setSlug("");
        router.push(`/admin/cms/services/${res.slug}`);
      }
    });
  };

  const togglePublish = (s: string, next: boolean) => {
    setMsg(null);
    startTransition(async () => {
      const res = await setServicePagePublishedAction(s, next);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  const remove = (s: string, name: string) => {
    if (!window.confirm(`Delete “${name}” and all its content? This cannot be undone.`)) return;
    setMsg(null);
    startTransition(async () => {
      const res = await deleteServicePage(s);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      {/* Create form */}
      <div className="rounded-lg border border-border bg-card/40 p-5">
        <h2 className="mb-3 text-sm font-semibold text-heading">Add a new page</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sp-title" className="mb-1 block text-sm text-body">
              Name
            </label>
            <input
              id="sp-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Progressive Web Apps"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="sp-slug" className="mb-1 block text-sm text-body">
              Slug <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="sp-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto from name"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="sp-category" className="mb-1 block text-sm text-body">
              What We Do category
            </label>
            <select
              id="sp-category"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            >
              {categories.length === 0 ? <option value="">No categories</option> : null}
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sp-template" className="mb-1 block text-sm text-body">
              Template
            </label>
            <select
              id="sp-template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          URL: <code>{selectedPrefix}/{effectiveSlug || "…"}</code> · added to the{" "}
          <strong className="text-heading">{labelFor(categorySlug)}</strong> menu · starts as an
          unpublished draft.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={create}
            disabled={pending || !title.trim() || !categorySlug}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
          >
            <Plus size={16} /> {pending ? "Creating…" : "Create draft"}
          </button>
          {msg ? (
            <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</p>
          ) : null}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          label="All"
          count={initial.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {categories.map((c) => {
          const n = countFor(c.slug);
          if (n === 0) return null;
          return (
            <FilterChip
              key={c.slug}
              label={c.label}
              count={n}
              active={filter === c.slug}
              onClick={() => setFilter(c.slug)}
            />
          );
        })}
      </div>

      {/* List */}
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {visiblePages.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">
            {initial.length === 0 ? "No service pages yet." : "No pages in this category."}
          </li>
        ) : null}
        {visiblePages.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <Link href={`/admin/cms/services/${p.slug}`} className="min-w-0 flex-1 group">
              <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                {p.title}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    p.published ? "bg-green-500/15 text-green-600" : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {p.published ? "Published" : "Draft"}
                </span>
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {p.urlPrefix}/{p.slug} · {labelFor(p.categorySlug)}
              </p>
            </Link>

            <div className="flex items-center gap-1">
              <IconLink href={`${p.urlPrefix}/${p.slug}/preview`} title="Preview draft">
                <Eye size={16} />
              </IconLink>
              {p.published ? (
                <IconLink href={`${p.urlPrefix}/${p.slug}`} title="View live page">
                  <ExternalLink size={16} />
                </IconLink>
              ) : null}
              <button
                type="button"
                onClick={() => togglePublish(p.slug, !p.published)}
                disabled={pending}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  p.published
                    ? "border-border text-body hover:bg-card"
                    : "border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {p.published ? "Unpublish" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => remove(p.slug, p.title)}
                disabled={pending}
                title="Delete"
                className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
              <Link
                href={`/admin/cms/services/${p.slug}`}
                className="rounded-md p-2 text-muted-foreground hover:bg-card"
                title="Edit sections"
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
