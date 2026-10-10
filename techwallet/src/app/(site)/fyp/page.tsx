import Link from "next/link";
import { fypIdeas } from "@/lib/data";
import FypForm from "@/components/FypForm";

const packages = [
  { name: "Starter", price: "Rs 2,500", pts: ["Idea & feasibility review", "Component list (BOM)", "1 video consultation"], hl: false },
  { name: "Standard", price: "Rs 8,000", pts: ["Everything in Starter", "Circuit diagram & code review", "Ready component kit", "WhatsApp support for 1 month"], hl: true },
  { name: "Premium", price: "Custom", pts: ["Everything in Standard", "Weekly mentoring sessions", "Documentation & presentation guidance", "Demo-day readiness"], hl: false },
];


export default function Fyp() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-x py-16 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight">FYP guidance that gets your project working.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            We mentor you through idea, hardware, firmware and documentation. You build it, we make sure you understand it.
          </p>
        </div>
      </section>

      <section className="container-x pt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Popular FYP ideas</h2>
          <Link href="/fyp/ideas" className="text-sm font-semibold text-primary hover:underline">All ideas →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fypIdeas.map((i) => (
            <Link href={`/fyp/ideas/${i.slug}`} key={i.title} className="rounded-xl border border-line bg-surface p-5 transition hover:border-primary/50">
              <p className="font-semibold">{i.title}</p>
              <p className="mt-2 text-sm text-muted">{i.dept}</p>
              <p className="mt-1 text-sm text-muted">{i.level} · <span className="font-mono">{i.budget}</span></p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pt-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Packages</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((p) => (
            <div key={p.name} className={`rounded-xl border bg-surface p-6 ${p.hl ? "border-primary shadow-[0_8px_30px_-14px_rgba(11,79,138,.5)]" : "border-line"}`}>
              <p className="text-sm font-semibold text-primary">{p.name}</p>
              <p className="mt-2 font-mono text-3xl font-semibold">{p.price}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {p.pts.map((x) => <li key={x}>✓ {x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="container-x scroll-mt-32 pt-14">
        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-8">
          <h2 className="text-2xl font-bold tracking-tight">Book a free consultation</h2>
          <p className="mt-1 text-sm text-muted">We reply on WhatsApp within a few hours.</p>
          <FypForm />
        </div>
      </section>
    </>
  );
}
