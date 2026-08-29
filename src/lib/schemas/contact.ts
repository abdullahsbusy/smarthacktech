import { z } from "zod";

// Shared between the client form (react-hook-form + zodResolver) and the
// server route handler, so validation rules can't drift between the two.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200, "That's a bit long."),
  email: z.string().trim().min(1, "Please enter your email.").email("That email address doesn't look right.").max(200),
  company: z.string().trim().max(200, "That's a bit long.").optional().or(z.literal("")),
  service: z.string().trim().min(1, "Please choose what you need."),
  message: z.string().trim().min(1, "Please tell us what you're trying to solve.").max(5000, "That's a bit long — try trimming it down."),
  // honeypot: real users never fill this in — bots that autofill every field will.
  _gotcha: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const SERVICE_OPTIONS = [
  "IoT Solutions",
  "Fleet / Vehicle IoT",
  "Smart Home & Automation",
  "AI & Automation",
  "Security & Surveillance",
  "Software Development",
  "Training & Education",
  "Something else",
] as const;
