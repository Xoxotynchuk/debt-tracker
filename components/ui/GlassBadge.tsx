import type { ReactNode } from "react";

type BadgeTone = "default" | "success" | "danger" | "warning" | "accent";

interface GlassBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  default: "bg-[var(--bg-glass-strong)] text-[var(--text-secondary)] border-[var(--border-glass)]",
  success: "bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]/30",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)] border-[var(--danger)]/30",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)] border-[var(--warning)]/30",
  accent: "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/30",
};

export function GlassBadge({ children, tone = "default", className = "" }: GlassBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
