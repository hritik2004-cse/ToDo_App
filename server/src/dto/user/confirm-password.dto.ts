import { z } from "zod";

export const confirmPasswordSchema = z.object({
  password: z.string().min(8).max(40),
});

export type ConfirmPasswordDTO = z.infer<typeof confirmPasswordSchema>;
