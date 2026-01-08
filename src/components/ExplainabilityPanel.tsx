import Card from "./Card";

export default function ExplainabilityPanel({
  explanations
}: {
  explanations: { label: string; weight: number; evidence: string[] }[];
}) {
  return (
    <Card title="Why this loan is at risk" subtitle="Explainable signals with evidence (audit-ready)">
      <div className="space-y-4">
        {explanations.map((e) => (
          <div key={e.label} className="rounded-xl border bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{e.label}</div>
              <div className="text-xs font-medium text-slate-700">{e.weight}%</div>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
              {e.evidence.map((x, idx) => (
                <li key={idx}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border bg-white p-3">
        <div className="text-xs font-semibold text-slate-700">Compliance note</div>
        <p className="mt-1 text-xs text-slate-600">
          Each reason is paired with concrete evidence so loan actions can be explained to internal governance and regulators.
        </p>
      </div>
    </Card>
  );
}
