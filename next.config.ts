import type { NextConfig } from "next";

// Ported 1:1 from the original site's vercel.json (headers + redirects) —
// Next.js's own config is the equivalent place for these on this stack.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:; connect-src 'self' https://va.vercel-scripts.com https://vercel-insights.com https://*.vercel-insights.com; frame-ancestors 'self'; base-uri 'self'",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/(.*).(css|js)",
        headers: [{ key: "Cache-Control", value: "public, max-age=600, stale-while-revalidate=86400" }],
      },
      {
        source: "/(.*).(jpg|jpeg|png|webp|svg|ico|mp4|webm|woff2|glb)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/demo", destination: "/portfolio", permanent: true },
      { source: "/demo.html", destination: "/portfolio", permanent: true },
      { source: "/tech", destination: "/", permanent: true },
      { source: "/tech.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
