import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
}

const EtcInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-5 w-full border-b-2 bg-transparent px-0 py-0 text-base file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus:border-primary focus:border-b-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        maxLength={20}
        ref={ref}
        {...props}
      />
    );
  }
);
EtcInput.displayName = "EtcInput";

export { EtcInput };
