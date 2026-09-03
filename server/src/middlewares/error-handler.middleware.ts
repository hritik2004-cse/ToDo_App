import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error.utils.js";

const handleError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ success: false, massage: error.message });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

export default handleError;
