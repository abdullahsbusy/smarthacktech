"use client";

import { useEffect, useState } from "react";

export function OpenChip() {
  const [label, setLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function tick() {
      try {
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          weekday: "short",
        }).formatToParts(new Date());
        const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
        const day = get("weekday");
        const hh = parseInt(get("hour"), 10);
        const open = day !== "Sun" && hh >= 9 && hh < 18;
        setIsOpen(open);
        setLabel(
          open
            ? `Open now · ${get("hour")}:${get("minute")} PKT`
            : `Closed · opens ${day === "Sat" ? "Mon " : ""}9:00 PKT`
        );
      } catch {
        // Intl unsupported — chip stays empty
      }
    }
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (!label) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-(--muted)">
      {isOpen && (
        <i className="inline-block size-1.5 animate-pulse rounded-full bg-(--ok) shadow-[0_0_8px_var(--ok)]" />
      )}
      {label}
    </span>
  );
}
