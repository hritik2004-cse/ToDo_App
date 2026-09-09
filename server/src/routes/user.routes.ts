import { Router } from "express";
import authMiddle from "../middlewares/auth.middleware.js";
import {
  updateProfile,
  updateProfileImg,
  updatePassword,
  getCurrentUser,
} from "../controllers/user.controller.js";

const userRouter: Router = Router();
userRouter.use(authMiddle);

userRouter.route("/me").get(getCurrentUser);
userRouter.route("/update-profile").post(updateProfile);
userRouter.route("/update-password").post(updatePassword);
userRouter.route("/update-profile-img").post(updateProfileImg);

export default userRouter;
