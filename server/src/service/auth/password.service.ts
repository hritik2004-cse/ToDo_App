import env from "../../config/env.config.js";
import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";
import type { ResetPasswordDTO } from "../../dto/auth/reset-password.dto.js";
import { generatePasswordToken, hashToken } from "../../utils/token.utils.js";
import type { ForgetPasswordDTO } from "../../dto/auth/forget-password.dto.js";

export const forgetPasswordService = async (data: ForgetPasswordDTO) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw new AppError(404, "Account not found");

  const token = generatePasswordToken();
  const hashedToken = hashToken(token);

  user.resetToken = hashedToken;
  user.resetTokenExpiry = new Date(Date.now() + env.tokenExpiryDuration);
  await user.save();
};

export const resendForgetPasswordService = async (data: ForgetPasswordDTO) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw new AppError(404, "Account not found");

  user.resetToken = "";
  user.resetTokenExpiry = null;

  const newToken = generatePasswordToken();
  const newHashedToken = hashToken(newToken);

  user.resetToken = newHashedToken;
  user.resetTokenExpiry = new Date(Date.now() + env.tokenExpiryDuration);
  await user.save();
};

export const resetPasswordService = async (data: ResetPasswordDTO) => {
  const { token, newPassword } = data;
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) throw new AppError(404, "Invalid or expired token");

  user.password = newPassword;
  user.resetToken = "";
  user.resetTokenExpiry = null;
  await user.save();
};
