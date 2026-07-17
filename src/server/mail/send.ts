import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { COMPANY } from "@/data/pricing";
import type { DirectMailInput } from "./schema";

/** A file to attach to a direct mail (built from the uploaded FormData files). */
export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

/**
 * Admin "Direct Mail" sender. Reuses the same SMTP env as the lead/quote
 * mailers (SMTP_HOST/PORT/USER/PASS, SMTP_FROM). A single transporter is cached
 * on globalThis so dev hot-reloads don't open a new connection pool.
 */
const globalForMail = globalThis as unknown as { directTransporter?: Transporter };

function getTransporter(): Transporter {
  if (globalForMail.directTransporter) return globalForMail.directTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local (see .env.example)."
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587/STARTTLS
    auth: { user, pass },
  });

  globalForMail.directTransporter = transporter;
  return transporter;
}

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Wrap the plain-text body in the branded email shell, preserving line breaks. */
function buildHtml(message: string): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:600px;margin:0 auto">
    <div style="background:#081C2E;color:#fff;padding:20px 24px">
      <div style="font-size:16px;font-weight:700">${esc(COMPANY.name)}</div>
      ${COMPANY.tagline ? `<div style="font-size:11px;color:#38bdf8">${esc(COMPANY.tagline)}</div>` : ""}
    </div>
    <div style="padding:24px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(message)}</div>
  </div>`;
}

/**
 * Send a one-off email from the admin panel to one or more clients. Throws if
 * SMTP isn't configured (surfaced to the admin as an error message).
 */
export async function sendDirectMail(
  input: DirectMailInput,
  attachments: MailAttachment[] = []
): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || `${COMPANY.name} <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from,
    to: input.to,
    bcc: input.bccCompany && COMPANY.email ? COMPANY.email : undefined,
    replyTo: COMPANY.email || undefined,
    subject: input.subject,
    text: input.message,
    html: buildHtml(input.message),
    attachments: attachments.length ? attachments : undefined,
  });
}
