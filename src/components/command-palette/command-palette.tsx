"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import "./command-palette.css";
import { PALETTE_ITEMS, type PaletteItem } from "@/lib/command-palette/items";
import { useTheme } from "@/hooks/use-theme";

/* Ctrl+K / Cmd+K command palette. Ported 1:1 (behavior + copy) from the
   original palette.js as a React client component: fuzzy-ish scoring,
   arrow-key nav, focus trap, Esc to close, pointer hover to select. */

function score(item: PaletteItem, q: string) {
  const t = item.title.toLowerCase();
  const s = item.subtitle.toLowerCase();
  if (t.indexOf(q) === 0) return 3;
  if (t.indexOf(q) > -1) return 2;
  if (s.indexOf(q) > -1) return 1;
  return 0;
}

declare global {
  interface Window {
    __htPalette?: { open: () => void; close: () => void; toggle: () => void };
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const router = useRouter();
  const { toggle: toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PALETTE_ITEMS;
    return PALETTE_ITEMS.map((it) => ({ it, sc: score(it, q) }))
      .filter((r) => r.sc > 0)
      .sort((a, b) => b.sc - a.sc)
      .map((r) => r.it);
  }, [query]);

  function openPalette() {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setSel(0);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 30);
  }
  function closePalette() {
    setOpen(false);
    document.documentElement.style.overflow = "";
    lastFocusRef.current?.focus?.();
  }

  useEffect(() => {
    window.__htPalette = {
      open: openPalette,
      close: closePalette,
      toggle: () => (open ? closePalette() : openPalette()),
    };
    return () => {
      delete window.__htPalette;
    };
  }, [open]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (open) closePalette();
        else openPalette();
      } else if (e.key === "Escape" && open) {
        closePalette();
      } else if (e.key === "Tab" && open) {
        // focus trap: the search input is the dialog's only tabbable
        // control, so Tab must not escape into the inert page behind it.
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [open]);

  function runItem(it: PaletteItem | undefined) {
    if (!it) return;
    closePalette();
    if (it.action === "kaira") window.KairaChat?.open();
    else if (it.action === "whatsapp") window.open("https://wa.me/923275516703", "_blank", "noopener");
    else if (it.action === "theme") toggleTheme();
    else if (it.action === "email") window.location.href = "mailto:contact.hacktechzone@gmail.com";
    else if (it.href) router.push(it.href);
  }

  function move(d: number) {
    if (!results.length) return;
    setSel((s) => (s + d + results.length) % results.length);
  }

  if (!open) return null;

  return (
    <div className="cp">
      <div className="cp__scrim" onClick={closePalette} />
      <div className="cp__panel" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cp__head">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            className="cp__input"
            type="text"
            placeholder="Search pages, services, actions…"
            aria-label="Search commands"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                move(1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                move(-1);
              } else if (e.key === "Enter") {
                e.preventDefault();
                runItem(results[sel]);
              }
              // Escape and Tab are handled by the window-level listener above
            }}
          />
          <kbd className="cp__esc">esc</kbd>
        </div>
        <ul className="cp__list" role="listbox">
          {results.length ? (
            results.map((it, i) => (
              <li
                key={it.title}
                className={`cp__item${i === sel ? " is-sel" : ""}`}
                role="option"
                aria-selected={i === sel}
                style={{ "--d": Math.min(i, 8) } as CSSProperties}
                onClick={() => runItem(it)}
                onPointerMove={() => {
                  if (i !== sel) setSel(i);
                }}
              >
                <span className="cp__ico">{it.icon}</span>
                <span>
                  <b>{it.title}</b>
                  <small>{it.subtitle}</small>
                </span>
                <span className={`cp__go${it.href ? "" : " cp__go--act"}`}>{it.href ? "↵" : "run"}</span>
              </li>
            ))
          ) : (
            <li className="cp__empty">No matches, try &quot;AI&quot;, &quot;quote&quot;, &quot;portfolio&quot;…</li>
          )}
        </ul>
        <div className="cp__foot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span className="cp__brand">HackTech</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteHint() {
  return (
    <button
      type="button"
      className="cp-hint"
      aria-label="Open command palette"
      onClick={() => window.__htPalette?.open()}
    >
      <kbd>Ctrl</kbd>
      <kbd>K</kbd>
    </button>
  );
}
