import { z } from "zod";

/**
 * Validation for the public contact / lead form.
 * Shared by the server action (and can be reused on the client with
 * react-hook-form's zodResolver).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(4000),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
