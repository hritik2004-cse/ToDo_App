import type { InputProps } from "@/types/input.types";

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`border-2 border-foreground w-full pl-2 py-2 lg:py-3 lg:pl-3 placeholder:text-placeholder text-sm lg:text-base font-medium bg-background text-foreground outline-none ${className}`}
      {...props}
    />
  );
};

export default Input;
