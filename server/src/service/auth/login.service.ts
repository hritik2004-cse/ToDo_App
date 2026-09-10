import bcrypt from "bcrypt";
import env from "../../config/env.config.js";
import User from "../../models/user.model.js";
import { AppError } from "../../utils/app-error.utils.js";
import type { LoginDTO } from "../../dto/auth/login.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.utils.js";

export const refreshAccessTokenService = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.sub);

  if (!user || !user.refreshToken) {
    throw new AppError(401, "Invalid refresh token");
  }

  const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
  const currentRefreshToken = user.refreshToken;

  if (!isTokenValid) {
    throw new AppError(401, "Invalid refresh token");
  }

  const userId = user._id.toString();
  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = generateRefreshToken(userId);
  const hashedRefreshToken = await bcrypt.hash(newRefreshToken, env.saltRounds);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id, refreshToken: currentRefreshToken },
    { $set: { refreshToken: hashedRefreshToken } },
    { returnDocument: "after" },
  );

  if (!updatedUser) {
    throw new AppError(401, "Refresh token already used");
  }

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

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
    console.error(error);
  }
};
