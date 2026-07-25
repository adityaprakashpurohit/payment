import React from "react";
import { cn } from "../../utils/cn";

export const Badge = ({ children, className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-muted text-foreground border border-border",
    accent: "bg-blue-100 text-blue-700 border border-blue-200",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-amber-100 text-amber-700 border border-amber-200",
    destructive: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
