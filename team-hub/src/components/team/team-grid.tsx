"use client";

import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { TeamCard } from "./team-card";
import { ROLES, STAGES, DEFAULT_FOCUS_ZONES } from "@/lib/constants";
import { useTeamForge } from "@/lib/state";

export const TeamGrid = () => {
  const { state } = useTeamForge();
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [zoneFilter, setZoneFilter] = useState<string>("all");

  const filteredTeams = useMemo(() => {
    return state.teams.filter((team) => {
      const matchesRole =
        roleFilter === "all" ||
        team.roles.some((role) => role.role === roleFilter && !role.filled);
      const matchesStage = stageFilter === "all" || team.stage === stageFilter;
      const matchesZone = zoneFilter === "all" || team.focusZones.includes(zoneFilter);
      return matchesRole && matchesStage && matchesZone;
    });
  }, [state.teams, roleFilter, stageFilter, zoneFilter]);

  return (
    <section className="mx-auto mt-12 max-w-6xl">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-ink-900">Teams on the grid</h2>
          <p className="text-sm text-ink-500">
            Curated 3-6 person crews shipping startups, problem-solving, and
            crafting products with serious energy.
          </p>
        </div>
        <Badge tone="accent" glow>
          {filteredTeams.length} squads open
        </Badge>
      </header>

      <div className="mb-8 grid gap-4 rounded-3xl bg-white/70 p-5 shadow-inner-soft md:grid-cols-3">
        <Select
          label="Role focus"
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
        >
          <option value="all">Any role</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
        <Select
          label="Stage"
          value={stageFilter}
          onChange={(event) => setStageFilter(event.target.value)}
        >
          <option value="all">Any stage</option>
          {STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </Select>
        <Select
          label="Focus zone"
          value={zoneFilter}
          onChange={(event) => setZoneFilter(event.target.value)}
        >
          <option value="all">Any vibe</option>
          {DEFAULT_FOCUS_ZONES.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTeams.map((team, index) => (
          <TeamCard key={team.id} team={team} accent={index === 0} />
        ))}
        {!filteredTeams.length ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-accent-300 bg-accent-200/40 p-10 text-center text-ink-500">
            <p>No squads match these filters yet. Start one and set the vibe.</p>
            <Button variant="secondary" size="md">
              Launch a new crew
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};
