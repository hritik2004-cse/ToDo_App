import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";

export const DeleteAccountService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "Account not found");
  }
  await User.findByIdAndDelete(userId);
};

export const logoutService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  user.refreshToken = "";
  await user.save();
};
