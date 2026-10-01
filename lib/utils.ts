import type { Debt, DebtStats } from "@/types/debt";

export function isOverdue(debt: Pick<Debt, "due_date" | "status">, today = new Date()): boolean {
  if (debt.status !== "active" || !debt.due_date) return false;
  const due = new Date(debt.due_date);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return due < startOfToday;
}

export function formatCurrency(amount: number, currency = "RUB"): string {
  try {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("ru-RU")} ${currency}`;
  }
}

export function formatDate(date: string | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(new Date(date))
    .replace(/\s?г\.?$/u, "");
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(from);
  const b = new Date(to);
  const ms = Math.abs(b.getTime() - a.getTime());
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function computeDebtStats(debts: Debt[]): DebtStats {
  const active = debts.filter((d) => d.status === "active");
  const overdue = active.filter((d) => isOverdue(d));

  const totalActiveAmount = active.reduce((sum, d) => sum + Number(d.amount), 0);
  const overdueAmount = overdue.reduce((sum, d) => sum + Number(d.amount), 0);

  const withDue = active
    .filter((d) => d.due_date)
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime());

  const nearest = withDue[0];
  const nearestDue = nearest
    ? { date: nearest.due_date!, debtorName: nearest.debtor_name }
    : null;

  const durations = active
    .map((d) => {
      const end = d.due_date ? new Date(d.due_date) : new Date();
      return daysBetween(d.created_at, end.toISOString());
    })
    .filter((n) => Number.isFinite(n));

  const averageDebtDays =
    durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : null;

  return {
    totalActiveAmount,
    activeCount: active.length,
    overdueCount: overdue.length,
    overdueAmount,
    nearestDue,
    averageDebtDays,
  };
}

export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
