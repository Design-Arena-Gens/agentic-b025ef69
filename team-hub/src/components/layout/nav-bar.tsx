"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useTeamForge } from "@/lib/state";

const links = [
  { href: "/", label: "Discover" },
  { href: "/teams", label: "Teams" },
  { href: "/create-team", label: "Create Team" },
  { href: "/onboard", label: "Build Your Profile" },
];

export const NavBar = () => {
  const pathname = usePathname();
  const { state } = useTeamForge();

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl">
      <nav className="glass-surface flex items-center justify-between rounded-3xl px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-purple-500 text-lg font-semibold text-white shadow-soft">
            TF
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-ink-800">Team Forge</span>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-400">Build in tribes</span>
          </div>
        </Link>

        <div className="flex items-center gap-1 rounded-full bg-white/60 px-2 py-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-surface-200 shadow-soft text-ink-800"
                    : "text-ink-500 hover:text-ink-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {state.profile ? (
            <Badge tone="accent" glow>
              {state.profile.role}
            </Badge>
          ) : (
            <Badge tone="neutral">Visitor</Badge>
          )}
          <Link href="/onboard">
            <Button variant="secondary" size="sm">
              {state.profile ? "Update Profile" : "Start now"}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
