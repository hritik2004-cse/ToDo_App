import React from "react";

export type ResetPasswordProps = {
  email: string;
  buttonText: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  eventHandler: React.SubmitEventHandler<HTMLFormElement>;
};

export type LinkSentModelProps = {
  email: string;
  cooldown: number;
  resendButtonText: string;
  status: "success" | "loading" | "error";
  eventHandler: React.MouseEventHandler<HTMLButtonElement>;
};

export type StatusVarients = {
  success: {
    src: string;
    varient: "primary" | "danger";
  };
  loading: {
    src: string;
    varient: "primary" | "danger";
  };
  error: {
    src: string;
    varient: "primary" | "danger";
  };
};
