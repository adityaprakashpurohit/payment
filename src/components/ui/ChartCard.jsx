import React from "react";
import { Card } from "./Card";

export const ChartCard = ({ title, children, className }) => {
  return (
    <Card className={className}>
      <h3 className="mb-12 text-2xl md:text-3xl font-bold uppercase tracking-tighter text-foreground">{title}</h3>
      <div className="h-[300px] w-full">
        {children}
      </div>
    </Card>
  );
};
