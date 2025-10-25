import { useMemo, useState } from "react";
import { BadgeCheck, Lightbulb, ThumbsDown } from "lucide-react";
import { IdeaInput, scoreTitle } from "../lib/automation";
import { SectionCard } from "./SectionCard";

type TitleOptimizerProps = {
  niche: IdeaInput["niche"];
};

export function TitleOptimizer({ niche }: TitleOptimizerProps) {
  const [title, setTitle] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const evaluation = useMemo(() => (title ? scoreTitle(title, niche) : null), [
    niche,
    title,
  ]);

  return (
    <SectionCard
      title="Title Intelligence"
      subtitle="Stress-test your working titles and receive punchy upgrade prompts."
      action={
        <button
          type="button"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
          onClick={() => {
            if (!title.trim()) return;
            setHistory((prev) =>
              [title.trim(), ...prev.filter((item) => item !== title.trim())].slice(
                0,
                6
              )
            );
            setTitle("");
          }}
        >
          Log Title
        </button>
      }
    >
      <label className="space-y-2 text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">
          Draft Title
        </span>
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-lg font-medium text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="e.g. The Automations I Use To Edit 4 Videos A Week"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      {evaluation ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Score
              </span>
              <span className="text-2xl font-bold text-emerald-500">
                {evaluation.score}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {evaluation.feedback.map((line) => (
                <p
                  key={line}
                  className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Conversion Boosters
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {evaluation.suggestions.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <ThumbsDown className="mt-0.5 h-4 w-4 text-slate-400" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
          Drop a working title to receive instant optimization prompts tuned to your
          niche.
        </p>
      )}

      {history.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Saved Iterations
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {history.map((entry) => (
              <button
                key={entry}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                onClick={() => setTitle(entry)}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}
