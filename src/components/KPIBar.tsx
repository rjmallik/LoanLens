import Card from "./Card";
import { formatUsd } from "../utils/format";
import type { Loan } from "../types";

export default function KPIBar({ loans }: { loans: Loan[] }) {
  const total = loans.length;
  const atRisk = loans.filter((l) => l.status !== "GREEN").length;
  const exposure = loans.filter((l) => l.status !== "GREEN").reduce((acc, l) => acc + l.exposureUsd, 0);
  const interventions = loans.reduce((acc, l) => acc + l.recommendedActions.length, 0);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card title="Loans Monitored" className="px-0 py-0">
        <div className="text-3xl font-semibold">{total}</div>
        <p className="mt-1 text-sm text-slate-600">Active portfolio coverage</p>
      </Card>
      <Card title="At-Risk (7 days)" className="px-0 py-0">
        <div className="text-3xl font-semibold">{atRisk}</div>
        <p className="mt-1 text-sm text-slate-600">Needs review & action</p>
      </Card>
      <Card title="Projected Exposure" className="px-0 py-0">
        <div className="text-3xl font-semibold">{formatUsd(exposure)}</div>
        <p className="mt-1 text-sm text-slate-600">Exposure tied to risk flags</p>
      </Card>
      <Card title="Interventions Suggested" className="px-0 py-0">
        <div className="text-3xl font-semibold">{interventions}</div>
        <p className="mt-1 text-sm text-slate-600">Actionable next steps</p>
      </Card>
    </div>
  );
}
