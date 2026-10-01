import type { DebtStatus } from "@/types/debt";
import { GlassBadge } from "@/components/ui";

const labels: Record<DebtStatus, string> = {
  active: "Активен",
  paid: "Уплачен",
  forgiven: "Прощён",
};

const tones: Record<DebtStatus, "accent" | "success" | "warning"> = {
  active: "accent",
  paid: "success",
  forgiven: "warning",
};

export function DebtStatusBadge({ status }: { status: DebtStatus }) {
  return <GlassBadge tone={tones[status]}>{labels[status]}</GlassBadge>;
}
