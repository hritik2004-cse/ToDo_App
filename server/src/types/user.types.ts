import type { TaskItems } from "./task.types.js";

export interface User {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  tasks: TaskItems;
  profileImg?: ProfileImg;
  resetToken?: string;
  resetTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProfileImg {
  publicId: string;
  url: string;
}
