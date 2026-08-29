import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { limited } from "@/lib/rate-limit";
import { supabaseConfigured, sbSelect } from "@/lib/supabase-admin";

/* KAIRA Admin API (password-gated, server-side). Ported 1:1 from
   api/admin.js. Validates ADMIN_PASSWORD, then returns CRM data +
   analytics from Supabase (queried with the service_role key).
   Env: ADMIN_PASSWORD, SUPABASE_URL, SUPABASE_SERVICE_KEY */

// constant-time compare — avoids leaking the password via response timing
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  try {
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

type Lead = { id: string; tier?: string; created_at?: string; [k: string]: unknown };

export async function POST(req: NextRequest) {
  if (limited("admin", req.headers, 8, 60_000)) {
    return Response.json({ error: "Too many attempts — please wait a minute." }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    data = {};
  }
  const body = (data ?? {}) as { password?: string };

  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return Response.json({ error: "Admin isn't configured (set ADMIN_PASSWORD)." }, { status: 503 });
  if (!safeEqual((body.password || "").toString(), expected)) {
    await new Promise((r) => setTimeout(r, 500)); // deliberate delay slows brute-force
    return Response.json({ error: "Incorrect password." }, { status: 401 });
  }
  if (!supabaseConfigured()) return Response.json({ error: "Supabase isn't configured yet." }, { status: 503 });

  try {
    const leads = await sbSelect<Lead>("leads?select=*&order=created_at.desc&limit=300");

    const trend: { day: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
      trend.push({ day: d.slice(5), count: 0 });
    }
    const idx: Record<string, number> = {};
    trend.forEach((t, i) => (idx[t.day] = i));

    let stats: Record<string, number>;
    try {
      const [ev] = await sbSelect<Record<string, unknown>>("kaira_event_totals?select=*");
      const [ld] = await sbSelect<Record<string, unknown>>("kaira_lead_totals?select=*");
      const tr = await sbSelect<{ day: string; count: unknown }>("kaira_lead_trend?select=*");
      const n = (v: unknown) => Number(v) || 0;

      stats = {
        opens: n(ev.opens),
        messages: n(ev.messages),
        blueprints: n(ev.blueprints),
        audits: n(ev.audits),
        leads: n(ld.total),
        Hot: n(ld.hot),
        Warm: n(ld.warm),
        Cold: n(ld.cold),
      };
      tr.forEach((r) => {
        const d = String(r.day || "").slice(5, 10);
        if (idx[d] != null) trend[idx[d]].count = n(r.count);
      });
    } catch {
      // Fallback for a database where the migration has not been run yet.
      const events = await sbSelect<{ type: string; created_at: string }>(
        "events?select=type,created_at&order=created_at.desc&limit=10000"
      );
      stats = { opens: 0, messages: 0, blueprints: 0, audits: 0, leads: leads.length, Hot: 0, Warm: 0, Cold: 0 };
      events.forEach((e) => {
        if (e.type === "open") stats.opens++;
        else if (e.type === "message") stats.messages++;
        else if (e.type === "blueprint") stats.blueprints++;
        else if (e.type === "audit") stats.audits++;
      });
      leads.forEach((l) => {
        if (l.tier && stats[l.tier] != null) stats[l.tier]++;
      });
      leads.forEach((l) => {
        const d = (l.created_at || "").slice(5, 10);
        if (idx[d] != null) trend[idx[d]].count++;
      });
    }

    stats.conversion = stats.opens ? Math.round((stats.leads / stats.opens) * 100) : 0;

    return Response.json({ ok: true, leads, stats, trend });
  } catch {
    return Response.json({ error: "Couldn't load dashboard data." }, { status: 502 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
