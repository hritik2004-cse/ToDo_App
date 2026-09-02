import { z } from "zod";

const loginSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8),
});

export type RegisterDTO = z.infer<typeof loginSchema>;
