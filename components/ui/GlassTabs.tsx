"use client";

import type { ReactNode } from "react";

interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface GlassTabsProps<T extends string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function GlassTabs<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: GlassTabsProps<T>) {
  return (
    <div className={`glass inline-flex flex-wrap gap-1 rounded-[var(--radius-md)] p-1 ${className}`}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-[var(--radius-sm)] px-3.5 py-2 text-sm transition ${
              active
                ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function LoadingState({ label = "Загрузка…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="glass flex items-center gap-3 rounded-[var(--radius-md)] px-5 py-3 text-[var(--text-secondary)]">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
        {label}
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="glass rounded-[var(--radius-lg)] px-6 py-12 text-center">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-[var(--text-secondary)]">{description}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
