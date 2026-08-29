"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./kaira.css";
import { STARTERS, SendArrow } from "@/lib/kaira/starters";
import { BlueprintPanel } from "@/components/kaira/blueprint-panel";
import { LeadForm } from "@/components/kaira/lead-form";
import { AuditForm, AuditResultPanel } from "@/components/kaira/audit-panel";
import type { AuditResult, Blueprint, ChatMessage } from "@/lib/kaira/types";

/* KAIRA — on-site AI assistant. Ported 1:1 (behavior + copy) from the
   original veyra.js, as a React client component driven by state instead
   of manual DOM manipulation. Chat streams from /api/veyra; blueprint from
   /api/kaira-blueprint; leads to /api/kaira-lead; audits to /api/kaira-audit;
   open events to /api/kaira-event. */

type ThreadItem =
  | { id: number; kind: "user"; text: string }
  | { id: number; kind: "kaira"; text: string; loading?: boolean }
  | { id: number; kind: "error"; text: string }
  | { id: number; kind: "blueprint-loading" }
  | { id: number; kind: "blueprint"; bp: Blueprint }
  | { id: number; kind: "lead-form" }
  | { id: number; kind: "audit-form" }
  | { id: number; kind: "audit-loading"; url: string }
  | { id: number; kind: "audit-result"; data: AuditResult };

// plain Omit<Union, "id"> collapses to only the fields common to every
// variant; this distributes over the union first so each variant keeps
// its own fields minus "id".
type NewThreadItem = { [K in ThreadItem["kind"]]: Omit<Extract<ThreadItem, { kind: K }>, "id"> }[ThreadItem["kind"]];

const PROMPTS = [
  "Quote for a fleet-tracking system…",
  "I need a website for my business…",
  "Audit my website's performance…",
  "Build me an AI chatbot…",
  "Estimate a mobile app…",
];

let nextId = 1;

