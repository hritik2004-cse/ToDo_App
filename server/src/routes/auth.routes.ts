import { Router } from "express";
import { loginSchema } from "../dto/auth/login.dto.js";
import authMiddle from "../middlewares/auth.middleware.js";
import { registerSchema } from "../dto/auth/register.dto.js";
import validate from "../middlewares/validate-data.middleware.js";
import { verifyEmailSchema } from "../dto/auth/verify-email.dto.js";
import { resetPasswordSchema } from "../dto/auth/reset-password.dto.js";
import { forgetPasswordSchema } from "../dto/auth/forget-password.dto.js";
import { resendVerifyEmailSchema } from "../dto/auth/resend-verify-email.dto.js";
import {
  login,
  logout,
  register,
  verifyEmail,
  resetPassword,
  deleteAccount,
  forgetPassword,
  resendForgetPassword,
  resendEmailVerification,
} from "../controllers/auth.controller.js";

const authRouter: Router = Router();

// with authMiddle
authRouter.route("/logout").post(authMiddle, logout);
authRouter.route("/delete-account").delete(authMiddle, deleteAccount);

// with validate middleware
authRouter.route("/login").post(validate(loginSchema), login);
authRouter.route("/register").post(validate(registerSchema), register);
authRouter
  .route("/verify-email")
  .post(validate(verifyEmailSchema), verifyEmail);
authRouter
  .route("/reset-password")
  .post(validate(resetPasswordSchema), resetPassword);
authRouter
  .route("/forget-password")
  .post(validate(forgetPasswordSchema), forgetPassword);
authRouter
  .route("/resend-forget-password")
  .post(validate(forgetPasswordSchema), resendForgetPassword);
authRouter
  .route("/resend-verify-email")
  .post(validate(resendVerifyEmailSchema), resendEmailVerification);
export default authRouter;
