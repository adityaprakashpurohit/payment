import React from "react";
import { cn } from "../../utils/cn";

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-muted border-2 border-border", className)}
      {...props}
    />
  );
};
