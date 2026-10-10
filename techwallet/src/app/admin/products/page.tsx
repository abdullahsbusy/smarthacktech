import { Suspense } from "react";
import Link from "next/link";
import { categories, pkr } from "@/lib/data";
import { getAllProductsForAdmin } from "@/lib/catalog";

export default function AdminProducts() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary h-10">+ Add product</Link>
      </div>
      <Suspense fallback={<p className="mt-6 text-muted">Loading products…</p>}>
        <ProductTable />
      </Suspense>
    </>
  );
}

async function ProductTable() {
  let products;
  try {
    products = await getAllProductsForAdmin();
  } catch (e) {
    return <p role="alert" className="mt-6 rounded-lg bg-accent/10 p-4 text-sm text-accent">Could not load products: {e instanceof Error ? e.message : "unknown error"}. Make sure supabase/setup.sql has been run.</p>;
  }
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-line bg-paper text-muted">
          <tr><th className="px-5 py-3 font-medium">Product</th><th className="px-5 py-3 font-medium">Category</th><th className="px-5 py-3 font-medium">Price</th><th className="px-5 py-3 font-medium">Stock</th><th className="px-5 py-3" /></tr>
        </thead>
        <tbody className="divide-y divide-line">
          {products.map((p) => (
            <tr key={p.slug} className="hover:bg-paper">
              <td className="px-5 py-3 font-medium">{p.name}{!p.active && <span className="ml-2 rounded bg-tint px-1.5 py-0.5 text-[11px] text-muted">Hidden</span>}<span className="block font-mono text-xs text-muted">{p.slug}</span></td>
              <td className="px-5 py-3 text-muted">{categories.find((c) => c.slug === p.category)?.name}</td>
              <td className="px-5 py-3 font-mono">{pkr(p.price)}</td>
              <td className={`px-5 py-3 font-mono ${p.stock <= 10 ? "text-accent" : ""}`}>{p.stock}</td>
              <td className="px-5 py-3 text-right"><Link href={`/admin/products/${p.slug}`} className="text-sm font-semibold text-primary">Edit</Link></td>
            </tr>
          ))}
          {!products.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-muted">No products yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
