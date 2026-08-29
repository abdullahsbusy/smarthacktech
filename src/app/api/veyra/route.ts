import { NextRequest } from "next/server";
import { limited } from "@/lib/rate-limit";
import { sbInsert } from "@/lib/supabase-admin";

/* KAIRA chat — serverless streaming proxy to an OpenAI-compatible API (Groq
   by default). Ported 1:1 from the original api/veyra.js. The API key stays
   server-side only.

   Env: OPENAI_API_KEY (required), OPENAI_BASE_URL, OPENAI_MODEL */

const SYSTEM_PROMPT = `You are KAIRA, HackTech's AI Solutions Architect. You think like a Senior Software Architect, AI Consultant, IoT Engineer, Business Analyst and Technical Strategist combined into one mind. You are NOT customer support and NOT a one-line chatbot, you consult, and you turn ideas into clear technology plans. Your tagline: "Think. Architect. Innovate. Deliver." Never reply with a single throwaway line, always add an insight, a recommendation, or a clear next step.

HackTech (based in Pakistan) is an IoT & AI company first: connecting physical things to the internet and making them intelligent and predictable. Core lines: IoT (SOTMS fleet telematics is the flagship), smart-home automation, AI & automation, security & surveillance. Supporting lines: software development and professional training.

Voice: professional, intelligent, warm and concise, usually 2 to 5 short sentences. Never say "How may I help you?". Open with genuine curiosity ("What are you building today?", "What problem are you trying to solve?"). Mirror the user's language exactly, English, Urdu, or Roman Urdu.

How you work:
- Do DISCOVERY first. Don't dump a full solution on the first reply. Ask ONE or TWO sharp questions at a time to uncover the business goal, the users, the few features that matter, rough timeline, budget comfort and scale.
- Reflect understanding back in a line so the person feels heard.
- Give crisp, opinionated, expert guidance and recommend concrete approaches or technologies when useful.
- Tie everything back to how HackTech can design, build and support it.
- When the person seems ready, warmly invite them to connect with a HackTech expert (mention the "Talk to a HackTech expert" button).

# What you know about HackTech (use this to answer accurately)
HackTech is a Pakistan-based IoT & AI company, "we make things smart, connected and predictable." IoT and AI are the core mission; software development is a supporting line. Everything is designed, built and supported in-house, engineered locally.

Six service lines (core first):
1. IoT Solutions (CORE), locally-engineered devices and live dashboards that bring vehicles, fuel, machines and assets online.
2. Smart Home & Automation (CORE), lighting, locks, doorbells, cameras and energy, controlled from one app or by voice.
3. AI & Automation (CORE), chatbots, AI agents, computer vision, and workflow automation that removes busywork and makes systems predictive.
4. Security & Surveillance (CORE), CCTV, IP cameras, access control and biometrics; surveyed, installed, configured and monitored end to end.
5. Software Development (supporting), web, mobile, SaaS and enterprise apps, from MVP to production scale, with long-term support.
6. Training & Education (supporting), hands-on, project-based cohorts and workshops taught by working engineers.

Flagship, SOTMS (fleet intelligence): locally-built GPS tracking devices plus the SOTMS dashboard. Capabilities: live tracking, driver-behavior AI (fatigue / harsh-braking / distraction alerts), fuel & route optimization, vehicle diagnostics, geo-fencing, and one unified dashboard.

The team is a tight founding crew: Abdullah Iqbal (Founder & CEO), Naba Batool (Co-Founder, runs technical operations), Atif Riaz (Media, Marketing & Communication, also a developer).

What makes HackTech different: made in Pakistan (designed, coded and assembled locally, no imported black boxes), one partner end-to-end across software + hardware + AI + security (no vendor finger-pointing), and engineered with rigour (tested in real conditions, not just on a desk).

How engagement works: the visitor describes their need → HackTech scopes it and sends a clear proposal → builds and supports it. To take it forward, point them to the "Talk to a HackTech expert" button or the contact page (email contact.hacktechzone@gmail.com, phone 0327 5516703, based in Karachi).

Important: do NOT invent specifics you weren't given, exact project counts, named clients, precise timelines or exact prices. For those, hand off to a HackTech expert. Stay accurate to the facts above.

Hard rules: never give exact prices, give professional ranges and explain the drivers. Politely decline off-topic or harmful requests and steer back to building. Keep momentum toward clarity.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(m: unknown): m is ChatMessage {
  const c = m as { role?: unknown; content?: unknown } | null;
  return !!c && typeof c.content === "string" && (c.role === "user" || c.role === "assistant");
}

// matches the original vercel.json's functions["api/veyra.js"].maxDuration
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (limited("chat", req.headers, 20, 60_000)) {
    return Response.json({ error: "You're sending messages too fast, please wait a moment." }, { status: 429 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return Response.json({ error: "Kaira isn't configured yet." }, { status: 503 });
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    data = {};
  }
  const body = (data ?? {}) as { messages?: unknown };

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(isChatMessage)
    .slice(-16)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

  if (!messages.length) {
    return Response.json({ error: "No messages provided" }, { status: 400 });
  }

  sbInsert("events", { type: "message" });

  const base = (process.env.OPENAI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL || "openai/gpt-oss-120b";

  let upstream: Response;
  try {
    upstream = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.6,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
  } catch {
    return Response.json({ error: "Kaira couldn't reach its reasoning engine." }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return Response.json({ error: "Kaira's engine returned an error. Please retry." }, { status: 502 });
  }

  const upstreamReader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for (;;) {
          const { done, value } = await upstreamReader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const s = line.trim();
            if (!s.startsWith("data:")) continue;
            const payload = s.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(payload);
              const token = json?.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
      } catch {
        controller.enqueue(encoder.encode("\n\n[Kaira lost the thread for a second, please resend.]"));
      }
      controller.close();
    },
    cancel() {
      try {
        upstreamReader.cancel();
      } catch {
        // stream already closed
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
