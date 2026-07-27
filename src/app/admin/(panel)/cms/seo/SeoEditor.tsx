"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { savePageSeo, type SeoSaveState } from "@/server/content/seo-actions";
import { PAGE_SEO_STATUSES, type PageSeoInput } from "@/lib/seo/page-seo";

/**
 * The full per-page SEO editor. Blank fields fall back to the hardcoded default
 * (shown as the input placeholder). Saving with status "published" runs the
 * publish gate server-side and surfaces any blocking issues inline.
 */
export default function SeoEditor({
  path,
  initial,
  fallback,
  computedCanonical,
}: {
  path: string;
  initial: PageSeoInput;
  fallback: PageSeoInput;
  computedCanonical: string;
}) {
  const [form, setForm] = useState<PageSeoInput>(initial);
  const [state, setState] = useState<SeoSaveState | null>(null);
  const [pending, startTransition] = useTransition();

  const setTop = <K extends keyof PageSeoInput>(k: K, v: PageSeoInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const setSeo = <K extends keyof PageSeoInput["seo"]>(k: K, v: PageSeoInput["seo"][K]) =>
    setForm((f) => ({ ...f, seo: { ...f.seo, [k]: v } }));
  const setPage = <K extends keyof PageSeoInput["pageSeo"]>(k: K, v: PageSeoInput["pageSeo"][K]) =>
    setForm((f) => ({ ...f, pageSeo: { ...f.pageSeo, [k]: v } }));

  const save = () =>
    startTransition(async () => {
      setState(await savePageSeo(path, form));
    });

  const faqs = form.pageSeo.faqs ?? [];
  const images = form.pageSeo.images ?? [];
  const links = form.pageSeo.internalLinks ?? [];

  return (
    <div className="space-y-8">
      {/* Status & slug */}
      <Group title="Status & slug">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Status">
            <select
              value={form.status}
              onChange={(e) => setTop("status", e.target.value as PageSeoInput["status"])}
              className={inputCls}
            >
              {PAGE_SEO_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <Help>Only “published” pages appear in the sitemap. Publishing runs SEO checks.</Help>
          </Labeled>
          <Labeled label="Slug">
            <input value={form.slug} onChange={(e) => setTop("slug", e.target.value)} placeholder={fallback.slug} className={inputCls} />
            <Help>Lowercase letters, numbers and dashes.</Help>
          </Labeled>
        </div>
      </Group>

      {/* Meta */}
      <Group title="Meta">
        <Labeled label="Meta title">
          <input value={form.seo.metaTitle} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder={fallback.seo.metaTitle} className={inputCls} />
        </Labeled>
        <Labeled label="Meta description">
          <textarea value={form.seo.metaDescription} onChange={(e) => setSeo("metaDescription", e.target.value)} placeholder={fallback.seo.metaDescription} rows={3} className={inputCls} />
        </Labeled>
        <Labeled label="Canonical URL">
          <input value={form.seo.canonicalUrl} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder={computedCanonical} className={inputCls} />
          <Help>Leave blank to auto-generate: {computedCanonical}</Help>
        </Labeled>
        <div className="flex flex-wrap gap-6">
          <Check label="Index (robots)" checked={form.seo.robots.index} onChange={(v) => setSeo("robots", { ...form.seo.robots, index: v })} />
          <Check label="Follow (robots)" checked={form.seo.robots.follow} onChange={(v) => setSeo("robots", { ...form.seo.robots, follow: v })} />
        </div>
      </Group>

      {/* Open Graph */}
      <Group title="Open Graph (Facebook / LinkedIn)">
        <Labeled label="OG title">
          <input value={form.seo.ogTitle} onChange={(e) => setSeo("ogTitle", e.target.value)} placeholder={fallback.seo.ogTitle || fallback.seo.metaTitle} className={inputCls} />
        </Labeled>
        <Labeled label="OG description">
          <textarea value={form.seo.ogDescription} onChange={(e) => setSeo("ogDescription", e.target.value)} placeholder={fallback.seo.ogDescription || fallback.seo.metaDescription} rows={2} className={inputCls} />
        </Labeled>
        <Labeled label="OG image">
          <ImageInput value={form.seo.ogImage} placeholder={fallback.seo.ogImage} onChange={(v) => setSeo("ogImage", v)} />
        </Labeled>
      </Group>

      {/* Twitter */}
      <Group title="Twitter / X card">
        <Labeled label="Twitter title">
          <input value={form.seo.twitterTitle} onChange={(e) => setSeo("twitterTitle", e.target.value)} placeholder={fallback.seo.twitterTitle || fallback.seo.ogTitle} className={inputCls} />
        </Labeled>
        <Labeled label="Twitter description">
          <textarea value={form.seo.twitterDescription} onChange={(e) => setSeo("twitterDescription", e.target.value)} placeholder={fallback.seo.twitterDescription || fallback.seo.ogDescription} rows={2} className={inputCls} />
        </Labeled>
        <Labeled label="Twitter image">
          <ImageInput value={form.seo.twitterImage} placeholder={fallback.seo.twitterImage || fallback.seo.ogImage} onChange={(v) => setSeo("twitterImage", v)} />
        </Labeled>
      </Group>

      {/* Page signals */}
      <Group title="On-page signals">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="H1"><input value={form.pageSeo.h1} onChange={(e) => setPage("h1", e.target.value)} placeholder={fallback.pageSeo.h1} className={inputCls} /></Labeled>
          <Labeled label="Breadcrumb label"><input value={form.pageSeo.breadcrumbLabel} onChange={(e) => setPage("breadcrumbLabel", e.target.value)} placeholder={fallback.pageSeo.breadcrumbLabel} className={inputCls} /></Labeled>
          <Labeled label="Service name"><input value={form.pageSeo.serviceName ?? ""} onChange={(e) => setPage("serviceName", e.target.value)} placeholder={fallback.pageSeo.serviceName} className={inputCls} /><Help>Required to publish a service page.</Help></Labeled>
          <Labeled label="City"><input value={form.pageSeo.city ?? ""} onChange={(e) => setPage("city", e.target.value)} placeholder={fallback.pageSeo.city} className={inputCls} /></Labeled>
          <Labeled label="State"><input value={form.pageSeo.state ?? ""} onChange={(e) => setPage("state", e.target.value)} className={inputCls} /></Labeled>
          <Labeled label="Country"><input value={form.pageSeo.country ?? ""} onChange={(e) => setPage("country", e.target.value)} placeholder="IN" className={inputCls} /></Labeled>
        </div>
      </Group>

      {/* FAQs */}
      <Repeater
        title="FAQs"
        noun="FAQ"
        count={faqs.length}
        onAdd={() => setPage("faqs", [...faqs, { question: "", answer: "" }])}
      >
        {faqs.map((f, i) => (
          <RepeaterRow
            key={i}
            index={i}
            last={i === faqs.length - 1}
            onMove={(d) => setPage("faqs", move(faqs, i, d))}
            onRemove={() => setPage("faqs", faqs.filter((_, j) => j !== i))}
          >
            <input value={f.question} onChange={(e) => setPage("faqs", faqs.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)))} placeholder="Question" className={inputCls} />
            <textarea value={f.answer} onChange={(e) => setPage("faqs", faqs.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))} placeholder="Answer" rows={2} className={inputCls} />
          </RepeaterRow>
        ))}
      </Repeater>

      {/* Images */}
      <Repeater
        title="Images (with alt text)"
        noun="image"
        count={images.length}
        onAdd={() => setPage("images", [...images, { url: "", alt: "" }])}
      >
        {images.map((img, i) => (
          <RepeaterRow
            key={i}
            index={i}
            last={i === images.length - 1}
            onMove={(d) => setPage("images", move(images, i, d))}
            onRemove={() => setPage("images", images.filter((_, j) => j !== i))}
          >
            <ImageInput value={img.url} onChange={(v) => setPage("images", images.map((x, j) => (j === i ? { ...x, url: v } : x)))} />
            <input value={img.alt} onChange={(e) => setPage("images", images.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))} placeholder="Alt text (required to publish)" className={inputCls} />
          </RepeaterRow>
        ))}
      </Repeater>

      {/* Internal links */}
      <Repeater
        title="Internal links"
        noun="link"
        count={links.length}
        onAdd={() => setPage("internalLinks", [...links, { label: "", url: "" }])}
      >
        {links.map((l, i) => (
          <RepeaterRow
            key={i}
            index={i}
            last={i === links.length - 1}
            onMove={(d) => setPage("internalLinks", move(links, i, d))}
            onRemove={() => setPage("internalLinks", links.filter((_, j) => j !== i))}
          >
            <input value={l.label} onChange={(e) => setPage("internalLinks", links.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} placeholder="Label" className={inputCls} />
            <input value={l.url} onChange={(e) => setPage("internalLinks", links.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} placeholder="/target-url" className={inputCls} />
          </RepeaterRow>
        ))}
      </Repeater>

      {/* Save */}
      <div className="space-y-3 border-t border-border pt-4">
        {state?.issues?.length ? (
          <ul className="space-y-1 rounded-md border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-600">
            {state.issues.map((issue, i) => (
              <li key={i}>• {issue.message}</li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center gap-3">
          <button type="button" onClick={save} disabled={pending} className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60">
            {pending ? "Saving…" : form.status === "published" ? "Save & publish" : "Save"}
          </button>
          {state?.message ? (
            <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-500"}`}>{state.message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-heading outline-none focus:border-primary";

function move<T>(arr: T[], idx: number, dir: -1 | 1): T[] {
  const next = [...arr];
  const j = idx + dir;
  if (j < 0 || j >= next.length) return arr;
  [next[idx], next[j]] = [next[j], next[idx]];
  return next;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="border-b border-border pb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      {children}
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-body">{label}</label>
      {children}
    </div>
  );
}

function Help({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-muted-foreground">{children}</p>;
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-body">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-primary" />
      {label}
    </label>
  );
}

function Repeater({
  title,
  noun,
  count,
  onAdd,
  children,
}: {
  title: string;
  noun: string;
  count: number;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-border pb-1.5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">{count} {noun}(s)</span>
      </div>
      {children}
      <button type="button" onClick={onAdd} className="flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary">
        <Plus size={16} /> Add {noun}
      </button>
    </div>
  );
}

function RepeaterRow({
  index,
  last,
  onMove,
  onRemove,
  children,
}: {
  index: number;
  last: boolean;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
        <div className="flex items-center gap-1">
          <IconBtn title="Move up" onClick={() => onMove(-1)} disabled={index === 0}><ChevronUp size={15} /></IconBtn>
          <IconBtn title="Move down" onClick={() => onMove(1)} disabled={last}><ChevronDown size={15} /></IconBtn>
          <IconBtn title="Remove" onClick={onRemove} danger><Trash2 size={15} /></IconBtn>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function IconBtn({ children, onClick, title, disabled, danger }: { children: React.ReactNode; onClick: () => void; title: string; disabled?: boolean; danger?: boolean }) {
  return (
    <button type="button" title={title} onClick={onClick} disabled={disabled} className={`rounded p-1.5 transition-colors disabled:opacity-30 ${danger ? "text-red-500 hover:bg-red-500/10" : "text-muted-foreground hover:bg-card"}`}>
      {children}
    </button>
  );
}

function ImageInput({ value, placeholder, onChange }: { value: string; placeholder?: string; onChange: (v: string) => void }) {
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
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-card/40">
          {value || placeholder ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value || placeholder} alt="preview" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary">
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
        </label>
        {value ? <button type="button" onClick={() => onChange("")} className="text-sm text-red-500 hover:underline">Remove</button> : null}
      </div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || "/uploads/… or https://…"} className={inputCls} />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