export function KairaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [auditing, setAuditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [thread, setThread] = useState<ThreadItem[]>([]);

  const messagesRef = useRef<ChatMessage[]>([]);
  const sessionRef = useRef(0);
  const trackedRef = useRef(false);
  const threadElRef = useRef<HTMLDivElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const twStartedRef = useRef(false);

  function scrollDown() {
    const el = threadElRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }

  useEffect(() => {
    scrollDown();
  }, [thread]);

  function open() {
    setIsOpen(true);
    startTypewriter();
    if (!trackedRef.current) {
      trackedRef.current = true;
      fetch("/api/kaira-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "open" }),
        keepalive: true,
      }).catch(() => {});
    }
    setTimeout(() => inputElRef.current?.focus(), 120);
  }
  function close() {
    setIsOpen(false);
  }

  function resetChat() {
    sessionRef.current++;
    messagesRef.current = [];
    setThread([]);
    setStarted(false);
    setStreaming(false);
    setGenerating(false);
    setAuditing(false);
    setInputValue("");
    inputElRef.current?.focus();
  }

  // exposed for the site's "Let's Talk" CTAs and the ⌘K command palette,
  // matching the original static site's window.KairaChat global
  useEffect(() => {
    window.KairaChat = { open, close, reset: resetChat };
    return () => {
      delete window.KairaChat;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startTypewriter() {
    if (twStartedRef.current) return;
    twStartedRef.current = true;
    const ta = inputElRef.current;
    if (!ta) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      ta.placeholder = PROMPTS[0];
      return;
    }
    let pi = 0;
    let ci = 0;
    let del = false;
    function type() {
      const el = inputElRef.current;
      if (!el) return;
      const active = document.activeElement === el || el.value;
      if (!active) {
        const w = PROMPTS[pi];
        ci += del ? -1 : 1;
        el.placeholder = w.slice(0, ci);
        if (!del && ci === w.length) {
          del = true;
          setTimeout(type, 1800);
          return;
        }
        if (del && ci === 0) {
          del = false;
          pi = (pi + 1) % PROMPTS.length;
        }
      }
      setTimeout(type, del ? 28 : 55);
    }
    type();
  }

  function addItem(item: NewThreadItem) {
    const id = nextId++;
    setThread((t) => [...t, { ...item, id } as ThreadItem]);
    return id;
  }
  /** Replaces an item in place, keeping its position in the thread. */
  function replaceItem(id: number, item: NewThreadItem) {
    setThread((t) => t.map((it) => (it.id === id ? ({ ...item, id } as ThreadItem) : it)));
  }
  function removeItem(id: number) {
    setThread((t) => t.filter((it) => it.id !== id));
  }

  async function send(text: string) {
    text = (text || "").trim();
    if (!text || streaming) return;
    if (!started) setStarted(true);
    const sid = sessionRef.current;

    messagesRef.current = [...messagesRef.current, { role: "user", content: text }];
    addItem({ kind: "user", text });
    setInputValue("");

    const kairaId = addItem({ kind: "kaira", text: "", loading: true });
    setStreaming(true);

    try {
      const res = await fetch("/api/veyra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current.slice(-16) }),
      });
      if (sid !== sessionRef.current) return;
      if (!res.ok || !res.body) {
        let e: { error?: string } = {};
        try {
          e = await res.json();
        } catch {
          // non-JSON error body
        }
        throw new Error(e.error || "Kaira is unavailable right now.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      replaceItem(kairaId, { kind: "kaira", text: "" });
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
        if (sid !== sessionRef.current) {
          try {
            reader.cancel();
          } catch {
            // stream already closed
          }
          return;
        }
        acc += dec.decode(r.value, { stream: true });
        replaceItem(kairaId, { kind: "kaira", text: acc });
      }
      if (sid === sessionRef.current) {
        messagesRef.current = [...messagesRef.current, { role: "assistant", content: acc || "…" }];
      }
    } catch (err) {
      if (sid !== sessionRef.current) return;
      removeItem(kairaId);
      addItem({ kind: "error", text: (err as Error)?.message || "Something went wrong. Please try again." });
    } finally {
      if (sid === sessionRef.current) {
        setStreaming(false);
        inputElRef.current?.focus();
      }
    }
  }

  async function generateBlueprint() {
    if (streaming || generating) return;
    if (!messagesRef.current.some((m) => m.role === "user")) {
      send("I'd like a full blueprint, here's my project idea: ");
      return;
    }
    if (!started) setStarted(true);
    setGenerating(true);
    const sid = sessionRef.current;
    const loadingId = addItem({ kind: "blueprint-loading" });
    try {
      const res = await fetch("/api/kaira-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current.slice(-24) }),
      });
      const bp = await res.json();
      if (sid !== sessionRef.current) return;
      if (!res.ok) throw new Error(bp.error || "Couldn't generate the blueprint.");
      removeItem(loadingId);
      addItem({ kind: "blueprint", bp });
    } catch (err) {
      if (sid !== sessionRef.current) return;
      replaceItem(loadingId, { kind: "error", text: (err as Error)?.message || "Blueprint failed. Please try again." });
    } finally {
      if (sid === sessionRef.current) setGenerating(false);
    }
  }

  function openLeadForm() {
    if (!started) setStarted(true);
    if (thread.some((t) => t.kind === "lead-form")) {
      scrollDown();
      return;
    }
    addItem({ kind: "lead-form" });
  }

  function openAuditForm() {
    if (!started) setStarted(true);
    addItem({ kind: "audit-form" });
  }

  async function submitAudit(url: string, formId: number) {
    removeItem(formId);
    setAuditing(true);
    const sid = sessionRef.current;
    const loadingId = addItem({ kind: "audit-loading", url });
    try {
      const res = await fetch("/api/kaira-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const dd = await res.json();
      if (sid !== sessionRef.current) return;
      if (!res.ok) throw new Error(dd.error || "Audit failed.");
      removeItem(loadingId);
      addItem({ kind: "audit-result", data: dd });
    } catch (err) {
      if (sid !== sessionRef.current) return;
      replaceItem(loadingId, { kind: "error", text: (err as Error)?.message || "Audit failed." });
    } finally {
      if (sid === sessionRef.current) setAuditing(false);
    }
  }

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) close();
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [isOpen]);

  return (
    <div className={`vy${isOpen ? " is-open" : ""}`}>
      <button className="vy-launch" type="button" aria-label="Chat with Kaira, HackTech's AI assistant" onClick={open}>
        <svg className="vy-launch__ico" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="vy-launch__tip">Ask <b>Kaira</b></span>
      </button>

      <section
        className={`vy-panel${started ? " is-chatting" : ""}`}
        role="dialog"
        aria-label="Kaira, HackTech AI assistant"
        aria-modal="false"
      >
        <div className="vy-top">
          <span className="vy-top__brand"><i /> KAIRA</span>
          <div className="vy-top__tools">
            <button className="vy-refresh" type="button" aria-label="New chat" title="New chat" onClick={resetChat}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </button>
            <button className="vy-x" type="button" aria-label="Close chat" onClick={close}>✕</button>
          </div>
        </div>

        <div className="vy-main">
          <div className="vy-welcome">
            <div className="vy-hello">I&rsquo;m KAIRA, your AI Solutions Architect</div>
            <h2 className="vy-ask">How can I help you <span>today</span>?</h2>
            <div className="vy-chips">
              {STARTERS.map((s) => (
                <button
                  key={s.label}
                  className="vy-chip"
                  type="button"
                  onClick={() => {
                    if (s.action === "lead") openLeadForm();
                    else if (s.action === "audit") openAuditForm();
                    else send(s.message);
                  }}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="vy-thread" role="log" aria-live="polite" ref={threadElRef}>
            {thread.map((item) => (
              <ThreadRow
                key={item.id}
                item={item}
                messages={messagesRef.current}
                onDownloadTalkToExpert={openLeadForm}
                onAuditSubmit={(url) => submitAudit(url, item.id)}
                auditing={auditing}
              />
            ))}
          </div>
        </div>

        <div className="vy-foot">
          <div className="vy-actions">
            <button className="vy-act" type="button" disabled={generating} onClick={generateBlueprint}>
              Generate Blueprint
            </button>
          </div>
          <div className={`vy-row${inputValue.trim() ? " has-text" : ""}`}>
            <input
              type="text"
              placeholder="Ask anything…"
              aria-label="Message Kaira"
              ref={inputElRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(inputValue);
                }
              }}
            />
            <button className="vy-send" type="button" aria-label="Send" onClick={() => send(inputValue)}>
              <span className="vy-wave" aria-hidden="true"><i /><i /><i /><i /></span>
              <SendArrow />
            </button>
          </div>
          <div className="vy-foot__cta">
            <Link
              className="vy-expert"
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                openLeadForm();
              }}
            >
              Talk to a HackTech expert →
            </Link>
            <span className="vy-foot__note">Powered by HackTech AI</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ThreadRow({
  item,
  messages,
  onDownloadTalkToExpert,
  onAuditSubmit,
  auditing,
}: {
  item: ThreadItem;
  messages: ChatMessage[];
  onDownloadTalkToExpert: () => void;
  onAuditSubmit: (url: string) => void;
  auditing: boolean;
}) {
  switch (item.kind) {
    case "user":
      return (
        <div className="vy-msg vy-msg--user">
          <span className="vy-msg__av">You</span>
          <div className="vy-msg__body">{item.text}</div>
        </div>
      );
    case "kaira":
      return (
        <div className="vy-msg vy-msg--kaira">
          <span className="vy-msg__av">K</span>
          <div className="vy-msg__body">
            {item.loading ? <span className="vy-dots"><i /><i /><i /></span> : item.text}
          </div>
        </div>
      );
    case "error":
      return (
        <div className="vy-err" role="alert">
          {item.text}
        </div>
      );
    case "blueprint-loading":
      return (
        <div className="vy-msg vy-msg--kaira">
          <span className="vy-msg__av">K</span>
          <div className="vy-msg__body">
            Designing your blueprint, architecture, stack, estimate &amp; proposal…{" "}
            <span className="vy-dots"><i /><i /><i /></span>
          </div>
        </div>
      );
    case "blueprint":
      return <BlueprintPanel bp={item.bp} onTalkToExpert={onDownloadTalkToExpert} />;
    case "lead-form":
      return <LeadForm recentMessages={messages} onDone={() => {}} />;
    case "audit-form":
      return <AuditForm submitting={auditing} onSubmit={onAuditSubmit} />;
    case "audit-loading":
      return (
        <div className="vy-msg vy-msg--kaira">
          <span className="vy-msg__av">K</span>
          <div className="vy-msg__body">
            Running a full audit on <b>{item.url}</b>, performance, SEO, accessibility… this takes ~15s.{" "}
            <span className="vy-dots"><i /><i /><i /></span>
          </div>
        </div>
      );
    case "audit-result":
      return <AuditResultPanel d={item.data} onTalkToExpert={onDownloadTalkToExpert} />;
    default:
      return null;
  }
}

declare global {
  interface Window {
    KairaChat?: { open: () => void; close: () => void; reset: () => void };
  }
}
