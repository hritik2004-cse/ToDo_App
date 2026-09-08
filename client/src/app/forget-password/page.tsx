"use client";

import React from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import api from "@/config/axios.config";
import Button from "@/components/utility/Button";
import type {
  LinkSentModelProps,
  ResetPasswordProps,
  StatusVarients,
} from "@/types/reset-password.types";
import Image from "next/image";

const statusVarients: StatusVarients = {
  success: {
    src: "/status/success.gif",
    varient: "primary",
  },
  loading: {
    src: "/status/loading.gif",
    varient: "primary",
  },
  error: {
    src: "/status/error.gif",
    varient: "danger",
  },
};

const PasswordResetForm = ({
  email,
  setEmail,
  buttonText,
  eventHandler,
}: ResetPasswordProps) => {
  return (
    <form
      className="border-2 border-foreground w-[95%] xl:w-[30%] p-4 flex flex-col gap-4 shadow-[12px_12px_0px_0px_var(--color-placeholder)]"
      onSubmit={eventHandler}
    >
      <h1 className="text-xl lg:text-2xl font-semibold text-center text-foreground">
        forget password
      </h1>
      <p className="text-sm lg:text-base text-left text-foreground/70">
        Enter your registered email address and we&apos;ll send you a password
        reset link to your inbox.
      </p>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email Address"
        autoComplete="email"
        className="border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium"
        required
      />
      <Button varient="new" type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

const LinkSentModel = ({
  email,
  status,
  cooldown,
  eventHandler,
  resendButtonText,
}: LinkSentModelProps) => {
  return (
    <article className="border-2 border-foreground w-[95%] xl:w-[30%] p-4 flex flex-col gap-4 shadow-[12px_12px_0px_0px_var(--color-placeholder)]">
      <h1 className="text-xl lg:text-2xl font-semibold text-center text-foreground">
        Link Sent
      </h1>
      <figure className="flex items-center justify-center">
        <Image
          height={100}
          width={100}
          alt=""
          loading="eager"
          className="h-30 w-30"
          src={statusVarients[status].src}
        />
      </figure>
      {status === "success" ? (
        <p className="text-base text-foreground/70">
          The link has been successfully sent to{" "}
          <b className="text-accent">{email}</b>. Please check your inbox or
          spam folder to find your password reset link.
        </p>
      ) : (
        <p className="text-base text-foreground/70">
          Unable to send password reset link to{" "}
          <b className="text-accent">{email}</b>. Please try again later.
        </p>
      )}
      <Button
        varient={statusVarients[status].varient}
        onClick={eventHandler}
        disabled={cooldown > 0}
      >
        {resendButtonText}
      </Button>
    </article>
  );
};

const page = () => {
  const [email, setEmail] = React.useState<string>("");
  const [cooldown, setCooldown] = React.useState<number>(0);
  const [sentLink, setSentLink] = React.useState<boolean>(false);
  const [resendButtonText, setResendButtonText] = React.useState<
    "resend" | "sending..." | "sent" | "try again"
  >("resend");
  const [status, setStatus] = React.useState<"success" | "loading" | "error">(
    "success",
  );
  const [buttonText, setButtonText] = React.useState<
    "send" | "sending..." | "sent" | "try again"
  >("send");

  const handleForgetPassword: React.SubmitEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    try {
      setButtonText("sending...");
      await api.post("/auth/forget-password", {
        email,
      });
      setButtonText("sent");
      setEmail(email);
      sessionStorage.setItem("userEmail", email);
      setSentLink(true);
    } catch (error) {
      setButtonText("try again");
      const errorMsg = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to send password reset link";
      toast.error(errorMsg);
    }
  };

  React.useEffect(() => {
    const storedUserEmail = sessionStorage.getItem("userEmail");
    if (!storedUserEmail) return;
    setEmail(storedUserEmail);
  }, []);

  const resendForgetPasswordLink: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      setStatus("loading");
      await api.post("/auth/resend-forget-password", { email });
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="h-dvh w-full flex items-center justify-center">
      {sentLink ? (
        <LinkSentModel
          email={email}
          status={status}
          cooldown={cooldown}
          resendButtonText={resendButtonText}
          eventHandler={resendForgetPasswordLink}
        />
      ) : (
        <PasswordResetForm
          email={email}
          setEmail={setEmail}
          buttonText={buttonText}
          eventHandler={handleForgetPassword}
        />
      )}
    </section>
  );
};

export default page;
