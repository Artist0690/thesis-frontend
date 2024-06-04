import { cn } from "@udecode/cn";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "h-full placeholder:italic px-2 py-2 rounded-xl dark:bg-zinc-600 focus:ring-1 ring-offset-1 focus:outline-none focus:ring-purple-500 border border-slate-300 dark:border-zinc-400 caret-purple-500 text-zinc-600 dark:text-white outline-none font-[inter thin]",
        className
      )}
      {...props}
    />
  );
};

export default Input;
