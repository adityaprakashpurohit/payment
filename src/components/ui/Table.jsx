import React from "react";
import { cn } from "../../utils/cn";

export const Table = ({ children, className }) => (
  <div className="w-full overflow-x-auto border-2 border-border bg-background">
    <table className={cn("w-full text-left", className)}>{children}</table>
  </div>
);

export const Thead = ({ children }) => (
  <thead className="bg-muted text-foreground border-b-2 border-border">
    {children}
  </thead>
);

export const Tbody = ({ children }) => (
  <tbody className="divide-y-2 divide-border">{children}</tbody>
);

export const Tr = ({ children, className, onClick }) => (
  <tr
    onClick={onClick}
    className={cn(
      "transition-colors hover:bg-accent hover:text-black group",
      onClick && "cursor-pointer",
      className
    )}
  >
    {children}
  </tr>
);

export const Th = ({ children, className }) => (
  <th className={cn("px-6 py-6 font-bold uppercase tracking-widest text-sm", className)}>{children}</th>
);

export const Td = ({ children, className }) => (
  <td className={cn("px-6 py-6 text-lg group-hover:text-black transition-colors duration-300", className)}>{children}</td>
);
