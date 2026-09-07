import { z } from "zod";

export const addTaskSchema = z.object({
  task: z.string().min(1),
});

export type AddTaskDTO = z.infer<typeof addTaskSchema>;
