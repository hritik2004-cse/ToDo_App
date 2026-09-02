import bcrypt from "bcrypt";
import mongoose from "mongoose";
import env from "../config/env.config.js";
import type { User } from "../types/user.types.js";

const userSchema = new mongoose.Schema<User>(
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
      minlength: 8,
      maxlength: 40,
      select: false,
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
          enum: ["daily", "urgent", "completed"],
          default: "daily",
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
  if (this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, env.saltRounds);
});

const User = mongoose.model<User>("User", userSchema);
