"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { slug: string; name: string; category: string; price: number; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "techwallet-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback<CartCtx["add"]>((item, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.slug === item.slug);
      if (found) return cur.map((i) => (i.slug === item.slug ? { ...i, qty: Math.min(i.qty + qty, 99) } : i));
      return [...cur, { ...item, qty }];
    });
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.slug !== slug) : cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 99) } : i))));
  }, []);
  const remove = useCallback((slug: string) => setItems((cur) => cur.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, add, setQty, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
