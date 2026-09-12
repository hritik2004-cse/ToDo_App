import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().trim().min(1).max(20),
  lastName: z.string().trim(),
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
