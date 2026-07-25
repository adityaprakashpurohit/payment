import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      {/* Left side branding */}
      <div className="hidden w-1/2 flex-col justify-center items-center bg-accent/5 lg:flex relative overflow-hidden">
        <div className="text-center p-12 max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-3xl mb-8">
            <div className="w-16 h-16 bg-accent rounded-2xl shadow-soft flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Welcome to PayFlow Pro
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your clients, invoices, and payments in one clean, simple platform.
          </p>
        </div>
      </div>

      {/* Right side content */}
      <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 sm:p-12 xl:p-24 relative z-10 bg-background shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.05)]">
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
