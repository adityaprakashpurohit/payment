import React from "react";
import { cn } from "../../utils/cn";
import { ChevronDown } from "lucide-react";

export const Select = React.forwardRef(({ className, options = [], error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "flex h-24 w-full appearance-none rounded-none border-0 border-b-2 border-border bg-transparent px-0 py-6 pr-10 text-xl md:text-3xl font-bold uppercase tracking-tighter text-foreground transition-colors focus-visible:outline-none focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-visible:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-background text-foreground text-base font-medium">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground">
        <ChevronDown size={32} />
      </div>
      {error && <p className="mt-2 text-sm font-medium uppercase text-red-500">{error}</p>}
    </div>
  );
});
Select.displayName = "Select";
