"use client";

import { useState, type FormEvent } from "react";
import type { AuditResult } from "@/lib/kaira/types";

/* Website Analyzer: URL-entry card + results card. Ported 1:1 from
   veyra.js's openAuditForm / submitAudit / renderAudit. */

export function AuditForm({ onSubmit, submitting }: { onSubmit: (url: string) => void; submitting: boolean }) {
  const [url, setUrl] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <div className="vy-lead">
      <div className="vy-bp__eyebrow">🔍 Website Audit</div>
      <div className="vy-lead__t">Analyze any website</div>
      <p className="vy-lead__s">
        Enter a URL, KAIRA checks performance, SEO, accessibility &amp; best-practices, then gives professional fixes.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="vy-af-row">
          <input
            name="url"
            placeholder="example.com"
            aria-label="Website URL"
            inputMode="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={submitting}
          />
          <button className="vy-lf-submit" type="submit" style={{ margin: 0, whiteSpace: "nowrap" }} disabled={submitting}>
            {submitting ? "Analyzing…" : "Analyze"}
          </button>
        </div>
      </form>
    </div>
  );
}

function scoreClass(n: number) {
  return n >= 90 ? "good" : n >= 50 ? "avg" : "poor";
}

function ScoreRing({ n, label }: { n: number | null | undefined; label: string }) {
  if (n == null) return null;
  return (
    <div className={`vy-score vy-score--${scoreClass(n)}`}>
      <b>{n}</b>
      <span>{label}</span>
    </div>
  );
}

export function AuditResultPanel({ d, onTalkToExpert }: { d: AuditResult; onTalkToExpert: () => void }) {
  const sc = d.scores || {};
  const m = d.metrics || {};
  const metricEntries: [string, string | undefined][] = [
    ["LCP", m.lcp],
    ["FCP", m.fcp],
    ["Blocking", m.tbt],
    ["CLS", m.cls],
    ["Speed Index", m.si],
  ].filter(([, v]) => v) as [string, string | undefined][];

  return (
    <div className="vy-bp">
      <div className="vy-bp__head">
        <div className="vy-bp__eyebrow">🔍 Website Audit</div>
        <h3 className="vy-bp__title" style={{ fontSize: 14, wordBreak: "break-all" }}>{d.url}</h3>
        {d.verdict && <p className="vy-bp__sum">{d.verdict}</p>}
      </div>

      <div className="vy-scores">
        <ScoreRing n={sc.performance} label="Performance" />
        <ScoreRing n={sc.accessibility} label="Accessibility" />
        <ScoreRing n={sc.seo} label="SEO" />
        <ScoreRing n={sc.bestPractices} label="Best Practices" />
      </div>

      {metricEntries.length > 0 && (
        <div className="vy-bp__card">
          <div className="vy-bp__label">Core Web Metrics</div>
          <div className="vy-kvg">
            {metricEntries.map(([k, v]) => (
              <div className="vy-kv" key={k}><b>{k}</b><span>{v}</span></div>
            ))}
          </div>
        </div>
      )}

      {!!d.recommendations?.length && (
        <div className="vy-bp__card">
          <div className="vy-bp__label">KAIRA Recommendations</div>
          <ul className="vy-list">
            {d.recommendations.map((r, i) => (
              <li key={i}>
                <b style={{ color: "var(--vy-cyan)" }}>{r.area}:</b> {r.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!!d.issues?.length && (
        <div className="vy-bp__card">
          <div className="vy-bp__label">Flagged Checks</div>
          <ul className="vy-list">
            {d.issues.map((i, idx) => <li key={idx}>{i.title}</li>)}
          </ul>
        </div>
      )}

      <div className="vy-bp__act">
        <button className="vy-bp__btn vy-bp__btn--ai" type="button" onClick={onTalkToExpert}>
          Talk to an expert →
        </button>
      </div>
    </div>
  );
}
