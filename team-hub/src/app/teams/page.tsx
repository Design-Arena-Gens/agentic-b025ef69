"use client";

import Link from "next/link";
import { TeamGrid } from "@/components/team/team-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTeamForge } from "@/lib/state";

export default function TeamsPage() {
  const { state } = useTeamForge();

  const openSeats = state.teams.reduce(
    (count, team) => count + team.roles.filter((role) => !role.filled).length,
    0,
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <section className="rounded-3xl bg-white/70 p-8 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Badge tone="accent" glow>
              Explore squads
            </Badge>
            <h1 className="text-3xl font-semibold text-ink-900">Every squad is hand-balanced</h1>
            <p className="max-w-2xl text-sm text-ink-500">
              Dive into live squads shipping startups, companies, and problem-slaying products. Role-based,
              high craft, and ready for your energy.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-xs uppercase tracking-[0.25em] text-ink-400">
              {openSeats} open seats · {state.teams.length} squads
            </span>
            <Link href="/create-team">
              <Button variant="secondary">Launch your squad</Button>
            </Link>
          </div>
        </div>
      </section>
      <TeamGrid />
    </div>
  );
}
