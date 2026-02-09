"use client";

import { useState } from "react";
import Link from "next/link";
import { ProfileForm } from "@/components/forms/profile-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MatchResult } from "@/lib/match";
import { useTeamForge } from "@/lib/state";

export default function OnboardPage() {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const { state } = useTeamForge();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="rounded-3xl bg-white/70 p-8 shadow-soft">
        <header className="mb-6 flex flex-col gap-3">
          <Badge tone="accent" glow>
            {state.profile ? "Refresh your vibe" : "Spin up your role card"}
          </Badge>
          <h1 className="text-3xl font-semibold text-ink-900">
            {state.profile
              ? "Update your builder signal"
              : "Craft your builder profile for instant matches"}
          </h1>
          <p className="max-w-2xl text-sm text-ink-500">
            Share your mission, role, and availability. Team Forge matches you with squads
            craving your energy. We keep it role-based, curated, and incredibly intentional.
          </p>
        </header>
        <ProfileForm
          onComplete={({ matches: newMatches }) => {
            setMatches(newMatches);
          }}
        />
      </section>

      {matches.length ? (
        <section className="rounded-3xl bg-white/80 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-ink-800">Your top squad matches</h2>
          <p className="text-sm text-ink-500">
            These squads align with your mission intensity and role. Jump in or explore more on the teams page.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {matches.map((match) => {
              const team = state.teams.find((item) => item.id === match.teamId);
              if (!team) return null;
              return (
                <div key={team.id} className="rounded-3xl bg-surface-100 p-5 shadow-inner-soft">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-ink-400">
                    <span>{team.name}</span>
                    <span>{Math.round(match.score * 100)}% fit</span>
                  </div>
                  <p className="mt-3 text-sm text-ink-600">{team.energyTagline}</p>
                  <ul className="mt-3 flex flex-col gap-2 text-xs text-ink-500">
                    {match.reason.map((reason) => (
                      <li key={reason}>• {reason}</li>
                    ))}
                  </ul>
                  <Link href={`/teams/${team.id}`} className="mt-4 block">
                    <Button variant="secondary" className="w-full text-xs uppercase tracking-[0.2em]">
                      View squad
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
