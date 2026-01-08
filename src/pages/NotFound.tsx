import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-soft">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">The page you requested doesn’t exist in this demo.</p>
      <Link to="/" className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
        Back to Portfolio
      </Link>
    </div>
  );
}
