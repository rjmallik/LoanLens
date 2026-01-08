import type { Loan, LoanStatus } from "../types";

export function statusFromScore(score: number): LoanStatus {
  if (score >= 75) return "RED";
  if (score >= 45) return "YELLOW";
  return "GREEN";
}

export function docCompletenessScore(loan: Loan): number {
  const signals = Object.values(loan.docSignals);
  const val = (s: string) => (s === "OK" ? 1 : s === "OUTDATED" ? 0.5 : 0);
  const sum = signals.reduce((acc, s) => acc + val(s), 0);
  return Math.round((sum / signals.length) * 100);
}

export function avgLateDays(loan: Loan): number {
  if (!loan.paymentTrendDaysLate.length) return 0;
  const sum = loan.paymentTrendDaysLate.reduce((a, b) => a + b, 0);
  return Math.round((sum / loan.paymentTrendDaysLate.length) * 10) / 10;
}
