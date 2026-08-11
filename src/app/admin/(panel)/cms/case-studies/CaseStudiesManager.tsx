"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink, Eye, Plus, Trash2 } from "lucide-react";
import {
  createCaseStudy,
  deleteCaseStudy,
  setCaseStudyPublishedAction,
} from "@/server/content/casestudy-actions";

type CaseStudyRow = { slug: string; title: string; industry: string; published: boolean };

// Live-preview the slug the same way the server derives it.
const previewSlug = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function CaseStudiesManager({ initial }: { initial: CaseStudyRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [slug, setSlug] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const effectiveSlug = previewSlug(slug || title);

  const create = () => {
    setMsg(null);
    startTransition(async () => {
      const res = await createCaseStudy(title, industry, slug);
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok && res.slug) {
        setTitle("");
        setIndustry("");
        setSlug("");
        router.push(`/admin/cms/case-studies/${res.slug}`);
      }
    });
  };

  const togglePublish = (s: string, next: boolean) => {
    setMsg(null);
    startTransition(async () => {
      const res = await setCaseStudyPublishedAction(s, next);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  const remove = (s: string, name: string) => {
    if (!window.confirm(`Delete “${name}” and all its content? This cannot be undone.`)) return;
    setMsg(null);
    startTransition(async () => {
      const res = await deleteCaseStudy(s);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      {/* Create form */}
      <div className="rounded-lg border border-border bg-card/40 p-5">
        <h2 className="mb-3 text-sm font-semibold text-heading">Add a new case study</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="cs-title" className="mb-1 block text-sm text-body">
              Title
            </label>
            <input
              id="cs-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Revolutionizing Healthcare…"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="cs-industry" className="mb-1 block text-sm text-body">
              Industry <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="cs-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Healthcare"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="cs-slug" className="mb-1 block text-sm text-body">
              Slug <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="cs-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto from title"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          URL: <code>/case-studies/{effectiveSlug || "…"}</code> · starts as an unpublished draft.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={create}
            disabled={pending || !title.trim()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
          >
            <Plus size={16} /> {pending ? "Creating…" : "Create draft"}
          </button>
          {msg ? (
            <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</p>
          ) : null}
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {initial.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">No case studies yet.</li>
        ) : null}
        {initial.map((cs) => (
          <li key={cs.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <Link href={`/admin/cms/case-studies/${cs.slug}`} className="min-w-0 flex-1 group">
              <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                {cs.title || cs.slug}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    cs.published
                      ? "bg-green-500/15 text-green-600"
                      : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {cs.published ? "Published" : "Draft"}
                </span>
              </p>
              <p className="truncate text-sm text-muted-foreground">/case-studies/{cs.slug}</p>
            </Link>

            <div className="flex items-center gap-1">
              <IconLink href={`/case-studies/${cs.slug}/preview`} title="Preview draft">
                <Eye size={16} />
              </IconLink>
              {cs.published ? (
                <IconLink href={`/case-studies/${cs.slug}`} title="View live page">
                  <ExternalLink size={16} />
                </IconLink>
              ) : null}
              <button
                type="button"
                onClick={() => togglePublish(cs.slug, !cs.published)}
                disabled={pending}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  cs.published
                    ? "border-border text-body hover:bg-card"
                    : "border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {cs.published ? "Unpublish" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => remove(cs.slug, cs.title || cs.slug)}
                disabled={pending}
                title="Delete"
                className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
              <Link
                href={`/admin/cms/case-studies/${cs.slug}`}
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
