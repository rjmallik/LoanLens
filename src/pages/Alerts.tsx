import { useMemo, useState } from "react";
import type { AlertSeverity, AlertStatus } from "../types";
import AlertList from "../components/AlertList";
import Card from "../components/Card";
import { ALERTS } from "../data/alerts";
import { Select } from "../components/Filters";
import EmptyState from "../components/EmptyState";

export default function Alerts() {
  const [status, setStatus] = useState<AlertStatus>("OPEN");
  const [severity, setSeverity] = useState<"ALL" | AlertSeverity>("ALL");
  const [assignee, setAssignee] = useState<"ALL" | "Loan Officer" | "Credit Risk" | "Compliance">("ALL");

  const [resolved, setResolved] = useState<Record<string, boolean>>({});

  const merged = useMemo(() => {
    return ALERTS.map((a) => ({
      ...a,
      status: resolved[a.id] ? "RESOLVED" : a.status
    }));
  }, [resolved]);

  const filtered = useMemo(() => {
    return merged
      .filter((a) => a.status === status)
      .filter((a) => (severity === "ALL" ? true : a.severity === severity))
      .filter((a) => (assignee === "ALL" ? true : a.assignee === assignee))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [merged, status, severity, assignee]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Alerts</h1>
        <p className="mt-1 text-sm text-slate-600">
          Triage early warnings, review evidence, and route interventions to keep loans on track.
        </p>
      </div>

      <Card title="Filters" subtitle="Focus on what matters for today’s workflow">
        <div className="flex flex-wrap items-center gap-2">
          <Select label="Status" value={status} options={["OPEN", "RESOLVED"]} onChange={(v) => setStatus(v as AlertStatus)} />
          <Select label="Severity" value={severity} options={["ALL", "HIGH", "MED", "LOW"]} onChange={(v) => setSeverity(v as any)} />
          <Select
            label="Assignee"
            value={assignee}
            options={["ALL", "Loan Officer", "Credit Risk", "Compliance"]}
            onChange={(v) => setAssignee(v as any)}
          />
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No alerts match these filters" body="Try changing status, severity, or assignee to see demo alerts." />
      ) : (
        <AlertList alerts={filtered} onResolve={(id) => setResolved((r) => ({ ...r, [id]: true }))} />
      )}
    </div>
  );
}
