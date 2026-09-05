import type { TaskItems } from "./task.types.js";

export interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationOTP: string;
  otpExpiry?: Date | null;
  tasks: TaskItems;
  profileImg?: ProfileImg;
  resetToken?: string;
  refreshToken?: string;
  resetTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProfileImg {
  publicId: string;
  url: string;
}
