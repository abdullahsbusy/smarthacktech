import Link from "next/link";
import { fypIdeas } from "@/lib/data";
import { ideaDetails } from "@/lib/content";

export const metadata = { title: "FYP Ideas | TechWallet" };

export default function Ideas() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-x py-12">
          <h1 className="text-4xl font-bold tracking-tight">IoT FYP ideas</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">Each idea comes with a feature list, a component list and a build roadmap.</p>
        </div>
      </section>
      <div className="container-x grid gap-5 py-12 md:grid-cols-2">
        {fypIdeas.map((i) => (
          <Link key={i.slug} href={`/fyp/ideas/${i.slug}`} className="group rounded-xl border border-line bg-surface p-6 transition hover:border-primary/50">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded bg-tint px-2 py-1 text-primary">{i.level}</span>
              <span className="rounded bg-tint px-2 py-1 text-muted">{i.dept}</span>
            </div>
            <h2 className="mt-4 text-xl font-bold group-hover:text-primary">{i.title}</h2>
            <p className="mt-2 text-sm text-muted">{ideaDetails[i.slug].summary}</p>
            <p className="mt-4 font-mono text-sm font-semibold">{i.budget}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
