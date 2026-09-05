import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";
import type { LoginDTO } from "../../dto/auth/login.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.utils.js";
import env from "../../config/env.config.js";

export const refreshAccessTokenService = async () => {};

export const loginService = async (data: LoginDTO) => {
  try {
    const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) throw new AppError(404, "Account not found");

  const isMatching = await bcrypt.compare(data.password, user.password);

  if (!isMatching) throw new AppError(401, "Invalid email and password");

  const userId = user._id.toString();
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  // hashing refresh token
  const hashedRefreshToken = await bcrypt.hash(refreshToken, env.saltRounds);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    refreshToken: refreshToken,
    accessToken: accessToken,
  };
  } catch (error) {
    console.error(error)
  }
};
