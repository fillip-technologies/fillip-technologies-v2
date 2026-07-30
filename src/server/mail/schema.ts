import { z } from "zod";

/**
 * Splits a comma/semicolon/newline-separated string into an array of email
 * addresses. `required` controls whether at least one address must be present
 * (To is required; Cc/Bcc are optional).
 */
function recipientList(field: string, { required }: { required: boolean }) {
  const base = z
    .string()
    .trim()
    .transform((raw) =>
      raw
        .split(/[,;\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
    )
    .pipe(
      z
        .array(z.email(`One of the ${field} addresses is invalid`))
        .max(50, `Too many ${field} recipients (max 50)`)
        .refine((arr) => !required || arr.length > 0, {
          message: "Enter at least one recipient",
        })
    );
  // Cc/Bcc may be omitted entirely — treat a missing value as an empty list.
  return required ? base : z.string().optional().default("").pipe(base);
}

/**
 * Validation for the admin mail composer. To/Cc/Bcc are entered as
 * comma/semicolon/newline-separated lists and normalised to email arrays.
 */
export const directMailSchema = z.object({
  to: recipientList("recipient", { required: true }),
  cc: recipientList("Cc", { required: false }),
  bcc: recipientList("Bcc", { required: false }),
  subject: z.string().trim().min(1, "Enter a subject").max(200),
  message: z.string().trim().min(1, "Write a message").max(20000),
  bccCompany: z.coerce.boolean().optional(),
});

export type DirectMailInput = z.infer<typeof directMailSchema>;
