import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-black hover:[box-shadow:var(--box-shadow-neon)] cyber-chamfer-sm",
  secondary: "bg-transparent border-2 border-accent-secondary text-accent-secondary hover:bg-accent-secondary hover:text-black hover:[box-shadow:var(--box-shadow-neon-secondary)] cyber-chamfer-sm",
  outline: "bg-transparent border border-border text-foreground hover:border-accent hover:text-accent hover:[box-shadow:var(--box-shadow-neon-sm)] cyber-chamfer-sm",
  danger: "bg-transparent border-2 border-destructive text-destructive hover:bg-destructive hover:text-black cyber-chamfer-sm",
  ghost: "text-foreground hover:bg-accent/10 hover:text-accent cyber-chamfer-sm",
  glitch: "bg-accent text-black hover:brightness-110 cyber-chamfer-sm", // Needs .cyber-glitch on inner text if string
};

const sizes = {
  sm: "px-4 py-2 text-sm h-10",
  md: "px-8 py-4 text-base h-14",
  lg: "px-12 py-6 text-xl h-20",
  icon: "p-4",
};

export const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", children, isLoading, ...props }, ref) => {
    
    // For glitch variant to work, we need a data-text attribute on a wrapping span if children is a string
    const isString = typeof children === 'string';
    const content = (variant === "glitch" && isString) ? (
      <span className="cyber-glitch" data-text={children}>{children}</span>
    ) : children;

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }} // less bouncy, more mechanical
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex relative items-center justify-center font-mono uppercase tracking-[0.2em] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:[box-shadow:var(--box-shadow-neon)] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {content}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
