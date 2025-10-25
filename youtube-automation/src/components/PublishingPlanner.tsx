import { useMemo } from "react";
import { CalendarDays, Flame, Timer } from "lucide-react";
import { IdeaBlueprint, IdeaInput } from "../lib/automation";
import { SectionCard } from "./SectionCard";

type PublishingPlannerProps = {
  input: IdeaInput;
  ideas: IdeaBlueprint[];
};

export function PublishingPlanner({ input, ideas }: PublishingPlannerProps) {
  const schedule = useMemo(() => {
    if (!ideas.length) return [];
    const cadenceMap: Record<IdeaInput["cadence"], number> = {
      Weekly: 7,
      "Twice Weekly": 3,
      Daily: 1,
    };

    const gap = cadenceMap[input.cadence];
    return ideas.map((idea, index) => {
      const release = new Date(Date.now() + index * gap * 86400000);
      const primeHour = input.cadence === "Daily" ? 13 : 16;
      release.setHours(primeHour, 0, 0, 0);

      const trailerDate = new Date(release);
      trailerDate.setDate(trailerDate.getDate() - 2);
      trailerDate.setHours(9, 30, 0, 0);

      return {
        idea,
        release,
        trailer: trailerDate,
        retentionMission:
          index === 0
            ? "Open with a fulfilling before/after montage"
            : "Drop a mid-roll micro-challenge at 45% watch time",
      };
    });
  }, [ideas, input.cadence]);

  return (
    <SectionCard
      title="Publishing Planner"
      subtitle="Auto-build a release calendar with retention missions and promo checkpoints."
    >
      {schedule.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          Lock a batch of ideas to see your next launch windows.
        </p>
      ) : (
        <div className="space-y-4">
          {schedule.map((entry) => (
            <article
              key={entry.idea.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {entry.idea.title}
              </h3>
              <div className="mt-3 grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-3">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-emerald-500" />
                  Release {entry.release.toLocaleDateString()} ·{" "}
                  {entry.release.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <p className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-sky-500" />
                  Teaser goes live {entry.trailer.toLocaleDateString()} ·{" "}
                  {entry.trailer.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <p className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-amber-500" />
                  Retention mission: {entry.retentionMission}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
