"use server";

import { z } from "zod";
import { contactSchema } from "./schema";
import { insertLead } from "./queries";
import type { ContactState } from "./types";

/**
 * Server Action for the contact form. Designed for React's `useActionState`,
 * so the first argument is the previous state and the second is the FormData.
 */
export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? "",
    message: formData.get("message"),
    source: formData.get("source") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await insertLead(parsed.data);
    // TODO: send notification email here once email is wired up.
    return { ok: true, message: "Thanks! We'll be in touch shortly." };
  } catch (err) {
    console.error("submitContact failed:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
