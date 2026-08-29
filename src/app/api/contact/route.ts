import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";
import { limited } from "@/lib/rate-limit";

/* HackTech — contact/quote backend. POST /api/contact emails the lead via
   Resend. Ported from the original api/contact.js, same env vars and
   behavior, validation now via the shared Zod schema instead of hand-
   rolled regex checks. Until RESEND_API_KEY is set, returns 503 and the
   client falls back to a mailto: link. */

function escapeHtml(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

export async function POST(req: NextRequest) {
  // Throttle before doing any work: every accepted request costs an
  // outbound Resend email, so an unthrottled endpoint is a spam/billing
  // amplifier. The honeypot below only catches bots that fill hidden
  // fields, not a rate control on its own.
  if (limited("contact", req.headers, 5, 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages — please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Please check the form and try again." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // honeypot: bots fill hidden fields, humans don't — silently accept & drop.
  if (data._gotcha) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "contact.hacktechzone@gmail.com";
  const from = process.env.CONTACT_FROM || "HackTech Website <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Email service not configured yet." }, { status: 503 });
  }

  const subject = `New enquiry — ${data.service || "HackTech"} — ${data.name}`;
  const html =
    "<h2>New website enquiry</h2>" +
    `<p><b>Name:</b> ${escapeHtml(data.name)}</p>` +
    `<p><b>Email:</b> ${escapeHtml(data.email)}</p>` +
    (data.company ? `<p><b>Company:</b> ${escapeHtml(data.company)}</p>` : "") +
    (data.service ? `<p><b>Service:</b> ${escapeHtml(data.service)}</p>` : "") +
    `<p><b>Message:</b></p><p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>` +
    "<hr><p style='color:#888;font-size:12px'>Sent from the HackTech website contact form.</p>";

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        html,
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("Resend error", r.status, detail);
      return NextResponse.json(
        { ok: false, error: `Could not send right now. Please email ${to}.` },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact handler error", err);
    return NextResponse.json(
      { ok: false, error: `Unexpected error. Please email ${to}.` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
