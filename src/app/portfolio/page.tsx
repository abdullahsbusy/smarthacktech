import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { Chip } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { PortfolioFilter, type PortfolioProject } from "@/components/portfolio-filter";

const TITLE = "Portfolio, HackTech | The team & the work we've shipped";
const DESCRIPTION =
  "Meet the founding team behind HackTech and explore our work, fleet platforms, driver-safety AI, custom IoT hardware, security, smart-home automation and software.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: { title: "Portfolio, HackTech", description: "Meet the founding team behind HackTech and explore the work we've shipped.", url: "/portfolio" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const PROJECTS: PortfolioProject[] = [
  {
    cats: ["iot", "web"],
    href: "https://github.com/abdullahsokay/sotms-app",
    img: "/images/sotms-web.svg",
    category: "IoT · Fleet Platform",
    title: "SOTMS: Smart Transport Management",
    text: "A web command centre for fleets with live GPS tracking, diagnostics and fuel & driver analytics.",
    tech: ["React", "FastAPI", "Supabase", "GPS"],
  },
  {
    cats: ["ai", "vision", "security"],
    href: "https://github.com/abdullahsokay/Driver_Behavior_Monitoring",
    img: "/images/driver-monitor.svg",
    category: "AI · Computer Vision",
    title: "Driver Monitoring System",
    text: "Real-time detection of driver fatigue, distraction, phone use and seatbelt compliance, with instant alerts.",
    tech: ["Python", "Deep Learning", "Computer Vision"],
  },
  {
    cats: ["ai"],
    img: "/images/bidpilot.svg",
    category: "AI System",
    title: "BidPilot AI: Smart Bidding",
    text: "Reads tender documents, estimates competitive pricing and scores win-probability on every proposal.",
  },
  {
    cats: ["iot", "mobile"],
    href: "https://github.com/abdullahsokay/sotms-app",
    img: "/images/sotms-app.svg",
    category: "IoT · Mobile App",
    title: "SOTMS App: Fleet in Your Pocket",
    text: "Track every vehicle live, get speed, fuel and engine alerts, and review trip history from anywhere.",
  },
  {
    cats: ["mobile"],
    img: "/images/roadmate.svg",
    category: "Mobile App",
    title: "RoadMate: Roadside Assistance",
    text: "Connects stranded drivers with nearby mechanics in real time, with live tracking and in-app chat.",
    tech: ["Flutter", "Firebase"],
  },
  {
    cats: ["mobile"],
    img: "/images/packride.svg",
    category: "Mobile App",
    title: "PackRide: Ride-Hailing",
    text: "Book a ride in seconds, track your driver live on the map and see upfront, fair fares before confirming.",
  },
  {
    cats: ["web"],
    href: "https://mydubaisafari.vercel.app",
    img: "/images/mydubaisafari.webp",
    category: "Web Platform",
    title: "MyDubaiSafari: Desert Adventures",
    text: "A booking platform for Dubai desert safaris, deployed and taking live enquiries via WhatsApp.",
    tech: ["TypeScript", "Vercel"],
  },
  {
    cats: ["web"],
    href: "https://www.hacktechzone.com",
    img: "/images/hacktech-web.svg",
    category: "Web Design & Development",
    title: "HackTech Website",
    text: "This very site: a fast, animated, fully responsive brand site designed and built in-house.",
    tech: ["JavaScript", "CSS", "Vercel"],
  },
];

const PROCESS = [
  { num: "01", title: "Discover", text: "Understand the problem and what success looks like." },
  { num: "02", title: "Research", text: "Explore approaches, data and constraints before committing." },
  { num: "03", title: "Design", text: "Architecture, interface and technology selection." },
  { num: "04", title: "Engineer", text: "Build in visible increments, tested as we go." },
  { num: "05", title: "Deploy", text: "Ship it, monitor it, and train the people using it." },
  { num: "06", title: "Support", text: "Keep improving and scaling long after launch." },
] as const;

const TECHNOLOGIES = ["React", "Python", "Docker", "TensorFlow", "PostgreSQL", "ESP32", "FastAPI", "Flutter", "Supabase", "TypeScript"] as const;

