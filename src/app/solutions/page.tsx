import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { CardGlow, CardTitle, CardText } from "@/components/ui/card-glow";
import { Chip } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { ServiceStack, type ServiceStackItem } from "@/components/service-stack";

const TITLE = "Services, HackTech | IoT, Smart Homes, AI, Security & Software";
const DESCRIPTION =
  "HackTech's core is IoT and AI, SOTMS fleet telematics, smart-home automation, security & surveillance, with software and training to complete the stack.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/solutions" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solutions" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const SERVICES: ServiceStackItem[] = [
  {
    slug: "iot",
    img: "/images/circuit.webp",
    no: "01 · IoT",
    title: "IoT",
    accent: "solutions",
    cap: "Devices · live data",
    text: "Our IoT solutions combine sensors, embedded hardware and cloud software to monitor, automate and optimise operations in real time — led by our SOTMS fleet-intelligence platform.",
    chips: ["Fleet Monitoring", "Asset Tracking", "Smart Industry", "Environmental Monitoring", "Agriculture", "Energy Monitoring", "Custom Embedded Systems"],
    cta: "Explore IoT",
  },
  {
    slug: "smarthome",
    img: "/images/smart-home.webp",
    no: "02 · Smart Home",
    title: "Smart home &",
    accent: "automation",
    cap: "One app · one voice",
    text: "Intelligent homes and offices where lighting, security, access and energy work together effortlessly — controlled from a single app or your voice.",
    chips: ["Smart Lighting", "Smart Locks", "CCTV Integration", "Video Doorbells", "Smart Curtains", "Climate Control", "Energy Monitoring", "Voice Assistants", "Remote Access"],
    cta: "Explore Smart Home",
  },
  {
    slug: "ai",
    img: "/images/ai.webp",
    no: "03 · AI",
    title: "AI &",
    accent: "automation",
    cap: "Agents · vision · workflows",
    text: "Harness AI to automate repetitive tasks, lift productivity and unlock the insight hiding in your data — wired into your tools with guardrails and human review.",
    chips: ["AI Assistants", "Chatbots", "Intelligent Agents", "Computer Vision", "Workflow Automation", "Predictive Analytics", "OCR & Document Processing"],
    cta: "Explore AI Solutions",
  },
  {
    slug: "security",
    img: "/images/security.webp",
    no: "04 · Security",
    title: "Security &",
    accent: "surveillance",
    cap: "CCTV · access · biometrics",
    text: "Protect your people, property and operations with intelligent surveillance and access control — professionally surveyed, installed, configured and monitored end to end.",
    chips: ["CCTV Systems", "IP Cameras", "Access Control", "Biometric Attendance", "Video Analytics", "Remote Monitoring", "Security Consultation"],
    cta: "Explore Security",
  },
  {
    slug: "software",
    img: "/images/software.webp",
    no: "05 · Software",
    title: "Software",
    accent: "development",
    cap: "Web · mobile · SaaS",
    text: "Modern web applications, enterprise platforms, SaaS products and mobile apps engineered around your business — streamlining operations, never off a template.",
    chips: ["Business Websites", "Enterprise Applications", "SaaS Platforms", "Mobile Applications", "Admin Dashboards", "APIs & Backend Systems", "Cloud Integrations"],
    cta: "Explore Software Development",
  },
  {
    slug: "training",
    img: "/images/training.webp",
    no: "06 · Training",
    title: "Training &",
    accent: "education",
    cap: "Hands-on · project-based",
    text: "Practical, project-based training and workshops in modern technology and real-world engineering — taught by engineers who ship commercial products, not theory alone.",
    chips: ["Software Development", "Artificial Intelligence", "IoT Development", "Embedded Systems", "Computer Vision", "Cloud Technologies"],
    cta: "Explore Training",
  },
];

const WHY_ONE_ROOF = [
  {
    title: "One partner, end to end",
    text: "Software, IoT, security, automation, training and hardware from a single team, no finger-pointing between vendors, one point of accountability.",
    path: "M3 3h8v8H3z M13 3h8v8h-8z M3 13h8v8H3z M13 13h8v8h-8z",
  },
  {
    title: "Locally made & supported",
    text: "Designed, assembled and serviced in Pakistan. Fair pricing, fast support and a team that actually picks up the phone.",
    path: "M5 21V4 M5 4h12l-2 4 2 4H5",
  },
  {
    title: "Built to last",
    text: "We test in heat, dust and the real world, if it can't survive Pakistani conditions, it doesn't ship. Reliable systems, backed by fast local support.",
    path: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M4 7.5l8 4.5 8-4.5M12 12v9",
  },
] as const;

