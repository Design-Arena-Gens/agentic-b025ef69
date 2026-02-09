"use client";

import { useRouter } from "next/navigation";
import { TeamForm } from "@/components/forms/team-form";
import { Badge } from "@/components/ui/badge";

export default function CreateTeamPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10">
      <section className="rounded-3xl bg-white/70 p-8 shadow-soft">
        <Badge tone="accent" glow>
          Launch a squad
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold text-ink-900">Create a founder cell</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          Define the mission, craft your vibe, and highlight the role slots you need filled.
          We&apos;ll showcase your squad to role-perfect builders the moment you launch.
        </p>
      </section>
      <TeamForm
        onCreated={(team) => {
          router.push(`/teams/${team.id}`);
        }}
      />
    </div>
  );
}
