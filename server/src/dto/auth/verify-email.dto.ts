import { z } from "zod";

export const verifyEmailSchema = z.object({
  otp: z.string().min(6).max(6),
});

export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;
