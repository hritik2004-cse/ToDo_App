import { Router } from "express";
import {
  register,
  login,
  forgetPassword,
  resetPassword,
  logout,
  deleteAccount,
} from "../controllers/auth.controller.js";

const authRouter: Router = Router();

authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/register").post(register);
authRouter.route("/reset-password").post(resetPassword);
authRouter.route("/forget-password").post(forgetPassword);
authRouter.route("/delete-account").delete(deleteAccount);

export default authRouter;