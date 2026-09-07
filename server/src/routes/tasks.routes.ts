import { Router } from "express";
import authMiddle from "../middlewares/auth.middleware.js";
import { addTaskSchema } from "../dto/tasks/add-task.dto.js";
import validate from "../middlewares/validate-data.middleware.js";
import {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  updateTaskStatus,
} from "../controllers/task.controller.js";

const taskRouter: Router = Router();
taskRouter.use(authMiddle); // using auth middleware in all files

taskRouter.route("/all").get(getAllTasks);
taskRouter.route("/delete/:id").delete(deleteTask);
taskRouter.route("/update/status/:id").patch(updateTaskStatus);
taskRouter.route("/add").post(validate(addTaskSchema), addTask);
taskRouter.route("/update/:id").patch(validate(addTaskSchema), updateTask);

export default taskRouter;
