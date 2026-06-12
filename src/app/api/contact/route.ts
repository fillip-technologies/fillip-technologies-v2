import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/server/contact/schema";
import { insertLead } from "@/server/contact/queries";

// POST /api/contact  — public: create a lead from the contact form.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }

  try {
    const lead = await insertLead(parsed.data);
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
