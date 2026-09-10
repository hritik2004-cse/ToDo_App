import type { Request, Response } from "express";
import {
  addTaskService,
  deleteTaskService,
  getAllTasksService,
  updateTaskService,
  updateTaskStatusService,
} from "../service/task/task.service.js";

// get all task controller
export const getAllTasks = async (req: Request, res: Response) => {
  const data = await getAllTasksService(req.userId);
  return res.status(200).json({
    success: true,
    message: "Tasks fetched successfully",
    tasks: data.tasks,
  });
};

// add task controller
export const addTask = async (req: Request, res: Response) => {
  const data = await addTaskService(req.body, req.userId);
  return res
    .status(200)
    .json({ success: true, message: "Task added successfully", task: data });
};

// update task controller
export const updateTaskStatus = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await updateTaskStatusService(req.userId, req.params.id);
  return res.status(200).json({
    success: true,
    message: "Updated task status successfully",
    task: data,
  });
};

// update task controller
export const updateTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const data = await updateTaskService(req.body, req.userId, req.params.id);
  return res
    .status(200)
    .json({ success: true, message: "Task updated successfully", task: data });
};

// delete task controller
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  await deleteTaskService(req.userId, req.params.id);
  return res
    .status(200)
    .json({ success: true, message: "Task deleted successfully" });
};
