"use client";

import Input from "../utility/Input";
import { isAxiosError } from "axios";
import Button from "../utility/Button";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import useAuth from "@/context/AuthContext";
import { LuLoaderCircle } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import React, { SubmitEventHandler } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const ChangePassword = () => {
  const { userLoading, user } = useAuth();
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [matching, setMatching] = React.useState<boolean>(false);
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [showPassword, setShowpassword] = React.useState<boolean>(false);
  const [confirmNewPassword, setConfirmNewPassword] =
    React.useState<string>("");
  const [openChangePasword, setOpenChangePassword] =
    React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);

  const verifyPassword: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/user/confirm-password", { password });
      setPassword("");
      toast.success(response?.data?.message);
      setOpenChangePassword(true);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to verify password";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const changePassword: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.patch("/user/update-password", {
        newPassword,
      });
      toast.success(response?.data?.message);
      setOpenChangePassword(false);
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to Change Password";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      newPassword.length > 0 &&
      confirmNewPassword.length > 0 &&
      newPassword === confirmNewPassword
    ) {
      setMatching(true);
    } else {
      setMatching(false);
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <div className="h-full flex items-center justify-center relative">
      {openChangePasword ? (
        <Button
          varient="secondary"
          onClick={() => {
            setOpenChangePassword(false);
            setNewPassword("");
            setConfirmNewPassword("");
          }}
          className="absolute top-5 left-5 gap-2"
        >
          <IoIosArrowBack className="text-2xl" />
          back
        </Button>
      ) : (
        ""
      )}
      {userLoading ? (
        <div className="w-[95%] lg:w-[40%] border-2 border-foreground p-6 flex items-center justify-center">
          <LuLoaderCircle className="animate-spin text-2xl text-accent" />
        </div>
      ) : !user ? null : openChangePasword ? (
        // change current password
        <form
          className="w-[95%] xl:w-[40%] border-2 border-foreground p-6 flex flex-col gap-4 relative"
          onSubmit={changePassword}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-full h-full relative flex items-center justify-center">
              <Input
                required
                minLength={8}
                maxLength={40}
                name="password"
                value={newPassword}
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowpassword((prev) => !prev)}
                className="absolute right-4 text-xl text-accent"
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="w-full h-full relative flex items-center justify-center">
                <Input
                  required
                  minLength={8}
                  maxLength={40}
                  name="password"
                  value={confirmNewPassword}
                  placeholder="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 text-xl text-accent"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <LuEye /> : <LuEyeClosed />}
                </button>
              </div>
              <span>
                {confirmNewPassword.length > 0 && (
                  <p
                    className={`text-sm font-medium ${
                      matching ? "text-accent" : "text-red-600"
                    }`}
                  >
                    {matching ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
              </span>
            </div>
            <Button
              type="submit"
              varient="primary"
              className={`w-full ${matching ? "cursor-pointer" : "cursor-not-allowed"}`}
              disabled={!matching}
            >
              {loading ? "Changing password..." : "change password"}
            </Button>
          </div>
        </form>
      ) : (
        // verify current password
        <form
          className="w-[95%] xl:w-[40%] border-2 border-foreground p-6 flex flex-col gap-4 relative"
          onSubmit={verifyPassword}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-full h-full relative flex items-center justify-center">
              <Input
                name="password"
                value={password}
                placeholder="Current Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowpassword((prev) => !prev)}
                className="absolute right-4 text-xl text-accent"
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            </div>
            <Button varient="primary" className="w-full" type="submit">
              {loading ? "verifying..." : "verify now"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
