import { Router } from "express";
import {
  updateProfile,
  updateProfileImg,
  updatePassword,
} from "../controllers/user.controller.js";

const userRouter: Router = Router();

userRouter.route("/update-profile").post(updateProfile);
userRouter.route("/update-password").post(updatePassword);
userRouter.route("/update-profile-img").post(updateProfileImg);

export default userRouter;
