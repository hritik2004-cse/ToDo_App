export type Task = {
  id: string;
  task: string;
  status: "pending" | "completed";
  isCompleted: boolean;
  updatedAt: string;
};

export type TaskModelProps = {
  id: string;
  name: string;
  updatedAt: string;
  isCompleted: boolean;
  fetchTasks: () => Promise<void>
};