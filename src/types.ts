export type LoanStatus = "GREEN" | "YELLOW" | "RED";

export type RiskDriver =
  | "Payment Drift"
  | "Covenant Proximity"
  | "Document Gap"
  | "Liquidity Stress"
  | "Revenue Volatility"
  | "Concentration Risk";

export type Loan = {
  id: string;
  borrower: string;
  sector: string;
  region: string;
  type: "SMB" | "CRE" | "Syndicated";
  exposureUsd: number;
  status: LoanStatus;
  riskScore: number; // 0..100
  primaryDriver: RiskDriver;
  lastPaymentDate: string; // ISO
  nextDueDate: string; // ISO
  dscr?: { current: number; covenant: number };
  ltv?: { current: number; covenant: number };
  docSignals: {
    loanAgreement: "OK" | "MISSING";
    covenantSchedule: "OK" | "MISSING";
    insuranceCertificate: "OK" | "MISSING" | "OUTDATED";
    borrowerFinancials: "OK" | "OUTDATED" | "MISSING";
  };
  paymentTrendDaysLate: number[]; // recent payments lateness in days
  timeline: { date: string; label: string; severity?: "INFO" | "WARN" | "RISK" }[];
  explanations: {
    label: string;
    weight: number; // 0..100, sums approx 100
    evidence: string[];
  }[];
  recommendedActions: {
    id: string;
    title: string;
    owner: "Loan Officer" | "Credit Risk" | "Compliance";
    dueDate: string; // ISO
  }[];
};

export type AlertSeverity = "HIGH" | "MED" | "LOW";
export type AlertStatus = "OPEN" | "RESOLVED";

export type Alert = {
  id: string;
  loanId: string;
  severity: AlertSeverity;
  status: AlertStatus;
  driver: RiskDriver;
  title: string;
  whyItMatters: string;
  evidence: string;
  createdAt: string; // ISO
  dueBy: string; // ISO
  assignee: "Loan Officer" | "Credit Risk" | "Compliance";
};
