import { cn } from "@udecode/cn";
import { LoaderCircle } from "lucide-react";
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({ children, className, isLoading, ...props }: Props) => {
  return (
    <button
      className={cn(
        "px-3 py-2 flex justify-center items-center rounded-lg text-white bg-purple-600 hover:bg-purple-400 shadow-md",
        className
      )}
      {...props}
    >
      {children}
      {isLoading ? (
        <span className="inline-block ml-2">
          <LoaderCircle className="w-4 h-4 animate-spin" />
        </span>
      ) : null}
    </button>
  );
};

export default Button;
