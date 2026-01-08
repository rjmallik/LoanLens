import Card from "./Card";
import type { Loan } from "../types";
import { avgLateDays, docCompletenessScore } from "../utils/risk";

export default function Highlights({ loans }: { loans: Loan[] }) {
  const paymentDrift = loans.filter((l) => avgLateDays(l) >= 5).slice(0, 2);
  const covenantTight = loans.filter((l) => l.dscr && l.dscr.current - l.dscr.covenant <= 0.05).slice(0, 2);
  const docGaps = loans.filter((l) => docCompletenessScore(l) < 75).slice(0, 2);

  const cards = [
    {
      title: "Payment drift detected",
      body:
        paymentDrift.length === 0
          ? "No significant payment drift in current view."
          : `${paymentDrift.length} loan(s) show increasing lateness (avg ≥ 5 days).`
    },
    {
      title: "Covenant proximity (DSCR)",
      body:
        covenantTight.length === 0
          ? "No loans within 0.05 DSCR of covenant."
          : `${covenantTight.length} loan(s) are within 0.05 of DSCR covenant threshold.`
    },
    {
      title: "Document gaps",
      body: docGaps.length === 0 ? "No major documentation gaps detected." : `${docGaps.length} loan(s) have incomplete/outdated docs.`
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <Card key={c.title} title={c.title}>
          <p className="text-sm text-slate-700">{c.body}</p>
          <p className="mt-2 text-xs text-slate-500">Business value: reduces manual review and speeds intervention.</p>
        </Card>
      ))}
    </div>
  );
}
