import { z } from "zod";

/**
 * Validation for the admin "Direct Mail" composer. Recipients are entered as a
 * comma/semicolon/newline-separated list and normalised to an email array.
 */
export const directMailSchema = z.object({
  to: z
    .string()
    .trim()
    .min(1, "Enter at least one recipient")
    .transform((raw) =>
      raw
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
    )
    .pipe(
      z
        .array(z.email("One of the recipient addresses is invalid"))
        .min(1, "Enter at least one recipient")
        .max(50, "Too many recipients (max 50)")
    ),
  subject: z.string().trim().min(1, "Enter a subject").max(200),
  message: z.string().trim().min(1, "Write a message").max(20000),
  bccCompany: z.coerce.boolean().optional(),
});

export type DirectMailInput = z.infer<typeof directMailSchema>;
