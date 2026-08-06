"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { saveLocationPage } from "@/server/location-pages/actions";
import type { SaveState } from "@/server/content/types";

type LocationContent = {
  seo: {
    title: string;
    description: string;
    canonical: string;
    openGraph: { title: string; description: string; image: string };
    robots: { index: boolean; follow: boolean };
  };
  content: {
    hero: { title: string; highlightedTitle: string; description: string };
    challenges: {
      badge: string;
      title: string;
      highlightedTitle: string;
      lead: string;
      support: string;
      description: string;
    };
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
};

export default function LocationPageEditor({
  slug,
  initial,
}: {
  slug: string;
  initial: LocationContent;
}) {
  const [form, setForm] = useState<LocationContent>(initial);
  const [state, setState] = useState<SaveState | null>(null);
  const [pending, startTransition] = useTransition();

  const setSeo = <K extends keyof LocationContent["seo"]>(k: K, v: LocationContent["seo"][K]) =>
    setForm((f) => ({ ...f, seo: { ...f.seo, [k]: v } }));
  const setOg = <K extends keyof LocationContent["seo"]["openGraph"]>(
    k: K,
    v: LocationContent["seo"]["openGraph"][K]
  ) => setForm((f) => ({ ...f, seo: { ...f.seo, openGraph: { ...f.seo.openGraph, [k]: v } } }));
  const setRobots = <K extends keyof LocationContent["seo"]["robots"]>(
    k: K,
    v: LocationContent["seo"]["robots"][K]
  ) => setForm((f) => ({ ...f, seo: { ...f.seo, robots: { ...f.seo.robots, [k]: v } } }));
  const setHero = <K extends keyof LocationContent["content"]["hero"]>(
    k: K,
    v: LocationContent["content"]["hero"][K]
  ) =>
    setForm((f) => ({ ...f, content: { ...f.content, hero: { ...f.content.hero, [k]: v } } }));
  const setChallenges = <K extends keyof LocationContent["content"]["challenges"]>(
    k: K,
    v: LocationContent["content"]["challenges"][K]
  ) =>
    setForm((f) => ({
      ...f,
      content: { ...f.content, challenges: { ...f.content.challenges, [k]: v } },
    }));
  const setFaq = <K extends keyof LocationContent["faq"]>(k: K, v: LocationContent["faq"][K]) =>
    setForm((f) => ({ ...f, faq: { ...f.faq, [k]: v } }));

  const items = form.faq.items;

  const save = () =>
    startTransition(async () => {
      setState(await saveLocationPage(slug, { seo: form.seo, content: form.content, faq: form.faq }));
    });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Group title="Hero">
        <Labeled label="Title">
          <input value={form.content.hero.title} onChange={(e) => setHero("title", e.target.value)} className={inputCls} />
        </Labeled>
        <Labeled label="Highlighted title">
          <input
            value={form.content.hero.highlightedTitle}
            onChange={(e) => setHero("highlightedTitle", e.target.value)}
            className={inputCls}
          />
          <Help>The accented part shown right after the title (e.g. the city name).</Help>
        </Labeled>
        <Labeled label="Description">
          <textarea
            value={form.content.hero.description}
            onChange={(e) => setHero("description", e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Labeled>
      </Group>

      {/* Challenges */}
      <Group title="Challenges section">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Badge">
            <input value={form.content.challenges.badge} onChange={(e) => setChallenges("badge", e.target.value)} className={inputCls} />
          </Labeled>
          <Labeled label="Title">
            <input value={form.content.challenges.title} onChange={(e) => setChallenges("title", e.target.value)} className={inputCls} />
          </Labeled>
          <Labeled label="Highlighted title">
            <input
              value={form.content.challenges.highlightedTitle}
              onChange={(e) => setChallenges("highlightedTitle", e.target.value)}
              className={inputCls}
            />
          </Labeled>
        </div>
        <Labeled label="Lead">
          <textarea value={form.content.challenges.lead} onChange={(e) => setChallenges("lead", e.target.value)} rows={2} className={inputCls} />
        </Labeled>
        <Labeled label="Support">
          <textarea value={form.content.challenges.support} onChange={(e) => setChallenges("support", e.target.value)} rows={2} className={inputCls} />
        </Labeled>
        <Labeled label="Description">
          <textarea
            value={form.content.challenges.description}
            onChange={(e) => setChallenges("description", e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Labeled>
      </Group>

      {/* SEO */}
      <Group title="SEO">
        <Labeled label="Meta title">
          <input value={form.seo.title} onChange={(e) => setSeo("title", e.target.value)} className={inputCls} />
        </Labeled>
        <Labeled label="Meta description">
          <textarea value={form.seo.description} onChange={(e) => setSeo("description", e.target.value)} rows={3} className={inputCls} />
        </Labeled>
        <Labeled label="Canonical URL">
          <input value={form.seo.canonical} onChange={(e) => setSeo("canonical", e.target.value)} placeholder="https://…/locations/…" className={inputCls} />
        </Labeled>
        <div className="flex flex-wrap gap-6">
          <Check label="Index (robots)" checked={form.seo.robots.index} onChange={(v) => setRobots("index", v)} />
          <Check label="Follow (robots)" checked={form.seo.robots.follow} onChange={(v) => setRobots("follow", v)} />
        </div>
      </Group>

      {/* Open Graph */}
      <Group title="Open Graph (Facebook / LinkedIn)">
        <Labeled label="OG title">
          <input value={form.seo.openGraph.title} onChange={(e) => setOg("title", e.target.value)} className={inputCls} />
        </Labeled>
        <Labeled label="OG description">
          <textarea value={form.seo.openGraph.description} onChange={(e) => setOg("description", e.target.value)} rows={2} className={inputCls} />
        </Labeled>
        <Labeled label="OG image">
          <ImageInput value={form.seo.openGraph.image} onChange={(v) => setOg("image", v)} />
        </Labeled>
      </Group>

      {/* FAQ */}
      <Group title="FAQ section">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="Badge">
            <input value={form.faq.badge} onChange={(e) => setFaq("badge", e.target.value)} className={inputCls} />
          </Labeled>
          <Labeled label="Title">
            <input value={form.faq.title} onChange={(e) => setFaq("title", e.target.value)} className={inputCls} />
          </Labeled>
        </div>
        <Labeled label="Description">
          <textarea value={form.faq.description} onChange={(e) => setFaq("description", e.target.value)} rows={2} className={inputCls} />
        </Labeled>

        <Repeater
          title="Questions"
          noun="question"
          count={items.length}
          onAdd={() => setFaq("items", [...items, { question: "", answer: "" }])}
        >
          {items.map((it, i) => (
            <RepeaterRow
              key={i}
              index={i}
              last={i === items.length - 1}
              onMove={(d) => setFaq("items", move(items, i, d))}
              onRemove={() => setFaq("items", items.filter((_, j) => j !== i))}
            >
              <input
                value={it.question}
                onChange={(e) => setFaq("items", items.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)))}
                placeholder="Question"
                className={inputCls}
              />
              <textarea
                value={it.answer}
                onChange={(e) => setFaq("items", items.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))}
                placeholder="Answer"
                rows={2}
                className={inputCls}
              />
            </RepeaterRow>
          ))}
        </Repeater>
      </Group>

      {/* Save */}
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state?.message ? (
          <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-500"}`}>{state.message}</p>
        ) : null}
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
      <h2 className="border-b border-border pb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
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
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {count} {noun}(s)
        </span>
      </div>
      {children}
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary"
      >
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
          <IconBtn title="Move up" onClick={() => onMove(-1)} disabled={index === 0}>
            <ChevronUp size={15} />
          </IconBtn>
          <IconBtn title="Move down" onClick={() => onMove(1)} disabled={last}>
            <ChevronDown size={15} />
          </IconBtn>
          <IconBtn title="Remove" onClick={onRemove} danger>
            <Trash2 size={15} />
          </IconBtn>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded p-1.5 transition-colors disabled:opacity-30 ${
        danger ? "text-red-500 hover:bg-red-500/10" : "text-muted-foreground hover:bg-card"
      }`}
    >
      {children}
    </button>
  );
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-muted-foreground">None</span>
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-body transition-colors hover:border-primary hover:text-primary">
          {uploading ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>
        {value ? (
          <button type="button" onClick={() => onChange("")} className="text-sm text-red-500 hover:underline">
            Remove
          </button>
        ) : null}
      </div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/… or https://…" className={inputCls} />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
