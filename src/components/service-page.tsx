import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { CardGlow, CardTitle, CardText } from "@/components/ui/card-glow";
import { Chip } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { AccentHtml } from "@/lib/accent-html";
import { WORK, type ServiceEntry } from "@/lib/data/services";

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function ServicePage({ svc, svcKey }: { svc: ServiceEntry; svcKey: string }) {
  const ctxHref = `/contact?s=${encodeURIComponent(svcKey)}`;
  const ctaHeading = (svc.eyebrow.split("·").pop() || "your project").trim();
  const relatedProjects = (svc.projects ?? [])
    .map((k) => ({ key: k, item: WORK[k] }))
    .filter((p): p is { key: string; item: (typeof WORK)[string] } => Boolean(p.item));

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-[calc(76px+9vh)] pb-16">
        <Container>
          <Reveal>
            <Link href="/solutions" className="mb-4.5 inline-flex items-center gap-1.5 text-[0.9rem] text-(--c6) hover:underline">
              ← All services
            </Link>
            <div className="grid items-center gap-[50px] lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
                  {svc.eyebrow}
                </span>
                <h1 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                  <AccentHtml html={svc.title} />
                </h1>
                <p className="mt-4 max-w-[62ch] [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                  {svc.lead}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {svc.chips.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button asChild variant="hackPrimary" size="hack">
                    <Link href={ctxHref}>Get a Quote</Link>
                  </Button>
                  <Button asChild variant="hackGhost" size="hack">
                    <Link href={ctxHref}>Schedule Consultation</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[320px] overflow-hidden rounded-(--radius-lg) border border-(--line-2) bg-[#051622] shadow-lg">
                <Image
                  src={svc.img}
                  alt={svc.eyebrow}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {svc.tag && (
                  <span className="absolute bottom-3.5 left-3.5 z-10 rounded-full bg-black/55 px-3.5 py-1.5 font-(family-name:--font-display) text-xs text-[#f3f7ec] backdrop-blur-sm">
                    {svc.tag}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow={svc.overviewEyebrow || "Overview"}
              title={<AccentHtml html={svc.overviewTitle} />}
              lead={
                <>
                  {svc.overview}
                  {svc.overview2 && (
                    <>
                      <br />
                      <br />
                      {svc.overview2}
                    </>
                  )}
                </>
              }
            />
          </Reveal>
        </Container>
      </section>

      {/* ===== DEMO (only when the service defines one) ===== */}
      {svc.demo && (
        <section className="py-[13vh]">
          <Container>
            <Reveal>
              <div className="grid items-center gap-[50px] lg:grid-cols-2">
                <div className="overflow-hidden rounded-(--radius-lg) bg-[linear-gradient(160deg,#0d181b,#051622)] p-4.5">
                  <video
                    className="mx-auto block max-h-[600px] w-auto max-w-full rounded-2xl shadow-lg"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={svc.demo.poster}
                    src={svc.demo.video}
                    controls
                  />
                </div>
                <div>
                  <span className="mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
                    {svc.demo.eyebrow}
                  </span>
                  <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                    <AccentHtml html={svc.demo.title} />
                  </h2>
                  <p className="mt-4 [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">{svc.demo.lead}</p>
                  <ul className="mt-6 grid list-none grid-cols-1 gap-3.5 sm:grid-cols-2">
                    {svc.demo.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 font-(family-name:--font-display) text-[1rem] font-medium text-(--ink)">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-grad-btn text-[13px] font-extrabold text-[#0A0A0A] shadow-[0_4px_12px_-3px_rgba(255,164,0,.5)]">
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ===== CAPABILITIES ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow={svc.featEyebrow || "Capabilities"}
              title={<AccentHtml html={svc.featTitle} />}
              lead={svc.featLead}
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
            {svc.features.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06}>
                <CardGlow className="h-full">
                  <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                    {CHECK}
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardText>{text}</CardText>
                </CardGlow>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== TECHNOLOGIES / SUPPORTING LISTS ===== */}
      {svc.techGroups.length > 0 && (
        <section className="section-light py-[13vh]">
          <Container>
            <Reveal>
              <SectionHead center eyebrow="Under the hood" title={<AccentHtml html={svc.techTitle} />} />
            </Reveal>
            <div className="mx-auto flex max-w-[880px] flex-col gap-8">
              {svc.techGroups.map((group) => (
                <div key={group.label} className="text-center">
                  <h3 className="mb-3.5 text-[0.85rem] uppercase tracking-[2px] text-(--muted)">{group.label}</h3>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===== PROCESS ===== */}
      {svc.process.length > 0 && (
        <section className="py-[13vh]">
          <Container>
            <Reveal>
              <SectionHead
                center
                eyebrow="How we work"
                title={
                  <>
                    From first call to <span className="bg-grad-text bg-clip-text text-transparent">long-term support</span>
                  </>
                }
              />
            </Reveal>
            <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
              {svc.process.map(([title, text], i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="h-full rounded-(--radius-lg) border border-(--line) bg-(--card) p-6.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-(--line-2)">
                    <span className="mb-3 block bg-grad-text bg-clip-text font-(family-name:--font-display) text-[2.5rem] font-bold leading-none text-transparent">
                      0{i + 1}
                    </span>
                    <h3 className="mb-2 font-(family-name:--font-display) text-[1.06rem] text-(--head)">{title}</h3>
                    <p className="text-[0.93rem] leading-relaxed text-(--muted)">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===== RELATED PROJECTS ===== */}
      {relatedProjects.length > 0 && (
        <section className="section-light py-[13vh]">
          <Container>
            <Reveal>
              <SectionHead
                center
                eyebrow="Related work"
                title={
                  <>
                    Projects we&rsquo;ve <span className="bg-grad-text bg-clip-text text-transparent">shipped</span>
                  </>
                }
                lead="Real systems we have designed, built and put to work."
              />
            </Reveal>
            <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
              {relatedProjects.map(({ key, item }, i) => (
                <Reveal key={key} delay={(i % 3) * 0.06}>
                  <CardGlow className="h-full">
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[13px]">
                      <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-3 py-1 text-[0.72rem] text-[#f3f7ec] backdrop-blur-sm">
                        {item.tag}
                      </span>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardText>{item.text}</CardText>
                  </CardGlow>
                </Reveal>
              ))}
            </div>
            <div className="mt-9.5 flex justify-center">
              <Button asChild variant="hackGhost" size="hack">
                <Link href="/portfolio">View full portfolio →</Link>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <div className="rounded-(--radius-lg) border border-(--line-2) bg-[radial-gradient(600px_300px_at_50%_0%,rgba(10,97,153,.18),transparent_70%)] px-8 py-16 text-center">
              <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                Ready for {ctaHeading}?
              </h2>
              <p className="mx-auto mt-4 max-w-[62ch] [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                {svc.ctaP}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Button asChild variant="hackPrimary" size="hack">
                  <Link href={ctxHref}>{svc.ctaLabel}</Link>
                </Button>
                <Button asChild variant="hackGhost" size="hack">
                  <Link href="/solutions">Explore services</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
