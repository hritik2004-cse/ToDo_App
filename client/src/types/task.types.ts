export type Task = {
  id: string;
  task: string;
  status: "pending" | "completed";
  isCompleted: boolean;
  updatedAt: Date;
};

export type TaskModelProps = {
  id: string;
  name: string;
  updatedAt: Date;
  isCompleted: boolean;
};