import jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import { AppError } from "./app-error.utils.js";
import type TokenPayload from "../types/jwt.types.js";

export const getTokenPayload = (
  decoded: string | jwt.JwtPayload,
): TokenPayload => {
  if (
    decoded === null ||
    typeof decoded !== "object" ||
    typeof decoded.sub !== "string"
  ) {
    throw new AppError(401, "Invalid token payload");
  }

  return {
    sub: decoded.sub,
  };
};

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ sub: userId }, env.accessTokenSecret, {
    expiresIn: env.accessTokenExpiry as NonNullable<
      jwt.SignOptions["expiresIn"]
    >,
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ sub: userId }, env.refreshTokenSecret, {
    expiresIn: env.refreshTokenExpiry as NonNullable<
      jwt.SignOptions["expiresIn"]
    >,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.accessTokenSecret);
    return getTokenPayload(decoded);
  } catch (error) {
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      throw new AppError(401, "Invalid access token");
    }

    if (error instanceof Error && error.name === "TokenExpiredError") {
      throw new AppError(401, "Access token expired");
    }

    throw error;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.refreshTokenSecret);
    return getTokenPayload(decoded);
  } catch (error) {
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      throw new AppError(401, "Invalid refresh token");
    }

    if (error instanceof Error && error.name === "TokenExpiredError") {
      throw new AppError(401, "Refresh token expired");
    }

    throw error;
  }
};
