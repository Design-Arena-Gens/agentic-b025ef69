"use client";

import clsx from "classnames";
import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";

type Props = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  label?: string;
  hint?: string;
};

export const Select = ({ className, label, hint, id, children, ...props }: Props) => (
  <label
    htmlFor={id}
    className="flex flex-col gap-2 text-sm font-medium text-ink-600"
  >
    {label}
    <div className="relative">
      <select
        id={id}
        className={clsx(
          "w-full appearance-none rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-sm text-ink-700 shadow-inner-soft transition focus:border-accent-300 focus:outline-none focus:ring-4 focus:ring-accent-200/50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400">
        ▾
      </span>
    </div>
    {hint ? <span className="text-xs font-normal text-ink-500/70">{hint}</span> : null}
  </label>
);
