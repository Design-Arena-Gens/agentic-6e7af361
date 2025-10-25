import { useMemo } from "react";
import {
  WorkflowItem,
  movePhase,
  toggleChecklist,
  updateDeadline,
} from "../lib/automation";
import { SectionCard } from "./SectionCard";
import { ArrowLeft, ArrowRight, CheckSquare, Clock, User } from "lucide-react";

type WorkflowBoardProps = {
  items: WorkflowItem[];
  setItems: (items: WorkflowItem[]) => void;
};

const phases: WorkflowItem["phase"][] = [
  "Ideas",
  "Pre-Production",
  "Production",
  "Ready to Publish",
];

export function WorkflowBoard({ items, setItems }: WorkflowBoardProps) {
  const grouped = useMemo(
    () =>
      phases.map((phase) => ({
        phase,
        items: items.filter((item) => item.phase === phase),
      })),
    [items]
  );

  return (
    <SectionCard
      title="Execution Pipeline"
      subtitle="Visualize ownership, status, and outstanding tasks across the channel."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        {grouped.map((column) => (
          <div
            key={column.phase}
            className="rounded-2xl border border-slate-200 bg-white/60 p-3 dark:border-slate-700 dark:bg-slate-900/50"
          >
            <header className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {column.phase}
              </h3>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                {column.items.length}
              </span>
            </header>

            <div className="mt-3 space-y-3">
              {column.items.length === 0 && (
                <p className="rounded-md border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
                  No cards here yet.
                </p>
              )}

              {column.items.map((item) => (
                <article
                  key={item.id}
                  className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <p className="mt-1 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      <User className="h-3.5 w-3.5" />
                      {item.owner}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-900/60 dark:text-slate-400">
                    <span className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4" />
                      {item.deadline}
                    </span>
                    <input
                      type="date"
                      className="rounded border border-slate-200 bg-white px-1 py-0.5 text-xs text-slate-600 focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                      value={item.deadline}
                      onChange={(event) =>
                        setItems(updateDeadline(items, item.id, event.target.value))
                      }
                    />
                  </div>
                  <ul className="space-y-2">
                    {item.checklist.map((check) => (
                      <li key={check.label} className="flex items-start gap-2 text-sm">
                        <button
                          type="button"
                          className={`mt-0.5 rounded-md border p-1 transition ${
                            check.done
                              ? "border-emerald-500 bg-emerald-100 text-emerald-600 dark:border-emerald-500/70 dark:bg-emerald-500/20 dark:text-emerald-400"
                              : "border-slate-200 text-slate-400 hover:border-slate-400 dark:border-slate-700 dark:text-slate-500"
                          }`}
                          onClick={() =>
                            setItems(toggleChecklist(items, item.id, check.label))
                          }
                        >
                          <CheckSquare className="h-3.5 w-3.5" />
                        </button>
                        <span
                          className={`flex-1 ${
                            check.done
                              ? "text-slate-500 line-through dark:text-slate-500"
                              : "text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          {check.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      disabled={item.phase === phases[0]}
                      className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-500 transition enabled:hover:border-slate-400 enabled:hover:text-slate-700 disabled:opacity-30 dark:border-slate-700 dark:text-slate-300 dark:enabled:hover:border-slate-500 dark:enabled:hover:text-slate-100"
                      onClick={() => setItems(movePhase(items, item.id, -1))}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={item.phase === phases.at(-1)}
                      className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-500 transition enabled:hover:border-slate-400 enabled:hover:text-slate-700 disabled:opacity-30 dark:border-slate-700 dark:text-slate-300 dark:enabled:hover:border-slate-500 dark:enabled:hover:text-slate-100"
                      onClick={() => setItems(movePhase(items, item.id, 1))}
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
