"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="btn btn-outline relative ml-auto h-10 px-3 lg:ml-0" aria-label={`Cart, ${count} items`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></svg>
      <span className="hidden sm:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-deep">{count}</span>
      )}
    </Link>
  );
}
