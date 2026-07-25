import React from "react";
import { cn } from "../../utils/cn";

const variants = {
  success: "bg-transparent border border-accent text-accent [box-shadow:var(--box-shadow-neon-sm)]",
  warning: "bg-transparent border border-accent-secondary text-accent-secondary [box-shadow:var(--box-shadow-neon-secondary)]",
  danger: "bg-transparent border border-destructive text-destructive shadow-[0_0_5px_rgba(255,51,102,0.5)]",
  info: "bg-transparent border border-accent-tertiary text-accent-tertiary [box-shadow:var(--box-shadow-neon-tertiary)]",
  default: "bg-muted/50 border border-border text-foreground",
};

export const Badge = ({ variant = "default", className, children }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono uppercase tracking-[0.2em] cyber-chamfer-sm",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
