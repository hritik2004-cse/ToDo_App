import env from "../../config/env.config.js";
import User from "../../models/user.model.js";
import sendEmail from "../../config/emailjs.config.js";
import { AppError } from "../../utils/app-error.utils.js";
import { generateOTP, hashOTP } from "../../utils/otp.utils.js";
import type { RegisterDTO } from "../../dto/auth/register.dto.js";

export const registerService = async (data: RegisterDTO) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new AppError(409, "Account exist please login");
  }

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });

  const otp = generateOTP(6); // 6 digit otp
  const hashedOTP = hashOTP(otp);
  const expiry = new Date(Date.now() + env.otpExpiryDuration); // 15 min expiry
  const userExpiry = expiry.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  user.verificationOTP = hashedOTP;
  user.otpExpiry = expiry;
  await user.save();

  // sending email via emailjs
  await sendEmail({
    templateId: env.emailjsVerifyEmailTemplateId,
    templateParams: {
      name: user.firstName,
      email: user.email,
      passcode: otp,
      expiry: userExpiry,
    },
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};
