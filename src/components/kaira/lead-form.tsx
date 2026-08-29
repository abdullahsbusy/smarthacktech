"use client";

import { useState, type FormEvent } from "react";
import type { ChatMessage } from "@/lib/kaira/types";

/* Book-a-consultation card. Ported 1:1 from veyra.js's leadFormHTML /
   openLeadForm / submitLead. */

export function LeadForm({ recentMessages, onDone }: { recentMessages: ChatMessage[]; onDone: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ tier: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => {
      payload[k] = String(v);
    });
    payload.context = recentMessages
      .slice(-6)
      .map((m) => (m.role === "user" ? "User: " : "Kaira: ") + m.content)
      .join("\n");

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/kaira-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not submit.");
      setDone({ tier: data.tier });
      onDone();
    } catch (err) {
      setError((err as Error)?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="vy-lead">
        <div className="vy-lead__done">
          <span className={`vy-tier vy-tier--${done.tier}`}>{done.tier} lead</span>
          <div className="vy-lead__t" style={{ marginTop: 10 }}>You&rsquo;re in good hands.</div>
          <p className="vy-lead__s">KAIRA has briefed the HackTech team, a specialist will reach out shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vy-lead">
      <div className="vy-lead__head">
        <div className="vy-bp__eyebrow">Book a Consultation</div>
        <div className="vy-lead__t">Let&rsquo;s make it real</div>
        <p className="vy-lead__s">Share your details, KAIRA will brief a HackTech specialist on your project.</p>
      </div>
      <form className="vy-lead__form" onSubmit={onSubmit}>
        <input
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
        />
        <div className="vy-lf-row">
          <input name="name" placeholder="Full name" required />
          <input name="email" type="email" placeholder="Email" required />
        </div>
        <div className="vy-lf-row">
          <input name="company" placeholder="Company (optional)" aria-label="Company" autoComplete="organization" />
          <input name="industry" placeholder="Industry (optional)" aria-label="Industry" />
        </div>
        <div className="vy-lf-row">
          <select name="budget" aria-label="Budget range" defaultValue="">
            <option value="">Budget range</option>
            <option>Under PKR 100k</option>
            <option>PKR 100k–500k</option>
            <option>PKR 500k–2m</option>
            <option>PKR 2m+ (enterprise)</option>
          </select>
          <select name="timeline" aria-label="Timeline" defaultValue="">
            <option value="">Timeline</option>
            <option>ASAP / this month</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <button className="vy-lf-submit" type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send to HackTech"}
        </button>
        <div className={`vy-lf-msg${error ? " vy-err" : ""}`}>{error}</div>
      </form>
    </div>
  );
}
