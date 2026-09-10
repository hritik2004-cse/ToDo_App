import Task from "../../models/task.model.js";
import type { AddTaskDTO } from "../../dto/tasks/add-task.dto.js";
import { AppError } from "../../utils/app-error.utils.js";

// get all tasks service
export const getAllTasksService = async (userId: string) => {
  const tasks = await Task.find({ userId: userId }).sort({ createdAt: -1 }); // this will always sort tasks in decending order

  return {
    tasks: tasks.map((task) => ({
      id: task._id,
      task: task.task,
      isCompleted: task.isCompleted,
      status: task.status,
      updatedAt: task.updatedAt,
    })),
  };
};

// add task service
export const addTaskService = async (data: AddTaskDTO, userId: string) => {
  const { task } = data;

  const newTask = await Task.create({
    userId: userId,
    task: task,
  });

  return {
    id: newTask._id,
    task: newTask.task,
    updatedAt: newTask.updatedAt,
  };
};

// update task status
export const updateTaskStatusService = async (userId: string, id: string) => {
  const task = await Task.findOne({ userId: userId, _id: id });

  if (!task) {
    throw new AppError(404, "task not found");
  }

  task.status = "completed";
  task.isCompleted = true;
  await task.save();
  return {
    id: task._id,
    task: task.task,
    status: task.status,
    updatedAt: task.updatedAt,
    isCompleted: task.isCompleted,
  };
};

// update task service
export const updateTaskService = async (
  data: AddTaskDTO,
  userId: string,
  id: string,
) => {
  const task = await Task.findOne({ userId: userId, _id: id });

  if (!task) {
    throw new AppError(404, "task not found");
  }

  task.task = data.task;
  await task.save();
  return {
    id: task._id,
    task: task.task,
    status: task.status,
    updatedAt: task.updatedAt,
  };
};

// delete task service
export const deleteTaskService = async (userId: string, id: string) => {
  const deletedTask = await Task.findOneAndDelete({ userId: userId, _id: id });

  if (!deletedTask) {
    throw new AppError(404, "task not found");
  }
};
