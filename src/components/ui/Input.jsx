import React from "react";
import { cn } from "../../utils/cn";

export const Input = React.forwardRef(({ className, type, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon ? (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none">
          <Icon size={20} />
        </div>
      ) : (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none font-mono font-bold animate-blink">
          &gt;
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full bg-input border border-border cyber-chamfer-sm px-4 py-2 pl-8 font-mono text-base text-accent transition-all duration-200 placeholder:text-muted-foreground placeholder:uppercase focus-visible:outline-none focus-visible:border-accent focus-visible:[box-shadow:var(--box-shadow-neon)] disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-10",
          error && "border-destructive focus-visible:border-destructive focus-visible:ring-0",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-2 text-sm font-mono uppercase text-destructive tracking-widest drop-shadow-[0_0_5px_rgba(255,51,102,0.5)]">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";
