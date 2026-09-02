import type { Request, Response } from "express";

const updateProfile = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });
};
const updateProfileImg = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Profile image updated successfully" });
};
const updatePassword = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Password updated successfully" });
};

export { updateProfile, updateProfileImg, updatePassword };
