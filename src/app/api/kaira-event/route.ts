import { NextRequest } from "next/server";
import { limited } from "@/lib/rate-limit";
import { sbInsert } from "@/lib/supabase-admin";

/* KAIRA lightweight event beacon (analytics). Ported 1:1 from
   api/kaira-event.js. The widget fires { type: "open" } when the panel
   opens. Only whitelisted types are stored. */

const ALLOWED: Record<string, true> = { open: true };

export async function POST(req: NextRequest) {
  if (limited("event", req.headers, 30, 60_000)) return new Response(null, { status: 204 });

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    data = {};
  }
  const body = (data ?? {}) as { type?: string };
  const type = (body.type || "").toString();
  if (!ALLOWED[type]) return new Response(null, { status: 204 });

  await sbInsert("events", { type });
  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
