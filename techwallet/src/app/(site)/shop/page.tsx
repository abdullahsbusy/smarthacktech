import { Suspense } from "react";
import Link from "next/link";
import { categories } from "@/lib/data";
import { getProducts } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

const sorts = [
  ["popular", "Popular"],
  ["price-asc", "Price: low to high"],
  ["price-desc", "Price: high to low"],
  ["name", "Name A-Z"],
] as const;

const input = "h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-primary";

export default function Shop({ searchParams }: PageProps<"/shop">) {
  return (
    <Suspense fallback={<div className="container-x py-20 text-muted">Loading products…</div>}>
      <ShopContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ShopContent({ searchParams }: { searchParams: PageProps<"/shop">["searchParams"] }) {
  const sp = await searchParams;
  const str = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const category = str("category");
  const q = str("q")?.toLowerCase();
  const sort = str("sort") ?? "popular";
  const min = Number(str("min")) || 0;
  const max = Number(str("max")) || Infinity;
  const inStock = str("stock") === "1";

  const list = (await getProducts())
    .filter(
      (p) =>
        (!category || p.category === category) &&
        (!q || `${p.name} ${p.brand} ${p.short}`.toLowerCase().includes(q)) &&
        p.price >= min &&
        p.price <= max &&
        (!inStock || p.stock > 0),
    )
    .sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : 0,
    );
  const current = categories.find((c) => c.slug === category);

  return (
    <div className="container-x py-10">
      <nav className="mb-4 text-sm text-muted">
        <Link href="/" className="hover:text-primary">Home</Link> / <span className="text-ink">{current?.name ?? "All products"}</span>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight">{current?.name ?? (q ? `Results for "${q}"` : "All products")}</h1>
      {current && <p className="mt-1 text-muted">{current.blurb}</p>}

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit space-y-6 rounded-xl border border-line bg-surface p-5">
          <div>
            <h2 className="mb-3 text-sm font-semibold">Categories</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/shop" className={`block rounded-md px-3 py-2 ${!category ? "bg-tint font-semibold text-primary" : "hover:bg-paper"}`}>All products</Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className={`block rounded-md px-3 py-2 ${category === c.slug ? "bg-tint font-semibold text-primary" : "hover:bg-paper"}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <form className="space-y-4 border-t border-line pt-5">
            {category && <input type="hidden" name="category" value={category} />}
            {q && <input type="hidden" name="q" value={q} />}
            <input type="hidden" name="sort" value={sort} />
            <h2 className="text-sm font-semibold">Price (Rs)</h2>
            <div className="flex items-center gap-2">
              <input name="min" type="number" min={0} defaultValue={min || ""} placeholder="Min" className={input} />
              <span className="text-muted">–</span>
              <input name="max" type="number" min={0} defaultValue={max === Infinity ? "" : max} placeholder="Max" className={input} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="stock" value="1" defaultChecked={inStock} className="h-4 w-4 accent-[#2fa8ef]" /> In stock only
            </label>
            <button className="btn btn-primary h-10 w-full">Apply filters</button>
          </form>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">{list.length} products</p>
            <form className="flex items-center gap-2 text-sm">
              {category && <input type="hidden" name="category" value={category} />}
              {q && <input type="hidden" name="q" value={q} />}
              {min > 0 && <input type="hidden" name="min" value={min} />}
              {max !== Infinity && <input type="hidden" name="max" value={max} />}
              {inStock && <input type="hidden" name="stock" value="1" />}
              <label htmlFor="sort" className="text-muted">Sort by</label>
              <select id="sort" name="sort" defaultValue={sort} className="h-10 rounded-lg border border-line bg-surface px-3 outline-none focus:border-primary">
                {sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <button className="btn btn-outline h-10 px-3">Go</button>
            </form>
          </div>
          {list.length ? (
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-line bg-surface p-12 text-center">
              <p className="font-semibold">No products match your filters</p>
              <Link href="/shop" className="btn btn-outline mt-4">Clear filters</Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
