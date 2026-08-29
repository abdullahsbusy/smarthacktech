import type { MetadataRoute } from "next";

// Ported 1:1 from the original static sitemap.xml.
const SITE_URL = "https://www.hacktechzone.com";
const LAST_MOD = "2026-07-22";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/solutions", changeFrequency: "monthly", priority: 0.9 },
    { path: "/portfolio", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: LAST_MOD,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
