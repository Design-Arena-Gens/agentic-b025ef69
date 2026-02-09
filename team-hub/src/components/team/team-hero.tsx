"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { Badge } from "../ui/badge";
import { roleAccent } from "@/lib/match";
import type { Team } from "@/lib/types";

interface Props {
  team: Team;
}

export const TeamHero = ({ team }: Props) => {
  const lastActive = formatDistanceToNow(parseISO(team.lastActivity), { addSuffix: true });
  const openRoles = team.roles.filter((role) => !role.filled);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white/80 shadow-soft">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${team.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="relative flex flex-col gap-8 bg-white/75 p-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent" glow>
              {team.productType}
            </Badge>
            <Badge tone="neutral">{team.stage} Stage</Badge>
            <Badge tone="warning">Velocity: {team.dataSignals.velocity}</Badge>
          </div>
          <h1 className="text-4xl font-semibold text-ink-900">{team.name}</h1>
          <p className="text-lg text-ink-600">{team.mission}</p>
          <div className="flex flex-wrap gap-2">
            {team.vibe.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-5 shadow-inner-soft">
          <span className="text-xs uppercase tracking-[0.3em] text-ink-400">Squad Signals</span>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold text-ink-900">{team.dataSignals.momentumScore}</span>
              <span className="text-xs text-ink-500">Momentum score</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-ink-800">
                {team.currentMembers.length}/{team.maxMembers}
              </span>
              <span className="text-xs text-ink-500">Members</span>
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-400">Last pulse {lastActive}</p>
        </div>
      </div>

      {openRoles.length ? (
        <div className="relative border-t border-white/80 bg-white/90 p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-400">
            Open seats
          </span>
          <div className="mt-3 flex flex-wrap gap-3">
            {openRoles.map((role) => (
              <span
                key={role.role}
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${roleAccent(role.role)} px-4 py-2 text-sm font-semibold text-white shadow-soft`}
              >
                {role.role}
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase">
                  {role.priority === "critical" ? "Critical" : "Nice to have"}
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};
