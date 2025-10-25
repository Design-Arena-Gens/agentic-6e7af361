import { useMemo } from "react";
import {
  IdeaBlueprint,
  IdeaInput,
  generateIdeas,
} from "../lib/automation";
import { SectionCard } from "./SectionCard";

type IdeaGeneratorProps = {
  input: IdeaInput;
  onInputChange: <K extends keyof IdeaInput>(key: K, value: IdeaInput[K]) => void;
  onIdeas: (ideas: IdeaBlueprint[]) => void;
  activeIdeas: IdeaBlueprint[];
};

const cadenceOptions: IdeaInput["cadence"][] = [
  "Weekly",
  "Twice Weekly",
  "Daily",
];

const nicheOptions: IdeaInput["niche"][] = [
  "Technology",
  "Education",
  "Lifestyle",
  "Gaming",
  "Finance",
  "Health",
];

export function IdeaGenerator({
  input,
  onInputChange,
  onIdeas,
  activeIdeas,
}: IdeaGeneratorProps) {
  const suggestedIdeas = useMemo(() => generateIdeas(input), [input]);

  return (
    <SectionCard
      title="Idea Engine"
      subtitle="Auto-generate high-retention video concepts tuned to your publishing cadence."
      action={
        <button
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          onClick={() => onIdeas(suggestedIdeas)}
        >
          Lock Ideas
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Channel Niche
          </span>
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            value={input.niche}
            onChange={(event) =>
              onInputChange("niche", event.target.value as IdeaInput["niche"])
            }
          >
            {nicheOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Target Viewer Persona
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="e.g. Solo editors juggling client work"
            value={input.persona}
            onChange={(event) => onInputChange("persona", event.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Publishing Cadence
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {cadenceOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onInputChange("cadence", option)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  option === input.cadence
                    ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </label>
        <label className="space-y-2 text-sm lg:col-span-4">
          <span className="font-medium text-slate-700 dark:text-slate-200">
            Primary Goal
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="e.g. double newsletter signups"
            value={input.goal}
            onChange={(event) => onInputChange("goal", event.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {suggestedIdeas.map((idea) => {
          const locked = activeIdeas.some(
            (active) => active.title === idea.title
          );
          return (
            <article
              key={idea.title}
              className={`h-full rounded-2xl border p-4 transition ${
                locked
                  ? "border-emerald-500/70 bg-emerald-50 dark:border-emerald-500/50 dark:bg-emerald-500/10"
                  : "border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900"
              }`}
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {idea.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {idea.summary}
              </p>
              <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                Hook: <span className="font-normal">{idea.hook}</span>
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {idea.productionNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
