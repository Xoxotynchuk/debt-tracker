import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full rounded-[var(--radius-md)] border border-[var(--border-glass)] bg-[var(--bg-glass)] px-3.5 py-2.5 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-[var(--bg-glass-hover)]";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function GlassInput({ label, error, className = "", id, ...props }: GlassInputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label && <span className="text-[var(--text-secondary)]">{label}</span>}
      <input id={inputId} className={`${fieldBase} ${className}`} {...props} />
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </label>
  );
}

interface GlassSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export function GlassSelect({ label, error, className = "", children, id, ...props }: GlassSelectProps) {
  const selectId = id ?? props.name;
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label && <span className="text-[var(--text-secondary)]">{label}</span>}
      <select id={selectId} className={`${fieldBase} ${className}`} {...props}>
        {children}
      </select>
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </label>
  );
}

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function GlassTextarea({ label, error, className = "", id, ...props }: GlassTextareaProps) {
  const areaId = id ?? props.name;
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label && <span className="text-[var(--text-secondary)]">{label}</span>}
      <textarea id={areaId} className={`${fieldBase} min-h-24 resize-y ${className}`} {...props} />
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </label>
  );
}
