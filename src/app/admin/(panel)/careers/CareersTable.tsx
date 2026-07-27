"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  ExternalLink,
  FileText,
  Eye,
  Download,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import type { Lead, LeadResume } from "@/server/contact/queries";
import { LEAD_STATUSES, resumeUrlFromMessage } from "@/server/contact/lead-sources";
import { trashLeadAction, updateLeadStatusAction } from "@/server/contact/lead-actions";
import ConfirmButton from "../ConfirmButton";

/** The structured fields the careers form folds into the lead `message`. */
type Application = {
  role: string;
  experience: string;
  linkedIn: string;
  portfolio: string;
  note: string;
};

/**
 * Recover the application fields the careers API packs into the lead message so
 * we can show them as their own columns instead of one blob of text.
 */
// Header lines the careers API prepends before the applicant's free-text note.
const KNOWN_LINE = /^(Job application for|Experience|LinkedIn|Portfolio|Resume)\s*:/i;

function parseApplication(message: string): Application {
  const line = (label: string) => {
    const m = message.match(new RegExp(`^${label}:\\s*(.+)$`, "im"));
    return m ? m[1].trim() : "";
  };
  // The note is whatever remains once the structured header lines are removed.
  const note = message
    .split("\n")
    .filter((l) => !KNOWN_LINE.test(l.trim()))
    .join("\n")
    .trim();
  return {
    role: line("Job application for"),
    experience: line("Experience"),
    linkedIn: line("LinkedIn"),
    portfolio: line("Portfolio"),
    note: note && note !== "(No message provided.)" ? note : "",
  };
}

