import type { Request, Response } from "express";
import {
  confirmPasswordService,
  getCurrentUserService,
  updateProfileImgService,
  updateProfileService,
} from "../service/user/user.service.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getCurrentUserService(req.userId);
  return res
    .status(200)
    .json({ success: true, message: "User fetched successfully", data: user });
};

export const updateProfile = async (req: Request, res: Response) => {
  const data = await updateProfileService(req.body, req.userId);
  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: data,
  });
};

export const confirmPassword = async (req: Request, res: Response) => {
  await confirmPasswordService(req.body, req.userId);

  return res.status(200).json({ success: true, message: "Passwprd confirmed" });
};

export const updateProfileImg = async (req: Request, res: Response) => {
  await updateProfileImgService(req.userId, req.file);
  return res
    .status(200)
    .json({ success: true, message: "Profile image updated successfully" });
};

export const updatePassword = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
};
