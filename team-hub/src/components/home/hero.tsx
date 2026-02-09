"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useTeamForge } from "@/lib/state";

export const Hero = () => {
  const { state } = useTeamForge();

  return (
    <section className="relative mx-auto mt-8 flex max-w-6xl flex-col gap-10 overflow-hidden rounded-3xl bg-glow-accent p-10">
      <div className="absolute inset-0 -z-10 vibe-grid opacity-20" />
      <div className="flex flex-col gap-5 text-balance text-ink-800">
        <Badge tone="accent" glow className="self-start">
          Build With Your Tribe
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight lg:text-5xl">
          Match into a crafted 3-6 person founder cell built for momentum,
          chemistry, and pure shipping energy.
        </h1>
        <p className="max-w-2xl text-lg text-ink-600">
          Team Forge curates role-perfect squads so builders, storytellers, and
          operators can instantly drop into startup mode. Zero noise. Just serious
          momentum and a crystal-clear mission.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href={state.profile ? "/teams" : "/onboard"}>
            <Button size="lg" variant="primary">
              {state.profile ? "See your matches" : "Launch your builder profile"}
            </Button>
          </Link>
          <Link href="/create-team">
            <Button size="lg" variant="secondary">
              Start a founder cell
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 rounded-3xl bg-white/70 p-6 shadow-inner-soft md:grid-cols-3">
        <div>
          <span className="text-3xl font-semibold text-accent-500">{state.teams.length}</span>
          <p className="text-sm text-ink-500">Active squads shipping weekly</p>
        </div>
        <div>
          <span className="text-3xl font-semibold text-accent-500">
            {state.teams.filter((team) =>
              team.roles.some((role) => !role.filled && role.priority === "critical"),
            ).length}
          </span>
          <p className="text-sm text-ink-500">Critical roles open right now</p>
        </div>
        <div>
          <span className="text-3xl font-semibold text-accent-500">
            {state.profile ? "Live" : "Join"}
          </span>
          <p className="text-sm text-ink-500">
            {state.profile
              ? "Your profile is already match-ready."
              : "Create your role card to unlock matches."}
          </p>
        </div>
      </div>
    </section>
  );
};