const INDUSTRIES = [
  "Transportation", "Healthcare", "Education", "Retail", "Manufacturing",
  "Government", "Hospitality", "Construction", "Smart Cities", "Agriculture",
] as const;

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-[calc(76px+13vh)] pb-[6vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Portfolio"
              title={
                <>
                  Turning ideas into <Accent>intelligent solutions</Accent>
                </>
              }
              lead="Every project here represents a real challenge solved through engineering. From AI-powered platforms and IoT ecosystems to enterprise applications and intelligent automation, this is technology built to create measurable impact."
              className="mb-0"
            />
          </Reveal>
        </Container>
      </section>

      {/* ===== FEATURED PROJECT ===== */}
      <section id="featured" className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <div className="grid items-center gap-[50px] lg:grid-cols-2">
              <div className="relative min-h-[320px] overflow-hidden rounded-(--radius-lg) border border-(--line-2) bg-[#051622] shadow-lg">
                <Image src="/images/sotms-web.svg" alt="SOTMS fleet monitoring dashboard" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <span className="absolute bottom-3.5 left-3.5 z-10 rounded-full bg-black/55 px-3.5 py-1.5 font-(family-name:--font-display) text-xs text-[#f3f7ec] backdrop-blur-sm">
                  Flagship · Live fleet
                </span>
              </div>
              <div>
                <span className="mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
                  Featured project
                </span>
                <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                  SOTMS — <Accent>Pakistan&apos;s intelligent fleet platform</Accent>
                </h2>
                <p className="mt-4 [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                  Locally-built tracking hardware and a real-time dashboard that turn
                  thousands of vehicle signals into one command centre — live tracking,
                  dashcam AI, fuel analytics and driver scoring in a single screen.
                </p>
                <div className="my-5 flex flex-wrap gap-1.5 font-(family-name:--font-display) text-[.78rem] tracking-[.02em] text-(--faint)">
                  {["React", "FastAPI", "Supabase", "ESP32", "TensorFlow", "Maps", "GPS", "Computer Vision"].join(" · ")}
                </div>
                <div className="flex flex-wrap gap-3.5">
                  <Button asChild variant="hackPrimary" size="hack">
                    <Link href="/service?s=sotms">Explore SOTMS →</Link>
                  </Button>
                  <Button asChild variant="hackGhost" size="hack">
                    <a href="https://github.com/abdullahsokay/sotms-app" target="_blank" rel="noopener">
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== PROJECT GRID ===== */}
      <section id="work" className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Selected work"
              title={
                <>
                  Systems we&apos;ve <Accent>shipped</Accent>
                </>
              }
            />
          </Reveal>
          <Reveal>
            <PortfolioFilter projects={PROJECTS} />
          </Reveal>
        </Container>
      </section>

      {/* ===== TECHNOLOGIES ===== */}
      <section id="tech" className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Technologies"
              title={
                <>
                  The stack behind <Accent>the work</Accent>
                </>
              }
            />
            <div className="flex flex-wrap justify-center gap-3">
              {TECHNOLOGIES.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-(--line-2) bg-(--card) px-4 py-2.5 font-(family-name:--font-display) text-sm font-semibold text-(--head)"
                >
                  <span className="size-2 rounded-full bg-(--c5)" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== DEVELOPMENT PROCESS ===== */}
      <section id="process" className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Development process"
              title={
                <>
                  How every project <Accent>gets built</Accent>
                </>
              }
            />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.num} delay={(i % 3) * 0.06}>
                <div className="rounded-(--radius-md) border border-(--line) bg-(--card) p-6">
                  <span className="bg-grad-text bg-clip-text font-(family-name:--font-display) text-3xl font-bold text-transparent">
                    {p.num}
                  </span>
                  <h3 className="mt-3 text-(--head)">{p.title}</h3>
                  <p className="mt-2 text-sm text-(--muted)">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section id="industries" className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Industries"
              title={
                <>
                  Where this work <Accent>goes to work</Accent>
                </>
              }
              lead="From transport fleets to hospitals and campuses, the systems we build run wherever real work happens."
            />
            <div className="flex flex-wrap justify-center gap-2.5">
              {INDUSTRIES.map((ind) => (
                <Chip key={ind}>{ind}</Chip>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-[13vh]">
        <Container>
          <Reveal>
            <div className="rounded-(--radius-lg) border border-(--line-2) bg-[radial-gradient(600px_300px_at_50%_0%,rgba(15,111,176,.3),transparent_70%)] px-8 py-16 text-center">
              <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                Have a project <Accent>in mind</Accent>?
              </h2>
              <p className="mx-auto mt-4 max-w-[62ch] [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                Let&apos;s build something extraordinary. Tell us what you want to make
                and we&apos;ll show you exactly how HackTech would deliver it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Button asChild variant="hackPrimary" size="hack">
                  <Link href="/contact">Get a Quote</Link>
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
