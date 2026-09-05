"use client";

import Link from "next/link";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@/components/utility/Button";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import LinkButton from "@/components/utility/LinkButton";
import type { RegisterFormData } from "@/types/register.types";
import React, { ChangeEvent, SubmitEventHandler } from "react";

const registerPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<RegisterFormData>({
    firstName: "".trim(),
    lastName: "".trim(),
    email: "".trim().toLowerCase(),
    password: "",
  });

  // form submit handler
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post(`/auth/register`, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      sessionStorage.setItem("todoEmail", form.email);

      setForm({ firstName: "", lastName: "", email: "", password: "" });

      toast.success(response?.data?.message);
      setTimeout(() => router.push("/verify-account"), 2000);
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to register";
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
        <h1 className="text-xl lg:text-2xl font-semibold text-center text-foreground">
          Create Account
        </h1>
        <p className="text-sm lg:text-base text-center text-foreground/70">
          Fill in your information to create your free account.
        </p>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4">
          <input
            required
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
        />
        <div className="w-full h-auto flex items-center justify-center relative">
          <input
            required
            minLength={8}
            maxLength={40}
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
          />
          <button
            type="button"
            className="absolute right-3 text-xl lg:text-2xl"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <LuEyeClosed /> : <LuEye />}
          </button>
        </div>
        <Button
          varient="primary"
          type="submit"
          className={`${loading ? "bg-accent/30 animate-fade border-accent/30 text-foreground" : ""}`}
        >
          {loading ? "creating..." : "create account"}
        </Button>
        <span className="flex items-center justify-center gap-1 text-sm lg:text-base">
          <p className="">Already have an account?</p>
          <Link
            href="/login"
            className="text-accent hover:underline hover:text-accent/70"
          >
            login
          </Link>
        </span>
      </form>
    </main>
  );
};

export default registerPage;
