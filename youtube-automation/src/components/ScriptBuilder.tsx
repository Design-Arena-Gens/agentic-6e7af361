import { useMemo, useState } from "react";
import {
  IdeaBlueprint,
  IdeaInput,
  ScriptOutline,
  buildScriptOutline,
} from "../lib/automation";
import { SectionCard } from "./SectionCard";

type ScriptBuilderProps = {
  input: IdeaInput;
  ideas: IdeaBlueprint[];
};

export function ScriptBuilder({ input, ideas }: ScriptBuilderProps) {
  const [selectedTitle, setSelectedTitle] = useState<string>(() =>
    ideas.length ? ideas[0].title : ""
  );

  const outline = useMemo<ScriptOutline | null>(() => {
    const activeIdea =
      ideas.find((idea) => idea.title === selectedTitle) ?? ideas[0];
    return activeIdea ? buildScriptOutline(activeIdea, input) : null;
  }, [ideas, input, selectedTitle]);

  if (!ideas.length) {
    return (
      <SectionCard
        title="Script Architect"
        subtitle="Generate sequencing, framing, and b-roll prompts from your selected idea."
      >
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          Lock in ideas above to unlock a production-ready script outline.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Script Architect"
      subtitle="Generate sequencing, framing, and b-roll prompts from your selected idea."
      action={
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          value={selectedTitle}
          onChange={(event) => setSelectedTitle(event.target.value)}
        >
          {ideas.map((idea) => (
            <option key={idea.title}>{idea.title}</option>
          ))}
        </select>
      }
    >
      {outline && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Cold Open
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                {outline.coldOpen}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Hook
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                {outline.hook}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Outro
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                {outline.outro}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                B-roll Prompts
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {outline.brollPrompts.map((prompt) => (
                  <li key={prompt}>• {prompt}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Chapter Breakdown
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {outline.bodySections.map((section) => (
                <article
                  key={section.heading}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50"
                >
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {section.heading}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {section.beat}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
}
