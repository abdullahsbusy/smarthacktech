"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type P = { slug: string; name: string; category: string; price: number; stock: number };

export default function AddToCart({ p, withQty = false }: { p: P; withQty?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const out = p.stock <= 0;

  function onAdd() {
    add({ slug: p.slug, name: p.name, category: p.category, price: p.price }, qty);
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  }

  const button = (
    <button onClick={onAdd} disabled={out} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 data-[big=true]:h-12 data-[big=true]:flex-1" data-big={withQty}>
      {out ? "Out of stock" : done ? "Added ✓" : "Add to cart"}
    </button>
  );

  if (!withQty) return button;
  return (
    <div className="flex gap-3">
      <div className="flex h-12 items-center rounded-lg border border-line bg-surface font-mono">
        <button className="h-full w-10 text-lg" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
        <span className="w-8 text-center">{qty}</span>
        <button className="h-full w-10 text-lg" aria-label="Increase" onClick={() => setQty((q) => Math.min(p.stock, q + 1))}>+</button>
      </div>
      {button}
    </div>
  );
}
