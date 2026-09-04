import Link from "next/link";
import React from "react";

const basicStyles = "py-3 lg:py-4 xl:py-3 px-6 border-2 capitalize text-base lg:text-lg font-bold lg:font-black flex items-center justify-center hover:shadow-[6px_6px_0px_#6b7280] transition-all duration-300 active:scale-95";

const buttonVarients = {
  primary: "border-accent bg-accent text-background",
  secondary: "border-foreground text-foreground",
  new:"bg-secondary-accent border-secondary-accent text-background"
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  varient: keyof typeof buttonVarients;
  className?: string;
};

const Button = ({
  children,
  className,
  varient = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${basicStyles} ${buttonVarients[varient]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
