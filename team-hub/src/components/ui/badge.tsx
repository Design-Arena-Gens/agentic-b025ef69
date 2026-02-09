"use client";

import clsx from "classnames";
import type { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "accent" | "success" | "warning";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  glow?: boolean;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-white/70 text-ink-500 border border-white/80",
  accent: "bg-accent-200/70 text-ink-700 border border-accent-300/80",
  success: "bg-emerald-100/80 text-emerald-700 border border-emerald-200/80",
  warning: "bg-amber-100/90 text-amber-700 border border-amber-200",
};

export const Badge = ({ className, tone = "neutral", glow = false, ...props }: BadgeProps) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
      toneStyles[tone],
      glow && "shadow-[0_0_0_4px_rgba(124,127,255,0.16)]",
      className,
    )}
    {...props}
  />
);

export type { BadgeProps };
