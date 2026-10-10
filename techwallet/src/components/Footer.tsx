import Link from "next/link";
import { Logo } from "./Header";
import { categories } from "@/lib/data";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t border-line bg-deep text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="[&_span]:text-white [&_span>span]:text-white"><Logo /></div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Genuine IoT components and hands-on FYP guidance for students and makers across Pakistan.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link className="hover:text-white" href={`/shop?category=${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/fyp">FYP Guidance</Link></li>
            <li><Link className="hover:text-white" href="/fyp/ideas">FYP Ideas</Link></li>
            <li><Link className="hover:text-white" href="/blog">Tutorials & Guides</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-white" href="/shipping">Shipping & Delivery</Link></li>
            <li><Link className="hover:text-white" href="/returns">Returns & Warranty</Link></li>
            <li><Link className="hover:text-white" href="/track">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
            <li>{SITE.email}</li>
            <li>Mon–Sat, 10am – 8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 TechWallet. All rights reserved.
      </div>
    </footer>
  );
}
