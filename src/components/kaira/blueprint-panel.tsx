"use client";

import { useState } from "react";
import Link from "next/link";
import type { Blueprint } from "@/lib/kaira/types";

/* Renders a generated project Blueprint as a live panel, with PDF download
   and copy-to-text actions. Ported 1:1 from veyra.js's buildBlueprintHTML /
   blueprintToText / downloadPdf. */

declare global {
  interface Window {
    jspdf?: { jsPDF: new (opts: { unit: string; format: string }) => JsPdfDoc };
  }
}
type JsPdfDoc = {
  setFont(name: string, style: string): void;
  setFontSize(n: number): void;
  splitTextToSize(text: string, width: number): string[];
  text(text: string, x: number, y: number): void;
  addPage(): void;
  save(filename: string): void;
};

function blueprintToText(bp: Blueprint) {
  const e = bp.estimation || {};
  const pr = bp.proposal || {};
  const st = bp.stack || {};
  const L = (a?: string[]) => (a || []).map((x) => "  - " + x).join("\n");
  return (
    "PROJECT BLUEPRINT, " + (bp.projectName || "") + "\nby KAIRA · HackTech AI Solutions Architect\n\n" +
    (bp.summary || "") + "\n\n== ARCHITECTURE ==\n" +
    (bp.architecture || []).map((n) => "  - " + n.layer + ": " + n.tech + ", " + n.note).join("\n") +
    "\n\n== TECHNOLOGY STACK ==\n  - Frontend: " + st.frontend + "\n  - Backend: " + st.backend +
    "\n  - Database: " + st.database + "\n  - AI: " + st.ai + "\n  - Infrastructure: " + st.infrastructure +
    "\n\n== SECURITY ==\n" + L(bp.security) + "\n\n== SCALABILITY ==\n" + L(bp.scalability) +
    "\n\n== ESTIMATION ==\n  - Complexity: " + e.complexityScore + "/10 (" + e.complexityLabel + ")\n  - Timeline: " +
    e.timeline + "\n  - Team: " + e.teamSize + "\n  - Budget range: " + e.budgetRange + "\n  Phases:\n" +
    (e.phases || []).map((p) => "  - " + p.name + " (" + p.weeks + "): " + p.focus).join("\n") +
    "\n  Risks:\n" + L(e.risks) + "\n\n== PROPOSAL ==\n" + (pr.overview || "") + "\n  Scope:\n" + L(pr.scope) +
    "\n  Deliverables:\n" + L(pr.deliverables) + "\n  Next steps:\n" + L(pr.nextSteps) +
    "\n\nPrepared by KAIRA, HackTech. contact.hacktechzone@gmail.com"
  );
}

function loadJsPdf(cb: () => void) {
  if (window.jspdf && window.jspdf.jsPDF) return cb();
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js";
  s.integrity = "sha384-en/ztfPSRkGfME4KIm05joYXynqzUgbsG5nMrj/xEFAHXkeZfO3yMK8QQ+mP7p1/";
  s.crossOrigin = "anonymous";
  s.onload = cb;
  s.onerror = () => cb();
  document.body.appendChild(s);
}

