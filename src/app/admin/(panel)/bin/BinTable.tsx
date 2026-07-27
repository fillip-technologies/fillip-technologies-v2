"use client";

import { useState, useTransition } from "react";
import { RotateCcw, Trash2, Eye } from "lucide-react";
import type { Lead } from "@/server/contact/queries";
import { categoryForSource, labelForSource, resumeUrlFromMessage } from "@/server/contact/lead-sources";
import { deleteLeadAction, restoreLeadAction } from "@/server/contact/lead-actions";
import ConfirmButton from "../ConfirmButton";

/** Category tags for a binned lead (package-aware, source fallback). */
function leadCategoryTags(lead: Lead): string[] {
  if (lead.packageCategory) {
    const tags = lead.packageCategory.split(",").map((s) => s.trim()).filter(Boolean);
    if (tags.length) return tags;
  }
  return [categoryForSource(lead.source)];
}

function hasResume(lead: Lead): boolean {
  return Boolean(lead.resume?.url || resumeUrlFromMessage(lead.message));
}

export default function BinTable({ leads }: { leads: Lead[] }) {
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const rows = leads.filter((l) => !removed.has(l.id));
  const remove = (id: string) => setRemoved((prev) => new Set(prev).add(id));

  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-border bg-card p-6 text-center text-muted-foreground">
        The Bin is empty.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-card text-left text-muted-foreground">
            <Th>Binned</Th>
            <Th>Category</Th>
            <Th>Contact</Th>
            <Th>Message</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((lead) => (
            <tr key={lead.id} className="border-b border-border/60 align-top">
              <Td className="whitespace-nowrap text-muted-foreground">
                <WhenText iso={lead.deletedAt} />
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
                <a href={`mailto:${lead.email}`} className="block text-primary hover:underline">
                  {lead.email}
                </a>
                {lead.phone ? (
                  <span className="block whitespace-nowrap text-muted-foreground">{lead.phone}</span>
                ) : null}
              </Td>
              <Td className="max-w-xs">
                {lead.message ? (
                  <span className="line-clamp-2 text-heading">{lead.message}</span>
                ) : (
                  "—"
                )}
                {hasResume(lead) ? (
                  <a
                    href={`/api/admin/resume?leadId=${encodeURIComponent(lead.id)}&mode=view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <Eye size={12} /> Resume
                  </a>
                ) : null}
              </Td>
              <Td>
                <div className="flex flex-wrap items-center gap-2">
                  <RestoreButton leadId={lead.id} onDone={() => remove(lead.id)} />
                  <ConfirmButton
                    label="Delete"
                    icon={<Trash2 size={13} />}
                    variant="danger"
                    title="Delete permanently?"
                    message="This permanently deletes the item and any attached resume. This can't be undone."
                    confirmLabel="Delete permanently"
                    action={() => deleteLeadAction(lead.id)}
                    onDone={() => remove(lead.id)}
                  />
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Restore a binned lead back to its list. No confirmation — it's non-destructive. */
function RestoreButton({ leadId, onDone }: { leadId: string; onDone: () => void }) {
  const [pending, startTransition] = useTransition();
  const onClick = () =>
    startTransition(async () => {
      const res = await restoreLeadAction(leadId);
      if (res.ok) onDone();
    });
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title="Restore"
      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-heading transition-colors hover:bg-muted disabled:opacity-60"
    >
      <RotateCcw size={13} /> {pending ? "Restoring…" : "Restore"}
    </button>
  );
}

// Renders a locale-formatted timestamp on the client only (avoids SSR/locale
// hydration mismatch).
function WhenText({ iso }: { iso: string | null }) {
  if (!iso) return <span>—</span>;
  return <span suppressHydrationWarning>{new Date(iso).toLocaleString()}</span>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-heading ${className}`}>{children}</td>;
}
