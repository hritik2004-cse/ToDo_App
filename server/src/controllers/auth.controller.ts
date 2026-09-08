import type { Request, Response } from "express";
import cookieOptions from "../config/cookie.config.js";
import { AppError } from "../utils/app-error.utils.js";
import { registerService } from "../service/auth/register.service.js";
import {
  accessTokenExpiry,
  refreshTokenExpiry,
} from "../constants/auth.constants.js";
import {
  DeleteAccountService,
  logoutService,
} from "../service/auth/account.service.js";
import {
  loginService,
  refreshAccessTokenService,
} from "../service/auth/login.service.js";
import {
  forgetPasswordService,
  resendForgetPasswordService,
  resetPasswordService,
} from "../service/auth/password.service.js";
import {
  verifyEmailService,
  resendEmailVerificationService,
} from "../service/auth/verify-email.service.js";

// register controller
export const register = async (req: Request, res: Response) => {
  const data = await registerService(req.body);
  return res.status(200).json({
    success: true,
    message: "Account created successfully",
    user: data,
  });
};

// verify email controller
export const verifyEmail = async (req: Request, res: Response) => {
  await verifyEmailService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Account verified successfully" });
};

// resend email verification controller
export const resendEmailVerification = async (req: Request, res: Response) => {
  await resendEmailVerificationService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Resend link successfully" });
};

// login controller
export const login = async (req: Request, res: Response) => {
  const result = await loginService(req.body);

  res
    .cookie("accessToken", result?.accessToken, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    })
    .cookie("refreshToken", result?.refreshToken, {
      ...cookieOptions,
      maxAge: refreshTokenExpiry,
    });

  return res.status(200).json({
    success: true,
    message: "Account login successfull",
    data: result?.user,
  });
};

// refresh access token controller
export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError(401, "Refresh token is required");
  }

  const data = await refreshAccessTokenService(refreshToken);

  res
    .cookie("accessToken", data.accessToken, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    })
    .cookie("refreshToken", data.refreshToken, {
      ...cookieOptions,
      maxAge: refreshTokenExpiry,
    });

  res
    .status(200)
    .json({ success: true, message: "Access token refreshed successfully" });
};

// forget password controller
export const forgetPassword = async (req: Request, res: Response) => {
  await forgetPasswordService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Forget password link sent" });
};

export const resendForgetPassword = async (req: Request, res: Response) => {
  await resendForgetPasswordService(req.body);

  return res
    .status(200)
    .json({ success: true, message: "Link sent successfully" });
};

// reset password controller
export const resetPassword = async (req: Request, res: Response) => {
  await resetPasswordService(req.body);
  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
};

// logout controller
export const logout = async (req: Request, res: Response) => {
  await logoutService(req.userId);

  res
    .clearCookie("accessToken", { ...cookieOptions, maxAge: accessTokenExpiry })
    .clearCookie("refreshToken", {
      ...cookieOptions,
      maxAge: refreshTokenExpiry,
    });

  return res
    .status(200)
    .json({ success: true, message: "Account logout successfully" });
};

// delete account controller
export const deleteAccount = async (req: Request, res: Response) => {
  await DeleteAccountService(req.userId);
  return res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
};
