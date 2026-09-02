import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
});

export type ForgetPasswordDTO = z.infer<typeof forgetPasswordSchema>;
