import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateQuote } from "@/lib/quote";
import { quoteRequestSchema } from "@/server/quote/schema";
import { generateQuotePdf } from "@/server/quote/pdf";
import { sendQuoteEmail } from "@/server/quote/email";
import { insertQuote } from "@/server/quote/queries";

// nodemailer + pdf-lib need the Node.js runtime (not edge).
export const runtime = "nodejs";

// POST /api/quote — public. Prices the selections server-side, generates a PDF,
// emails it to the client, stores the request, and returns the PDF for download.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 }
    );
  }

  // Authoritative re-pricing: never trust prices from the client.
  const quote = calculateQuote(parsed.data.selections);
  if (quote.isEmpty) {
    return NextResponse.json(
      { ok: false, message: "Your selection is empty. Please choose at least one package." },
      { status: 400 }
    );
  }

  let pdf: Uint8Array;
  try {
    pdf = await generateQuotePdf(parsed.data, quote);
  } catch (err) {
    console.error("generateQuotePdf failed:", err);
    return NextResponse.json({ ok: false, message: "Could not generate your estimate." }, { status: 500 });
  }

  // Attempt to email; a delivery failure should not lose the lead or block the
  // on-page download, so we record the outcome and carry on.
  let emailed = false;
  try {
    await sendQuoteEmail(parsed.data, quote, pdf);
    emailed = true;
  } catch (err) {
    console.error("sendQuoteEmail failed:", err);
  }

  try {
    await insertQuote(parsed.data, quote, emailed);
  } catch (err) {
    console.error("insertQuote failed:", err);
  }

  return NextResponse.json({
    ok: true,
    emailed,
    message: emailed
      ? "Your estimate is on its way to your inbox."
      : "Your estimate is ready to download. (Email delivery is not configured yet.)",
    filename: "Fillip-Technologies-Estimate.pdf",
    pdfBase64: Buffer.from(pdf).toString("base64"),
    totals: { oneTime: quote.oneTime.total, monthly: quote.monthly.total },
  });
}
