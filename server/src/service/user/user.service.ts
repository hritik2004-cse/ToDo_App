import bcrypt from "bcrypt";
import { Readable } from "stream";
import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";
import cloudinary from "../../config/cloudinary.config.js";
import type { UpdateProfileDTO } from "../../dto/user/update-profile.dto.js";
import type { UpdateProfileImageDTO } from "../../types/profile-img.types.js";
import type { UpdatePasswordDTO } from "../../dto/user/update-password.dto.js";

// get current user service
export const getCurrentUserService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "Account not found");
  }

  return {
    id: user._id,
    firstname: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImgUrl: user.profileImg?.url,
  };
};

// update profile service
export const updateProfileService = async (
  data: UpdateProfileDTO,
  userId: string,
) => {
  const { firstName, lastName } = data;
  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

// update profile image service
export const updateProfileImgService = async (
  userId: string,
  file: UpdateProfileImageDTO | undefined,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  if (!file) {
    throw new AppError(400, "Image upload required");
  }

  const oldImg = user.profileImg?.publicId;
  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "todo/profiles",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error("Cloudinary upload failed"));
          }
        },
      );
      Readable.from(file.buffer).pipe(stream);
    },
  );

  if (oldImg) {
    await cloudinary.uploader.destroy(oldImg);
  }

  user.profileImg = {
    publicId: result.public_id,
    url: result.secure_url,
  };

  await user.save();
};

// confirm password service
export const confirmPasswordService = async (
  data: UpdatePasswordDTO,
  userId: string,
) => {
  const user = await User.findById({ _id: userId }).select("+password");
  const { password } = data;

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  const isMatching = await bcrypt.compare(password, user.password);

  if (!isMatching) {
    throw new AppError(401, "Password is incorrect");
  }
};

// update password service
export const updatePasswordService = async (
  data: UpdatePasswordDTO,
  userId: string,
) => {
  const user = await User.findById(userId).select("+password");
  const { password } = data;

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  user.password = password;
  await user.save();
};
