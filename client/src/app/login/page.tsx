"use client";

import Link from "next/link";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@/components/utility/Button";
import Input from "@/components/utility/Input";
import { LoginFormData } from "@/types/login.types";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import LinkButton from "@/components/utility/LinkButton";
import React, { ChangeEvent, SubmitEventHandler } from "react";

const loginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<LoginFormData>({
    email: "".trim().toLowerCase(),
    password: "",
  });

  // form submit handler
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post(`/auth/login`, {
        email: form.email,
        password: form.password,
      });

      setForm({ email: "", password: "" });

      toast.success(response?.data?.message);
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to login";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // form change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="w-full h-dvh flex items-center justify-center relative">
      <LinkButton
        href="/"
        className="absolute top-3 left-3 gap-2"
        varient="secondary"
      >
        <IoIosArrowBack className="text-xl" /> back
      </LinkButton>
      <form
        className="border-2 border-foreground w-[95%] xl:w-[30%] p-4 flex flex-col gap-4 shadow-[12px_12px_0px_0px_var(--color-placeholder)]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl lg:text-2xl font-semibold text-center text-foreground capitalize">
          account login
        </h1>
        <p className="text-sm lg:text-base text-center text-foreground/70">
          Welcome back! Enter your credentials to continue.
        </p>
        <Input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <div className="w-full h-auto flex items-center justify-center relative">
          <Input
            required
            minLength={8}
            maxLength={40}
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute right-3 text-xl lg:text-2xl"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <LuEyeClosed /> : <LuEye />}
          </button>
        </div>
        <Link href="/forget-password" className="w-full flex items-center justify-end text-accent hover:underline hover:text-accent/70 text-base active:scale-95">
          forget password?
        </Link>
        <Button
          varient="primary"
          type="submit"
          className={`${loading ? "bg-accent/30 animate-fade border-accent/30 text-foreground" : ""}`}
        >
          {loading ? "logging you in..." : "login"}
        </Button>
        <span className="flex items-center justify-center gap-1 text-sm lg:text-base">
          <p className="">Not have an account?</p>
          <Link
            href="/register"
            className="text-accent hover:underline hover:text-accent/70"
          >
            register
          </Link>
        </span>
      </form>
    </main>
  );
};

export default loginPage;
