import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl border-2 border-border bg-background p-8 md:p-12 shadow-none pointer-events-auto"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-border">
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-foreground">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-4 text-foreground hover:bg-accent hover:text-black border-2 border-transparent hover:border-black transition-colors"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="mt-8">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
