"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface GlassButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[#041018] hover:bg-[var(--accent-strong)] border-transparent shadow-[0_8px_24px_rgba(61,214,198,0.25)]",
  secondary: "glass text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)]",
  ghost:
    "bg-transparent border border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-glass)] hover:border-[var(--border-glass)]",
  danger:
    "bg-[var(--danger-soft)] text-[var(--danger)] border border-[var(--danger)]/30 hover:bg-[var(--danger)]/25",
  success:
    "bg-[var(--success-soft)] text-[var(--success)] border border-[var(--success)]/30 hover:bg-[var(--success)]/25",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-[var(--radius-sm)]",
  md: "px-4 py-2.5 text-sm rounded-[var(--radius-md)]",
  lg: "px-6 py-3 text-base rounded-[var(--radius-md)]",
};

export function GlassButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: GlassButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className={`inline-flex items-center justify-center gap-2 border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isDisabled}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </motion.button>
  );
}
