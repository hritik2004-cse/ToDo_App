import { z } from "zod";

export const resendVerifyEmailSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
});

export type ResendVerifyEmailDTO = z.infer<typeof resendVerifyEmailSchema>;
