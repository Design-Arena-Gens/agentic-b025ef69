"use client";

import { format } from "date-fns";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useTeamForge } from "@/lib/state";
import type { Team } from "@/lib/types";

interface Props {
  team: Team;
}

export const TeamChat = ({ team }: Props) => {
  const { state, addMessage } = useTeamForge();
  const [draft, setDraft] = useState("");

  const messages = state.chat.filter((message) => message.teamId === team.id);

  const handleSend = () => {
    if (!draft.trim() || !state.profile) return;
    addMessage({
      teamId: team.id,
      authorId: state.profile.id,
      authorName: state.profile.fullName,
      message: draft.trim(),
    });
    setDraft("");
  };

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-white/70 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink-800">Squad chat</h2>
        <span className="text-xs uppercase tracking-[0.25em] text-ink-400">
          {messages.length} threads
        </span>
      </div>
      <div className="flex max-h-80 flex-col gap-3 overflow-y-auto pr-2 text-sm text-ink-600">
        {messages.map((message) => (
          <div key={message.id} className="rounded-3xl bg-surface-100 px-4 py-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-ink-400">
              <span>{message.authorName}</span>
              <span>{format(new Date(message.postedAt), "MMM d • HH:mm")}</span>
            </div>
            <p className="mt-2 text-sm text-ink-600">{message.message}</p>
          </div>
        ))}
        {!messages.length ? (
          <div className="rounded-3xl border border-dashed border-ink-300/60 px-4 py-6 text-center text-xs uppercase tracking-[0.3em] text-ink-400">
            No messages yet. Start the vibe.
          </div>
        ) : null}
      </div>
      <div className="rounded-3xl bg-white/80 p-4 shadow-inner-soft">
        <Textarea
          label="Drop a signal"
          placeholder={state.profile ? "Send your update or question..." : "Create a profile to chat"}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          disabled={!state.profile}
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={handleSend} disabled={!draft.trim() || !state.profile}>
            Send to crew
          </Button>
        </div>
      </div>
    </section>
  );
};
