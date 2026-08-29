import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { CardGlow, CardTitle, CardText } from "@/components/ui/card-glow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { TeamAccordion, type TeamMember } from "@/components/team-accordion";

const TITLE = "About HackTech, Pakistan's IoT & AI Ecosystem";
const DESCRIPTION =
  "HackTech is a Pakistani IoT & AI company, SOTMS fleet telematics, smart-home automation, security, with software and training to complete the stack.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const VALUES = [
  {
    title: "Engineering excellence",
    text: "Every solution is carefully designed before a line of it is built.",
    path: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M4 7.5l8 4.5 8-4.5",
  },
  {
    title: "Innovation",
    text: "We keep exploring emerging technology to solve tomorrow's problems, not just today's.",
    path: "M9 18h6M10 22h4 M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  },
  {
    title: "Reliability",
    text: "Technology should work consistently in real-world conditions — heat, dust and all.",
    path: "M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3z M9 12l2 2 4-4",
  },
  {
    title: "Long-term partnerships",
    text: "We measure success by the relationships we build, not simply by projects completed.",
    path: "M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5 9 5 12 8 12 8s3-3 5.5-3C21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z",
  },
] as const;

const TEAM: TeamMember[] = [
  {
    name: "Abdullah Iqbal",
    role: "Founder & CEO",
    bio: "Founded HackTech and leads it end to end, sets the vision, owns the architecture, and makes sure every piece we ship talks to the next.",
    img: "/images/abdullah-iqbal-v2.webp",
    imgPosition: "50% 37%",
    badgePath: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M16 8l-5.5 2.5L8 16l5.5-2.5L16 8z",
  },
  {
    name: "Naba Batool",
    role: "Co-Founder",
    bio: "Co-founded HackTech and runs the technical operations behind every delivery, planning, builds, releases and quality, so what we promise is what actually ships.",
    img: "/images/naba-batool-v3.webp",
    badgePath: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  },
  {
    name: "Atif Riaz",
    role: "Chief Marketing Officer (CMO)",
    bio: "Leads marketing end to end, branding, campaigns, customer acquisition and growth, and builds alongside the team, positioning, outreach and code from the same desk.",
    img: "/images/atif-riaz-v2.webp",
    imgPosition: "50% 16%",
    badgePath: "M3 11l18-7-7 18-2.5-7.5z",
  },
];

const JOURNEY = [
  { num: 1, title: "Founded", text: "A small crew of engineers sets out to build technology Pakistan owns end-to-end, no imported black boxes." },
  { num: 2, title: "Our flagship: SOTMS", text: "We assemble our first locally-made edge-AI device and ship a full fleet-intelligence platform, our proof that world-class hardware can be built here." },
  { num: 3, title: "Beyond hardware", text: "Customers ask for software, AI, security and automation too. We build the teams, web & mobile dev, AI services, CCTV, smart-home and training." },
  { num: 4, title: "One ecosystem today", text: "Six service lines, one Pakistani partner, IoT, smart homes, AI and security at the core, software and training alongside, all engineered in Pakistan." },
] as const;

