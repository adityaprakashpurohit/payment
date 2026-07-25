import React from "react";
import { cn } from "../../utils/cn";
import { Loader } from "./Loader";

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-blue-600 shadow-soft hover:shadow-md rounded-xl",
    secondary: "bg-white text-foreground border border-border hover:bg-muted shadow-soft rounded-xl",
    outline: "border border-accent text-accent hover:bg-accent hover:text-white rounded-xl",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl",
    destructive: "bg-destructive text-white hover:bg-red-600 shadow-soft rounded-xl"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    xl: "h-16 px-10 text-xl"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Loader className="mr-2 h-5 w-5 border-current" /> : null}
      <span className={cn(isLoading && "opacity-0", "flex items-center gap-2")}>{children}</span>
    </button>
  );
};
