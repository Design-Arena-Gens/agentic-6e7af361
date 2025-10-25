import { SectionCard } from "./SectionCard";
import { Sparkles, Workflow, Zap } from "lucide-react";

const recipes = [
  {
    icon: Sparkles,
    name: "Auto Research Digests",
    trigger: "42 hours before record day",
    stack: ["Morning brew API scrape", "Notion database sync", "Slack digest"],
    result:
      "Delivers a prioritized swipe file with stats, quotes, and competitor angles directly to the producer workspace.",
  },
  {
    icon: Workflow,
    name: "Editor Intake Robot",
    trigger: "Idea column → Pre-Production",
    stack: ["Zapier", "Frame.io project clone", "Google Drive template"],
    result:
      "Clones the master project, drops b-roll references, and pings the editor with a task brief in ClickUp.",
  },
  {
    icon: Zap,
    name: "End Screen Refresh",
    trigger: "Ready to Publish",
    stack: ["Envato template", "After Effects render queue", "Descript caption export"],
    result:
      "Autogenerates an outro with updated CTAs and publishes captions to the asset drive before upload.",
  },
];

export function AutomationRecipes() {
  return (
    <SectionCard
      title="Automation Playbooks"
      subtitle="Plug-and-play systems you can wire up today to remove bottlenecks."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {recipes.map((recipe) => (
          <article
            key={recipe.name}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <recipe.icon className="h-5 w-5 text-emerald-500" />
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {recipe.name}
                </h3>
                <p className="text-xs uppercase text-slate-400 dark:text-slate-500">
                  Trigger: {recipe.trigger}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {recipe.result}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Stack
            </p>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
              {recipe.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