const STATS = [
  { num: "15+", label: "Projects delivered" },
  { num: "50+", label: "Technologies used" },
  { num: "6", label: "Service lines under one roof" },
  { num: "6 days", label: "Support available, Mon–Sat" },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-[calc(76px+13vh)] pb-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="About HackTech"
              title={
                <>
                  Engineering technology that <Accent>solves real problems</Accent>
                </>
              }
              lead={
                <>
                  HackTech was founded on one belief: technology should simplify
                  businesses, not complicate them.
                  <br />
                  We engineer intelligent systems that combine software, artificial
                  intelligence, IoT, automation and security into reliable solutions
                  built for real-world environments.
                </>
              }
              className="mb-0"
            />
          </Reveal>
        </Container>
      </section>

      {/* ===== OUR STORY ===== */}
      <section id="story" className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <div className="grid items-center gap-[50px] lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
                  Our story
                </span>
                <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                  From student innovation to an <Accent>engineering company</Accent>
                </h2>
                <p className="mt-4 [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                  HackTech started with a passion for solving practical problems
                  through technology.
                </p>
                <p className="mt-3 text-(--muted)">
                  What began with software projects and research has grown into an
                  engineering company building AI systems, IoT solutions, enterprise
                  software and intelligent automation for businesses across Pakistan.
                </p>
                <p className="mt-3 text-(--muted)">
                  Today we continue to design technology that is practical, scalable
                  and built to last — engineered, deployed and supported right here
                  at home.
                </p>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button asChild variant="hackPrimary" size="hack">
                    <Link href="/portfolio">See our work</Link>
                  </Button>
                  <Button asChild variant="hackGhost" size="hack">
                    <Link href="/contact">Aaiye baat karte hain</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[320px] overflow-hidden rounded-(--radius-lg) border border-(--line-2) bg-[#051622] shadow-lg">
                <Image
                  src="/images/engineering.webp"
                  alt="A HackTech engineer working on a locally-made circuit board at the bench"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover [filter:saturate(.92)_contrast(1.02)]"
                />
                <span className="absolute bottom-3.5 left-3.5 z-10 rounded-full bg-black/55 px-3.5 py-1.5 font-(family-name:--font-display) text-xs text-[#f3f7ec] backdrop-blur-sm">
                  Started at the bench
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section id="mission" className="py-[13vh]">
        <Container>
          <Reveal>
            <div className="grid gap-[50px] md:grid-cols-2">
              <CardGlow>
                <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-7">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                </div>
                <h2 className="mb-2.5 text-[1.35rem] text-(--head)">Our mission</h2>
                <CardText>
                  To help businesses embrace intelligent technology through
                  engineering solutions that improve productivity, security and
                  operational efficiency.
                </CardText>
              </CardGlow>
              <CardGlow>
                <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-7">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h2 className="mb-2.5 text-[1.35rem] text-(--head)">Our vision</h2>
                <CardText>
                  To become Pakistan&apos;s leading technology engineering company,
                  recognised for building innovative AI, IoT and automation systems
                  that create meaningful impact across industries.
                </CardText>
              </CardGlow>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== VALUES ===== */}
      <section id="values" className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="What we stand for"
              title={
                <>
                  Values that <Accent>ship in every project</Accent>
                </>
              }
              lead="Not posters on a wall — the principles we actually engineer by."
            />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <CardGlow className="h-full">
                  <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-7">
                      {v.path.split(" M").map((d, idx) => (
                        <path key={idx} d={idx === 0 ? d : "M" + d} />
                      ))}
                    </svg>
                  </div>
                  <CardTitle>{v.title}</CardTitle>
                  <CardText>{v.text}</CardText>
                </CardGlow>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== TEAM ===== */}
      <section id="team" className="section-light section-sky py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="The team"
              title={
                <>
                  Meet the engineers <Accent>behind HackTech</Accent>
                </>
              }
              lead="Behind every solution is a multidisciplinary team of engineers passionate about building intelligent technology. Each member brings expertise across software engineering, AI, embedded systems, IoT and automation, delivering complete solutions from concept to deployment."
            />
          </Reveal>
          <TeamAccordion members={TEAM} />
        </Container>
      </section>

      {/* ===== JOURNEY ===== */}
      <section id="journey" className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Our journey"
              title={
                <>
                  From first solder to a <Accent>full technology ecosystem</Accent>
                </>
              }
            />
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[22px]">
            {JOURNEY.map((s, i) => (
              <Reveal key={s.num} variant="pop" delay={i * 0.08}>
                <div className="rounded-(--radius-lg) border border-(--line) bg-(--card) p-[30px]">
                  <div className="mb-4 grid size-11 place-items-center rounded-full bg-grad-btn font-(family-name:--font-display) font-bold text-[#0A0A0A]">
                    {s.num}
                  </div>
                  <h3 className="mb-2 text-[1.1rem] text-(--head)">{s.title}</h3>
                  <p className="text-[.94rem] text-(--muted)">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== WHY CLIENTS TRUST US ===== */}
      <section id="trust" className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Why clients trust us"
              title={
                <>
                  Proof, not <Accent>promises</Accent>
                </>
              }
            />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-(--radius-lg) border border-(--line) bg-(--card) p-8 text-center">
                  <span className="mb-2.5 block bg-grad-text bg-clip-text font-(family-name:--font-display) text-[clamp(2.2rem,4vw,2.8rem)] font-bold leading-none text-transparent">
                    {s.num}
                  </span>
                  <span className="block text-[.95rem] leading-snug text-(--muted)">{s.label}</span>
                </div>
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
                Let&apos;s build the <Accent>future together</Accent>
              </h2>
              <p className="mx-auto mt-4 max-w-[62ch] [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                IoT, smart home, AI, security, software or training — tell us what
                you&apos;re building and we&apos;ll put the right team on it. Aaiye baat
                karte hain.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                <Button asChild variant="hackPrimary" size="hack">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
                <Button asChild variant="hackGhost" size="hack">
                  <Link href="/portfolio">See our work</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
