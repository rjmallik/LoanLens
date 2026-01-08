import { Link } from "react-router-dom";
import type { Loan } from "../types";
import StatusPill from "./StatusPill";
import { formatUsd, formatDate } from "../utils/format";

export default function LoanTable({ loans }: { loans: Loan[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-500">
          <tr>
            <th className="py-3 pr-4">Loan</th>
            <th className="py-3 pr-4">Borrower</th>
            <th className="py-3 pr-4">Status</th>
            <th className="py-3 pr-4">Risk Score</th>
            <th className="py-3 pr-4">Primary Driver</th>
            <th className="py-3 pr-4">Exposure</th>
            <th className="py-3 pr-4">Next Due</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {loans.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50">
              <td className="py-3 pr-4 font-medium">{l.id}</td>
              <td className="py-3 pr-4">{l.borrower}</td>
              <td className="py-3 pr-4">
                <StatusPill status={l.status} />
              </td>
              <td className="py-3 pr-4">{l.riskScore}</td>
              <td className="py-3 pr-4">{l.primaryDriver}</td>
              <td className="py-3 pr-4">{formatUsd(l.exposureUsd)}</td>
              <td className="py-3 pr-4">{formatDate(l.nextDueDate)}</td>
              <td className="py-3">
                <Link
                  to={`/loans/${encodeURIComponent(l.id)}`}
                  className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
