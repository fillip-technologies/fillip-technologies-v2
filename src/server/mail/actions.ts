"use server";

import { z } from "zod";
import { getSession } from "@/server/auth/session";
import { directMailSchema } from "./schema";
import { sendDirectMail, type MailAttachment } from "./send";
import type { DirectMailState } from "./types";

// Keep total upload well under typical Server Action body limits.
const MAX_ATTACHMENTS = 10;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15 MB across all files

/** Turn uploaded FormData files into nodemailer attachments, enforcing limits. */
async function collectAttachments(
  formData: FormData
): Promise<{ attachments: MailAttachment[]; error?: string }> {
  const files = formData
    .getAll("attachments")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) return { attachments: [] };
  if (files.length > MAX_ATTACHMENTS) {
    return { attachments: [], error: `Too many attachments (max ${MAX_ATTACHMENTS}).` };
  }

  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) {
    return { attachments: [], error: "Attachments are too large (max 15 MB total)." };
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
      contentType: f.type || undefined,
    }))
  );
  return { attachments };
}

/**
 * Server Action for the admin Direct Mail composer. Designed for React's
 * `useActionState`, so the first argument is the previous state and the second
 * is the FormData. Guards the session itself — never rely on the layout alone.
 */
export async function sendDirectMailAction(
  _prevState: DirectMailState,
  formData: FormData
): Promise<DirectMailState> {
  if (!(await getSession())) {
    return { ok: false, message: "Your session has expired. Please sign in again." };
  }

  const parsed = directMailSchema.safeParse({
    to: formData.get("to"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    bccCompany: formData.get("bccCompany") === "on",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { attachments, error: attachmentError } = await collectAttachments(formData);
  if (attachmentError) {
    return { ok: false, message: attachmentError };
  }

  try {
    await sendDirectMail(parsed.data, attachments);
    const count = parsed.data.to.length;
    return {
      ok: true,
      message: `Email sent to ${count} recipient${count === 1 ? "" : "s"}.`,
    };
  } catch (err) {
    console.error("sendDirectMailAction failed:", err);
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to send. Please try again.",
    };
  }
}