/** The resume for a lead — the structured field, or the legacy message link. */
function resumeFor(lead: Lead): LeadResume | null {
  if (lead.resume?.url) return lead.resume;
  const url = resumeUrlFromMessage(lead.message);
  if (!url) return null;
  const filename = decodeURIComponent(url.split("/").pop() || "resume");
  return { url, filename, type: "" };
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

export default function CareersTable({ leads }: { leads: Lead[] }) {
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [deleted, setDeleted] = useState<Set<string>>(new Set());

  // Hide optimistically-removed rows; revalidation drops them for good.
  const rows = leads.filter((l) => !deleted.has(l.id));
  const remove = (id: string) => {
    setDeleted((prev) => new Set(prev).add(id));
    setActiveLead((cur) => (cur?.id === id ? null : cur));
  };

  if (rows.length === 0) {
    return (
      <p className="rounded-md border border-border bg-card p-6 text-center text-muted-foreground">
        No applications in this view.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left text-muted-foreground">
              <Th>Received</Th>
              <Th>Applicant</Th>
              <Th>Role</Th>
              <Th>Experience</Th>
              <Th>Resume</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => {
              const app = parseApplication(lead.message);
              const resume = resumeFor(lead);
              return (
                <tr
                  key={lead.id}
                  className="cursor-pointer border-b border-border/60 align-top transition-colors hover:bg-card"
                  onClick={() => setActiveLead(lead)}
                >
                  <Td className="whitespace-nowrap text-muted-foreground">
                    <ReceivedAt iso={lead.created_at} />
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
                  </Td>
                  <Td className="max-w-[14rem] text-heading">{app.role || "—"}</Td>
                  <Td className="whitespace-nowrap text-heading">{app.experience || "—"}</Td>
                  <Td>
                    <ResumeActions leadId={lead.id} resume={resume} />
                  </Td>
                  <Td>
                    <StatusSelect lead={lead} />
                  </Td>
                  <Td>
                    <TrashButton leadId={lead.id} onDone={() => remove(lead.id)} />
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {activeLead && (
        <ApplicationModal
          lead={activeLead}
          onClose={() => setActiveLead(null)}
          onDeleted={() => remove(activeLead.id)}
        />
      )}
    </>
  );
}

/** Moves an application to the Bin after an in-app confirmation. */
function TrashButton({ leadId, onDone }: { leadId: string; onDone: () => void }) {
  return (
    <ConfirmButton
      label="Delete"
      icon={<Trash2 size={13} />}
      variant="danger"
      title="Move to Bin?"
      message="This application will be moved to the Bin. You can restore it or delete it permanently from there."
      confirmLabel="Move to Bin"
      action={() => trashLeadAction(leadId)}
      onDone={onDone}
    />
  );
}

/**
 * View / Download buttons for a resume (or a dash when there isn't one). Both go
 * through the admin proxy route (`/api/admin/resume`) so the file is served
 * behind auth with the correct inline/attachment disposition.
 */
function ResumeActions({ leadId, resume }: { leadId: string; resume: LeadResume | null }) {
  if (!resume) return <span className="text-muted-foreground">—</span>;
  const href = (mode: "view" | "download") =>
    `/api/admin/resume?leadId=${encodeURIComponent(leadId)}&mode=${mode}`;
  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      <a
        href={href("view")}
        target="_blank"
        rel="noopener noreferrer"
        title={resume.filename || "View resume"}
        className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-heading hover:bg-muted"
      >
        <Eye size={13} /> View
      </a>
      <a
        href={href("download")}
        title="Download resume"
        className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
      >
        <Download size={13} /> Download
      </a>
    </div>
  );
}

// Rich detail modal — the full application. Closes on backdrop click or Escape.
function ApplicationModal({
  lead,
  onClose,
  onDeleted,
}: {
  lead: Lead;
  onClose: () => void;
  onDeleted: () => void;
}) {
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

  const app = parseApplication(lead.message);
  const resume = resumeFor(lead);
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
              Job Application · <ReceivedAt iso={lead.created_at} />
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
          {app.role && <Row label="Role">{app.role}</Row>}
          {app.experience && <Row label="Experience">{app.experience}</Row>}
          {app.linkedIn && (
            <Row label="LinkedIn">
              <a
                href={app.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <LinkIcon size={13} /> Profile
              </a>
            </Row>
          )}
          {app.portfolio && (
            <Row label="Portfolio">
              <a
                href={app.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 break-all text-primary hover:underline"
              >
                <LinkIcon size={13} /> {app.portfolio}
              </a>
            </Row>
          )}
          <Row label="Status"><StatusSelect lead={lead} /></Row>
        </dl>

        <div className="border-b border-border px-5 py-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <FileText size={13} /> Resume
          </p>
          {resume ? (
            <>
              <ResumeActions leadId={lead.id} resume={resume} />
              {resume.filename && (
                <p className="mt-2 break-all text-xs text-muted-foreground">{resume.filename}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No resume on file (may be email-only).</p>
          )}
        </div>

        {loc && (
          <div className="border-b border-border px-5 py-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <MapPin size={13} /> Location
              <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] normal-case">
                {loc.source === "gps" ? "Precise (GPS)" : "Approx. (IP)"}
              </span>
            </p>
            <p className="text-sm font-medium text-heading">{loc.label || "Unknown"}</p>
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

        {app.note && (
          <div className="px-5 py-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Why they want to join
            </p>
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-heading">
              {app.note}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <TrashButton leadId={lead.id} onDone={onDeleted} />
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

// Colour per status for the dropdown pill.
const STATUS_STYLES: Record<string, string> = {
  new: "border-sky-300 bg-sky-50 text-sky-700",
  contacted: "border-amber-300 bg-amber-50 text-amber-700",
  "in-progress": "border-violet-300 bg-violet-50 text-violet-700",
  converted: "border-emerald-300 bg-emerald-50 text-emerald-700",
  disqualified: "border-rose-300 bg-rose-50 text-rose-700",
};

/** Inline status editor — updates the lead's status via a server action. */
function StatusSelect({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState(lead.status);
  const [syncedStatus, setSyncedStatus] = useState(lead.status);
  const [pending, startTransition] = useTransition();

  // Re-sync if the server sends a newer value (after revalidation) — adjust
  // state during render rather than in an effect.
  if (lead.status !== syncedStatus) {
    setSyncedStatus(lead.status);
    setStatus(lead.status);
  }

  const onChange = (value: string) => {
    const prev = status;
    setStatus(value); // optimistic
    startTransition(async () => {
      const res = await updateLeadStatusAction(lead.id, value);
      if (!res.ok) setStatus(prev); // revert on failure
    });
  };

  const known = LEAD_STATUSES.some((s) => s.value === status);

  return (
    <select
      value={status}
      disabled={pending}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value)}
      title="Update status"
      className={`cursor-pointer rounded-full border px-2 py-1 text-xs font-medium capitalize outline-none transition-colors disabled:opacity-60 ${
        STATUS_STYLES[status] ?? "border-border bg-card text-heading"
      }`}
    >
      {!known ? <option value={status}>{status}</option> : null}
      {LEAD_STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
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

// Locale-formatted timestamp. `suppressHydrationWarning` covers the expected
// server/client difference in locale + timezone formatting.
function ReceivedAt({ iso }: { iso: string }) {
  return <span suppressHydrationWarning>{new Date(iso).toLocaleString()}</span>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-heading ${className}`}>{children}</td>;
}
