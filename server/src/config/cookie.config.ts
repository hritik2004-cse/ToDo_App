import env from "./env.config.js";
import type { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: env.nodeEnv === "production" ? "none" : "lax",
};

export default cookieOptions;
