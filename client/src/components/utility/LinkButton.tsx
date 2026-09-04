import Link from "next/link";
import React from "react";

const basicStyles = "py-3 lg:py-4 xl:py-3 px-6 border-2 capitalize text-base lg:text-lg xl:text-base font-bold lg:font-black xl:font-bold flex items-center justify-center hover:shadow-[6px_6px_0px_#6b7280] transition-all duration-300 active:scale-95";

const buttonVarients = {
  primary: "border-accent bg-accent text-background",
  secondary: "border-foreground text-foreground",
};

type LinkButtonProps = {
  children: React.ReactNode;
  varient: keyof typeof buttonVarients;
  href: string;
  className?: string;
};

const LinkButton = ({
  href,
  children,
  className,
  varient = "primary",
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`${basicStyles} ${buttonVarients[varient]} ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
