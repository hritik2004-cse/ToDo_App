import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(32),
  email: z.email().transform((email) => email.trim().toLowerCase()),
});

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
