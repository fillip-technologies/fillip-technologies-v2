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
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(4000),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Optional browser-GPS location the client attaches to a submission (already
 * reverse-geocoded client-side). Coerced leniently — bad/missing values just
 * fall through to server-side IP geolocation.
 */
export const clientLocationSchema = z
  .object({
    lat: z.number().finite().optional(),
    lng: z.number().finite().optional(),
    accuracy: z.number().finite().nullable().optional(),
    city: z.string().trim().max(160).optional(),
    region: z.string().trim().max(160).optional(),
    country: z.string().trim().max(160).optional(),
    label: z.string().trim().max(300).optional(),
  })
  .optional();

export type ClientLocationInput = z.infer<typeof clientLocationSchema>;

/** Parse an unknown `location` value from a request body, tolerating garbage. */
export function parseClientLocation(value: unknown): ClientLocationInput {
  const result = clientLocationSchema.safeParse(value);
  return result.success ? result.data : undefined;
}
