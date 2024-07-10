import { cn } from "@udecode/cn";
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={cn(
        "px-3 py-2 flex justify-center items-center rounded-lg text-white bg-purple-600 hover:bg-purple-400 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
