import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { CardGlow, CardTitle, CardText } from "@/components/ui/card-glow";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { SERVICE_KEY_TO_CONTACT_OPTION } from "@/lib/data/services";

const TITLE = "Contact HackTech, Get a Quote | IoT, Smart Homes, AI & Security";
const DESCRIPTION =
  "Get a quote from HackTech, IoT, smart home, AI, security, software or training. Tell us what you need and our Pakistan-based team will design the right solution.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "HackTech",
  image: "https://www.hacktechzone.com/og-image.png",
  url: "https://www.hacktechzone.com/contact",
  email: "contact.hacktechzone@gmail.com",
  telephone: "+92-327-5516703",
  priceRange: "$",
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  areaServed: "PK",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
};

const FAQS = [
  {
    q: "Do you really do all of this in-house?",
    a: "Yes. IoT, smart-home automation, AI, security & surveillance, software and training are all delivered by one HackTech team, one point of contact, no vendor finger-pointing.",
    path: "M12 3l9 5-9 5-9-5 9-5z M3 13l9 5 9-5",
  },
  {
    q: "Can you handle a small project too?",
    a: "Absolutely, from a student's final-year project kit to an enterprise rollout across cities. Tell us the scope and we'll size it right, with transparent pricing.",
    path: "M12 4 2 9l10 5 10-5-10-5z M6 11v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5",
  },
  {
    q: "Is your hardware really made in Pakistan?",
    a: "Yes. Our flagship SOTMS tracking hardware is engineered and assembled locally, designed, built and tested right here in Pakistan.",
    path: "M3 21V8l6 3V8l6 3V5l6 3v13H3z M7 21v-4M12 21v-4M17 21v-4",
  },
  {
    q: "How do we get started?",
    a: "Send this form with what you need. We'll set up a quick scope call, send a clear proposal, then build and support it, transparent pricing, no surprises.",
    path: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M14 3v6h6M8 13h8M8 17h6",
  },
] as const;

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SOCIALS = [
  { href: "https://www.tiktok.com/@hacktech.zone", label: "TikTok · hacktech zone" },
  { href: "mailto:contact.hacktechzone@gmail.com", label: "contact.hacktechzone@gmail.com" },
  { href: "tel:+923275516703", label: "0327 5516703" },
] as const;

type Props = {
  searchParams: Promise<{ s?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const key = (await searchParams).s;
  const defaultService = key ? SERVICE_KEY_TO_CONTACT_OPTION[key.toLowerCase()] : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />

      <section className="pt-[calc(76px+13vh)] pb-[6vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow="Get in touch"
              title={
                <>
                  Let&apos;s build <Accent>something great</Accent> together
                </>
              }
              lead="Tell us what you need, IoT, smart home, AI, security, software or training, and our Karachi-based team will design the right solution. Aaiye baat karte hain."
              className="mb-0"
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-[6vh]">
        <Container>
          <div className="grid gap-[50px] lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal variant="left">
              <ContactForm defaultService={defaultService} />
            </Reveal>
            <Reveal variant="right">
              <div className="flex flex-col gap-5">
                {[
                  { label: "Email", value: "contact.hacktechzone@gmail.com", href: "mailto:contact.hacktechzone@gmail.com", path: "M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M3 7l9 6 9-6" },
                  { label: "Phone", value: "0327 5516703", href: "tel:+923275516703", path: "M6 3h3l2 5-2.2 1.3a11 11 0 0 0 5.9 5.9L16 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3z" },
                  { label: "Based in", value: "Karachi, Pakistan", path: "M12 21s-6-5-6-10a6 6 0 0 1 12 0c0 5-6 10-6 10z M12 11m-2.2 0a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0 -4.4 0" },
                  { label: "Hours", value: "Mon–Sat, 9:00–18:00 PKT", path: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0 M12 8v4l3 2" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-5">
                        {item.path.split(" M").map((d, idx) => (
                          <path key={idx} d={idx === 0 ? d : "M" + d} />
                        ))}
                      </svg>
                    </span>
                    <div>
                      <span className="block text-[.76rem] uppercase tracking-wider text-(--c6)">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="block text-[1.05rem] text-(--ink) hover:text-(--c6)">
                          {item.value}
                        </a>
                      ) : (
                        <span className="block text-[1.05rem] text-(--ink)">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-light py-[13vh]">
        <Container>
          <Reveal>
            <SectionHead
              center
              eyebrow=""
              title={
                <>
                  Frequently <Accent>asked</Accent>
                </>
              }
              lead="Quick answers on how we work across IoT, smart homes, AI, security and software."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.08}>
                <CardGlow className="h-full">
                  <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-(--glass-2) text-(--c6)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-7">
                      {f.path.split(" M").map((d, idx) => (
                        <path key={idx} d={idx === 0 ? d : "M" + d} />
                      ))}
                    </svg>
                  </div>
                  <CardTitle>{f.q}</CardTitle>
                  <CardText>{f.a}</CardText>
                </CardGlow>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-[6vh]">
        <Container>
          <Reveal>
            <div className="text-center">
              <p className="[font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
                Prefer a quick chat? Reach us on social, we usually reply the same day.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener" : undefined}
                    className="rounded-full bg-(--glass) px-4 py-2 text-[0.82rem] text-(--muted) transition-colors hover:bg-(--glass-2) hover:text-(--head)"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
