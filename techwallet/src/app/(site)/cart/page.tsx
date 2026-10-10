"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import ProductVisual from "@/components/ProductVisual";
import { pkr } from "@/lib/data";
import { FREE_SHIPPING_ABOVE, shippingFor } from "@/lib/pricing";

export default function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const shipping = shippingFor(subtotal);

  if (!items.length) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted">Add some components to get started.</p>
        <Link href="/shop" className="btn btn-primary mt-6 h-12 px-6">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-bold tracking-tight">Shopping cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {items.map((i) => (
            <li key={i.slug} className="flex gap-4 p-4">
              <ProductVisual category={i.category} className="h-20 w-20 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                <div>
                  <Link href={`/product/${i.slug}`} className="font-semibold hover:text-primary">{i.name}</Link>
                  <p className="mt-1 font-mono text-sm text-muted">{pkr(i.price)}</p>
                </div>
                <div className="mt-3 flex items-center gap-4 sm:mt-0">
                  <div className="flex h-10 items-center rounded-lg border border-line font-mono">
                    <button className="h-full w-9" aria-label="Decrease" onClick={() => setQty(i.slug, i.qty - 1)}>−</button>
                    <span className="w-7 text-center text-sm">{i.qty}</span>
                    <button className="h-full w-9" aria-label="Increase" onClick={() => setQty(i.slug, i.qty + 1)}>+</button>
                  </div>
                  <span className="w-24 text-right font-mono font-semibold">{pkr(i.price * i.qty)}</span>
                  <button onClick={() => remove(i.slug)} className="text-sm text-muted hover:text-accent" aria-label={`Remove ${i.name}`}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-mono">{pkr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd className="font-mono">{shipping ? pkr(shipping) : "Free"}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><dt>Total</dt><dd className="font-mono">{pkr(subtotal + shipping)}</dd></div>
          </dl>
          {shipping > 0 && (
            <p className="mt-3 text-xs text-muted">Add {pkr(FREE_SHIPPING_ABOVE - subtotal)} more for free shipping.</p>
          )}
          <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Coupon code" aria-label="Coupon code" className="h-11 min-w-0 flex-1 rounded-lg border border-line px-3 text-sm outline-none focus:border-primary" />
            <button className="btn btn-outline h-11 px-4">Apply</button>
          </form>
          <Link href="/checkout" className="btn btn-accent mt-4 h-12 w-full">Proceed to checkout</Link>
          <p className="mt-3 text-center text-xs text-muted">Pay with Cash on Delivery</p>
        </aside>
      </div>
    </div>
  );
}