const AUDIENCES = [
  "University Students", "Final-Year Projects", "Startups", "Software Houses",
  "Factories", "Transport Companies", "Schools & Universities", "Offices",
  "Homes", "Government",
] as const;

export default function SolutionsPage() {
  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <section className="pt-[calc(76px+13vh)] pb-[6vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="What we do"
              title={
                <>
                  We connect things, <Accent>then make them think</Accent>
                </>
              }
              lead="IoT platforms, smart-home automation, AI and security at the core, with software development and training to complete the stack, engineered and supported under one roof in Pakistan."
              className="mb-0"
            />
          </Reveal>
        </Container>
      </section>

      {/* ===== SIX SERVICE LINES — stacking scroll cards ===== */}
      <section id="services" className="pb-16 pt-10 md:pb-16 md:pt-20">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Our Services · What we build"
              title={
                <>
                  Six service lines, <Accent>one team</Accent>
                </>
              }
              className="mb-8"
            />
          </Reveal>
        </Container>
        <ServiceStack items={SERVICES} />
      </section>

      {/* ===== SOTMS FLAGSHIP ===== */}
      <section id="sotms" className="py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow=""
              title={
                <>
                  SOTMS: <Accent>smart fleet, one screen</Accent>
                </>
              }
              lead="SOTMS is HackTech's flagship fleet-intelligence platform, locally-built tracking devices and the SOTMS dashboard that turn thousands of vehicle signals into one calm, real-time command centre."
            />
          </Reveal>
          <Reveal>
            <div className="grid items-center gap-[50px] lg:grid-cols-2">
              <div className="relative min-h-[320px] overflow-hidden rounded-(--radius-lg) border border-(--line-2) bg-[#051622] shadow-lg">
                <Image
                  src="/images/fleet.webp"
                  alt="A fleet truck on the highway, tracked live by HackTech SOTMS"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3.5 left-3.5 z-10 rounded-full bg-black/55 px-3.5 py-1.5 font-(family-name:--font-display) text-xs text-[#f3f7ec] backdrop-blur-sm">
                  SOTMS · Live fleet
                </span>
              </div>
              <div>
                <h3 className="text-(--head) [font-size:clamp(1.5rem,3vw,2.2rem)]">
                  One platform for tracking, safety & savings
                </h3>
                <p className="mt-4 [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                  Live tracking, dashcam AI, fuel & route optimisation, driver
                  scoring and diagnostics, engineered in Pakistan for Pakistani
                  roads, and backed by a team that actually picks up the phone.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {["Live tracking", "Driver-behavior AI", "Fuel & route savings", "Vehicle diagnostics", "Geo-fencing"].map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <Button asChild variant="hackPrimary" size="hack">
                    <Link href="/service?s=sotms">Explore SOTMS</Link>
                  </Button>
                  <Button asChild variant="hackGhost" size="hack">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== WHY ONE ROOF ===== */}
      <section className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow=""
              title={
                <>
                  Every layer of technology, <Accent>under one roof</Accent>
                </>
              }
              lead="Most companies cover one or two of these areas. We cover the whole stack, so your software, hardware, AI and security actually talk to each other."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
            {WHY_ONE_ROOF.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <CardGlow className="h-full">
                  <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-7">
                      {w.path.split(" M").map((d, idx) => (
                        <path key={idx} d={idx === 0 ? d : "M" + d} />
                      ))}
                    </svg>
                  </div>
                  <CardTitle>{w.title}</CardTitle>
                  <CardText>{w.text}</CardText>
                </CardGlow>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-11 max-w-[62ch] text-center [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
              From a student&apos;s final-year project to an enterprise rollout,
              there&apos;s a HackTech line for everyone.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              {AUDIENCES.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-light section-sky py-[13vh]">
        <Container>
          <Reveal>
            <div className="rounded-(--radius-lg) border border-(--line-2) bg-[radial-gradient(600px_300px_at_50%_0%,rgba(10,97,153,.18),transparent_70%)] px-8 py-16 text-center">
              <h2 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">
                One partner for <Accent>all your technology</Accent>
              </h2>
              <p className="mx-auto mt-4 max-w-[62ch] [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                IoT, smart home, AI, security, software or training, tell us what
                you&apos;re building and we&apos;ll put the right line to work.
                Aaiye baat karte hain.
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
