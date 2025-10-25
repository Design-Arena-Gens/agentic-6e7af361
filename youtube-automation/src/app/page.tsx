'use client';

import { useCallback } from "react";
import { IdeaGenerator } from "../components/IdeaGenerator";
import { TitleOptimizer } from "../components/TitleOptimizer";
import { ScriptBuilder } from "../components/ScriptBuilder";
import { WorkflowBoard } from "../components/WorkflowBoard";
import { AutomationRecipes } from "../components/AutomationRecipes";
import { PublishingPlanner } from "../components/PublishingPlanner";
import { useLocalState } from "../hooks/useLocalState";
import {
  IdeaBlueprint,
  IdeaInput,
  WorkflowItem,
  bootstrapWorkflow,
} from "../lib/automation";

const defaultInput: IdeaInput = {
  niche: "Technology",
  persona: "time-poor creators shipping weekly videos",
  goal: "ship production-ready videos without burning out",
  cadence: "Weekly",
};

export default function Home() {
  const [ideaInput, setIdeaInput] = useLocalState<IdeaInput>(
    "channel-os:idea-input",
    defaultInput
  );
  const [ideas, setIdeas] = useLocalState<IdeaBlueprint[]>(
    "channel-os:ideas",
    []
  );
  const [workflow, setWorkflow] = useLocalState<WorkflowItem[]>(
    "channel-os:workflow",
    []
  );

  const handleIdeaInputChange = useCallback(
    <K extends keyof IdeaInput>(key: K, value: IdeaInput[K]) => {
      setIdeaInput((prev) => ({ ...prev, [key]: value }));
    },
    [setIdeaInput]
  );

  const handleIdeasLocked = useCallback(
    (generated: IdeaBlueprint[]) => {
      setIdeas(generated);
      setWorkflow((prev) => {
        if (!prev.length) {
          return bootstrapWorkflow(generated);
        }

        const baseline = bootstrapWorkflow(generated);
        return baseline.map((item) => {
          const existing = prev.find(
            (previous) => previous.title === item.title
          );
          return existing ?? item;
        });
      });
    },
    [setIdeas, setWorkflow]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:px-10">
        <header className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            Channel OS
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            Automate your YouTube pipeline—from idea selection to final upload.
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            Generate batch-ready ideas, score titles, spin up production scripts, and
            keep your team on the same page. Built for creators scaling consistent,
            high-retention content.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                Turnaround Speed
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                4x faster
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Going from topic to upload-ready plan.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                Retention Benchmarks
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                +22% avg.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cohorts using automation missions weekly.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
                Templates Included
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                18 playbooks
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SOPs covering research, editing, and distribution.
              </p>
            </div>
          </div>
        </header>

        <IdeaGenerator
          input={ideaInput}
          onInputChange={handleIdeaInputChange}
          onIdeas={handleIdeasLocked}
          activeIdeas={ideas}
        />

        <TitleOptimizer niche={ideaInput.niche} />

        <ScriptBuilder input={ideaInput} ideas={ideas} />

        <PublishingPlanner input={ideaInput} ideas={ideas} />

        <WorkflowBoard items={workflow} setItems={setWorkflow} />

        <AutomationRecipes />

        <footer className="pb-6 pt-2 text-center text-xs text-slate-400 dark:text-slate-600">
          Built by your automation agent · Optimize relentlessly.
        </footer>
      </div>
    </div>
  );
}
