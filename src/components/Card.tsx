import { clsx } from "clsx";
import type { ReactNode } from "react";

export default function Card({
  title,
  subtitle,
  right,
  children,
  className
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("rounded-2xl border bg-white shadow-soft", className)}>
      {(title || subtitle || right) && (
        <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div>
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </header>
      )}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}
