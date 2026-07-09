import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { COMPANY } from "@/data/pricing";
import type { Lead } from "./queries";

/**
 * Team-facing "new lead" notification email. Reuses the same SMTP env as the
 * quote mailer (SMTP_HOST/PORT/USER/PASS, SMTP_FROM). The recipient is
 * LEADS_NOTIFY_TO, falling back to QUOTE_BCC, then SMTP_USER.
 *
 * All failures are swallowed by the caller — a lead is already persisted, so a
 * mail hiccup must never break the submission.
 */
const globalForMail = globalThis as unknown as { leadTransporter?: Transporter };

function getTransporter(): Transporter | null {
  if (globalForMail.leadTransporter) return globalForMail.leadTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587/STARTTLS
    auth: { user, pass },
  });
  globalForMail.leadTransporter = transporter;
  return transporter;
}

// Human labels for known lead sources; anything else is a generic contact lead.
const SOURCE_LABELS: Record<string, string> = {
  "get-a-quote-requirement": "Quote Requirement",
};

function labelFor(source: string | null): string {
  return (source && SOURCE_LABELS[source]) || "Contact Lead";
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a">${value}</td>
  </tr>`;
}

function buildHtml(lead: Lead, label: string): string {
  const rows = [
    row("Name", esc(lead.name)),
    row("Email", `<a href="mailto:${esc(lead.email)}" style="color:#0242a2">${esc(lead.email)}</a>`),
    lead.phone ? row("Phone", esc(lead.phone)) : "",
    lead.company ? row("Company", esc(lead.company)) : "",
    row("Source", esc(lead.source ?? "—")),
    row("Received", new Date(lead.created_at).toLocaleString()),
  ].join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:600px;margin:0 auto">
    <div style="background:#081C2E;color:#fff;padding:20px 24px">
      <div style="font-size:16px;font-weight:700">New ${esc(label)}</div>
      <div style="font-size:11px;color:#38bdf8">${COMPANY.name}</div>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">${rows}</table>
      <div style="margin-top:16px">
        <div style="font-size:12px;color:#64748b;margin-bottom:6px">Message / requirement</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:13px;white-space:pre-wrap">${esc(lead.message)}</div>
      </div>
    </div>
  </div>`;
}

/** Notify the team about a newly created lead. No-ops if SMTP isn't configured. */
export async function sendLeadNotification(lead: Lead): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Lead notification skipped: SMTP not configured.");
    return;
  }

  const to = process.env.LEADS_NOTIFY_TO || process.env.QUOTE_BCC || process.env.SMTP_USER;
  if (!to) {
    console.warn("Lead notification skipped: no recipient (set LEADS_NOTIFY_TO).");
    return;
  }

  const from = process.env.SMTP_FROM || `${COMPANY.name} <${process.env.SMTP_USER}>`;
  const label = labelFor(lead.source);

  await transporter.sendMail({
    from,
    to,
    replyTo: lead.email,
    subject: `New ${label}: ${lead.name}`,
    html: buildHtml(lead, label),
  });
}
