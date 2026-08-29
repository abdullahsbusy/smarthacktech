import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  otherHref,
  otherLabel,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: React.ReactNode }[];
  otherHref: string;
  otherLabel: string;
}) {
  return (
    <section className="pt-[calc(76px+13vh)] pb-[13vh]">
      <Container className="max-w-[820px]!">
        <span className="mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
          Legal
        </span>
        <h1 className="text-(--head) [font-size:clamp(1.9rem,4vw,3.1rem)] tracking-[-0.03em]">{title}</h1>
        <p className="mb-7 mt-2 text-(--muted)">Last updated: {updated}</p>
        <p className="[font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">{intro}</p>

        {sections.map((s) => (
          <div key={s.heading} className="mt-8.5">
            <h3 className="mb-2.5 text-[1.28rem] text-(--head)">{s.heading}</h3>
            <p className="text-[.97rem] text-(--muted)">{s.body}</p>
          </div>
        ))}

        <div className="mt-8.5">
          <Button asChild variant="hackGhost" size="hack">
            <Link href={otherHref}>{otherLabel} →</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
