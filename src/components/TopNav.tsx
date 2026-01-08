import { Link, NavLink, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { clsx } from "clsx";

export default function TopNav() {
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">LoanLens</div>
            <div className="text-xs text-slate-500">Explainable loan monitoring</div>
          </div>
        </Link>

        <div className="hidden flex-1 items-center md:flex">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              aria-label="Search"
              placeholder="Search loan, borrower, id… (demo)"
              className="w-full rounded-xl border bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-300"
            />
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                "rounded-xl px-3 py-2 text-sm font-medium",
                isActive && loc.pathname === "/" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              )
            }
            end
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              clsx(
                "rounded-xl px-3 py-2 text-sm font-medium",
                isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              )
            }
          >
            Alerts
          </NavLink>

          <span className="hidden rounded-full border bg-slate-50 px-2.5 py-1 text-xs text-slate-600 md:inline-flex">
            Demo Mode
          </span>
        </nav>
      </div>
    </header>
  );
}
