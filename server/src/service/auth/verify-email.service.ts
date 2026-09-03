import env from "../../config/env.config.js";
import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";
import { generateOTP, hashOTP } from "../../utils/otp.utils.js";
import type { VerifyEmailDTO } from "../../dto/auth/verify-email.dto.js";
import type { ResendVerifyEmailDTO } from "../../dto/auth/resend-verify-email.dto.js";

export const verifyEmailService = async (data: VerifyEmailDTO) => {
  const { otp } = data;
  const hashedOTP = hashOTP(otp);

  if (!otp) throw new AppError(404, "OTP not found");

  const user = await User.findOne({
    verificationOTP: hashedOTP,
    otpExpiry: { $gt: Date.now() },
  });

  if (!user) throw new AppError(400, "Invalid or expired OTP");

  user.isVerified = true;
  user.verificationOTP = "";
  user.otpExpiry = null;
  await user.save();
};

export const resendEmailVerificationService = async (
  data: ResendVerifyEmailDTO,
) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw new AppError(404, "Account not found");

  if (user.isVerified) throw new AppError(400, "Account already verified");

  user.verificationOTP = "";
  user.otpExpiry = null;

  const newOTP = generateOTP(6); // 6 digit otp
  const newHashedOTP = hashOTP(newOTP);

  user.verificationOTP = newHashedOTP;
  user.otpExpiry = new Date(Date.now() + env.otpExpiryDuration); // 15 min expiry
  await user.save();
};
