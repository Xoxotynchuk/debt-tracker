"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  hover?: boolean;
  strong?: boolean;
  padding?: "sm" | "md" | "lg";
  className?: string;
}

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function GlassCard({
  children,
  hover = false,
  strong = false,
  padding = "md",
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={`${strong ? "glass-strong" : "glass"} relative rounded-[var(--radius-lg)] ${paddingMap[padding]} ${hover ? "transition-colors hover:bg-[var(--bg-glass-hover)]" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
