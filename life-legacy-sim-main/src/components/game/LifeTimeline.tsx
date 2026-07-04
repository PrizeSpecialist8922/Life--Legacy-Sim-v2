import { useEffect, useRef } from "react";
import type { Character, LogTone } from "../../game/types";

const toneColor: Record<LogTone, string> = {
  neutral: "var(--muted-foreground)",
  good: "var(--success)",
  bad: "var(--destructive)",
  milestone: "var(--primary)",
};

export function LifeTimeline({ character }: { character: Character }) {
  const endRef = useRef<HTMLDivElement>(null);
  const prevAge = useRef(-1);
  // Jump to the latest entry only when a new year begins — never after an
  // in-year action — and without any scroll animation.
  useEffect(() => {
    if (character.age !== prevAge.current) {
      prevAge.current = character.age;
      endRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [character.age]);

  return (
    <div className="glass flex h-full flex-col rounded-2xl p-4">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Life Timeline</h3>
      <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto pr-1">
        {character.log.map((entry, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl bg-white/[0.03] px-3 py-2 text-sm animate-in fade-in"
          >
            <span
              className="mt-0.5 shrink-0 text-xs font-bold tabular-nums"
              style={{ color: toneColor[entry.tone] }}
            >
              {entry.age}
            </span>
            <span
              className={
                entry.tone === "milestone" ? "font-medium text-foreground" : "text-muted-foreground"
              }
            >
              {entry.text}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
