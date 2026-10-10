"use client";

import { useState } from "react";
import { useCart, type CartItem } from "./CartProvider";

export default function AddAllToCart({ items, label = "Add all to cart" }: { items: CartItem[]; label?: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      className="btn btn-primary h-12 w-full"
      onClick={() => {
        items.forEach(({ qty, ...i }) => add(i, qty));
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? "Added to cart ✓" : label}
    </button>
  );
}
