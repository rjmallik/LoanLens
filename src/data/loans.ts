import type { Loan } from "../types";
import { statusFromScore } from "../utils/risk";

const base: Omit<Loan, "status">[] = [
  {
    id: "LN-1042",
    borrower: "Acme Logistics LLC",
    sector: "Transportation",
    region: "West",
    type: "SMB",
    exposureUsd: 4200000,
    riskScore: 82,
    primaryDriver: "Payment Drift",
    lastPaymentDate: "2025-12-20",
    nextDueDate: "2026-01-20",
    dscr: { current: 1.18, covenant: 1.15 },
    ltv: { current: 0.71, covenant: 0.75 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "OK",
      insuranceCertificate: "OUTDATED",
      borrowerFinancials: "OUTDATED"
    },
    paymentTrendDaysLate: [0, 3, 7, 9, 6],
    timeline: [
      { date: "2025-03-01", label: "Origination completed", severity: "INFO" },
      { date: "2025-06-15", label: "Quarterly covenant check passed", severity: "INFO" },
      { date: "2025-10-20", label: "Payment delay trend begins", severity: "WARN" },
      { date: "2025-12-15", label: "Insurance certificate expired", severity: "WARN" },
      { date: "2025-12-28", label: "Early warning: drift + covenant proximity", severity: "RISK" }
    ],
    explanations: [
      {
        label: "Payment delays increasing",
        weight: 42,
        evidence: ["Last 5 payments show +6 days average delay", "2 consecutive payments were 7–9 days late"]
      },
      {
        label: "DSCR nearing covenant threshold",
        weight: 33,
        evidence: ["DSCR 1.18 vs covenant 1.15 (within 2.6%)", "Revenue volatility flagged in latest borrower update"]
      },
      {
        label: "Documentation gaps increase operational risk",
        weight: 25,
        evidence: ["Insurance certificate expired 12/15/2025", "Borrower financials not refreshed since Q3"]
      }
    ],
    recommendedActions: [
      { id: "A1", title: "Request updated insurance certificate", owner: "Compliance", dueDate: "2026-01-10" },
      { id: "A2", title: "Schedule covenant review call (DSCR)", owner: "Credit Risk", dueDate: "2026-01-12" },
      { id: "A3", title: "Send payment punctuality reminder + options", owner: "Loan Officer", dueDate: "2026-01-08" }
    ]
  },
  {
    id: "LN-1099",
    borrower: "BlueOak Property Group",
    sector: "Commercial Real Estate",
    region: "Southwest",
    type: "CRE",
    exposureUsd: 12500000,
    riskScore: 69,
    primaryDriver: "Covenant Proximity",
    lastPaymentDate: "2025-12-29",
    nextDueDate: "2026-01-29",
    dscr: { current: 1.22, covenant: 1.20 },
    ltv: { current: 0.76, covenant: 0.78 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "OK",
      insuranceCertificate: "OK",
      borrowerFinancials: "OK"
    },
    paymentTrendDaysLate: [0, 0, 1, 0, 0],
    timeline: [
      { date: "2024-11-10", label: "Origination completed", severity: "INFO" },
      { date: "2025-07-10", label: "Rent roll update received", severity: "INFO" },
      { date: "2025-12-05", label: "Covenant proximity alert (DSCR)", severity: "WARN" }
    ],
    explanations: [
      { label: "DSCR close to covenant", weight: 55, evidence: ["DSCR 1.22 vs covenant 1.20", "Property NOI dipped 3% QoQ"] },
      { label: "High leverage near LTV limit", weight: 25, evidence: ["LTV 0.76 vs covenant 0.78", "Refinance window in 90 days"] },
      { label: "Sector risk (CRE rate sensitivity)", weight: 20, evidence: ["Rate environment increases refinance pressure"] }
    ],
    recommendedActions: [
      { id: "B1", title: "Run covenant stress test scenario", owner: "Credit Risk", dueDate: "2026-01-15" },
      { id: "B2", title: "Discuss refinance readiness plan", owner: "Loan Officer", dueDate: "2026-01-18" }
    ]
  },
  {
    id: "LN-1120",
    borrower: "GreenFork Foods Co.",
    sector: "Manufacturing",
    region: "Midwest",
    type: "SMB",
    exposureUsd: 2800000,
    riskScore: 41,
    primaryDriver: "Revenue Volatility",
    lastPaymentDate: "2025-12-27",
    nextDueDate: "2026-01-27",
    dscr: { current: 1.35, covenant: 1.15 },
    ltv: { current: 0.62, covenant: 0.75 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "OK",
      insuranceCertificate: "OK",
      borrowerFinancials: "OUTDATED"
    },
    paymentTrendDaysLate: [0, 0, 0, 2, 0],
    timeline: [
      { date: "2025-02-14", label: "Origination completed", severity: "INFO" },
      { date: "2025-10-01", label: "Borrower revenue volatility detected", severity: "WARN" }
    ],
    explanations: [
      { label: "Revenue volatility", weight: 60, evidence: ["Monthly revenue variance exceeds historical band", "Seasonal swings increasing"] },
      { label: "Borrower financials outdated", weight: 40, evidence: ["Latest statements older than 90 days"] }
    ],
    recommendedActions: [
      { id: "C1", title: "Request updated financial statements (Q4)", owner: "Loan Officer", dueDate: "2026-01-14" }
    ]
  },
  {
    id: "LN-1167",
    borrower: "Sunridge Clinics",
    sector: "Healthcare",
    region: "Northeast",
    type: "SMB",
    exposureUsd: 6100000,
    riskScore: 90,
    primaryDriver: "Liquidity Stress",
    lastPaymentDate: "2025-12-10",
    nextDueDate: "2026-01-10",
    dscr: { current: 1.09, covenant: 1.15 },
    ltv: { current: 0.74, covenant: 0.78 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "OK",
      insuranceCertificate: "MISSING",
      borrowerFinancials: "MISSING"
    },
    paymentTrendDaysLate: [4, 8, 12, 10, 15],
    timeline: [
      { date: "2025-01-05", label: "Origination completed", severity: "INFO" },
      { date: "2025-09-20", label: "Borrower missed reporting deadline", severity: "WARN" },
      { date: "2025-12-12", label: "Payment lateness escalated", severity: "RISK" }
    ],
    explanations: [
      { label: "Consistent payment delinquency trend", weight: 45, evidence: ["Avg lateness 9–15 days over last 5 payments"] },
      { label: "DSCR below covenant", weight: 35, evidence: ["DSCR 1.09 vs covenant 1.15"] },
      { label: "Missing critical documents", weight: 20, evidence: ["Insurance certificate missing", "Borrower financials missing"] }
    ],
    recommendedActions: [
      { id: "D1", title: "Escalate to risk committee review", owner: "Credit Risk", dueDate: "2026-01-07" },
      { id: "D2", title: "Request immediate borrower reporting package", owner: "Loan Officer", dueDate: "2026-01-06" },
      { id: "D3", title: "Resolve insurance documentation gap", owner: "Compliance", dueDate: "2026-01-06" }
    ]
  },
  {
    id: "LN-1201",
    borrower: "NorthPeak Components",
    sector: "Technology",
    region: "West",
    type: "Syndicated",
    exposureUsd: 22000000,
    riskScore: 34,
    primaryDriver: "Concentration Risk",
    lastPaymentDate: "2025-12-31",
    nextDueDate: "2026-01-31",
    dscr: { current: 1.44, covenant: 1.20 },
    ltv: { current: 0.55, covenant: 0.75 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "OK",
      insuranceCertificate: "OK",
      borrowerFinancials: "OK"
    },
    paymentTrendDaysLate: [0, 0, 0, 0, 0],
    timeline: [
      { date: "2024-09-01", label: "Origination completed", severity: "INFO" },
      { date: "2025-11-05", label: "Concentration exposure review", severity: "INFO" }
    ],
    explanations: [
      { label: "Single-name concentration exposure", weight: 70, evidence: ["High exposure relative to sector limit", "Monitor portfolio caps"] },
      { label: "Macro uncertainty", weight: 30, evidence: ["Sector sensitivity to demand cycles"] }
    ],
    recommendedActions: [{ id: "E1", title: "Reconfirm sector concentration limits", owner: "Credit Risk", dueDate: "2026-01-20" }]
  }
];

