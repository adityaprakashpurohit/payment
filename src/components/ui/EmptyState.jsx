import React from "react";
import { FolderX } from "lucide-react";
import { Button } from "./Button";

export const EmptyState = ({
  icon: Icon = FolderX,
  title = "NO DATA",
  description = "Get started by creating a new record.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-border bg-background px-8 py-24 text-center">
      <div className="mb-8">
        <Icon className="h-24 w-24 text-muted-foreground" />
      </div>
      <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground">{title}</h3>
      <p className="mt-4 text-xl text-muted-foreground uppercase">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-12 w-full max-w-sm">
          <Button onClick={onAction} className="w-full">{actionLabel}</Button>
        </div>
      )}
    </div>
  );
};
