export type DebtStatus = "active" | "paid" | "forgiven";

export interface Debt {
  id: string;
  user_id: string;
  debtor_name: string;
  amount: number;
  currency: string;
  due_date: string | null;
  status: DebtStatus;
  created_at: string;
  updated_at: string;
}

export type DebtInsert = {
  debtor_name: string;
  amount: number;
  currency?: string;
  due_date?: string | null;
  status?: DebtStatus;
};

export type DebtUpdate = Partial<
  Pick<Debt, "debtor_name" | "amount" | "currency" | "due_date" | "status">
>;

export type DebtFilter = "all" | "overdue" | "not_overdue";
export type HistoryFilter = "all" | "paid" | "forgiven";

export interface DebtStats {
  totalActiveAmount: number;
  activeCount: number;
  overdueCount: number;
  overdueAmount: number;
  nearestDue: { date: string; debtorName: string } | null;
  averageDebtDays: number | null;
}
