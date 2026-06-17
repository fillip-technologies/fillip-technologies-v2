import "server-only";
import {
  PDFDocument,
  PDFFont,
  PDFPage,
  StandardFonts,
  rgb,
  type RGB,
} from "pdf-lib";
import { COMPANY, QUOTE_NOTE, findPackage } from "@/data/pricing";
import type { QuoteResult } from "@/lib/quote";
import type { QuoteRequestInput } from "./schema";

// A4 in points.
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;

const NAVY: RGB = rgb(8 / 255, 28 / 255, 46 / 255);
const BLUE: RGB = rgb(2 / 255, 66 / 255, 162 / 255);
const INK: RGB = rgb(15 / 255, 23 / 255, 42 / 255);
const MUTED: RGB = rgb(100 / 255, 116 / 255, 139 / 255);
const LINE: RGB = rgb(226 / 255, 232 / 255, 240 / 255);
const WHITE: RGB = rgb(1, 1, 1);

/** pdf-lib StandardFonts use WinAnsi, which has no ₹ glyph — use "Rs.". */
function rs(amount: number): string {
  return "Rs. " + amount.toLocaleString("en-IN");
}

type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  regular: PDFFont;
  bold: PDFFont;
  y: number;
};

function newPage(ctx: Ctx) {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.y = PAGE_H - MARGIN;
}

function ensureSpace(ctx: Ctx, needed: number) {
  if (ctx.y - needed < MARGIN) newPage(ctx);
}

/** Break a string into lines that fit within maxWidth at the given font/size. */
function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawParagraph(
  ctx: Ctx,
  text: string,
  opts: { size?: number; font?: PDFFont; color?: RGB; gap?: number; x?: number; width?: number } = {}
) {
  const size = opts.size ?? 10;
  const font = opts.font ?? ctx.regular;
  const color = opts.color ?? INK;
  const x = opts.x ?? MARGIN;
  const width = opts.width ?? CONTENT_W;
  const lineHeight = size * 1.45;
  for (const line of wrap(text, font, size, width)) {
    ensureSpace(ctx, lineHeight);
    ctx.page.drawText(line, { x, y: ctx.y - size, size, font, color });
    ctx.y -= lineHeight;
  }
  ctx.y -= opts.gap ?? 0;
}

function drawBullet(ctx: Ctx, text: string) {
  const size = 9.5;
  const indent = 14;
  const lineHeight = size * 1.4;
  const lines = wrap(text, ctx.regular, size, CONTENT_W - indent - 8);
  ensureSpace(ctx, lineHeight * lines.length);
  ctx.page.drawCircle({ x: MARGIN + 4, y: ctx.y - size + 3, size: 1.6, color: BLUE });
  lines.forEach((line, i) => {
    ctx.page.drawText(line, {
      x: MARGIN + indent,
      y: ctx.y - size,
      size,
      font: ctx.regular,
      color: rgb(71 / 255, 85 / 255, 105 / 255),
    });
    ctx.y -= lineHeight;
    if (i < lines.length - 1) ensureSpace(ctx, lineHeight);
  });
}

function sectionHeading(ctx: Ctx, text: string) {
  ensureSpace(ctx, 34);
  ctx.y -= 8;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y - 14, width: 3, height: 16, color: BLUE });
  ctx.page.drawText(text, {
    x: MARGIN + 12,
    y: ctx.y - 11,
    size: 13,
    font: ctx.bold,
    color: NAVY,
  });
  ctx.y -= 26;
}

function drawHeaderBand(ctx: Ctx) {
  const bandH = 96;
  ctx.page.drawRectangle({ x: 0, y: PAGE_H - bandH, width: PAGE_W, height: bandH, color: NAVY });
  ctx.page.drawText(COMPANY.name, {
    x: MARGIN,
    y: PAGE_H - 44,
    size: 18,
    font: ctx.bold,
    color: WHITE,
  });
  ctx.page.drawText(COMPANY.tagline, {
    x: MARGIN,
    y: PAGE_H - 62,
    size: 9,
    font: ctx.regular,
    color: rgb(56 / 255, 189 / 255, 248 / 255),
  });
  const title = "SERVICE ESTIMATE";
  const titleW = ctx.bold.widthOfTextAtSize(title, 12);
  ctx.page.drawText(title, {
    x: PAGE_W - MARGIN - titleW,
    y: PAGE_H - 50,
    size: 12,
    font: ctx.bold,
    color: WHITE,
  });
  ctx.y = PAGE_H - bandH - 24;
}

