import Link from "next/link";
import { posts } from "@/lib/content";

export const metadata = { title: "Tutorials & Guides | TechWallet" };

export default function Blog() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-x py-12">
          <h1 className="text-4xl font-bold tracking-tight">Tutorials & guides</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">Practical help for building and finishing your IoT projects.</p>
        </div>
      </section>
      <div className="container-x grid gap-5 py-12 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-xl border border-line bg-surface p-6 transition hover:border-primary/50">
            <span className="w-fit rounded bg-tint px-2 py-1 text-xs font-semibold text-primary">{p.tag}</span>
            <h2 className="mt-4 text-lg font-bold leading-snug group-hover:text-primary">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
            <p className="mt-4 text-xs text-muted">{p.date} · {p.read} read</p>
          </Link>
        ))}
      </div>
    </>
  );
}
