import * as crypto from "crypto";

export const generateOTP = (length: number): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return crypto.randomInt(min, max + 1).toString();
};

export const hashOTP = (otp: string) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};
