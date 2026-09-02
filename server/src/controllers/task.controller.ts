import type { Request, Response } from "express";

const addTask = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: "Task added successfully" });
};

const updateTask = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: "Task updated successfully" });
};

const deleteTask = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: "Task deleted successfully" });
};

export {addTask, updateTask, deleteTask}