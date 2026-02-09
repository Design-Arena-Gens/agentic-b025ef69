"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useTeamForge, buildMemberFromProfile } from "@/lib/state";
import type { Team } from "@/lib/types";

interface Props {
  team: Team;
}

export const TeamMatchPanel = ({ team }: Props) => {
  const { state, joinTeam } = useTeamForge();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleJoin = () => {
    if (!state.profile) {
      setStatus("error");
      setMessage("Create your profile first so the squad senses your signal.");
      return;
    }
    const alreadyMember = team.currentMembers.some((member) => member.id === state.profile?.id);
    if (alreadyMember) {
      setStatus("error");
      setMessage("You are already pulsing with this crew.");
      return;
    }
    const hasRoleOpen = team.roles.some((role) => role.role === state.profile?.role && !role.filled);
    if (!hasRoleOpen) {
      setStatus("error");
      setMessage("This squad has filled that role. Drop them a chat message to stay in their orbit.");
      return;
    }
    joinTeam(team.id, buildMemberFromProfile(state.profile));
    setStatus("success");
    setMessage("Welcome aboard! You’ve been added to the roster.");
  };

  return (
    <aside className="sticky top-28 flex flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-soft">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-ink-800">Ready to join?</h2>
        <p className="text-sm text-ink-500">
          Team Forge drops builders directly into aligned crews. Share your signal +
          role and we’ll sync you instantly.
        </p>
      </div>
      <div className="rounded-2xl bg-accent-200/50 p-4 text-sm text-ink-600 shadow-inner-soft">
        <p className="font-semibold uppercase tracking-[0.25em] text-ink-500">Squad pulse</p>
        <p className="mt-2">
          {team.collabMode} squad · {team.sprintRhythm} sprints · {team.regionPreference} timezone vibe
        </p>
      </div>
      <Button onClick={handleJoin} variant="primary">
        {state.profile ? `Join as ${state.profile.role}` : "Create profile to join"}
      </Button>
      {status === "success" ? (
        <Badge tone="success" className="justify-center">
          {message}
        </Badge>
      ) : null}
      {status === "error" ? (
        <Badge tone="warning" className="justify-center text-center">
          {message}
        </Badge>
      ) : null}
      {!state.profile ? (
        <Link href="/onboard" className="text-xs text-accent-500 underline">
          Craft your profile first
        </Link>
      ) : null}
    </aside>
  );
};
