import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { COMPANY, QUOTE_NOTE } from "@/data/pricing";
import { formatINR, type QuoteResult } from "@/lib/quote";
import type { QuoteRequestInput } from "./schema";

/**
 * SMTP config comes from env (see .env.example). A single transporter is
 * cached on globalThis so dev hot-reloads don't open a new connection pool.
 */
const globalForMail = globalThis as unknown as { quoteTransporter?: Transporter };

function getTransporter(): Transporter {
  if (globalForMail.quoteTransporter) return globalForMail.quoteTransporter;

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

  globalForMail.quoteTransporter = transporter;
  return transporter;
}

function totalsSummary(quote: QuoteResult): string {
  const parts: string[] = [];
  if (quote.oneTime.subtotal > 0) {
    parts.push(`One-time total: ${formatINR(quote.oneTime.total)} (incl. GST)`);
  }
  if (quote.monthly.subtotal > 0) {
    parts.push(`Monthly total: ${formatINR(quote.monthly.total)}/mo (incl. GST)`);
  }
  return parts.join(" • ");
}

function buildHtml(input: QuoteRequestInput, quote: QuoteResult): string {
  const rows = quote.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #e2e8f0">${i.categoryName} — ${i.label}</td>` +
        `<td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;text-align:right">${formatINR(i.price)}${
          i.billing === "monthly" ? "/mo" : ""
        }</td></tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:600px;margin:0 auto">
    <div style="background:#081C2E;color:#fff;padding:24px">
      <div style="font-size:18px;font-weight:700">${COMPANY.name}</div>
      <div style="font-size:11px;color:#38bdf8">${COMPANY.tagline}</div>
    </div>
    <div style="padding:24px">
      <p>Hi ${input.name},</p>
      <p>Thank you for your interest in working with us. Your service estimate is attached as a PDF. Here's a quick summary:</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">${rows}</table>
      <p style="margin-top:16px;font-weight:700">${totalsSummary(quote)}</p>
      <p style="background:#f0f7ff;border:1px solid #bfdbfe;color:#0242a2;padding:12px;border-radius:8px;font-size:13px">
        ${QUOTE_NOTE}
      </p>
      <p style="font-size:12px;color:#64748b">Reply to this email or call us to discuss the details.</p>
    </div>
  </div>`;
}

/** Email the generated quote PDF to the client (and BCC the company inbox). */
export async function sendQuoteEmail(
  input: QuoteRequestInput,
  quote: QuoteResult,
  pdf: Uint8Array
): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || `${COMPANY.name} <${process.env.SMTP_USER}>`;
  const bcc = process.env.QUOTE_BCC || undefined;

  await transporter.sendMail({
    from,
    to: input.email,
    bcc,
    subject: `Your Service Estimate — ${COMPANY.name}`,
    html: buildHtml(input, quote),
    attachments: [
      {
        filename: "Fillip-Technologies-Estimate.pdf",
        content: Buffer.from(pdf),
        contentType: "application/pdf",
      },
    ],
  });
}
