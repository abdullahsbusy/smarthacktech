import { NextRequest } from "next/server";
import { limited } from "@/lib/rate-limit";
import { sbInsert } from "@/lib/supabase-admin";

/* KAIRA Website Analyzer. Ported 1:1 from api/kaira-audit.js. Runs Google
   PageSpeed Insights (Lighthouse) on a URL, then has KAIRA write a
   professional audit (verdict + prioritized fixes).
   Optional env PAGESPEED_API_KEY for higher rate limits. */

const AUDIT_PROMPT = `You are KAIRA, HackTech's AI Solutions Architect, delivering a website audit. Given the PageSpeed/Lighthouse data, respond as JSON ONLY:
{
  "verdict": string,                       // 2 honest sentences on the overall state
  "recommendations": [ { "area": "Performance"|"SEO"|"Accessibility"|"UX/UI"|"Mobile"|"Security", "text": string } ]  // 5-8, specific + actionable, prioritized by impact
}
Be concrete and practical (not generic). Output ONLY the JSON object.`;

function pct(s: number | null | undefined) {
  return s == null ? null : Math.round(s * 100);
}

type LighthouseAudit = { score?: number; title?: string; displayValue?: string };
type LighthouseResult = {
  finalUrl?: string;
  categories?: Record<string, { score?: number }>;
  audits?: Record<string, LighthouseAudit>;
};

// matches the original vercel.json's functions["api/kaira-audit.js"].maxDuration
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (limited("audit", req.headers, 5, 60_000)) {
    return Response.json({ error: "Too many requests — please slow down." }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    data = {};
  }
  const body = (data ?? {}) as { url?: string };

  let url = (body.url || "").trim();
  if (!url) return Response.json({ error: "Please enter a website URL." }, { status: 400 });
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  if (!/^https?:\/\/[^\s.]+\.[^\s]+/i.test(url)) {
    return Response.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  sbInsert("events", { type: "audit" });

  const psiKey = process.env.PAGESPEED_API_KEY;
  const psiUrl =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" +
    encodeURIComponent(url) +
    "&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices" +
    (psiKey ? "&key=" + psiKey : "");

  let psi: { lighthouseResult?: LighthouseResult };
  try {
    const r = await fetch(psiUrl);
    if (!r.ok) {
      return Response.json(
        {
          error: psiKey
            ? "Couldn't analyze that URL — check it's public and try again."
            : "Website Analyzer needs a PageSpeed API key. Ask HackTech to configure it.",
        },
        { status: 502 }
      );
    }
    psi = await r.json();
  } catch {
    return Response.json({ error: "Couldn't reach the analyzer right now. Please retry." }, { status: 502 });
  }

  const lr = psi.lighthouseResult || {};
  const cats = lr.categories || {};
  const aud = lr.audits || {};
  const scores = {
    performance: pct(cats.performance?.score),
    accessibility: pct(cats.accessibility?.score),
    seo: pct(cats.seo?.score),
    bestPractices: pct(cats["best-practices"]?.score),
  };
  const metrics = {
    lcp: aud["largest-contentful-paint"]?.displayValue,
    fcp: aud["first-contentful-paint"]?.displayValue,
    tbt: aud["total-blocking-time"]?.displayValue,
    cls: aud["cumulative-layout-shift"]?.displayValue,
    si: aud["speed-index"]?.displayValue,
  };
  const issues = Object.values(aud)
    .filter((a): a is Required<Pick<LighthouseAudit, "score" | "title">> => typeof a?.score === "number" && a.score < 0.9 && !!a.title)
    .sort((a, b) => a.score - b.score)
    .slice(0, 6)
    .map((a) => ({ title: a.title }));

  let verdict = "";
  let recommendations: { area: string; text: string }[] = [];
  const key = process.env.OPENAI_API_KEY;
  if (key) {
    try {
      const base = (process.env.OPENAI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
      const model = process.env.OPENAI_MODEL || "openai/gpt-oss-120b";
      const summary =
        "URL: " + (lr.finalUrl || url) +
        "\nScores (0-100): Performance " + scores.performance + ", Accessibility " + scores.accessibility +
        ", SEO " + scores.seo + ", Best Practices " + scores.bestPractices +
        "\nMetrics: LCP " + metrics.lcp + ", FCP " + metrics.fcp + ", TBT " + metrics.tbt + ", CLS " + metrics.cls +
        "\nFlagged checks: " + issues.map((i) => i.title).join("; ");
      const gr = await fetch(base + "/chat/completions", {
        method: "POST",
        headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: AUDIT_PROMPT },
            { role: "user", content: summary },
          ],
        }),
      });
      if (gr.ok) {
        const gj = await gr.json();
        const txt = gj?.choices?.[0]?.message?.content || "{}";
        const parsed = JSON.parse(txt);
        verdict = parsed.verdict || "";
        recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : [];
      }
    } catch {
      // narrative optional — scores still returned
    }
  }

  return Response.json({ url: lr.finalUrl || url, scores, metrics, issues, verdict, recommendations });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
