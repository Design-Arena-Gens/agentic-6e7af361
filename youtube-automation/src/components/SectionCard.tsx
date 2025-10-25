import clsx from "clsx";
import { PropsWithChildren } from "react";

type SectionCardProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}>;

export function SectionCard({
  title,
  subtitle,
  className,
  action,
  children,
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-md transition hover:shadow-lg",
        "dark:border-slate-800/80 dark:bg-slate-900/60",
        className
      )}
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="mt-2 shrink-0 sm:mt-0">{action}</div>}
      </header>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}
