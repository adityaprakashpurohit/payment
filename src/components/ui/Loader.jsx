import React from "react";
import { cn } from "../../utils/cn";

export const Loader = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8 border-4",
    md: "w-16 h-16 border-8",
    lg: "w-24 h-24 border-[12px]",
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div
        className={cn(
          "animate-spin rounded-none border-border border-t-accent",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};
