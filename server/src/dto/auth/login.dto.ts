import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8).max(40),
});

export type LoginDTO = z.infer<typeof loginSchema>;