const extras: Omit<Loan, "status">[] = [
  {
    id: "LN-1214",
    borrower: "CedarWorks Construction",
    sector: "Construction",
    region: "South",
    type: "SMB",
    exposureUsd: 3500000,
    riskScore: 58,
    primaryDriver: "Document Gap",
    lastPaymentDate: "2025-12-22",
    nextDueDate: "2026-01-22",
    dscr: { current: 1.28, covenant: 1.15 },
    ltv: { current: 0.68, covenant: 0.75 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "MISSING",
      insuranceCertificate: "OK",
      borrowerFinancials: "OUTDATED"
    },
    paymentTrendDaysLate: [0, 1, 0, 2, 0],
    timeline: [
      { date: "2025-04-10", label: "Origination completed", severity: "INFO" },
      { date: "2025-12-02", label: "Covenant schedule missing", severity: "WARN" }
    ],
    explanations: [
      { label: "Missing covenant schedule", weight: 50, evidence: ["Covenant schedule not in document package"] },
      { label: "Financials outdated", weight: 30, evidence: ["Statements older than 90 days"] },
      { label: "Minor payment slippage", weight: 20, evidence: ["Recent payments 1–2 days late"] }
    ],
    recommendedActions: [
      { id: "F1", title: "Collect covenant schedule addendum", owner: "Compliance", dueDate: "2026-01-11" },
      { id: "F2", title: "Request refreshed borrower financials", owner: "Loan Officer", dueDate: "2026-01-13" }
    ]
  },
  {
    id: "LN-1228",
    borrower: "Riverbend Retailers Inc.",
    sector: "Retail",
    region: "Southeast",
    type: "SMB",
    exposureUsd: 1900000,
    riskScore: 77,
    primaryDriver: "Revenue Volatility",
    lastPaymentDate: "2025-12-18",
    nextDueDate: "2026-01-18",
    dscr: { current: 1.16, covenant: 1.15 },
    ltv: { current: 0.73, covenant: 0.75 },
    docSignals: {
      loanAgreement: "OK",
      covenantSchedule: "OK",
      insuranceCertificate: "OK",
      borrowerFinancials: "OUTDATED"
    },
    paymentTrendDaysLate: [2, 4, 6, 7, 8],
    timeline: [
      { date: "2025-05-01", label: "Origination completed", severity: "INFO" },
      { date: "2025-11-22", label: "Holiday season volatility flagged", severity: "WARN" },
      { date: "2025-12-23", label: "Early warning: increasing lateness", severity: "RISK" }
    ],
    explanations: [
      { label: "Increasing payment delay trend", weight: 40, evidence: ["Lateness increased 2→8 days"] },
      { label: "DSCR hovering near covenant", weight: 35, evidence: ["DSCR 1.16 vs 1.15 (tight margin)"] },
      { label: "Financials outdated", weight: 25, evidence: ["Need latest statements for season performance"] }
    ],
    recommendedActions: [
      { id: "G1", title: "Proactive borrower check-in (cashflow)", owner: "Loan Officer", dueDate: "2026-01-07" },
      { id: "G2", title: "Refresh financial statements + projections", owner: "Credit Risk", dueDate: "2026-01-14" }
    ]
  }
];

export const LOANS: Loan[] = [...base, ...extras].map((l) => ({
  ...l,
  status: statusFromScore(l.riskScore)
}));
