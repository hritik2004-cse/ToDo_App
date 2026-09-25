import { z } from "zod";

export const updatePasswordSchema = z.object({
  newPassword: z.string().min(8).max(40),
});

export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;
