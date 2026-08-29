export function DotLive() {
  return (
    <span className="relative inline-block size-2.5 rounded-full bg-(--ok) motion-safe:animate-[pulse-dot_1.8s_infinite]" />
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-(--line-2) bg-(--glass) px-4 py-2 text-[13px] text-(--muted)">
      {children}
    </span>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-(--glass) px-4 py-2 text-[0.82rem] text-(--muted)">
      {children}
    </span>
  );
}
