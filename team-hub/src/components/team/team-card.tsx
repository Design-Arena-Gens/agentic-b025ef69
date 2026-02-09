"use client";

import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { roleAccent } from "@/lib/match";
import type { Team } from "@/lib/types";

interface Props {
  team: Team;
  accent?: boolean;
}

export const TeamCard = ({ team, accent = false }: Props) => {
  const openRoles = team.roles.filter((role) => !role.filled);
  const criticalRoles = openRoles.filter((role) => role.priority === "critical");
  const timeAgo = formatDistanceToNow(parseISO(team.lastActivity), { addSuffix: true });

  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl ${accent ? "neumorphic" : "bg-white/80"} p-6 shadow-soft`}>
      <div
        className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl"
        style={{ backgroundImage: `url(${team.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
          <Badge tone="accent" glow className="bg-gradient-to-r from-accent-500/90 to-purple-600/90 text-white">
            {team.productType}
          </Badge>
          <Badge tone="neutral" className="bg-white/90 text-ink-700">
            {team.stage} stage
          </Badge>
          <Badge tone="warning">Momentum {team.dataSignals.momentumScore}</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-ink-700">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-ink-900">{team.name}</h3>
          <p className="text-sm leading-relaxed text-ink-600">{team.energyTagline}</p>
        </div>
        <p className="text-sm text-ink-500">{team.mission}</p>
        <div className="flex flex-wrap gap-2">
          {team.focusZones.slice(0, 3).map((zone) => (
            <Badge key={zone} tone="neutral" className="bg-surface-100 text-ink-600">
              {zone}
            </Badge>
          ))}
        </div>
        <div className="rounded-2xl bg-white/70 p-4 shadow-inner-soft">
          <p className="text-xs uppercase tracking-wide text-ink-400">Open roles</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {openRoles.length ? (
              openRoles.map((role) => (
                <span
                  key={role.role}
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${roleAccent(role.role)} px-3 py-1 text-xs font-semibold text-white`}
                >
                  {role.role}
                  <span className="rounded-full bg-white/30 px-2 py-0.5 text-[10px] uppercase">
                    {role.priority === "critical" ? "Urgent" : "Optional"}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-xs text-ink-400">Squad currently full but open to convos</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-wide text-ink-400">
        <span>{team.currentMembers.length} shipping partners · {team.sprintRhythm} sprints</span>
        <span>{timeAgo}</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex -space-x-2">
          {team.currentMembers.slice(0, 4).map((member) => (
            <div key={member.id} className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-white to-surface-200 shadow-soft">
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-ink-500">
                {member.name
                  .split(" ")
                  .map((segment) => segment[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>
          ))}
        </div>
        <Link href={`/teams/${team.id}`}>
          <Button variant="primary" size="sm">
            View squad
          </Button>
        </Link>
      </div>
      {criticalRoles.length ? (
        <div className="mt-4 rounded-2xl border border-dashed border-accent-300 bg-accent-200/40 px-4 py-3 text-xs text-accent-700 shadow-inner-soft">
          <span className="font-semibold uppercase tracking-[0.2em]">Signal: </span>
          {criticalRoles.map((role) => role.role).join(" · ")} needed now
        </div>
      ) : null}
    </article>
  );
};
