import React from "react";

export type ButtonVariant = "primary" | "secondary" | "new" | "danger";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  varient: ButtonVariant;
  className?: string;
};
