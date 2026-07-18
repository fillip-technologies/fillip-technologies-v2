"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Satellite, Globe, ExternalLink, Package as PackageIcon } from "lucide-react";
import type { Lead } from "@/server/contact/queries";
import { categoryForSource, labelForSource } from "@/server/contact/lead-sources";

/**
 * A lead's category tags. Leads from the quote flow are categorised by the
 * package(s) the client selected; everything else falls back to the broad,
 * source-based category. A lead can belong to several package categories.
 */
function leadCategoryTags(lead: Lead): string[] {
  if (lead.packageCategory) {
    const tags = lead.packageCategory.split(",").map((s) => s.trim()).filter(Boolean);
    if (tags.length) return tags;
  }
  return [categoryForSource(lead.source)];
}

/** A Google Maps link for a lead's location (coords preferred, else the label). */
function mapsUrl(loc: Lead["location"]): string | null {
  if (!loc) return null;
  if (typeof loc.lat === "number" && typeof loc.lng === "number") {
    return `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;
  }
  if (loc.label) return `https://www.google.com/maps/search/${encodeURIComponent(loc.label)}`;
  return null;
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Tally leads per category tag (package-aware).
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const lead of leads) {
      for (const tag of leadCategoryTags(lead)) map.set(tag, (map.get(tag) ?? 0) + 1);
    }
    return map;
  }, [leads]);

  // Most-common categories first, then alphabetical.
  const categories = useMemo(
    () => [...counts.keys()].sort((a, b) => (counts.get(b)! - counts.get(a)!) || a.localeCompare(b)),
    [counts]
  );

  const filtered = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => leadCategoryTags(l).includes(filter))),
    [leads, filter]
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <FilterButton label="All" count={leads.length} active={filter === "all"} onClick={() => setFilter("all")} />
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            label={cat}
            count={counts.get(cat) ?? 0}
            active={filter === cat}
            onClick={() => setFilter(cat)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-md border border-border bg-card p-6 text-center text-muted-foreground">
          No leads in this category.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-card text-left text-muted-foreground">
                <Th>Received</Th>
                <Th>Category</Th>
                <Th>Contact</Th>
                <Th>Package</Th>
                <Th>Budget</Th>
                <Th>Location</Th>
                <Th>Message</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="cursor-pointer border-b border-border/60 align-top transition-colors hover:bg-card"
                  onClick={() => setActiveLead(lead)}
                >
                  <Td className="whitespace-nowrap text-muted-foreground">
                    <ReceivedAt iso={lead.created_at} />
                  </Td>
                  <Td className="whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {leadCategoryTags(lead).map((tag) => (
                        <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{labelForSource(lead.source)}</p>
                  </Td>
                  <Td>
                    <p className="font-medium text-heading">{lead.name}</p>
                    <a
                      href={`mailto:${lead.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block text-primary hover:underline"
                    >
                      {lead.email}
                    </a>
                    {lead.phone ? (
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="block whitespace-nowrap text-muted-foreground hover:text-primary"
                      >
                        {lead.phone}
                      </a>
                    ) : null}
                    {lead.company ? <p className="text-xs text-muted-foreground">{lead.company}</p> : null}
                  </Td>
                  <Td className="max-w-[12rem]">
                    {lead.packageCategory ? (
                      <span className="inline-flex items-center gap-1 text-heading">
                        <PackageIcon size={13} className="shrink-0 text-muted-foreground" />
                        {lead.packageCategory}
                      </span>
                    ) : (
                      "—"
                    )}
                  </Td>
                  <Td className="whitespace-nowrap">{lead.budget ?? "—"}</Td>
                  <Td className="max-w-[13rem]">
                    <LocationCell location={lead.location} />
                  </Td>
                  <Td className="max-w-xs">
                    {lead.message ? (
                      <span className="line-clamp-2 text-heading">{lead.message}</span>
                    ) : (
                      "—"
                    )}
                  </Td>
                  <Td>
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs capitalize">
                      {lead.status}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeLead && <LeadDetailModal lead={activeLead} onClose={() => setActiveLead(null)} />}
    </>
  );
}

/** Compact location display for the table cell. */
function LocationCell({ location }: { location: Lead["location"] }) {
  if (!location) return <span className="text-muted-foreground">—</span>;
  const url = mapsUrl(location);
  const Icon = location.source === "gps" ? Satellite : Globe;
  const inner = (
    <span className="inline-flex items-start gap-1 text-heading">
      <Icon size={13} className="mt-0.5 shrink-0 text-muted-foreground" />
      <span>
        {location.label || "Unknown"}
        <span className="ml-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          {location.source}
        </span>
      </span>
    </span>
  );
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-primary hover:underline">
      {inner}
    </a>
  ) : (
    inner
  );
}

// Rich detail modal — shows every field we hold on a lead. Closes on backdrop
// click or Escape.
function LeadDetailModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const loc = lead.location;
  const url = mapsUrl(loc);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-heading">{lead.name}</h2>
            <p className="text-xs text-muted-foreground">
              {labelForSource(lead.source)} · <ReceivedAt iso={lead.created_at} />
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-heading"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-b border-border px-5 py-4 text-sm">
          <Row label="Email">
            <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
              {lead.email}
            </a>
          </Row>
          {lead.phone && (
            <Row label="Phone">
              <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                {lead.phone}
              </a>
            </Row>
          )}
          {lead.company && <Row label="Company">{lead.company}</Row>}
          {lead.packageCategory && <Row label="Package">{lead.packageCategory}</Row>}
          {lead.budget && <Row label="Budget">{lead.budget}</Row>}
          <Row label="Category">{leadCategoryTags(lead).join(", ")}</Row>
          <Row label="Status"><span className="capitalize">{lead.status}</span></Row>
        </dl>

        {loc && (
          <div className="border-b border-border px-5 py-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <MapPin size={13} /> Location
              <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] normal-case">
                {loc.source === "gps" ? "Precise (GPS)" : "Approx. (IP)"}
              </span>
            </p>
            <p className="text-sm font-medium text-heading">{loc.label || "Unknown"}</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {typeof loc.lat === "number" && typeof loc.lng === "number" && (
                <Row label="Coordinates">
                  {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}
                </Row>
              )}
              {typeof loc.accuracy === "number" && <Row label="Accuracy">±{Math.round(loc.accuracy)} m</Row>}
              {loc.ip && <Row label="IP">{loc.ip}</Row>}
              {loc.isp && <Row label="ISP">{loc.isp}</Row>}
            </dl>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ExternalLink size={12} /> Open in Google Maps
              </a>
            )}
          </div>
        )}

        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Message</p>
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-heading">
            {lead.message || "—"}
          </p>
        </div>

        <div className="flex justify-end border-t border-border px-5 py-3">
          <Link
            href={`/admin/mail?to=${encodeURIComponent(lead.email)}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <Mail size={15} aria-hidden="true" />
            Compose email
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="break-words text-heading">{children}</dd>
    </>
  );
}

function FilterButton({
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
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-heading hover:bg-muted"
      }`}
    >
      {label}
      <span className={`ml-1.5 text-xs ${active ? "opacity-90" : "text-muted-foreground"}`}>{count}</span>
    </button>
  );
}

// Renders a locale-formatted timestamp on the client only (avoids SSR/locale
// hydration mismatch).
function ReceivedAt({ iso }: { iso: string }) {
  const [text, setText] = useState("");
  useEffect(() => setText(new Date(iso).toLocaleString()), [iso]);
  return <span suppressHydrationWarning>{text || "…"}</span>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-heading ${className}`}>{children}</td>;
}
