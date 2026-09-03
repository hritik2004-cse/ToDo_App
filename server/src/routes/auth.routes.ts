import { Router } from "express";
import { loginSchema } from "../dto/auth/login.dto.js";
import { registerSchema } from "../dto/auth/register.dto.js";
import validate from "../middlewares/validate-data.middleware.js";
import { resetPasswordSchema } from "../dto/auth/reset-password.dto.js";
import { forgetPasswordSchema } from "../dto/auth/forget-password.dto.js";
import {
  login,
  logout,
  register,
  verifyEmail,
  resetPassword,
  deleteAccount,
  forgetPassword,
  resendEmailVerification,
} from "../controllers/auth.controller.js";
import { verifyEmailSchema } from "../dto/auth/verify-email.dto.js";
import { resendVerifyEmailSchema } from "../dto/auth/resend-verify-email.dto.js";

const authRouter: Router = Router();

authRouter.route("/logout").post(logout);
authRouter.route("/delete-account").delete(deleteAccount);

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
  .route("/resend-verify-email")
  .post(validate(resendVerifyEmailSchema), resendEmailVerification);
export default authRouter;
