import Link from "next/link";
import Form from "next/form";
import CartLink from "./CartLink";
import MobileNav from "./MobileNav";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=kits", label: "FYP Kits" },
  { href: "/fyp", label: "FYP Guidance" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="TechWallet home">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect width="28" height="28" rx="6" fill="#0f6fb0" />
        <path d="M15.5 5 8 15.5h5L12 23l8-10.5h-5L15.5 5Z" fill="#fff" />
      </svg>
      <span className="text-lg font-bold tracking-tight">
        Tech<span className="text-primary">Wallet</span>
      </span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="bg-deep text-[13px] text-white/90">
        <div className="container-x flex h-9 items-center justify-between">
          <span>Free delivery on orders above Rs 5,000 · Cash on Delivery nationwide</span>
          <span className="hidden sm:block">WhatsApp: {SITE.whatsappDisplay}</span>
        </div>
      </div>
      <div className="container-x flex h-16 items-center gap-6">
        <Logo />
        <Form action="/shop" className="hidden flex-1 md:block">
          <label className="relative block max-w-xl">
            <span className="sr-only">Search products</span>
            <input
              name="q"
              placeholder="Search ESP32, DHT22, relay, Raspberry Pi…"
              className="h-10 w-full rounded-lg border border-line bg-paper pl-4 pr-12 text-sm outline-none focus:border-primary focus:bg-surface"
            />
            <button className="absolute right-1 top-1 grid h-8 w-10 place-items-center rounded-md bg-primary-dark text-white" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
          </label>
        </Form>
        <nav className="ml-auto hidden items-center gap-6 text-sm font-medium lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-ink/80 hover:text-primary">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/account" className="btn btn-outline hidden h-10 w-10 px-0 sm:inline-flex" aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
        </Link>
        <CartLink />
        <MobileNav links={nav} />
      </div>
    </header>
  );
}
