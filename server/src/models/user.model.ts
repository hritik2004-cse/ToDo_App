import bcrypt from "bcrypt";
import mongoose from "mongoose";
import env from "../config/env.config.js";
import type { IUser } from "../types/user.types.js";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationOTP: {
      type: String,
      default: "",
    },
    otpExpiry: {
      type: Date,
      dafault: null,
    },
    profileImg: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    tasks: [
      {
        task: {
          type: String,
          default: "",
        },
        taskType: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending",
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    refreshToken: {
      type: String,
      default: "",
    },
    resetToken: {
      type: String,
      default: "",
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, env.saltRounds);
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
