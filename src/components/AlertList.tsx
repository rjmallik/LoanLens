import Card from "./Card";
import type { Alert } from "../types";
import { formatDate } from "../utils/format";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

function severityStyle(sev: Alert["severity"]) {
  if (sev === "HIGH") return "bg-rose-50 text-rose-700 border-rose-200";
  if (sev === "MED") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
}

export default function AlertList({
  alerts,
  onResolve
}: {
  alerts: Alert[];
  onResolve: (id: string) => void;
}) {
  return (
    <Card title="Alerts" subtitle="Triage risk signals and route to the right owner">
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="rounded-2xl border bg-white p-4 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={clsx("rounded-full border px-2.5 py-1 text-xs font-semibold", severityStyle(a.severity))}>
                    {a.severity}
                  </span>
                  <span className="rounded-full border bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                    {a.driver}
                  </span>
                  <span className="rounded-full border bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                    Assignee: {a.assignee}
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold">{a.title}</div>
                <div className="mt-1 text-xs text-slate-600">{a.whyItMatters}</div>
              </div>

              <div className="text-right text-xs text-slate-500">
                <div>Created: {formatDate(a.createdAt)}</div>
                <div>Due: {formatDate(a.dueBy)}</div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border bg-slate-50 p-3 text-xs text-slate-700">
              <span className="font-semibold">Evidence: </span>
              {a.evidence}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                to={`/loans/${encodeURIComponent(a.loanId)}`}
                className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Review Loan
              </Link>
              {a.status === "OPEN" ? (
                <button
                  onClick={() => onResolve(a.id)}
                  className="rounded-xl border bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Mark Resolved
                </button>
              ) : (
                <span className="rounded-xl border bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  Resolved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
