"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  img: string;
  imgPosition?: string;
  badgePath: string;
};

export function TeamAccordion({ members }: { members: TeamMember[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      role="list"
      className="flex h-[460px] gap-3.5 max-md:h-auto max-md:flex-col"
      onMouseLeave={() => setActiveIndex(0)}
    >
      {members.map((m, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.article
            key={m.name}
            role="listitem"
            tabIndex={0}
            aria-label={`${m.name}, ${m.role}`}
            onMouseEnter={() => setActiveIndex(i)}
            onFocus={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, y: 30, scale: 0.82 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.26, 0.53, 0.74, 1] }}
            animate={{ flexGrow: isActive ? 5.4 : 1 }}
            className={cn(
              "relative min-w-0 cursor-pointer overflow-hidden rounded-3xl border outline-none max-md:h-[84px] max-md:flex-none",
              isActive
                ? "border-(--c5)/55 shadow-[0_26px_60px_-22px_rgba(0,0,0,.7),0_0_0_1px_rgba(47,168,239,.18),0_0_42px_-12px_rgba(47,168,239,.32)]"
                : "border-(--line-2)"
            )}
          >
            <span
              className="absolute inset-0 bg-cover bg-center transition-[filter,transform] duration-700"
              style={{
                backgroundImage: `url(${m.img})`,
                backgroundPosition: m.imgPosition ?? "center",
                filter: isActive ? "brightness(.92) saturate(1.05)" : "brightness(.6) saturate(.82)",
                transform: isActive ? "scale(1)" : "scale(1.08)",
              }}
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/5" />
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 overflow-hidden",
                isActive ? "p-5.5" : "p-3.5"
              )}
            >
              <div className="flex items-center gap-3 whitespace-nowrap">
                <span
                  className={cn(
                    "grid size-11.5 shrink-0 place-items-center rounded-2xl border",
                    isActive
                      ? "bg-grad-btn border-transparent text-[#0A0A0A]"
                      : "border-(--c5)/45 bg-black/55 text-(--c6) backdrop-blur-sm"
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-[22px]"
                  >
                    <path d={m.badgePath} />
                  </svg>
                </span>
                <span
                  className={cn(
                    "flex min-w-0 flex-col gap-0.5 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-100 max-md:opacity-100 md:opacity-0"
                  )}
                >
                  <span className="font-(family-name:--font-display) text-[1.18rem] font-bold leading-tight text-[#eef5fb]">
                    {m.name}
                  </span>
                  <span className="font-(family-name:--font-display) text-[.74rem] font-semibold uppercase tracking-[.09em] text-[#C6E1F7]">
                    {m.role}
                  </span>
                </span>
              </div>
              <p
                className={cn(
                  "max-w-[46ch] text-[.95rem] leading-relaxed text-[#d3e5f2] transition-opacity duration-300",
                  isActive ? "block opacity-100" : "hidden opacity-0 md:block"
                )}
              >
                {m.bio}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
