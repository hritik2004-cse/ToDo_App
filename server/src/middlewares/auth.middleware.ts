import { AppError } from "../utils/app-error.utils.js";
import { verifyAccessToken } from "../utils/jwt.utils.js";
import type { Request, Response, NextFunction } from "express";

const authMiddle = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new AppError(404, "Authentication required");
  }

  const payload = verifyAccessToken(accessToken);
  req.userId = payload.sub;
  return next();
};

export default authMiddle;
