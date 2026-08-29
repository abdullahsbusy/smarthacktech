import type { ReactNode } from "react";

/* Inline SVG glyphs + command list. Ported 1:1 from palette.js's ic()/I/ITEMS. */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const I = {
  home: (
    <Icon>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </Icon>
  ),
  grid: (
    <Icon>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </Icon>
  ),
  folder: (
    <Icon>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Icon>
  ),
  users: (
    <Icon>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M16 8.5a2.8 2.8 0 1 1 2 4.8c2 .6 3.3 2 3.8 4.2" />
    </Icon>
  ),
  mail: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Icon>
  ),
  code: (
    <Icon>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Icon>
  ),
  spark: (
    <Icon>
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
      <path d="M12 8l1.4 2.6L16 12l-2.6 1.4L12 16l-1.4-2.6L8 12l2.6-1.4z" />
    </Icon>
  ),
  chip: (
    <Icon>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 3l8 3.5v5c0 4.6-3.4 7.8-8 9-4.6-1.2-8-4.4-8-9v-5z" />
      <path d="M9.5 12l1.8 1.8 3.4-3.6" />
    </Icon>
  ),
  grad: (
    <Icon>
      <path d="M12 4 2 9l10 5 10-5-10-5z" />
      <path d="M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </Icon>
  ),
  chat: (
    <Icon>
      <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
    </Icon>
  ),
  moon: (
    <Icon>
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </Icon>
  ),
};

export type PaletteAction = "kaira" | "whatsapp" | "theme" | "email";

export type PaletteItem = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  href?: string;
  action?: PaletteAction;
};

export const PALETTE_ITEMS: PaletteItem[] = [
  // pages
  { title: "Home", subtitle: "We make things smart, connected, predictable", href: "/", icon: I.home },
  { title: "Services", subtitle: "All six service lines", href: "/solutions", icon: I.grid },
  { title: "Portfolio", subtitle: "The team & the work we've shipped", href: "/portfolio", icon: I.folder },
  { title: "About", subtitle: "Our story, team & values", href: "/about", icon: I.users },
  { title: "Contact", subtitle: "Get a quote, we reply fast", href: "/contact", icon: I.mail },
  // services
  { title: "IoT Solutions", subtitle: "Devices & live dashboards", href: "/service?s=iot", icon: I.chip },
  { title: "Smart Home & Automation", subtitle: "One app, one voice", href: "/service?s=smarthome", icon: I.home },
  { title: "AI & Automation", subtitle: "Chatbots, agents, computer vision", href: "/service?s=ai", icon: I.spark },
  { title: "Security & Surveillance", subtitle: "CCTV, access control, biometrics", href: "/service?s=security", icon: I.shield },
  { title: "Software Development", subtitle: "Web, mobile, SaaS, enterprise", href: "/service?s=software", icon: I.code },
  { title: "Training & Education", subtitle: "Hands-on cohorts & workshops", href: "/service?s=training", icon: I.grad },
  // actions
  { title: "Chat with Kaira", subtitle: "Our AI Solutions Architect", icon: I.spark, action: "kaira" },
  { title: "WhatsApp us", subtitle: "0327 5516703, quick reply", icon: I.chat, action: "whatsapp" },
  { title: "Toggle theme", subtitle: "Dark ↔ light", icon: I.moon, action: "theme" },
  { title: "Email us", subtitle: "contact.hacktechzone@gmail.com", icon: I.mail, action: "email" },
];
