import React from "react";
import { cn } from "../../utils/cn";

export const Card = React.forwardRef(({ className, children, hoverable, variant = "default", ...props }, ref) => {
  if (variant === "terminal") {
    return (
      <div
        ref={ref}
        className={cn(
          "relative border border-border bg-background pt-10 pb-6 px-6 cyber-chamfer transition-all duration-300",
          hoverable && "hover:-translate-y-px hover:border-accent hover:[box-shadow:var(--box-shadow-neon)]",
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-muted border-b border-border flex items-center px-4 space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
          <div className="w-3 h-3 rounded-full bg-accent/80"></div>
          <div className="w-3 h-3 rounded-full bg-accent-tertiary/80"></div>
        </div>
        {children}
      </div>
    );
  }

  if (variant === "holographic") {
    return (
      <div
        ref={ref}
        className={cn(
          "relative border border-accent/30 bg-muted/30 p-8 md:p-12 backdrop-blur-sm [box-shadow:var(--box-shadow-neon-sm)] cyber-chamfer transition-all duration-300",
          hoverable && "hover:-translate-y-px hover:border-accent/60 hover:[box-shadow:var(--box-shadow-neon)]",
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent"></div>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "border border-border bg-card p-8 md:p-12 cyber-chamfer transition-all duration-300",
        hoverable && "hover:-translate-y-px hover:border-accent hover:[box-shadow:var(--box-shadow-neon)] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = "Card";
