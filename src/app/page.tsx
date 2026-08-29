import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { CardGlow, CardTitle, CardText } from "@/components/ui/card-glow";
import { Pill, Chip, DotLive } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { TalkToKairaButton } from "@/components/kaira/talk-to-kaira-button";
import { HeroNetworkCanvas } from "@/components/hero-network-canvas";

const SERVICES = [
  {
    slug: "software",
    img: "/images/software.webp",
    title: "Software Engineering",
    text: "Modern web platforms, enterprise applications, SaaS products and mobile apps designed around your business — never generic templates.",
  },
  {
    slug: "ai",
    img: "/images/ai.webp",
    title: "AI & Automation",
    text: "AI assistants, workflow automation, computer vision and predictive systems that cut manual work and sharpen every decision.",
  },
  {
    slug: "iot",
    img: "/images/circuit.webp",
    title: "IoT Solutions",
    text: "Connected devices, embedded systems and cloud dashboards that give you real-time visibility over vehicles, equipment and industrial operations.",
  },
  {
    slug: "smarthome",
    img: "/images/smart-home.webp",
    title: "Smart Home & Automation",
    text: "Lighting, security, access control and energy management woven into one seamless smart environment you control from a single app.",
  },
  {
    slug: "security",
    img: "/images/security.webp",
    title: "Security & Surveillance",
    text: "Professional CCTV, IP surveillance, biometric attendance and access control — specified, installed and monitored for complete protection.",
  },
  {
    slug: "training",
    img: "/images/training.webp",
    title: "Training & Innovation",
    text: "Industry-focused workshops and practical technology training, delivered by engineers who are actively building commercial products.",
  },
] as const;

const PROJECTS = [
  {
    img: "/images/sotms-web.svg",
    tag: "AI Fleet Platform",
    title: "Smart Oil Transport Management System",
    text: "An AI-powered fleet-intelligence platform with live vehicle tracking, fuel analytics, driver monitoring and operational insight in one place.",
    result: "Complete visibility, lower running cost",
  },
  {
    img: "/images/driver-monitor.svg",
    tag: "Computer Vision",
    title: "Driver Monitoring System",
    text: "A computer-vision system that detects driver fatigue, distraction, mobile use and unsafe behaviour in real time, with instant alerts.",
    result: "Real-time driver safety",
  },
  {
    img: "/images/bidpilot.svg",
    tag: "AI System",
    title: "BidPilot AI",
    text: "An AI bidding assistant that reads tender documents, estimates competitive pricing and predicts proposal success on every bid.",
    result: "Data-backed bids, not guesswork",
  },
] as const;

const WHY = [
  {
    title: "Engineering first",
    text: "Built by engineers who design and ship real technology — not by a sales team.",
    path: "M10 20l4-16M6 8l-4 4 4 4M18 8l4 4-4 4",
    rects: false,
  },
  {
    title: "End-to-end expertise",
    text: "AI, software, IoT, automation and security — delivered by one accountable engineering partner.",
    rects: true,
    path: "",
  },
  {
    title: "Built for Pakistani conditions",
    text: "Designed for local infrastructure, real businesses and genuine environmental challenges.",
    path: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M4 7.5l8 4.5 8-4.5",
    rects: false,
  },
  {
    title: "Long-term partnership",
    text: "Deployment is only the beginning. We keep improving, supporting and scaling every solution we build.",
    path: "M21 12a9 9 0 1 1-6.2-8.6 M22 4l-9 9-3-3",
    rects: false,
  },
] as const;

