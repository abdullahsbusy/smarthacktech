/* ============================================================
   Edge middleware — per-service SEO for /service?s=<key>
   Only touches this one route. The static service.html + service.js
   pair is untouched and keeps working exactly as before for the page
   body; this only rewrites the <head> tags a non-JS client (link-
   preview bots, some crawlers) would otherwise see as generic and
   identical across all seven services, and turns a missing/unknown
   ?s= into a real redirect instead of a silent, URL-unchanged fallback.
   ============================================================ */

export const config = { matcher: ["/service"] };

const SITE = "https://www.hacktechzone.com";

const SERVICE_META = {
  iot: {
    title: "Connecting devices. Delivering intelligence.",
    lead: "HackTech engineers IoT ecosystems that combine sensors, embedded hardware and cloud software to give you real-time visibility and automation over everything that moves.",
  },
  smarthome: {
    title: "Intelligent living begins here",
    lead: "Experience a home that responds to you automatically. From lighting and security to energy management and voice control, our automation makes everyday living simpler, safer and more efficient.",
  },
  ai: {
    title: "Turning artificial intelligence into business value",
    lead: "Artificial intelligence should do more than impress, it should solve problems. HackTech develops AI systems that automate processes, analyse data and measurably improve efficiency.",
  },
  security: {
    title: "Protect what matters most",
    lead: "HackTech designs intelligent security systems that combine surveillance, access control and monitoring to safeguard businesses, offices and residential spaces.",
  },
  software: {
    title: "Software built around your business",
    lead: "Whether you're launching a startup, digitising operations or scaling an enterprise, HackTech develops secure, scalable software tailored to your business goals.",
  },
  training: {
    title: "Learn from engineers building real technology",
    lead: "Gain practical skills through industry-focused training designed around real projects, modern tools and hands-on learning, taught by engineers who ship commercial products.",
  },
  sotms: {
    title: "SOTMS, smart fleet, one screen",
    lead: "Locally-built tracking devices and the SOTMS dashboard turn thousands of vehicle signals into one calm, real-time command centre.",
  },
};

function escHtml(s) {
  return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}
function escAttr(s) {
  return escHtml(s).replace(/"/g, "&quot;");
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("s");
  const meta = key ? SERVICE_META[key] : null;

  // no ?s=, or one that doesn't match a real service — send to Solutions
  // instead of silently rendering the generic fallback at the /service URL.
  if (!meta) {
    return Response.redirect(new URL("/solutions", url), 302);
  }

  try {
    const origin = await fetch(new URL("/service.html", url));
    if (!origin.ok) return fetch(request);
    let html = await origin.text();

    const title = escHtml(meta.title) + ", HackTech";
    const description = escAttr(meta.lead);
    const canonical = `${SITE}/service?s=${encodeURIComponent(key)}`;

    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${description}">`
      )
      .replace(
        /<link rel="canonical" href="[^"]*">/,
        `<link rel="canonical" href="${canonical}">`
      )
      .replace(
        /<meta property="og:title" content="[^"]*">/,
        `<meta property="og:title" content="${title}">`
      )
      .replace(
        /<meta property="og:description" content="[^"]*">/,
        `<meta property="og:description" content="${description}">`
      );

    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    // anything goes wrong fetching/rewriting — fall through to the normal,
    // already-working static + client-JS path rather than breaking the page.
    return fetch(request);
  }
}
