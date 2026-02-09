"use client";

import { formatDistanceToNow, parseISO } from "date-fns";
import { Badge } from "../ui/badge";
import { roleAccent } from "@/lib/match";
import type { Team, TeamMember } from "@/lib/types";

interface Props {
  team: Team;
}

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="flex items-center gap-4 rounded-3xl bg-white/80 p-4 shadow-inner-soft">
    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent-200 to-accent-400 text-white shadow-soft">
      <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
        {member.name
          .split(" ")
          .map((segment) => segment[0])
          .join("")
          .slice(0, 2)}
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-1">
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-ink-800">{member.name}</p>
        <span
          className={`rounded-full bg-gradient-to-r ${roleAccent(member.role)} px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white`}
        >
          {member.role}
        </span>
      </div>
      <p className="text-xs text-ink-500">{member.tagline}</p>
      <div className="flex gap-3 text-[11px] uppercase text-ink-400">
        <span>{member.availability}</span>
        <span>{member.timezone}</span>
        <span>Joined {formatDistanceToNow(parseISO(member.joinedAt), { addSuffix: true })}</span>
      </div>
    </div>
  </div>
);

export const TeamRoster = ({ team }: Props) => (
  <section className="flex flex-col gap-4 rounded-3xl bg-white/70 p-6 shadow-soft">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-ink-800">Current crew</h2>
      <Badge tone="neutral">
        {team.currentMembers.length} / {team.maxMembers} filled
      </Badge>
    </div>
    <div className="grid gap-4">
      {team.currentMembers.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  </section>
);
