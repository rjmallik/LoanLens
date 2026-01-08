import Card from "./Card";
import { formatDate } from "../utils/format";
import { clsx } from "clsx";

export default function Timeline({
  items
}: {
  items: { date: string; label: string; severity?: "INFO" | "WARN" | "RISK" }[];
}) {
  return (
    <Card title="Loan Health Timeline" subtitle="Key events and risk triggers">
      <ol className="space-y-3">
        {items
          .slice()
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((it) => {
            const dot =
              it.severity === "RISK"
                ? "bg-rose-500"
                : it.severity === "WARN"
                  ? "bg-amber-500"
                  : "bg-slate-400";
            return (
              <li key={it.date + it.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className={clsx("mt-1 h-2.5 w-2.5 rounded-full", dot)} />
                  <span className="mt-1 h-full w-px bg-slate-200" />
                </div>
                <div className="pb-2">
                  <div className="text-sm font-medium text-slate-900">{it.label}</div>
                  <div className="text-xs text-slate-500">{formatDate(it.date)}</div>
                </div>
              </li>
            );
          })}
      </ol>
    </Card>
  );
}
