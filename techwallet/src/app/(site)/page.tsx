import Link from "next/link";
import { categories, fypIdeas } from "@/lib/data";
import { getProducts } from "@/lib/catalog";
import { posts, testimonials } from "@/lib/content";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";

const trust = [
  { t: "Genuine components", d: "Tested before dispatch" },
  { t: "Nationwide delivery", d: "2-4 working days" },
  { t: "Cash on Delivery", d: "Pay when you receive" },
  { t: "Expert support", d: "Free guidance on WhatsApp" },
];

export default async function Home() {
  const featured = (await getProducts()).slice(0, 8);
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <div className="container-x grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-4 inline-block rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              IoT components · FYP guidance
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              Everything you need to build your IoT project.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              ESP32, Arduino, Raspberry Pi, sensors and complete FYP kits, backed by engineers who help you get it working.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-primary h-12 px-6">Shop components</Link>
              <Link href="/fyp" className="btn btn-outline h-12 px-6">Get FYP guidance</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["esp32", "sensors", "raspberry-pi", "displays"].map((c, i) => (
              <ProductVisual key={c} category={c} className={`aspect-square rounded-2xl border border-line ${i % 3 === 0 ? "translate-y-4" : ""}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-line bg-surface">
        <div className="container-x grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
          {trust.map((x) => (
            <div key={x.t}>
              <p className="text-sm font-semibold">{x.t}</p>
              <p className="text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x pt-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Shop by category</h2>
          <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/shop?category=${c.slug}`} className="group rounded-xl border border-line bg-surface p-5 transition hover:border-primary/50">
              <ProductVisual category={c.slug} className="mb-4 aspect-[16/9] rounded-lg" />
              <p className="font-semibold group-hover:text-primary">{c.name}</p>
              <p className="text-sm text-muted">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-x pt-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Popular right now</h2>
          <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">Shop all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* FYP band */}
      <section className="mt-20 bg-deep text-white">
        <div className="container-x grid gap-10 py-16 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">FYP guidance</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight">From idea to working prototype, with an engineer beside you.</h2>
            <ol className="mt-8 space-y-5">
              {[
                ["Share your idea", "Tell us your department, budget and deadline."],
                ["Get a plan and kit", "Feasibility check, component list, and a ready kit."],
                ["Build with support", "Circuit, code and documentation guidance until demo day."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-sm">{i + 1}</span>
                  <div><p className="font-semibold">{t}</p><p className="text-sm text-white/65">{d}</p></div>
                </li>
              ))}
            </ol>
            <Link href="/fyp" className="btn btn-accent mt-9 h-12 px-6">Book a free consultation</Link>
          </div>
          <div className="space-y-3">
            {fypIdeas.map((i) => (
              <Link href={`/fyp/ideas/${i.slug}`} key={i.title} className="block rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                <p className="font-semibold">{i.title}</p>
                <p className="mt-1 text-sm text-white/60">{i.dept} · {i.level} · <span className="font-mono">{i.budget}</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x pt-20">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">Trusted by students and makers</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border border-line bg-surface p-6">
              <p className="text-amber-500" aria-hidden>★★★★★</p>
              <blockquote className="mt-3 text-[15px] leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-sm"><span className="font-semibold">{t.name}</span><span className="block text-muted">{t.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="container-x pt-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Tutorials & guides</h2>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">All guides →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-xl border border-line bg-surface p-6 transition hover:border-primary/50">
              <span className="rounded bg-tint px-2 py-1 text-xs font-semibold text-primary">{p.tag}</span>
              <h3 className="mt-3 font-bold leading-snug group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.read} read</p>
            </Link>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container-x pt-20">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-primary-dark p-8 text-white md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Not sure which component you need?</h2>
            <p className="mt-1 text-white/80">Message us on WhatsApp and an engineer will help you choose.</p>
          </div>
          <Link href="/contact" className="btn h-12 bg-white px-6 text-primary-dark hover:bg-white/90">Chat with us</Link>
        </div>
      </section>
    </>
  );
}
