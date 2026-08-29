import type { ReactNode } from "react";

/* Inline SVG glyphs (no emoji — inconsistent across OSes, off-palette).
   Ported 1:1 from veyra.js's vic()/VI/STARTERS. */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const VI = {
  globe: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Icon>
  ),
  phone: (
    <Icon>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
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
    </Icon>
  ),
  home: (
    <Icon>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </Icon>
  ),
  bars: (
    <Icon>
      <line x1="3" y1="21" x2="21" y2="21" />
      <rect x="5" y="11" width="3" height="8" />
      <rect x="11" y="6" width="3" height="13" />
      <rect x="17" y="14" width="3" height="5" />
    </Icon>
  ),
  calc: (
    <Icon>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </Icon>
  ),
  doc: (
    <Icon>
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6" />
    </Icon>
  ),
  cal: (
    <Icon>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </Icon>
  ),
  search: (
    <Icon>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </Icon>
  ),
};

export type StarterAction = "lead" | "audit" | undefined;

export type Starter = { icon: ReactNode; label: string; message: string; action?: StarterAction };

export const STARTERS: Starter[] = [
  { icon: VI.chip, label: "IoT Platform", message: "I want to build an IoT platform." },
  { icon: VI.home, label: "Smart Home", message: "I want smart home automation." },
  { icon: VI.spark, label: "AI Product", message: "I want to build an AI product." },
  { icon: VI.shield, label: "Security & CCTV", message: "I need a security & CCTV system." },
  { icon: VI.globe, label: "Build a Website", message: "I want to build a website." },
  { icon: VI.phone, label: "Mobile App", message: "I want to build a mobile app." },
  { icon: VI.bars, label: "Business Software", message: "I need custom business software." },
  { icon: VI.calc, label: "Estimate Project", message: "Help me estimate my project, ask me what you need to know." },
  { icon: VI.doc, label: "Generate Proposal", message: "I'd like a proposal for my project." },
  { icon: VI.cal, label: "Book Consultation", message: "", action: "lead" },
  { icon: VI.search, label: "Website Audit", message: "", action: "audit" },
];

export function SendArrow() {
  return (
    <svg
      className="vy-send__arrow"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
