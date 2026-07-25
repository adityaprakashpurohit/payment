import React from "react";
import { cn } from "../../utils/cn";

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border shadow-soft overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
