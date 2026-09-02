import { Router } from "express";
import {
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const taskRouter: Router = Router();

taskRouter.route("/add").post(addTask);
taskRouter.route("/update/:id").patch(updateTask);
taskRouter.route("/delete/:id").delete(deleteTask);

export default taskRouter;
