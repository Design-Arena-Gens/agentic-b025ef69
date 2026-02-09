"use client";

import clsx from "classnames";
import { useState } from "react";
import { Button } from "./button";

interface TagInputProps {
  label: string;
  placeholder?: string;
  hint?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  suggested?: string[];
}

export const TagInput = ({
  label,
  placeholder,
  hint,
  tags,
  onChange,
  suggested = [],
}: TagInputProps) => {
  const [value, setValue] = useState("");

  const addTag = (tag: string) => {
    if (!tag.trim()) return;
    if (tags.includes(tag.trim())) return;
    onChange([...tags, tag.trim()]);
    setValue("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((item) => item !== tag));
  };

  return (
    <div className="flex flex-col gap-3 text-sm text-ink-600">
      <span className="font-medium">{label}</span>
      <div
        className={clsx(
          "flex flex-wrap gap-2 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-inner-soft focus-within:border-accent-300 focus-within:ring-4 focus-within:ring-accent-200/40",
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 rounded-full bg-accent-200/70 px-3 py-1 text-xs font-medium text-ink-600"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full bg-white/60 px-1 text-xs font-semibold text-ink-500 hover:text-danger-500"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag(value);
            }
          }}
          className="flex-1 min-w-[120px] border-none bg-transparent text-sm text-ink-600 placeholder:text-ink-400 focus:outline-none"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => addTag(value)}
          className="text-xs uppercase tracking-wide text-accent-500"
        >
          add
        </Button>
      </div>
      {hint ? <span className="text-xs text-ink-500/70">{hint}</span> : null}
      {suggested.length ? (
        <div className="flex flex-wrap gap-2">
          {suggested.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => addTag(tag)}
              className="rounded-full border border-dashed border-ink-300/50 px-3 py-1 text-xs text-ink-500 hover:border-accent-300 hover:text-accent-500"
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