function downloadPdf(bp: Blueprint) {
  loadJsPdf(() => {
    const J = window.jspdf?.jsPDF;
    if (!J) {
      alert("PDF library couldn't load, try Copy instead.");
      return;
    }
    const doc = new J({ unit: "pt", format: "a4" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const margin = 42;
    let y = margin;
    const lines = doc.splitTextToSize(blueprintToText(bp), 515);
    lines.forEach((ln) => {
      if (y > 790) {
        doc.addPage();
        y = margin;
      }
      doc.text(ln, margin, y);
      y += 14;
    });
    doc.save((bp.projectName || "kaira-blueprint").replace(/[^\w]+/g, "-").toLowerCase().slice(0, 40) + "-blueprint.pdf");
  });
}

export function BlueprintPanel({ bp, onTalkToExpert }: { bp: Blueprint; onTalkToExpert: () => void }) {
  const [copied, setCopied] = useState(false);
  const st = bp.stack || {};
  const e = bp.estimation || {};
  const pr = bp.proposal || {};
  const pct = Math.max(0, Math.min(10, +(e.complexityScore || 0))) * 10;

  return (
    <div className="vy-bp">
      <div className="vy-bp__head">
        <div className="vy-bp__eyebrow">Project Blueprint</div>
        <h3 className="vy-bp__title">{bp.projectName || "Your Project"}</h3>
        <p className="vy-bp__sum">{bp.summary}</p>
      </div>

      <div className="vy-bp__card">
        <div className="vy-bp__label">System Architecture</div>
        <div className="vy-diagram">
          {(bp.architecture || []).map((n, i) => (
            <div key={i}>
              <div className="vy-node" style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}>
                <span className="vy-node__dot" />
                <div>
                  <div className="vy-node__layer">{n.layer}</div>
                  <div className="vy-node__tech">{n.tech}</div>
                  <div className="vy-node__note">{n.note}</div>
                </div>
              </div>
              {i < (bp.architecture?.length || 0) - 1 && <div className="vy-flow" />}
            </div>
          ))}
        </div>
      </div>

      <div className="vy-bp__card">
        <div className="vy-bp__label">Technology Stack</div>
        <div className="vy-kvg">
          <div className="vy-kv"><b>Frontend</b><span>{st.frontend}</span></div>
          <div className="vy-kv"><b>Backend</b><span>{st.backend}</span></div>
          <div className="vy-kv"><b>Database</b><span>{st.database}</span></div>
          <div className="vy-kv"><b>AI</b><span>{st.ai}</span></div>
          <div className="vy-kv"><b>Infrastructure</b><span>{st.infrastructure}</span></div>
        </div>
      </div>

      <div className="vy-bp__card">
        <div className="vy-bp__label">Security</div>
        <ul className="vy-list">{(bp.security || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>

      <div className="vy-bp__card">
        <div className="vy-bp__label">Scalability</div>
        <ul className="vy-list">{(bp.scalability || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>

      <div className="vy-bp__card">
        <div className="vy-bp__label">Project Estimation</div>
        <div className="vy-kpis">
          <div className="vy-kpi"><b>{e.complexityScore}/10</b><span>{e.complexityLabel}</span></div>
          <div className="vy-kpi"><b>{e.timeline}</b><span>Timeline</span></div>
          <div className="vy-kpi"><b>{e.teamSize}</b><span>Team</span></div>
        </div>
        <div className="vy-gauge"><i style={{ width: `${pct}%` }} /></div>
        <div className="vy-kv" style={{ marginBottom: 12 }}>
          <b>Indicative Budget Range</b><span>{e.budgetRange}</span>
        </div>
        <div className="vy-bp__label">Phases</div>
        {(e.phases || []).map((p, i) => (
          <div className="vy-phase" key={i}>
            <span className="vy-phase__n">{i + 1}</span>
            <div>
              <div className="vy-phase__t">{p.name} <span className="vy-phase__w">· {p.weeks}</span></div>
              <div className="vy-phase__f">{p.focus}</div>
            </div>
          </div>
        ))}
        <div className="vy-bp__label" style={{ marginTop: 12 }}>Risk Factors</div>
        <ul className="vy-list">{(e.risks || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
      </div>

      <div className="vy-bp__card">
        <div className="vy-bp__label">Proposal</div>
        <p className="vy-bp__sum" style={{ marginTop: 0 }}>{pr.overview}</p>
        <div className="vy-bp__label" style={{ marginTop: 10 }}>Scope</div>
        <ul className="vy-list">{(pr.scope || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
        <div className="vy-bp__label" style={{ marginTop: 10 }}>Deliverables</div>
        <ul className="vy-list">{(pr.deliverables || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
        <div className="vy-bp__label" style={{ marginTop: 10 }}>Next Steps</div>
        <ul className="vy-list">{(pr.nextSteps || []).map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>

      <div className="vy-bp__act">
        <button className="vy-bp__btn vy-bp__btn--pdf" type="button" onClick={() => downloadPdf(bp)}>
          ⬇ Download PDF
        </button>
        <button
          className="vy-bp__btn vy-bp__btn--copy"
          type="button"
          onClick={() => {
            if (navigator.clipboard) navigator.clipboard.writeText(blueprintToText(bp));
            setCopied(true);
          }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
        <Link
          className="vy-bp__btn vy-bp__btn--ai"
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            onTalkToExpert();
          }}
        >
          Talk to an expert →
        </Link>
      </div>
    </div>
  );
}
