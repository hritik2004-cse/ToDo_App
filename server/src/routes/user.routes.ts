import { Router } from "express";
import authMiddle from "../middlewares/auth.middleware.js";
import {
  updateProfile,
  updateProfileImg,
  updatePassword,
  getCurrentUser,
} from "../controllers/user.controller.js";
import validate from "../middlewares/validate-data.middleware.js";
import { updateProfileSchema } from "../dto/user/update-profile.dto.js";
import { updatePasswordSchema } from "../dto/user/update-password.dto.js";
import upload from "../middlewares/upload.middleware.js";

const userRouter: Router = Router();
userRouter.use(authMiddle);

userRouter.route("/me").get(getCurrentUser);
userRouter
  .route("/update-profile")
  .post(validate(updateProfileSchema), updateProfile);
userRouter
  .route("/update-password")
  .post(validate(updatePasswordSchema), updatePassword);
userRouter
  .route("/update-profile-img")
  .patch(upload.single("profileImg"), updateProfileImg);

export default userRouter;
