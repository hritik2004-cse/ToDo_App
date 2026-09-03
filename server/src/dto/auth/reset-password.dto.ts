import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(32),
  newPassword: z.string().min(8).max(40),
});

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
