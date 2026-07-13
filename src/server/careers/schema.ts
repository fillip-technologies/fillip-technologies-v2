import { z } from "zod";

/**
 * Validation for the public careers application form. Covers the text fields
 * only; the resume file is validated separately in the route handler (size,
 * mime type) since it arrives as multipart form data.
 */
export const careerApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(40),
  role: z.string().trim().min(1, "Select a role").max(160),
  experience: z.string().trim().min(1, "Select your experience").max(60),
  linkedIn: z.string().trim().max(300).optional().or(z.literal("")),
  portfolio: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
