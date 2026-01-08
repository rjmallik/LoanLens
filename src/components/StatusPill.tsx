import type { LoanStatus } from "../types";
import { clsx } from "clsx";

export default function StatusPill({ status }: { status: LoanStatus }) {
  const styles =
    status === "GREEN"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "YELLOW"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

  const label = status === "GREEN" ? "On Track" : status === "YELLOW" ? "Watch" : "At Risk";

  return (
    <span className={clsx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", styles)}>
      {label}
    </span>
  );
}
