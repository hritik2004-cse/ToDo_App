import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import authMiddle from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate-data.middleware.js";
import { updateProfileSchema } from "../dto/user/update-profile.dto.js";
import { updatePasswordSchema } from "../dto/user/update-password.dto.js";
import { confirmPasswordSchema } from "../dto/user/confirm-password.dto.js";
import {
  updateProfile,
  updateProfileImg,
  updatePassword,
  getCurrentUser,
  confirmPassword,
} from "../controllers/user.controller.js";

const userRouter: Router = Router();
userRouter.use(authMiddle);

userRouter.route("/me").get(getCurrentUser);
userRouter
  .route("/update-profile")
  .patch(validate(updateProfileSchema), updateProfile);
userRouter
  .route("/update-password")
  .patch(validate(updatePasswordSchema), updatePassword);
userRouter
  .route("/update-profile-img")
  .patch(upload.single("profileImg"), updateProfileImg);
userRouter
  .route("/confirm-password")
  .post(validate(confirmPasswordSchema), confirmPassword);

export default userRouter;
