"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 flex items-center justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-transparent opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg
          className="absolute left-[50%] top-[50%] h-[200%] w-[200%] -translate-x-[50%] -translate-y-[50%] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="beam-gradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="var(--color-brand-accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-brand-accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <motion.circle
            initial={{ r: 0 }}
            animate={{ r: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            cx="50%"
            cy="50%"
            fill="url(#beam-gradient)"
          />
        </svg>
      </div>
    </div>
  );
};
