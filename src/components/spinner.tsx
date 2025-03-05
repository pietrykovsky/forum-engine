import * as React from "react";

import { cn } from "@/lib/utils";

const sizeVariants = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
  xl: "h-10 w-10 border-3",
};

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof sizeVariants;
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <div
      data-slot="spinner"
      className={cn(
        "animate-spin rounded-full border-current border-t-transparent text-primary",
        sizeVariants[size],
        className
      )}
      {...props}
    />
  );
}

export { Spinner };