function drawMeta(ctx: Ctx, input: QuoteRequestInput) {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const left = [
    ["Prepared for", input.name],
    input.company ? ["Company", input.company] : null,
    ["Email", input.email],
    ["Phone", input.phone],
  ].filter(Boolean) as [string, string][];

  ctx.page.drawText(`Date: ${dateStr}`, {
    x: PAGE_W - MARGIN - ctx.regular.widthOfTextAtSize(`Date: ${dateStr}`, 9.5),
    y: ctx.y - 9,
    size: 9.5,
    font: ctx.regular,
    color: MUTED,
  });

  for (const [label, value] of left) {
    ensureSpace(ctx, 16);
    ctx.page.drawText(`${label}:`, { x: MARGIN, y: ctx.y - 10, size: 9.5, font: ctx.bold, color: NAVY });
    ctx.page.drawText(value, { x: MARGIN + 80, y: ctx.y - 10, size: 9.5, font: ctx.regular, color: INK });
    ctx.y -= 16;
  }
  ctx.y -= 6;
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE_W - MARGIN, y: ctx.y },
    thickness: 1,
    color: LINE,
  });
  ctx.y -= 6;
}

/** Commercials table: Particulars | Billing | Amount, then totals. */
function drawCommercials(ctx: Ctx, quote: QuoteResult) {
  sectionHeading(ctx, "Commercials");

  const colParticulars = MARGIN + 6;
  const colBilling = MARGIN + 320;
  const amountRight = PAGE_W - MARGIN - 6;
  const rowH = 20;

  const headerY = ctx.y;
  ctx.page.drawRectangle({ x: MARGIN, y: headerY - rowH, width: CONTENT_W, height: rowH, color: NAVY });
  ctx.page.drawText("Particulars", { x: colParticulars, y: headerY - 14, size: 9.5, font: ctx.bold, color: WHITE });
  ctx.page.drawText("Billing", { x: colBilling, y: headerY - 14, size: 9.5, font: ctx.bold, color: WHITE });
  const amtHdr = "Amount";
  ctx.page.drawText(amtHdr, {
    x: amountRight - ctx.bold.widthOfTextAtSize(amtHdr, 9.5),
    y: headerY - 14,
    size: 9.5,
    font: ctx.bold,
    color: WHITE,
  });
  ctx.y -= rowH;

  quote.items.forEach((item, idx) => {
    ensureSpace(ctx, rowH);
    if (idx % 2 === 1) {
      ctx.page.drawRectangle({
        x: MARGIN,
        y: ctx.y - rowH,
        width: CONTENT_W,
        height: rowH,
        color: rgb(248 / 255, 250 / 255, 252 / 255),
      });
    }
    const label = `${item.categoryName} — ${item.label}`;
    const labelLines = wrap(label, ctx.regular, 9, 290);
    ctx.page.drawText(labelLines[0], { x: colParticulars, y: ctx.y - 13, size: 9, font: ctx.regular, color: INK });
    ctx.page.drawText(item.billing === "monthly" ? "Per month" : "One-time", {
      x: colBilling,
      y: ctx.y - 13,
      size: 9,
      font: ctx.regular,
      color: MUTED,
    });
    const amt = rs(item.price) + (item.billing === "monthly" ? "/mo" : "");
    ctx.page.drawText(amt, {
      x: amountRight - ctx.regular.widthOfTextAtSize(amt, 9),
      y: ctx.y - 13,
      size: 9,
      font: ctx.regular,
      color: INK,
    });
    ctx.y -= rowH;
  });

  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE_W - MARGIN, y: ctx.y },
    thickness: 1,
    color: LINE,
  });
  ctx.y -= 8;

  const gstPct = Math.round(quote.gstRate * 100);
  const totalsRow = (label: string, value: string, bold = false, color: RGB = INK) => {
    ensureSpace(ctx, 16);
    const font = bold ? ctx.bold : ctx.regular;
    const size = bold ? 10.5 : 9.5;
    ctx.page.drawText(label, { x: colBilling, y: ctx.y - 11, size, font, color });
    ctx.page.drawText(value, {
      x: amountRight - font.widthOfTextAtSize(value, size),
      y: ctx.y - 11,
      size,
      font,
      color,
    });
    ctx.y -= bold ? 20 : 15;
  };

  if (quote.oneTime.subtotal > 0) {
    totalsRow("One-time subtotal", rs(quote.oneTime.subtotal));
    if (quote.gstRate > 0) totalsRow(`GST (${gstPct}%)`, rs(quote.oneTime.gst));
    totalsRow("One-time total", rs(quote.oneTime.total), true, NAVY);
  }
  if (quote.monthly.subtotal > 0) {
    if (quote.oneTime.subtotal > 0) ctx.y -= 4;
    totalsRow("Monthly subtotal", rs(quote.monthly.subtotal) + "/mo");
    if (quote.gstRate > 0) totalsRow(`GST (${gstPct}%)`, rs(quote.monthly.gst) + "/mo");
    totalsRow("Monthly total (recurring)", rs(quote.monthly.total) + "/mo", true, NAVY);
  }
}

