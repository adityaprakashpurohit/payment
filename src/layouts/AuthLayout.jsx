import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import MarqueeComponent from "react-fast-marquee";
const Marquee = MarqueeComponent.default || MarqueeComponent;

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-background cyber-grid-bg relative overflow-hidden">
      {/* Left side branding with Marquee */}
      <div className="hidden w-1/2 flex-col justify-center bg-accent border-r-2 border-border lg:flex relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between py-12 rotate-[-5deg] scale-110 origin-center">
          <Marquee speed={80} gradient={false} className="overflow-hidden">
            <h1 className="text-[12rem] font-black uppercase tracking-tighter text-black opacity-90 mx-8 leading-none">
              PAYFLOW PRO
            </h1>
          </Marquee>
          <Marquee speed={60} gradient={false} direction="right" className="overflow-hidden">
            <h1 className="text-[12rem] font-black uppercase tracking-tighter text-black opacity-90 mx-8 leading-none">
              PAYFLOW PRO
            </h1>
          </Marquee>
          <Marquee speed={100} gradient={false} className="overflow-hidden">
            <h1 className="text-[12rem] font-black uppercase tracking-tighter text-black opacity-90 mx-8 leading-none">
              PAYFLOW PRO
            </h1>
          </Marquee>
        </div>
      </div>

      {/* Right side content */}
      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 sm:p-12 xl:p-24 relative z-10 bg-background">
        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
