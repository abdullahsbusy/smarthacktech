"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type PortfolioProject = {
  cats: readonly string[];
  href?: string;
  img: string;
  category: string;
  title: string;
  text: string;
  tech?: readonly string[];
};

const FILTERS = [
  { cat: "all", label: "All" },
  { cat: "ai", label: "AI" },
  { cat: "vision", label: "Computer Vision" },
  { cat: "iot", label: "IoT" },
  { cat: "web", label: "Web" },
  { cat: "mobile", label: "Mobile" },
  { cat: "security", label: "Security" },
] as const;

export function PortfolioFilter({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState("all");
  const visible = projects.filter((p) => active === "all" || p.cats.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="mb-9 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.cat}
            type="button"
            aria-pressed={active === f.cat}
            onClick={() => setActive(f.cat)}
            className={cn(
              "rounded-full border border-(--line-2) px-4.5 py-2.5 text-sm transition-colors",
              active === f.cat
                ? "bg-grad-btn border-transparent text-[#0A0A0A]"
                : "bg-(--glass) text-(--muted) hover:bg-(--glass-2) hover:text-(--head)"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {visible.map((p) => {
          const Card = (
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-(--line) bg-(--card) transition-all duration-300 hover:-translate-y-1 hover:border-(--line-2)">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <span className="font-(family-name:--font-display) text-[.74rem] tracking-[.06em] text-(--c6) uppercase">
                  {p.category}
                </span>
                <h3 className="font-(family-name:--font-display) text-[1.14rem] font-semibold text-(--head)">
                  {p.title}
                </h3>
                <p className="flex-1 text-[.92rem] text-(--muted)">{p.text}</p>
                {p.tech && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="font-(family-name:--font-display) text-[.7rem] tracking-[.02em] text-(--faint)">
                        {t}
                        {" · "}
                      </span>
                    ))}
                  </div>
                )}
                {p.href && (
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-(--c6)">
                    View Project
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          );
          return p.href ? (
            <a key={p.title} href={p.href} target="_blank" rel="noopener">
              {Card}
            </a>
          ) : (
            <div key={p.title}>{Card}</div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-center text-(--muted)">No projects in that category yet.</p>
      )}
    </>
  );
}
