export const SERVICE_MENU = [
  { slug: "iot", label: "IoT Solutions" },
  { slug: "smarthome", label: "Smart Home & Automation" },
  { slug: "ai", label: "AI & Automation" },
  { slug: "security", label: "Security & Surveillance" },
  { slug: "software", label: "Software Development" },
  { slug: "training", label: "Training & Education" },
  { slug: "sotms", label: "SOTMS Fleet Platform" },
] as const;

export const ABOUT_MENU = [
  { href: "/about#story", title: "Our Story", subtitle: "How HackTech started" },
  { href: "/about#mission", title: "Mission & Vision", subtitle: "What we are building toward" },
  { href: "/about#values", title: "What We Stand For", subtitle: "Our values & principles" },
  { href: "/about#team", title: "Meet the Team", subtitle: "The engineers behind HackTech" },
  { href: "/about#journey", title: "Our Journey", subtitle: "From the bench to an ecosystem" },
  { href: "/contact", title: "Work With Us", subtitle: "Get in touch" },
] as const;

export const PRIMARY_NAV = [
  { key: "home", href: "/", label: "Home" },
  { key: "solutions", href: "/solutions", label: "Services" },
  { key: "portfolio", href: "/portfolio", label: "Portfolio" },
  { key: "about", href: "/about", label: "About" },
] as const;
