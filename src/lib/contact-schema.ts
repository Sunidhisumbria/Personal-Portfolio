import { z } from "zod";

// Shared by the contact form (instant feedback in the browser) and the
// server action (the check that actually guards the database).
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string[]>>;

export function validateContact(values: Record<ContactField, string>) {
  const parsed = contactSchema.safeParse(values);
  return parsed.success
    ? ({ success: true, data: parsed.data } as const)
    : ({ success: false, errors: z.flattenError(parsed.error).fieldErrors as ContactErrors } as const);
}
