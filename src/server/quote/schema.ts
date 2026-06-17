import { z } from "zod";

/**
 * Validation for the public "Build your quote" submission. The selections are
 * re-priced server-side (see calculateQuote), so we only need their ids here.
 */
export const selectedAddOnSchema = z.object({
  id: z.string().trim().min(1).max(60),
  quantity: z.number().int().min(1).max(100).default(1),
});

export const quoteSelectionSchema = z.object({
  categoryId: z.string().trim().min(1).max(60),
  packageId: z.string().trim().min(1).max(60),
  addOns: z.array(selectedAddOnSchema).max(40).default([]),
});

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  selections: z
    .array(quoteSelectionSchema)
    .min(1, "Select at least one package")
    .max(20),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
