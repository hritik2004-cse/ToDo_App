import type { Request, Response } from "express";
import { registerService } from "../service/auth/register.service.js";
import {
  verifyEmailService,
  resendEmailVerificationService,
} from "../service/auth/verify-email.service.js";
import { forgetPasswordService } from "../service/auth/password.service.js";

export const register = async (req: Request, res: Response) => {
  const data = await registerService(req.body);
  return res.status(200).json({
    success: true,
    message: "Account created successfully",
    user: data,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  await verifyEmailService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Account verified successfully" });
};

export const resendEmailVerification = async (req: Request, res: Response) => {
  await resendEmailVerificationService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Resend link successfully" });
};

export const login = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account login successfull" });
};

export const forgetPassword = async (req: Request, res: Response) => {
  await forgetPasswordService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Forget password link sent" });
};

export const resetPassword = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
};

export const logout = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account logout successfully" });
};

export const deleteAccount = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
};
