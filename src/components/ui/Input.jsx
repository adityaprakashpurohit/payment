import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(({ className, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="w-full relative">
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <Icon size={20} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-12 px-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20",
            Icon && "pl-11",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="absolute -bottom-6 left-0 text-sm text-destructive font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
