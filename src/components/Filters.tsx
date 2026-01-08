import type { LoanStatus, RiskDriver } from "../types";

export function StatusChips({
  value,
  onChange
}: {
  value: "ALL" | LoanStatus;
  onChange: (v: "ALL" | LoanStatus) => void;
}) {
  const chips: { label: string; v: "ALL" | LoanStatus }[] = [
    { label: "All", v: "ALL" },
    { label: "On Track", v: "GREEN" },
    { label: "Watch", v: "YELLOW" },
    { label: "At Risk", v: "RED" }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c.v}
          onClick={() => onChange(c.v)}
          className={
            "rounded-full border px-3 py-1.5 text-xs font-medium " +
            (value === c.v ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:bg-slate-50")
          }
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="hidden md:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 outline-none hover:bg-slate-50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DriverSelect({
  value,
  onChange,
  drivers
}: {
  value: "ALL" | RiskDriver;
  onChange: (v: "ALL" | RiskDriver) => void;
  drivers: RiskDriver[];
}) {
  const opts: ("ALL" | RiskDriver)[] = ["ALL", ...drivers];
  return (
    <Select
      label="Driver"
      value={value}
      options={opts.map((o) => (o === "ALL" ? "All drivers" : o))}
      onChange={(s) => {
        const mapped = s === "All drivers" ? "ALL" : (s as any);
        onChange(mapped);
      }}
    />
  );
}
