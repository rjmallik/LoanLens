import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../components/Card";
import Timeline from "../components/Timeline";
import ExplainabilityPanel from "../components/ExplainabilityPanel";
import RecommendedActions from "../components/RecommendedActions";
import StatusPill from "../components/StatusPill";
import { LOANS } from "../data/loans";
import EmptyState from "../components/EmptyState";
import { formatDate, formatUsd } from "../utils/format";
import { avgLateDays, docCompletenessScore } from "../utils/risk";

export default function LoanDetail() {
  const { id } = useParams();
  const loan = useMemo(() => LOANS.find((l) => l.id === id), [id]);

  if (!loan) {
    return <EmptyState title="Loan not found" body="This loan id does not exist in the demo dataset." />;
  }

  const avgLate = avgLateDays(loan);
  const docScore = docCompletenessScore(loan);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold">{loan.id}</h1>
            <StatusPill status={loan.status} />
            <span className="rounded-full border bg-slate-50 px-2.5 py-1 text-xs text-slate-600">Risk Score: {loan.riskScore}</span>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {loan.borrower} • {loan.sector} • {loan.region} • {loan.type}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => alert("Demo mode: audit export can be implemented as a printable summary page.")}
          >
            Export Audit Summary (Demo)
          </button>
          <Link
            to="/"
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Timeline items={loan.timeline} />

          <Card title="Key metrics" subtitle="Operational signals used for monitoring and intervention">
            <div className="grid gap-3 md:grid-cols-2">
              <Metric label="Exposure" value={formatUsd(loan.exposureUsd)} hint="Portfolio risk & capital impact" />
              <Metric label="Primary Driver" value={loan.primaryDriver} hint="Fast routing to the right workflow" />
              <Metric label="Avg days late (recent)" value={`${avgLate}`} hint="Payment drift early warning" />
              <Metric label="Doc completeness" value={`${docScore}%`} hint="Reduce manual document review" />
              <Metric label="Last payment" value={formatDate(loan.lastPaymentDate)} hint="Servicing freshness" />
              <Metric label="Next due" value={formatDate(loan.nextDueDate)} hint="Upcoming obligation window" />
              <Metric
                label="DSCR"
                value={loan.dscr ? `${loan.dscr.current.toFixed(2)} (covenant ${loan.dscr.covenant.toFixed(2)})` : "N/A"}
                hint="Covenant proximity indicator"
              />
              <Metric
                label="LTV"
                value={loan.ltv ? `${loan.ltv.current.toFixed(2)} (covenant ${loan.ltv.covenant.toFixed(2)})` : "N/A"}
                hint="Leverage & collateral coverage"
              />
            </div>

            <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-xs text-slate-600">
              Commercial note: metrics are presented alongside “why it matters” so non-technical users can take action quickly.
            </div>
          </Card>

          <Card title="Document signals" subtitle="Loan package completeness (supports transparency & audit readiness)">
            <div className="grid gap-2 md:grid-cols-2">
              <Signal label="Loan Agreement" value={loan.docSignals.loanAgreement} />
              <Signal label="Covenant Schedule" value={loan.docSignals.covenantSchedule} />
              <Signal label="Insurance Certificate" value={loan.docSignals.insuranceCertificate} />
              <Signal label="Borrower Financials" value={loan.docSignals.borrowerFinancials} />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <ExplainabilityPanel explanations={loan.explanations} />
          <RecommendedActions actions={loan.recommendedActions} />
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{hint}</div>
    </div>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  const badge =
    value === "OK"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : value === "OUTDATED"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

  const label2 = value === "OK" ? "OK" : value === "OUTDATED" ? "Outdated" : "Missing";

  return (
    <div className="flex items-center justify-between rounded-2xl border p-4">
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-slate-500">Package signal</div>
      </div>
      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${badge}`}>{label2}</span>
    </div>
  );
}
