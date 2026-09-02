import type { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account created successfully" });
};

const login = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account login successfull" });
};

const forgetPassword = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Forget password email sent" });
};

const resetPassword = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
};

const logout = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account logout successfully" });
};

const deleteAccount = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
};

export {
  login,
  logout,
  register,
  deleteAccount,
  resetPassword,
  forgetPassword,
};
