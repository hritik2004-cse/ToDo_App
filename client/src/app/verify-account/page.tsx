"use client";

import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { useRouter } from "next/navigation";
import Button from "@/components/utility/Button";
import Input from "@/components/utility/Input";
import React, { ChangeEvent, SubmitEventHandler } from "react";

const verifyAccountPage = () => {
  const router = useRouter();
  const [otp, setOtp] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [cooldown, setCooldown] = React.useState<number>(0);
  const [loading, setloading] = React.useState<boolean>(false);
  const [resendLoading, setResendLoading] = React.useState<boolean>(false);

  // OTP submit handler
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await api.post("/auth/verify-email", {
        otp: otp,
      });
      setOtp("");
      toast.success(response?.data?.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      const errorMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to verify OTP";
      toast.error(errorMsg);
    } finally {
      setloading(false);
    }
  };

  // OTP resend handler
  const handleResend = async () => {
    try {
      setResendLoading(true);
      const response = await api.post("/auth/resend-verify-email", {
        email: email,
      });
      setCooldown(120);
      toast.success(response?.data?.message);
    } catch (error) {
      const errorMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to send OTP";
      toast.error(errorMsg);
    } finally {
      setResendLoading(false);
    }
  };

  // useEffect to get email from session storage
  React.useEffect(() => {
    const registeredEmail = sessionStorage.getItem("todoEmail");
    if (!registeredEmail) return;
    setEmail(registeredEmail);
  }, []);

  // useEffect for timer
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <main className="w-full h-dvh flex items-center justify-center relative">
      <form
        className="border-2 border-foreground w-[95%] xl:w-[30%] p-4 flex flex-col gap-4 shadow-[12px_12px_0px_0px_var(--color-placeholder)]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl lg:text-2xl font-semibold text-center text-foreground">
          Verify your Account
        </h1>
        <p className="text-sm lg:text-base text-left text-foreground/70">
          A verification code has been sent to{" "}
          <b className="text-secondary-accent">{email}</b>. Please check your
          inbox (and spam folder) and enter the OTP to confirm your account.
        </p>
        <Input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtp(e.target.value)
          }
          required
        />
        <Button
          varient="new"
          type="submit"
          className={`${loading ? "bg-secondary-accent/30 animate-fade border-secondary-accent/30 text-foreground" : ""}`}
        >
          {loading ? "verifying..." : "confirm account"}
        </Button>
        <p className="flex items-center justify-center gap-1 text-sm text-foreground/70">
          Didn&apos;t receive?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-secondary-accent hover:underline hover:text-secondary-accent/70"
          >
            {resendLoading
              ? "Resending..."
              : cooldown === 0
                ? `Resend`
                : `Resend in ${cooldown}s`}
          </button>
        </p>
      </form>
    </main>
  );
};

export default verifyAccountPage;
