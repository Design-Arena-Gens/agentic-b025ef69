"use client";

import clsx from "classnames";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Variants = "primary" | "secondary" | "ghost" | "danger";
type Sizes = "sm" | "md" | "lg";

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: Variants;
  size?: Sizes;
  icon?: React.ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:opacity-50 disabled:pointer-events-none gap-2";

const variantStyles: Record<Variants, string> = {
  primary:
    "bg-gradient-to-r from-accent-500 to-blue-500 text-white shadow-soft hover:shadow-lg hover:scale-[1.01]",
  secondary:
    "bg-surface-100 text-ink-700 border border-white/70 shadow-inner-soft hover:border-accent-200 hover:text-accent-500",
  ghost:
    "bg-transparent text-ink-500 hover:text-accent-500 hover:bg-white/70 border border-transparent",
  danger:
    "bg-gradient-to-r from-danger-500 to-rose-500 text-white shadow-soft hover:shadow-lg hover:scale-[1.01]",
};

const sizeStyles: Record<Sizes, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  ...props
}: ButtonProps) => (
  <button className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
    {icon ? <span className="flex-shrink-0">{icon}</span> : null}
    <span>{children}</span>
  </button>
);

export type { ButtonProps };
