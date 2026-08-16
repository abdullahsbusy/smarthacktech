/* ============================================================
   Per-service SEO for /service?s=<key> (see vercel.json rewrite)
   Reads the static service.html straight off disk and swaps in the
   right title/description/canonical/OG for the requested service, so
   non-JS clients (link-preview bots) see the correct per-service card
   instead of the generic one that service.js only fixes client-side.
   A missing/unknown ?s= redirects to /solutions instead of silently
   rendering the fallback at a URL that looks like it worked.
   Reads the file directly (no fetch/redirect involved) specifically
   to avoid looping through the site's cleanUrls .html->clean-URL
   redirect, which an Edge Middleware fetching /service.html would
   otherwise follow straight back into this same route.
   ============================================================ */

const fs = require("fs");
const path = require("path");

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

module.exports = async function handler(req, res) {
  try {
    const key = typeof req.query.s === "string" ? req.query.s : null;
    const meta = key ? SERVICE_META[key] : null;

    if (!meta) {
      res.setHeader("Location", "/solutions");
      return res.status(302).end();
    }

    const html = fs.readFileSync(path.join(process.cwd(), "service.html"), "utf8");

    const title = escHtml(meta.title) + ", HackTech";
    const description = escAttr(meta.lead);
    const canonical = `${SITE}/service?s=${encodeURIComponent(key)}`;

    const out = html
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

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=600, stale-while-revalidate=86400");
    return res.status(200).send(out);
  } catch (e) {
    // anything unexpected — never surface a 500 for a page visitors rely on,
    // fall back to the always-working generic Solutions page instead
    res.setHeader("Location", "/solutions");
    return res.status(302).end();
  }
};
