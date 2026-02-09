"use client";

import { notFound } from "next/navigation";
import { TeamHero } from "@/components/team/team-hero";
import { TeamRoster } from "@/components/team/team-roster";
import { TeamMatchPanel } from "@/components/team/team-match-panel";
import { TeamChat } from "@/components/team/team-chat";
import { useTeamForge } from "@/lib/state";

interface TeamDetailPageProps {
  params: { id: string };
}

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const { getTeam } = useTeamForge();
  const team = getTeam(params.id);

  if (!team) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <TeamHero team={team} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          <TeamRoster team={team} />
          <TeamChat team={team} />
        </div>
        <TeamMatchPanel team={team} />
      </div>
      <section className="rounded-3xl bg-white/70 p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-ink-800">Squad manifesto</h2>
        <p className="mt-3 text-sm text-ink-600">{team.manifesto}</p>
      </section>
    </div>
  );
}
