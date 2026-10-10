import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, pkr } from "@/lib/data";
import { getProducts } from "@/lib/catalog";
import ProductVisual from "@/components/ProductVisual";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";
import { reviews } from "@/lib/content";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading product…</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const all = await getProducts();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category);
  const related = all.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <div className="container-x py-10">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-primary">Home</Link> /{" "}
        <Link href={`/shop?category=${p.category}`} className="hover:text-primary">{cat?.name}</Link> /{" "}
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductVisual category={p.category} className="aspect-square rounded-2xl border border-line" />
        <div>
          <p className="text-sm font-medium text-muted">{p.brand}</p>
          <h1 className="mt-1 text-3xl font-bold leading-tight tracking-tight">{p.name}</h1>
          <p className="mt-4 text-muted">{p.short}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold">{pkr(p.price)}</span>
            {p.compare && <span className="font-mono text-lg text-muted line-through">{pkr(p.compare)}</span>}
          </div>
          <p className={`mt-2 text-sm font-medium ${p.stock > 10 ? "text-success" : "text-accent"}`}>
            {p.stock > 10 ? "In stock, ships in 24 hours" : p.stock > 0 ? `Only ${p.stock} left in stock` : "Out of stock"}
          </p>

          <div className="mt-6"><AddToCart p={p} withQty /></div>
          <Link href="/fyp" className="btn btn-outline mt-3 h-12 w-full">Need help with this part? Ask an engineer</Link>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted">
            <li>✓ Genuine & tested</li>
            <li>✓ Cash on Delivery</li>
            <li>✓ 7-day replacement</li>
            <li>✓ Free sample code</li>
          </ul>
        </div>
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="mb-4 text-xl font-bold">Specifications</h2>
        <dl className="overflow-hidden rounded-xl border border-line bg-surface">
          {p.specs.map(([k, v], i) => (
            <div key={k} className={`grid grid-cols-[40%_1fr] px-5 py-3 text-sm ${i % 2 ? "bg-paper" : ""}`}>
              <dt className="text-muted">{k}</dt>
              <dd className="font-mono">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 max-w-3xl">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold">Customer reviews</h2>
          <p className="text-sm text-muted"><span className="font-semibold text-ink">4.7</span> / 5 · {reviews.length} reviews</p>
        </div>
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.name} className="rounded-xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted">{r.date}</span>
              </div>
              <p className="mt-1 text-amber-500" aria-label={`${r.rating} out of 5`}>{"★".repeat(r.rating)}<span className="text-line">{"★".repeat(5 - r.rating)}</span></p>
              <p className="mt-2 text-sm text-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">Related products</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
