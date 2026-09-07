import mongoose from "mongoose";
import type TaskItems from "../types/task.types.js";

const taskSchema = new mongoose.Schema<TaskItems>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model<TaskItems>("Tasks", taskSchema);
export default Task;
