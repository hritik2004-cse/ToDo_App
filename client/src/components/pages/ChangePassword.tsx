"use client";

import React from "react";
import Input from "../utility/Input";
import Button from "../utility/Button";
import useAuth from "@/context/AuthContext";
import { LuLoaderCircle } from "react-icons/lu";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { userLoading, user } = useAuth();
  const [showPassword, setShowpassword] = React.useState<boolean>(false);
  const [verificationLoading, setVerificationLoading] =
    React.useState<boolean>(false);

  const verifyPassword = () => {
    try {
      setVerificationLoading(true);
    } catch (error) {
      const errMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to verify password";
      toast.error(errMsg);
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      {userLoading ? (
        <div className="w-[95%] lg:w-[40%] border-2 border-foreground p-6 flex items-center justify-center">
          <LuLoaderCircle className="animate-spin text-2xl text-accent" />
        </div>
      ) : !user ? null : (
        <form className="w-[95%] xl:w-[40%] border-2 border-foreground p-6 flex flex-col gap-4 relative">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-full h-full relative flex items-center justify-center">
              <Input
                type={showPassword ? "text" : "password"}
                name=""
                id=""
                className=""
                placeholder="Current Password"
              />
              <button
                type="button"
                className="absolute right-4 text-xl text-accent"
                onClick={() => setShowpassword((prev) => !prev)}
              >
                {showPassword ? <LuEye /> : <LuEyeClosed />}
              </button>
            </div>
            <Button varient="primary" className="w-full">
              verify now
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