const PROCESS = [
  { num: "01", title: "Discovery & consultation", text: "Understanding your challenges, objectives and technical requirements." },
  { num: "02", title: "Solution design", text: "Architecture, planning and the right technology selection for the job." },
  { num: "03", title: "Engineering & development", text: "Software, AI, IoT and hardware built by one integrated team." },
  { num: "04", title: "Deployment & support", text: "Testing, deployment, training and continuous improvement." },
] as const;

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-dark-zone relative flex min-h-screen flex-col justify-center overflow-hidden pt-[130px] pb-[70px]">
        <HeroNetworkCanvas />
        <Container className="relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <Pill>
                  <DotLive /> Intelligent technology, engineered in Pakistan
                </Pill>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-3.5 max-w-[16ch] text-(--head) [font-size:clamp(2.7rem,7.2vw,5.4rem)] font-bold tracking-[-0.025em] leading-[1.02]">
                  Engineering the future of <Accent>intelligent technology</Accent>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[62ch] text-(--muted) [font-size:clamp(1.02rem,1.5vw,1.22rem)]">
                  We design AI, IoT, software and smart-automation systems that help
                  businesses operate faster, safer and smarter. From enterprise platforms to
                  connected devices and intelligent infrastructure, HackTech delivers
                  complete technology solutions — engineered in Pakistan.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button asChild variant="hackPrimary" size="hack">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                  <Button asChild variant="hackGhost" size="hack">
                    <Link href="/solutions">Explore Our Solutions</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={0.18}>
              <div className="relative aspect-video overflow-hidden rounded-(--radius-lg) border border-(--line-2)">
                <video
                  className="size-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                  poster="/images/hero-poster.webp"
                  aria-hidden="true"
                >
                  <source src="/images/hero.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <b className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                  <DotLive /> SOTMS · Live fleet AI
                </b>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <Reveal>
        <section className="border-y border-(--line) bg-(--c2)/40 py-8">
          <Container>
            <p className="text-center text-sm text-(--muted)">
              Trusted technologies powering businesses through intelligent engineering
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center font-(family-name:--font-display) font-semibold text-(--head)">
              {["AI", "Software Engineering", "IoT", "Smart Automation", "Security", "Research & Innovation"].map(
                (t) => (
                  <span key={t}>{t}</span>
                )
              )}
            </div>
          </Container>
        </section>
      </Reveal>

      {/* ===== ABOUT HACKTECH ===== */}
      <section className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="About HackTech"
              title={
                <>
                  One engineering partner. <Accent>Endless possibilities.</Accent>
                </>
              }
              lead={
                <>
                  HackTech is a technology engineering company focused on building
                  intelligent systems that solve real business challenges. Instead of
                  juggling separate vendors for software, AI, hardware, automation and
                  security, you work with one experienced team that delivers complete
                  technology ecosystems — from concept to deployment and long-term
                  support.
                  <br />
                  <br />
                  Every solution is engineered with scalability, reliability and
                  real-world performance in mind.
                </>
              }
              className="mb-0"
            />
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <Chip>Scalable by design</Chip>
              <Chip>Built to be reliable</Chip>
              <Chip>Real-world performance</Chip>
              <Chip>Concept to deployment</Chip>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="What we do"
              title={
                <>
                  Technology solutions built <Accent>around your business</Accent>
                </>
              }
              lead="Launching a startup, modernising operations or deploying connected infrastructure — HackTech provides every technology layer needed to build a smarter business."
            />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <CardGlow className="h-full">
                  <div className="mb-5 aspect-[16/10] overflow-hidden rounded-[13px]">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={400}
                      height={250}
                      className="size-full object-cover"
                    />
                  </div>
                  <CardTitle>{s.title}</CardTitle>
                  <CardText>{s.text}</CardText>
                  <Link
                    href={`/service?s=${s.slug}`}
                    className="mt-4.5 inline-flex items-center gap-1.5 font-semibold text-(--c6) hover:underline"
                  >
                    Explore →
                  </Link>
                </CardGlow>
              </Reveal>
            ))}
          </div>
          <div className="mt-9 flex justify-center">
            <Button asChild variant="hackPrimary" size="hack">
              <Link href="/solutions">Explore All Services →</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Featured projects"
              title={
                <>
                  Technology that <Accent>delivers results</Accent>
                </>
              }
              lead="Every project we build is designed to solve a real operational problem, improve efficiency and create measurable business value."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <CardGlow className="h-full">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[13px] bg-(--c2)">
                    <Image src={p.img} alt={p.title} fill className="object-contain p-6" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                      {p.tag}
                    </span>
                  </div>
                  <CardTitle>{p.title}</CardTitle>
                  <CardText>{p.text}</CardText>
                  <div className="mt-4 text-sm font-semibold text-(--ok)">{p.result}</div>
                </CardGlow>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="hackGhost" size="hack">
              <Link href="/portfolio">Explore Complete Portfolio →</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== FLAGSHIP: SOTMS ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <div className="grid items-center gap-[50px] lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
                  Flagship product
                </span>
                <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                  Meet SOTMS — <Accent>Pakistan&apos;s intelligent fleet platform</Accent>
                </h2>
                <p className="mt-4 max-w-[62ch] text-(--muted) [font-size:clamp(1.02rem,1.5vw,1.22rem)]">
                  Built for transport companies that need complete operational
                  visibility. SOTMS fuses IoT, artificial intelligence and cloud
                  technology to monitor fleets in real time — cutting fuel costs,
                  improving driver safety and optimising every route from a single
                  intelligent dashboard.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {["Live GPS tracking", "AI driver monitoring", "Fuel analytics", "Vehicle health monitoring", "Route optimisation", "Instant alerts"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2.5 text-(--ink)">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-grad-btn text-[13px] font-bold text-[#0A0A0A]">
                          ✓
                        </span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button asChild variant="hackPrimary" size="hack">
                    <Link href="/service?s=sotms">Explore SOTMS →</Link>
                  </Button>
                  <Button asChild variant="hackGhost" size="hack">
                    <Link href="/service?s=iot">See all IoT solutions</Link>
                  </Button>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Vehicles active", num: "218", tone: "ok" },
                    { label: "On-time deliveries", num: "96%", tone: "ok" },
                    { label: "Open alerts", num: "7", tone: "warn" },
                    { label: "Avg. driver score", num: "8.4", tone: "ok" },
                  ].map((k) => (
                    <div key={k.label} className="rounded-2xl border border-(--line) bg-(--card) p-4">
                      <span className="block text-[0.74rem] uppercase tracking-wider text-(--faint)">
                        {k.label}
                      </span>
                      <span
                        className={
                          "mt-1.5 block font-(family-name:--font-display) text-[1.6rem] font-bold tabular-nums " +
                          (k.tone === "ok" ? "text-(--ok)" : "text-(--warn)")
                        }
                      >
                        {k.num}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3.5 text-center text-[0.8rem] text-(--muted)">
                  Sample dashboard, illustrative data, not a live customer fleet.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== WHY HACKTECH ===== */}
      <section className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Why HackTech"
              title={
                <>
                  Why businesses <Accent>choose HackTech</Accent>
                </>
              }
              lead="Technology is only valuable when it solves real problems — so every HackTech solution is engineered with performance, scalability and long-term reliability as the priority."
            />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <CardGlow className="h-full">
                  <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-7"
                    >
                      {w.rects ? (
                        <>
                          <rect x="3" y="3" width="8" height="8" rx="1" />
                          <rect x="13" y="3" width="8" height="8" rx="1" />
                          <rect x="3" y="13" width="8" height="8" rx="1" />
                          <rect x="13" y="13" width="8" height="8" rx="1" />
                        </>
                      ) : (
                        w.path.split(" M").map((d, idx) => (
                          <path key={idx} d={idx === 0 ? d : "M" + d} />
                        ))
                      )}
                    </svg>
                  </div>
                  <CardTitle>{w.title}</CardTitle>
                  <CardText>{w.text}</CardText>
                </CardGlow>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="How we build"
              title={
                <>
                  A transparent <Accent>engineering process</Accent>
                </>
              }
              lead="Every project stays aligned with your business goals, from the first conversation to long-term support."
            />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px]">
              {PROCESS.map((p) => (
                <article
                  key={p.num}
                  className="rounded-(--radius-md) border border-(--line) bg-(--card) p-6"
                >
                  <span className="bg-grad-text bg-clip-text font-(family-name:--font-display) text-4xl font-bold text-transparent">
                    {p.num}
                  </span>
                  <h3 className="mt-3 text-(--head)">{p.title}</h3>
                  <p className="mt-2 text-sm text-(--muted)">{p.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <div className="rounded-(--radius-lg) border border-(--line-2) bg-[radial-gradient(600px_300px_at_50%_0%,rgba(15,111,176,.3),transparent_70%)] px-8 py-16 text-center">
              <h2 className="mx-auto max-w-[24ch] text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                Let&apos;s build technology that <Accent>moves your business forward</Accent>
              </h2>
              <p className="mx-auto mt-4 max-w-[62ch] text-(--muted) [font-size:clamp(1.02rem,1.5vw,1.22rem)]">
                Whether you&apos;re building an enterprise platform, deploying
                intelligent devices or transforming operations with AI, HackTech is
                ready to engineer the solution — technology designed for the real
                world, not just the slide deck. Aaiye baat karte hain.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Button asChild variant="hackPrimary" size="hack">
                  <Link href="/contact">Get a Free Consultation</Link>
                </Button>
                <TalkToKairaButton />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
