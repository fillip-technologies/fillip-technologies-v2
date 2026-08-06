"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ExternalLink, Eye, Plus, Trash2 } from "lucide-react";
import {
  createLocationPage,
  deleteLocationPage,
  setLocationPagePublished,
} from "@/server/location-pages/actions";

type LocationPage = {
  slug: string;
  enabled: boolean;
  serviceKey: string;
  city: { name: string; state: string; country: string };
};
type Service = { slug: string; title: string };

// Location pages resolve at the bare domain root (via the site's
// `[landingSlug]` catch-all) — keep in sync with PUBLIC_PREFIX in
// server/location-pages/actions.ts.
const PUBLIC_PREFIX = "";

const previewSlug = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function LocationsManager({
  initial,
  services,
}: {
  initial: LocationPage[];
  services: Service[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [serviceKey, setServiceKey] = useState(services[0]?.slug ?? "");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [slug, setSlug] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const effectiveSlug = previewSlug(slug || `${serviceKey}-company-in-${city}`);
  const serviceTitle = (key: string) => services.find((s) => s.slug === key)?.title ?? key;

  const countFor = (key: string) => initial.filter((l) => l.serviceKey === key).length;
  const visible = filter === "all" ? initial : initial.filter((l) => l.serviceKey === filter);

  const create = () => {
    setMsg(null);
    startTransition(async () => {
      const res = await createLocationPage(serviceKey, city, state, country, slug);
      setMsg({ ok: res.ok, text: res.message });
      if (res.ok && res.slug) {
        setCity("");
        setState("");
        setSlug("");
        router.push(`/admin/cms/locations/${res.slug}`);
      }
    });
  };

  const toggle = (s: string, next: boolean) => {
    setMsg(null);
    startTransition(async () => {
      const res = await setLocationPagePublished(s, next);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  const remove = (s: string, name: string) => {
    if (!window.confirm(`Delete “${name}” permanently? This cannot be undone.`)) return;
    setMsg(null);
    startTransition(async () => {
      const res = await deleteLocationPage(s);
      setMsg({ ok: res.ok, text: res.message });
      router.refresh();
    });
  };

  return (
    <div className="space-y-8">
      {/* Create form */}
      <div className="rounded-lg border border-border bg-card/40 p-5">
        <h2 className="mb-3 text-sm font-semibold text-heading">Add a new location page</h2>
        {services.length === 0 ? (
          <p className="text-sm text-amber-600">
            Create a service page first (Content → What We Do menu) — location pages are always
            paired with one.
          </p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="loc-service" className="mb-1 block text-sm text-body">
                  Service
                </label>
                <select
                  id="loc-service"
                  value={serviceKey}
                  onChange={(e) => setServiceKey(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="loc-city" className="mb-1 block text-sm text-body">
                  City
                </label>
                <input
                  id="loc-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Patna"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="loc-state" className="mb-1 block text-sm text-body">
                  State
                </label>
                <input
                  id="loc-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Bihar"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="loc-country" className="mb-1 block text-sm text-body">
                  Country
                </label>
                <input
                  id="loc-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="loc-slug" className="mb-1 block text-sm text-body">
                  Slug <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="loc-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="auto from service + city"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-heading outline-none focus:border-primary"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              URL: <code>{PUBLIC_PREFIX}/{effectiveSlug || "…"}</code> · created with editable
              placeholder content and goes live immediately.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={create}
                disabled={pending || !serviceKey || !city.trim() || !state.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
              >
                <Plus size={16} /> {pending ? "Creating…" : "Create page"}
              </button>
              {msg ? (
                <p className={`text-sm ${msg.ok ? "text-green-600" : "text-red-500"}`}>{msg.text}</p>
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* Service filter */}
      <div className={`flex-wrap items-center gap-2 ${services.length > 1 ? "flex" : "hidden"}`}>
        <FilterChip label="All" count={initial.length} active={filter === "all"} onClick={() => setFilter("all")} />
        {services.map((s) => {
          const n = countFor(s.slug);
          if (n === 0) return null;
          return (
            <FilterChip
              key={s.slug}
              label={s.title}
              count={n}
              active={filter === s.slug}
              onClick={() => setFilter(s.slug)}
            />
          );
        })}
      </div>

      {/* List */}
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {visible.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">
            {initial.length === 0 ? "No location pages yet." : "No pages for this service."}
          </li>
        ) : null}
        {visible.map((loc) => (
          <li key={loc.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <Link href={`/admin/cms/locations/${loc.slug}`} className="min-w-0 flex-1 group">
              <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                {serviceTitle(loc.serviceKey)} — {loc.city.name}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    loc.enabled ? "bg-green-500/15 text-green-600" : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {loc.enabled ? "Live" : "Disabled"}
                </span>
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {PUBLIC_PREFIX}/{loc.slug} · {loc.city.state}, {loc.city.country}
              </p>
            </Link>

            <div className="flex items-center gap-1">
              {loc.enabled ? (
                <IconLink href={`${PUBLIC_PREFIX}/${loc.slug}`} title="View live page">
                  <ExternalLink size={16} />
                </IconLink>
              ) : (
                <IconLink href={`${PUBLIC_PREFIX}/${loc.slug}`} title="Preview">
                  <Eye size={16} />
                </IconLink>
              )}
              <button
                type="button"
                onClick={() => toggle(loc.slug, !loc.enabled)}
                disabled={pending}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                  loc.enabled
                    ? "border-border text-body hover:bg-card"
                    : "border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {loc.enabled ? "Disable" : "Enable"}
              </button>
              <button
                type="button"
                onClick={() => remove(loc.slug, `${serviceTitle(loc.serviceKey)} — ${loc.city.name}`)}
                disabled={pending}
                title="Delete"
                className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
              <Link
                href={`/admin/cms/locations/${loc.slug}`}
                className="rounded-md p-2 text-muted-foreground hover:bg-card"
                title="Edit content"
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
        active ? "border-primary bg-primary/10 text-primary" : "border-border text-body hover:bg-card"
      }`}
    >
      {label}
      <span className={`rounded-full px-1.5 text-xs ${active ? "bg-primary/20 text-primary" : "bg-card text-muted-foreground"}`}>
        {count}
      </span>
    </button>
  );
}

function IconLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
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