function drawNote(ctx: Ctx) {
  ensureSpace(ctx, 60);
  ctx.y -= 10;
  const boxTop = ctx.y;
  const lines = wrap(QUOTE_NOTE, ctx.regular, 9, CONTENT_W - 24);
  const boxH = lines.length * 13 + 18;
  ctx.page.drawRectangle({
    x: MARGIN,
    y: boxTop - boxH,
    width: CONTENT_W,
    height: boxH,
    color: rgb(240 / 255, 247 / 255, 255 / 255),
    borderColor: rgb(191 / 255, 219 / 255, 254 / 255),
    borderWidth: 1,
  });
  let ty = boxTop - 14;
  for (const line of lines) {
    ctx.page.drawText(line, { x: MARGIN + 12, y: ty - 4, size: 9, font: ctx.regular, color: BLUE });
    ty -= 13;
  }
  ctx.y = boxTop - boxH - 4;
}

function drawFooterHighlights(ctx: Ctx) {
  sectionHeading(ctx, "Why Choose Fillip Technologies");
  for (const h of COMPANY.highlights) drawBullet(ctx, h);
  ctx.y -= 6;
  drawParagraph(
    ctx,
    "Thank you for considering Fillip Technologies. We look forward to delivering a professional, modern, and business-focused solution that strengthens your digital presence.",
    { size: 9.5, color: MUTED }
  );
}

/**
 * Render the quote as a PDF and return the raw bytes. The caller decides
 * whether to email it, stream it for download, or both.
 */
export async function generateQuotePdf(
  input: QuoteRequestInput,
  quote: QuoteResult
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Service Estimate — ${input.name}`);
  doc.setAuthor(COMPANY.name);

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const ctx: Ctx = { doc, page: doc.addPage([PAGE_W, PAGE_H]), regular, bold, y: PAGE_H - MARGIN };

  drawHeaderBand(ctx);
  drawMeta(ctx, input);

  drawParagraph(
    ctx,
    "Based on your selections, here is an indicative estimate for the services you are interested in. The scope and inclusions for each selected package are detailed below.",
    { size: 10, color: INK, gap: 4 }
  );

  // Selected packages with their scope.
  sectionHeading(ctx, "Selected Services");
  for (const sel of input.selections) {
    const pkg = findPackage(sel.categoryId, sel.packageId);
    if (!pkg) continue;
    ensureSpace(ctx, 24);
    ctx.page.drawText(`${pkg.name}${pkg.tagline ? ` — ${pkg.tagline}` : ""}`, {
      x: MARGIN,
      y: ctx.y - 12,
      size: 11,
      font: ctx.bold,
      color: BLUE,
    });
    ctx.y -= 18;
    if (pkg.timeline) {
      drawParagraph(ctx, `Timeline: ${pkg.timeline}`, { size: 9, color: MUTED });
    }
    for (const group of pkg.featureGroups) {
      ensureSpace(ctx, 16);
      ctx.page.drawText(group.title, { x: MARGIN, y: ctx.y - 11, size: 9.5, font: ctx.bold, color: NAVY });
      ctx.y -= 15;
      for (const item of group.items) drawBullet(ctx, item);
    }
    ctx.y -= 6;
  }

  drawCommercials(ctx, quote);
  drawNote(ctx);
  drawFooterHighlights(ctx);

  return doc.save();
}
