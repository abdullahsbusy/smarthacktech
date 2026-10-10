import Link from "next/link";
import { notFound } from "next/navigation";
import { fypIdeas, pkr } from "@/lib/data";
import { getProducts } from "@/lib/catalog";
import { ideaDetails } from "@/lib/content";
import AddAllToCart from "@/components/AddAllToCart";

export function generateStaticParams() {
  return fypIdeas.map((i) => ({ slug: i.slug }));
}

export default async function IdeaPage({ params }: PageProps<"/fyp/ideas/[slug]">) {
  const { slug } = await params;
  const idea = fypIdeas.find((i) => i.slug === slug);
  if (!idea) notFound();
  const d = ideaDetails[slug];
  const catalog = await getProducts();
  const parts = d.parts.flatMap((p) => {
    const product = catalog.find((x) => x.slug === p.slug);
    return product ? [{ product, qty: p.qty }] : [];
  });
  const total = parts.reduce((n, p) => n + p.product.price * p.qty, 0);

  return (
    <div className="container-x py-10">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/fyp" className="hover:text-primary">FYP</Link> / <Link href="/fyp/ideas" className="hover:text-primary">Ideas</Link> / <span className="text-ink">{idea.title}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded bg-tint px-2 py-1 text-primary">{idea.level}</span>
            <span className="rounded bg-tint px-2 py-1 text-muted">{idea.dept}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">{idea.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{d.summary}</p>

          <h2 className="mb-3 mt-10 text-xl font-bold">Key features</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {d.features.map((f) => <li key={f} className="rounded-lg border border-line bg-surface px-4 py-3 text-sm">✓ {f}</li>)}
          </ul>

          <h2 className="mb-3 mt-10 text-xl font-bold">Build roadmap</h2>
          <ol className="space-y-3">
            {d.steps.map((s, i) => (
              <li key={s} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tint font-mono text-sm text-primary">{i + 1}</span><p className="pt-1 text-sm">{s}</p></li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Components needed</h2>
          <ul className="mt-4 divide-y divide-line text-sm">
            {parts.map(({ product, qty }) => (
              <li key={product.slug} className="flex justify-between gap-3 py-2.5">
                <Link href={`/product/${product.slug}`} className="hover:text-primary">{qty} × {product.name}</Link>
                <span className="font-mono">{pkr(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between border-t border-line pt-3 font-semibold"><span>Estimated total</span><span className="font-mono">{pkr(total)}</span></p>
          <div className="mt-5">
            <AddAllToCart items={parts.map((p) => ({ slug: p.product.slug, name: p.product.name, category: p.product.category, price: p.product.price, qty: p.qty }))} />
          </div>
          <Link href="/fyp#book" className="btn btn-outline mt-3 h-12 w-full">Get guidance for this idea</Link>
        </aside>
      </div>
    </div>
  );
}
