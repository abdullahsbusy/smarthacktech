"use client";

import Link from "next/link";
import Form from "next/form";
import { useState } from "react";

export default function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu" className="btn btn-outline h-10 w-10 px-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-lg">
          <Form action="/shop" className="container-x pt-4">
            <input name="q" placeholder="Search products…" className="h-11 w-full rounded-lg border border-line bg-paper px-4 text-sm outline-none focus:border-primary" />
          </Form>
          <nav className="container-x flex flex-col py-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-[15px] font-medium last:border-0">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
