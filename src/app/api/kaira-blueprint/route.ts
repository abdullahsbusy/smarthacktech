import { NextRequest } from "next/server";
import { limited } from "@/lib/rate-limit";
import { sbInsert } from "@/lib/supabase-admin";

/* KAIRA Blueprint engine. Ported 1:1 from api/kaira-blueprint.js. Turns the
   conversation into a structured project blueprint: architecture, stack,
   security, scalability, estimation, proposal. Returns strict JSON. */

const BLUEPRINT_PROMPT = `You are KAIRA, HackTech's senior AI Solutions Architect. Based on the conversation so far, produce a complete, realistic project blueprint as a SINGLE JSON object — no prose, no markdown, JSON only.

Use this exact shape:
{
  "projectName": string,
  "summary": string,
  "architecture": [ { "layer": string, "tech": string, "note": string } ],   // 4–7 layers, top-to-bottom flow order
  "stack": { "frontend": string, "backend": string, "database": string, "ai": string, "infrastructure": string },
  "security": [string],            // 3–5 concrete recommendations
  "scalability": [string],         // 3–5 concrete considerations
  "estimation": {
    "complexityScore": number,     // integer 1–10
    "complexityLabel": string,     // "Low" | "Moderate" | "High" | "Very High"
    "timeline": string,            // e.g. "8–12 weeks"
    "teamSize": string,            // e.g. "3–4 specialists"
    "budgetRange": string,         // a RANGE, never an exact figure
    "phases": [ { "name": string, "weeks": string, "focus": string } ],  // 3–5
    "risks": [string]              // 2–4
  },
  "proposal": {
    "overview": string,
    "scope": [string],             // 4–7
    "deliverables": [string],      // 4–7
    "nextSteps": [string]          // 3
  }
}

Rules: make senior-level, realistic assumptions where the user was vague. Recommend a modern, pragmatic stack suited to the project. budgetRange must be a range and reflect the complexity (never a single exact number). Tie it to what HackTech (Pakistan) can build. Output ONLY the JSON object.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(m: unknown): m is ChatMessage {
  const c = m as { role?: unknown; content?: unknown } | null;
  return !!c && typeof c.content === "string" && (c.role === "user" || c.role === "assistant");
}

function sanitize(messages: unknown): ChatMessage[] {
  return (Array.isArray(messages) ? messages : [])
    .filter(isChatMessage)
    .slice(-24)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));
}

// matches the original vercel.json's functions["api/kaira-blueprint.js"].maxDuration
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (limited("blueprint", req.headers, 8, 60_000)) {
    return Response.json({ error: "Too many requests — please slow down." }, { status: 429 });
  }
  const key = process.env.OPENAI_API_KEY;
  if (!key) return Response.json({ error: "KAIRA isn't configured yet." }, { status: 503 });

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    data = {};
  }
  const body = (data ?? {}) as { messages?: unknown };

  const messages = sanitize(body.messages);
  if (!messages.length) {
    return Response.json({ error: "Tell KAIRA a little about your project first." }, { status: 400 });
  }

  sbInsert("events", { type: "blueprint" });

  const base = (process.env.OPENAI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL || "openai/gpt-oss-120b";

  try {
    const r = await fetch(base + "/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: BLUEPRINT_PROMPT },
          ...messages,
          { role: "user", content: "Generate the final project blueprint JSON now, based on everything above." },
        ],
      }),
    });
    if (!r.ok) return Response.json({ error: "KAIRA couldn't compile the blueprint. Please retry." }, { status: 502 });
    const j = await r.json();
    const text = j?.choices?.[0]?.message?.content || "{}";
    let bp: unknown;
    try {
      bp = JSON.parse(text);
    } catch {
      return Response.json({ error: "Blueprint came back malformed — please retry." }, { status: 502 });
    }
    return Response.json(bp);
  } catch {
    return Response.json({ error: "KAIRA couldn't reach its reasoning engine." }, { status: 502 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
