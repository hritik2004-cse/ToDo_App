import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(30),
  lastName: z.string().trim(),
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8).max(40),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
