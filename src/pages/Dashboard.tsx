import { useMemo, useState } from "react";
import Card from "../components/Card";
import KPIBar from "../components/KPIBar";
import LoanTable from "../components/LoanTable";
import RiskBreakdown from "../components/RiskBreakdown";
import Highlights from "../components/Highlights";
import { StatusChips, Select } from "../components/Filters";
import type { LoanStatus, RiskDriver } from "../types";
import { LOANS } from "../data/loans";

export default function Dashboard() {
  const [status, setStatus] = useState<"ALL" | LoanStatus>("ALL");
  const [type, setType] = useState<"ALL" | "SMB" | "CRE" | "Syndicated">("ALL");
  const [region, setRegion] = useState<string>("ALL");
  const [driver, setDriver] = useState<"ALL" | RiskDriver>("ALL");

  const regions = useMemo(() => ["ALL", ...Array.from(new Set(LOANS.map((l) => l.region)))], []);
  const drivers = useMemo(() => Array.from(new Set(LOANS.map((l) => l.primaryDriver))) as RiskDriver[], []);

  const filtered = useMemo(() => {
    return LOANS.filter((l) => {
      if (status !== "ALL" && l.status !== status) return false;
      if (type !== "ALL" && l.type !== type) return false;
      if (region !== "ALL" && l.region !== region) return false;
      if (driver !== "ALL" && l.primaryDriver !== driver) return false;
      return true;
    }).sort((a, b) => b.riskScore - a.riskScore);
  }, [status, type, region, driver]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Portfolio Overview</h1>
          <p className="mt-1 text-sm text-slate-600">
            Monitor loan health, surface early warnings, and document evidence for clear decisioning.
          </p>
        </div>
        <button
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={() => alert("Demo mode: document ingestion is simulated in this iteration.")}
        >
          Upload Document (Demo)
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusChips value={status} onChange={setStatus} />
        <div className="flex flex-wrap gap-2">
          <Select label="Type" value={type} options={["ALL", "SMB", "CRE", "Syndicated"]} onChange={(v) => setType(v as any)} />
          <Select label="Region" value={region} options={regions} onChange={(v) => setRegion(v)} />
          <Select
            label="Driver"
            value={driver === "ALL" ? "ALL" : driver}
            options={["ALL", ...drivers]}
            onChange={(v) => setDriver(v === "ALL" ? "ALL" : (v as any))}
          />
        </div>
      </div>

      <KPIBar loans={filtered} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Loans" subtitle="Sortable table view for rapid triage">
            <LoanTable loans={filtered} />
          </Card>
        </div>
        <RiskBreakdown loans={filtered} />
      </div>

      <Highlights loans={filtered} />
    </div>
  );
}
