import mongoose from "mongoose";

export default interface TaskItems {
  userId: mongoose.Types.ObjectId;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "completed";
}
