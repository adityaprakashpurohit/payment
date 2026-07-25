import React from "react";
import { Card } from "./Card";
import { cn } from "../../utils/cn";

export const StatsCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
  return (
    <Card hoverable className={cn("relative overflow-hidden flex flex-col gap-4 group", className)}>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-black transition-colors">{title}</p>
          {Icon && (
            <div className="flex items-center justify-center text-foreground group-hover:text-black transition-colors">
              <Icon size={32} />
            </div>
          )}
        </div>
        <div className="mt-12">
          <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-foreground group-hover:text-black transition-colors">{value}</h3>
          {trend && trendValue && (
            <p className="mt-4 flex items-center text-lg font-bold uppercase tracking-tighter">
              <span
                className={cn(
                  "mr-2",
                  trend === "up" ? "text-[#4ADE80] group-hover:text-black" : "text-[#EF4444] group-hover:text-black"
                )}
              >
                {trend === "up" ? "↑" : "↓"}
                {trendValue}%
              </span>
              <span className="text-muted-foreground group-hover:text-black/70 transition-colors">vs last month</span>
            </p>
          )}
        </div>
      </div>
      {/* Decorative Massive Number */}
      <div className="absolute -right-8 -bottom-16 text-[10rem] md:text-[14rem] font-black text-muted opacity-30 select-none pointer-events-none group-hover:text-black group-hover:opacity-10 transition-all duration-300 transform group-hover:scale-110">
        {String(value).replace(/[^0-9]/g, '').substring(0, 2) || "00"}
      </div>
    </Card>
  );
};
