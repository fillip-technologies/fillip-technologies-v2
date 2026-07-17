"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import type { Lead } from "@/server/contact/queries";
import {
  categoryForSource,
  labelForSource,
  LEAD_CATEGORIES,
  type LeadCategory,
} from "@/server/contact/lead-sources";

type Filter = "all" | LeadCategory;

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Count leads per category so we can show tallies and hide empty filters.
  const counts = useMemo(() => {
    const map = new Map<LeadCategory, number>();
    for (const lead of leads) {
      const cat = categoryForSource(lead.source);
      map.set(cat, (map.get(cat) ?? 0) + 1);
    }
    return map;
  }, [leads]);

  const visibleCategories = LEAD_CATEGORIES.filter((cat) => (counts.get(cat) ?? 0) > 0);

  const filtered = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => categoryForSource(l.source) === filter)),
    [leads, filter]
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <FilterButton
          label="All"
          count={leads.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {visibleCategories.map((cat) => (
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
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Company</Th>
                <Th>Budget</Th>
                <Th>Message</Th>
                <Th>Source</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border/60 align-top">
                  <Td className="whitespace-nowrap text-muted-foreground">
                    <ReceivedAt iso={lead.created_at} />
                  </Td>
                  <Td className="whitespace-nowrap">
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs">
                      {categoryForSource(lead.source)}
                    </span>
                  </Td>
                  <Td>{lead.name}</Td>
                  <Td>
                    <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                      {lead.email}
                    </a>
                  </Td>
                  <Td className="whitespace-nowrap">
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                        {lead.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </Td>
                  <Td>{lead.company ?? "—"}</Td>
                  <Td className="whitespace-nowrap">{lead.budget ?? "—"}</Td>
                  <Td className="max-w-xs">
                    {lead.message ? (
                      <button
                        type="button"
                        onClick={() => setActiveLead(lead)}
                        title="Click to view full message"
                        className="line-clamp-2 text-left text-heading hover:text-primary hover:underline"
                      >
                        {lead.message}
                      </button>
                    ) : (
                      "—"
                    )}
                  </Td>
                  <Td className="whitespace-nowrap text-muted-foreground">
                    {labelForSource(lead.source)}
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

      {activeLead && <LeadMessageModal lead={activeLead} onClose={() => setActiveLead(null)} />}
    </>
  );
}

// Modal that shows the full lead message plus key contact details. Closes on
// backdrop click or Escape.
function LeadMessageModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
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
            <p className="text-xs text-muted-foreground">{labelForSource(lead.source)}</p>
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
          <dt className="text-muted-foreground">Email</dt>
          <dd className="text-heading">
            <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
              {lead.email}
            </a>
          </dd>
          {lead.phone && (
            <>
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="text-heading">
                <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                  {lead.phone}
                </a>
              </dd>
            </>
          )}
          {lead.company && (
            <>
              <dt className="text-muted-foreground">Company</dt>
              <dd className="text-heading">{lead.company}</dd>
            </>
          )}
          {lead.budget && (
            <>
              <dt className="text-muted-foreground">Budget</dt>
              <dd className="text-heading">{lead.budget}</dd>
            </>
          )}
        </dl>

        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Message
          </p>
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
      <span className={`ml-1.5 text-xs ${active ? "opacity-90" : "text-muted-foreground"}`}>
        {count}
      </span>
    </button>
  );
}

// Renders a locale-formatted timestamp on the client only. Server output would
// use a different locale/timezone than the browser, causing a hydration
// mismatch, so we hold an empty placeholder until after mount.
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
