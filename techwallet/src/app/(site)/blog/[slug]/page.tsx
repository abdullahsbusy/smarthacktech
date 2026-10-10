import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Post({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <article className="container-x max-w-2xl py-12">
      <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">← All guides</Link>
      <span className="ml-3 rounded bg-tint px-2 py-1 text-xs font-semibold text-primary">{post.tag}</span>
      <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">{post.date} · {post.read} read</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {post.body.map((para) => <p key={para}>{para}</p>)}
      </div>
      <div className="mt-12 rounded-xl bg-tint p-6">
        <p className="font-semibold">Stuck on your project?</p>
        <p className="mt-1 text-sm text-muted">Our engineers can help you finish it.</p>
        <Link href="/fyp#book" className="btn btn-primary mt-4">Get guidance</Link>
      </div>
    </article>
  );
}
