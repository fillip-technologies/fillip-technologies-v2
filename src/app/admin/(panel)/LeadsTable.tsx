"use client";

import { useEffect, useMemo, useState } from "react";
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
                  <Td className="max-w-md whitespace-pre-wrap">{lead.message}</Td>
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
