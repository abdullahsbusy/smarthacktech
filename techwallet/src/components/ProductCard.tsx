import Link from "next/link";
import { Product, pkr } from "@/lib/data";
import ProductVisual from "./ProductVisual";
import AddToCart from "./AddToCart";

export default function ProductCard({ p }: { p: Product }) {
  const off = p.compare ? Math.round((1 - p.price / p.compare) * 100) : 0;
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:border-primary/40 hover:shadow-[0_6px_24px_-12px_rgba(15,27,45,.25)]">
      <Link href={`/product/${p.slug}`} className="relative block">
        <ProductVisual category={p.category} className="aspect-[4/3]" />
        {p.tag && (
          <span className="absolute left-3 top-3 rounded bg-deep px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {p.tag}
          </span>
        )}
        {off > 0 && (
          <span className="absolute right-3 top-3 rounded bg-accent px-2 py-1 text-[11px] font-bold text-deep">-{off}%</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-muted">{p.brand}</p>
        <Link href={`/product/${p.slug}`} className="mt-1 line-clamp-2 min-h-[2.6rem] text-[15px] font-semibold leading-snug hover:text-primary">
          {p.name}
        </Link>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-mono text-lg font-semibold">{pkr(p.price)}</span>
          {p.compare && <span className="font-mono text-sm text-muted line-through">{pkr(p.compare)}</span>}
        </div>
        <p className={`mt-1 text-xs font-medium ${p.stock > 10 ? "text-success" : "text-accent"}`}>
          {p.stock > 10 ? "In stock" : `Only ${p.stock} left`}
        </p>
        <div className="mt-4"><AddToCart p={p} /></div>
      </div>
    </article>
  );
}
