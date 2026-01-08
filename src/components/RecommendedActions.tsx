import Card from "./Card";
import { formatDate } from "../utils/format";
import { useMemo, useState } from "react";

type Action = { id: string; title: string; owner: "Loan Officer" | "Credit Risk" | "Compliance"; dueDate: string };

export default function RecommendedActions({ actions }: { actions: Action[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  const ordered = useMemo(
    () => actions.slice().sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    [actions]
  );

  return (
    <Card title="Recommended actions" subtitle="Operational next steps to keep the loan on track">
      <div className="space-y-2">
        {ordered.map((a) => (
          <label key={a.id} className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 hover:bg-slate-50">
            <input
              type="checkbox"
              checked={!!done[a.id]}
              onChange={(e) => setDone((d) => ({ ...d, [a.id]: e.target.checked }))}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">{a.title}</div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-slate-100 px-2 py-1">Owner: {a.owner}</span>
                <span className="rounded-full bg-slate-100 px-2 py-1">Due: {formatDate(a.dueDate)}</span>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-500">
        Demo behavior: actions can be checked off to show intervention workflow.
      </div>
    </Card>
  );
}
