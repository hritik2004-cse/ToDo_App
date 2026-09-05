import type { Request, Response } from "express";
import { getCurrentUserService } from "../service/user/user.service.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getCurrentUserService(req.userId);
  return res
    .status(200)
    .json({ success: true, message: "User fetched successfully", data: user });
};

export const updateProfile = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });
};
export const updateProfileImg = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Profile image updated successfully" });
};
export const updatePassword = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
};
