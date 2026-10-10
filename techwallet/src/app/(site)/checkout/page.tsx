"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useCart } from "@/components/CartProvider";
import { placeOrder } from "@/app/actions";
import { getAccessToken } from "@/lib/supabase-browser";
import { pkr } from "@/lib/data";
import { shippingFor } from "@/lib/pricing";

const field = "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, start] = useTransition();
  const shipping = shippingFor(subtotal);

  if (!items.length) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/shop" className="btn btn-primary mt-6 h-12 px-6">Browse products</Link>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setError(undefined);
    start(async () => {
      const accessToken = await getAccessToken().catch(() => undefined);
      const res = await placeOrder({
        accessToken,
        name: f.get("name"),
        phone: f.get("phone"),
        email: f.get("email"),
        city: f.get("city"),
        address: f.get("address"),
        note: f.get("note"),
        items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
      });
      if (!res.ok) return setError(res.error);
      clear();
      router.push(`/order/${res.number}`);
    });
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Delivery details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">Full name<input name="name" required className={`${field} mt-1`} autoComplete="name" /></label>
            <label className="text-sm">Mobile number<input name="phone" required inputMode="tel" placeholder="03XX-XXXXXXX" className={`${field} mt-1`} autoComplete="tel" /></label>
            <label className="text-sm">Email (optional)<input name="email" type="email" className={`${field} mt-1`} autoComplete="email" /></label>
            <label className="text-sm">City<input name="city" required className={`${field} mt-1`} autoComplete="address-level2" /></label>
            <label className="text-sm sm:col-span-2">Full address<textarea name="address" required className={`${field} mt-1 h-24 py-3`} autoComplete="street-address" /></label>
            <label className="text-sm sm:col-span-2">Order note (optional)<input name="note" className={`${field} mt-1`} /></label>
          </div>
          <h2 className="mt-8 font-semibold">Payment</h2>
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-primary bg-tint p-4 text-sm">
            <span className="h-4 w-4 rounded-full border-4 border-primary bg-surface" />
            <div><p className="font-semibold">Cash on Delivery</p><p className="text-muted">Pay in cash when your order arrives.</p></div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Your order</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.slug} className="flex justify-between gap-3"><span className="text-muted">{i.qty} × {i.name}</span><span className="font-mono">{pkr(i.price * i.qty)}</span></li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-mono">{pkr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-mono">{shipping ? pkr(shipping) : "Free"}</dd></div>
            <div className="flex justify-between pt-2 text-base font-semibold"><dt>Total</dt><dd className="font-mono">{pkr(subtotal + shipping)}</dd></div>
          </dl>
          {error && <p role="alert" className="mt-4 rounded-lg bg-accent/10 p-3 text-sm text-accent">{error}</p>}
          <button disabled={pending} className="btn btn-accent mt-5 h-12 w-full disabled:opacity-60">{pending ? "Placing order…" : "Place order"}</button>
        </aside>
      </form>
    </div>
  );
}
