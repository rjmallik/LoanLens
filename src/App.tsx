import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import Dashboard from "./pages/Dashboard";
import LoanDetail from "./pages/LoanDetail";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/loans/:id" element={<LoanDetail />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500">
          LoanLens (Demo) • Explainable Loan Monitoring & Document Signals
        </div>
      </footer>
    </div>
  );
}
