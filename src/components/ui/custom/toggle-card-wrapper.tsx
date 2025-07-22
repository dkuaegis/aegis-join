import type React from "react";
import { cn } from "@/lib/utils";

interface ToggleCardWrapperProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  children: React.ReactNode;
}

const ToggleCardWrapper = ({
  isSelected,
  className,
  children,
  ...props
}: ToggleCardWrapperProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-4 shadow-md transition-all duration-300 ease-in-out",
        !isSelected && "hover:-translate-y-1 hover:shadow-lg",
        isSelected && "scale-105 border-primary bg-primary/10 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToggleCardWrapper;
