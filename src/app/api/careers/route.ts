import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { careerApplicationSchema } from "@/server/careers/schema";
import { insertLead } from "@/server/contact/queries";
import { sendLeadNotification, type MailAttachment } from "@/server/contact/notify";

// nodemailer + fs need the Node.js runtime (not edge).
export const runtime = "nodejs";

// Resumes land under public/uploads/resumes and are linked from the lead.
const RESUME_DIR = path.join(process.cwd(), "public", "uploads", "resumes");
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

// Accepted resume formats → file extension.
const RESUME_TYPES = new Map<string, string>([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
]);

// POST /api/careers — public: create a lead from a job application and email
// the team with the applicant's resume attached.
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Expected multipart form data." }, { status: 400 });
  }

  const parsed = careerApplicationSchema.safeParse({
    fullName: form.get("fullName"),
    email: form.get("email"),
    phone: form.get("phone"),
    role: form.get("role"),
    experience: form.get("experience"),
    linkedIn: form.get("linkedIn"),
    portfolio: form.get("portfolio"),
    message: form.get("message"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", errors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 }
    );
  }
  const data = parsed.data;

  // Resume is required and validated here (it arrives as a file, not JSON).
  const resume = form.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json(
      { ok: false, message: "Please attach your resume.", errors: { resume: ["Resume is required."] } },
      { status: 422 }
    );
  }
  const ext = RESUME_TYPES.get(resume.type);
  if (!ext) {
    return NextResponse.json(
      { ok: false, message: "Unsupported resume format. Use PDF, DOC or DOCX.", errors: { resume: ["Use PDF, DOC or DOCX."] } },
      { status: 415 }
    );
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Resume must be smaller than 5 MB.", errors: { resume: ["Max 5 MB."] } },
      { status: 413 }
    );
  }

  const bytes = Buffer.from(await resume.arrayBuffer());

  // Persist the resume so it's linkable from the admin Leads view.
  let resumeUrl = "";
  try {
    await mkdir(RESUME_DIR, { recursive: true });
    const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
    await writeFile(path.join(RESUME_DIR, filename), bytes);
    resumeUrl = `/uploads/resumes/${filename}`;
  } catch (err) {
    console.error("Resume save failed:", err);
    // Not fatal — the resume is still attached to the notification email below.
  }

  // Fold the application-specific fields into the lead message so they show in
  // the admin Leads section (which only renders the standard lead columns).
  const summary = [
    `Job application for: ${data.role}`,
    `Experience: ${data.experience}`,
    data.linkedIn ? `LinkedIn: ${data.linkedIn}` : "",
    data.portfolio ? `Portfolio: ${data.portfolio}` : "",
    resumeUrl ? `Resume: ${resumeUrl}` : "Resume: (attached to email only)",
    "",
    data.message ? data.message : "(No message provided.)",
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    const lead = await insertLead({
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      company: "",
      budget: "",
      message: summary,
      source: "Careers Application",
    });

    // Notify the team with the resume attached. Best-effort: the lead is saved,
    // so a mail failure must not fail the request.
    try {
      const safeName = data.fullName.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "applicant";
      const attachments: MailAttachment[] = [
        { filename: `resume-${safeName}.${ext}`, content: bytes, contentType: resume.type },
      ];
      await sendLeadNotification(lead, attachments);
    } catch (mailErr) {
      console.error("Career application email failed:", mailErr);
    }

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/careers failed:", err);
    return NextResponse.json({ ok: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
