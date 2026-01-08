import type { Alert } from "../types";

export const ALERTS: Alert[] = [
  {
    id: "AL-9001",
    loanId: "LN-1042",
    severity: "HIGH",
    status: "OPEN",
    driver: "Payment Drift",
    title: "Payment delay trend detected",
    whyItMatters: "Escalating lateness increases delinquency probability and servicing burden.",
    evidence: "Last 5 payments average +6 days late; 2 were 7–9 days late.",
    createdAt: "2025-12-28",
    dueBy: "2026-01-08",
    assignee: "Loan Officer"
  },
  {
    id: "AL-9002",
    loanId: "LN-1042",
    severity: "MED",
    status: "OPEN",
    driver: "Document Gap",
    title: "Insurance certificate expired",
    whyItMatters: "Missing/expired insurance increases operational and compliance risk.",
    evidence: "Insurance certificate expired on 12/15/2025.",
    createdAt: "2025-12-15",
    dueBy: "2026-01-10",
    assignee: "Compliance"
  },
  {
    id: "AL-9003",
    loanId: "LN-1099",
    severity: "MED",
    status: "OPEN",
    driver: "Covenant Proximity",
    title: "DSCR nearing covenant threshold",
    whyItMatters: "Tight covenant margin can trigger technical default and remediation processes.",
    evidence: "DSCR 1.22 vs covenant 1.20; NOI dipped 3% QoQ.",
    createdAt: "2025-12-05",
    dueBy: "2026-01-15",
    assignee: "Credit Risk"
  },
  {
    id: "AL-9004",
    loanId: "LN-1167",
    severity: "HIGH",
    status: "OPEN",
    driver: "Liquidity Stress",
    title: "DSCR below covenant (potential breach)",
    whyItMatters: "Potential covenant breach requires immediate review and action plan.",
    evidence: "DSCR 1.09 vs covenant 1.15; lateness trend worsening.",
    createdAt: "2025-12-12",
    dueBy: "2026-01-07",
    assignee: "Credit Risk"
  },
  {
    id: "AL-9005",
    loanId: "LN-1167",
    severity: "HIGH",
    status: "OPEN",
    driver: "Document Gap",
    title: "Borrower reporting package missing",
    whyItMatters: "Missing reporting blocks risk assessment and increases compliance exposure.",
    evidence: "Borrower financials and insurance certificate missing.",
    createdAt: "2025-09-20",
    dueBy: "2026-01-06",
    assignee: "Compliance"
  },
  {
    id: "AL-9006",
    loanId: "LN-1214",
    severity: "LOW",
    status: "OPEN",
    driver: "Document Gap",
    title: "Covenant schedule not found in package",
    whyItMatters: "Incomplete covenant package causes manual review and slows monitoring.",
    evidence: "Covenant schedule missing; request addendum.",
    createdAt: "2025-12-02",
    dueBy: "2026-01-11",
    assignee: "Compliance"
  },
  {
    id: "AL-9007",
    loanId: "LN-1120",
    severity: "LOW",
    status: "RESOLVED",
    driver: "Revenue Volatility",
    title: "Revenue variance flagged (monitoring)",
    whyItMatters: "Revenue swings may signal seasonal or structural change.",
    evidence: "Variance exceeds historical band; requested updated statements.",
    createdAt: "2025-10-01",
    dueBy: "2025-10-20",
    assignee: "Loan Officer"
  },
  {
    id: "AL-9008",
    loanId: "LN-1228",
    severity: "HIGH",
    status: "OPEN",
    driver: "Revenue Volatility",
    title: "Lateness escalation + tight DSCR margin",
    whyItMatters: "Combined signals suggest elevated near-term default risk.",
    evidence: "Lateness increased 2→8 days; DSCR 1.16 vs 1.15.",
    createdAt: "2025-12-23",
    dueBy: "2026-01-07",
    assignee: "Loan Officer"
  }
];
