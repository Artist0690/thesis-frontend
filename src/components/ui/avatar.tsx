import { cn } from "@udecode/cn";
import React, { HTMLAttributes } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  children: React.ReactNode;
}

const Avatar = ({ className, children, ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full uppercase font-[Inter] font-bold flex justify-center items-center bg-zinc-300 dark:bg-zinc-600",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Avatar;
