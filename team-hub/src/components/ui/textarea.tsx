"use client";

import clsx from "classnames";
import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export const Textarea = ({ className, label, hint, id, ...props }: Props) => (
  <label
    htmlFor={id}
    className="flex flex-col gap-2 text-sm font-medium text-ink-600"
  >
    {label}
    <textarea
      id={id}
      className={clsx(
        "w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-ink-700 shadow-inner-soft transition focus:border-accent-300 focus:outline-none focus:ring-4 focus:ring-accent-200/50",
        "min-h-[120px]",
        className,
      )}
      {...props}
    />
    {hint ? <span className="text-xs font-normal text-ink-500/70">{hint}</span> : null}
  </label>
);
