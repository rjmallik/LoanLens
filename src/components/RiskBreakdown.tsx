import Card from "./Card";
import type { Loan, RiskDriver } from "../types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

function hashColor(key: string) {
  const colors = ["#0f172a", "#334155", "#1f2937", "#475569", "#111827", "#64748b"];
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return colors[h % colors.length];
}

export default function RiskBreakdown({ loans }: { loans: Loan[] }) {
  const byDriver = loans.reduce<Record<string, number>>((acc, l) => {
    if (l.status === "GREEN") return acc;
    acc[l.primaryDriver] = (acc[l.primaryDriver] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(byDriver).map(([name, value]) => ({ name, value }));

  return (
    <Card
      title="At-Risk Breakdown"
      subtitle="Grouped by primary driver (non-green loans)"
      right={<span className="rounded-full border bg-slate-50 px-2.5 py-1 text-xs text-slate-600">Driver</span>}
    >
      {data.length === 0 ? (
        <p className="text-sm text-slate-600">No at-risk loans in current filter.</p>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie dataKey="value" data={data} innerRadius={55} outerRadius={80} paddingAngle={3}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={hashColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1 text-sm">
            {data.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="text-slate-700">{d.name as RiskDriver}</span>
                <span className="font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
