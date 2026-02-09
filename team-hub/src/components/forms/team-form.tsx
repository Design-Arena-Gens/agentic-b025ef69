"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { TagInput } from "../ui/tag-input";
import { Textarea } from "../ui/textarea";
import { DEFAULT_FOCUS_ZONES, ROLES, STAGES } from "@/lib/constants";
import { useTeamForge } from "@/lib/state";
import type { Team } from "@/lib/types";

interface TeamFormProps {
  onCreated?: (team: Team) => void;
}

const baseTeam: Omit<Team, "id" | "createdAt" | "lastActivity"> = {
  name: "",
  mission: "",
  productType: "Startup" as Team["productType"],
  stage: "Concept" as Team["stage"],
  energyTagline: "",
  vibe: [] as string[],
  focusZones: [] as string[],
  roles: ROLES.map((role) => ({
    role,
    required: role === "Product Lead" || role === "Tech Builder",
    filled: false,
    priority: role === "Growth Hacker" || role === "Product Lead" || role === "Tech Builder" ? "critical" : "nice-to-have",
  })),
  maxMembers: 5,
  currentMembers: [] as Team["currentMembers"],
  pendingMembers: [] as Team["pendingMembers"],
  isPrivate: false,
  sprintRhythm: "Weekly" as Team["sprintRhythm"],
  collabMode: "Async" as Team["collabMode"],
  regionPreference: "Global" as Team["regionPreference"],
  heroImage: "",
  manifesto: "",
  dataSignals: {
    momentumScore: 60,
    velocity: "Balanced" as Team["dataSignals"]["velocity"],
    meetingsPerWeek: 2,
  },
  openToApplications: true,
};

export const TeamForm = ({ onCreated }: TeamFormProps) => {
  const { createTeam, state } = useTeamForge();
  const [form, setForm] = useState(baseTeam);

  const handleChange = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleRole = (roleName: string) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.map((slot) =>
        slot.role === roleName
          ? { ...slot, required: !slot.required, priority: !slot.required ? "critical" : "nice-to-have" }
          : slot,
      ),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      focusZones: Array.from(new Set(form.focusZones)),
      vibe: form.vibe.length ? form.vibe : ["Craft-led", "High signal"],
      heroImage:
        form.heroImage ||
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      currentMembers: form.currentMembers.length
        ? form.currentMembers
        : state.profile
          ? [
              {
                id: state.profile.id,
                name: state.profile.fullName,
                role: state.profile.role,
                tagline: state.profile.headline,
                avatarSeed: state.profile.id,
                availability: state.profile.availability,
                timezone: state.profile.timezone,
                joinedAt: new Date().toISOString(),
              },
            ]
          : [],
      manifesto: form.manifesto || form.mission,
    };

    const newTeam = createTeam(payload);
    onCreated?.(newTeam);
    setForm(baseTeam);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl bg-white/80 p-8 shadow-soft">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-ink-900">Spin up your crew</h2>
        <p className="text-sm text-ink-500">
          Lay down the mission, define the vibe, and highlight the roles you need. We&apos;ll surface
          your squad to perfect matches the moment you hit deploy.
        </p>
      </header>

      <Input
        label="Squad name"
        required
        value={form.name}
        onChange={(event) => handleChange("name", event.target.value)}
      />
      <Textarea
        label="Mission"
        required
        value={form.mission}
        onChange={(event) => handleChange("mission", event.target.value)}
      />
      <Input
        label="Punchy tagline"
        value={form.energyTagline}
        onChange={(event) => handleChange("energyTagline", event.target.value)}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Product type"
          value={form.productType}
          onChange={(event) => handleChange("productType", event.target.value as Team["productType"])}
        >
          <option value="Startup">Startup</option>
          <option value="SaaS">SaaS</option>
          <option value="Marketplace">Marketplace</option>
          <option value="AI Tool">AI Tool</option>
          <option value="Consumer App">Consumer App</option>
          <option value="Deep Tech">Deep Tech</option>
        </Select>
        <Select
          label="Stage"
          value={form.stage}
          onChange={(event) => handleChange("stage", event.target.value as Team["stage"])}
        >
          {STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </Select>
        <Input
          label="Hero image URL"
          value={form.heroImage}
          onChange={(event) => handleChange("heroImage", event.target.value)}
          placeholder="https://images.unsplash.com/..."
        />
        <Select
          label="Collaboration mode"
          value={form.collabMode}
          onChange={(event) => handleChange("collabMode", event.target.value as Team["collabMode"])}
        >
          <option value="Async">Async</option>
          <option value="Hybrid">Hybrid</option>
          <option value="In-person">In-person</option>
        </Select>
        <Select
          label="Sprint rhythm"
          value={form.sprintRhythm}
          onChange={(event) =>
            handleChange("sprintRhythm", event.target.value as Team["sprintRhythm"])
          }
        >
          <option value="Weekly">Weekly</option>
          <option value="Bi-weekly">Bi-weekly</option>
          <option value="Daily">Daily standups</option>
        </Select>
        <Select
          label="Region preference"
          value={form.regionPreference}
          onChange={(event) =>
            handleChange("regionPreference", event.target.value as Team["regionPreference"])
          }
        >
          <option value="Global">Global</option>
          <option value="Americas">Americas</option>
          <option value="EMEA">EMEA</option>
          <option value="APAC">APAC</option>
        </Select>
      </div>

      <TagInput
        label="Focus zones"
        tags={form.focusZones}
        onChange={(tags) => handleChange("focusZones", tags)}
        suggested={DEFAULT_FOCUS_ZONES}
      />
      <TagInput
        label="Team vibe descriptors"
        tags={form.vibe}
        onChange={(tags) => handleChange("vibe", tags)}
        placeholder="Calm energy, high craft, etc."
      />

      <Textarea
        label="Manifesto"
        hint="Share your vision, rituals, and expectations for teammates."
        value={form.manifesto}
        onChange={(event) => handleChange("manifesto", event.target.value)}
      />

      <div className="rounded-3xl bg-white/70 p-5 shadow-inner-soft">
        <p className="text-sm font-semibold text-ink-700">Role slots</p>
        <p className="text-xs text-ink-500">
          Toggle the roles that are critical. We keep squads lean (3-6 humans) and ship-ready.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {form.roles.map((slot) => (
            <button
              type="button"
              key={slot.role}
              onClick={() => toggleRole(slot.role)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                slot.required
                  ? "bg-gradient-to-r from-accent-500 to-purple-500 text-white shadow-soft"
                  : "bg-white/80 text-ink-400 border border-dashed border-ink-200"
              }`}
            >
              {slot.role}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Launch squad page
        </Button>
      </div>
    </form>
  );
};
