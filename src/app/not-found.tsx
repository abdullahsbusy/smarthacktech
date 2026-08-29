import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Accent } from "@/components/ui/section-head";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center pt-[76px] text-center">
      <Container className="max-w-[640px]!">
        <span className="mb-2.5 block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase">
          Error 404
        </span>
        <h1 className="text-(--head) [font-size:clamp(2.7rem,7.2vw,5.4rem)] font-bold tracking-[-0.025em]">
          Page <Accent>not found</Accent>
        </h1>
        <p className="mx-auto mt-2 max-w-[62ch] [font-size:clamp(1.02rem,1.5vw,1.22rem)] text-(--muted)">
          This page doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-7.5 flex flex-wrap justify-center gap-3.5">
          <Button asChild variant="hackPrimary" size="hack">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="hackGhost" size="hack">
            <Link href="/solutions">Explore services</Link>
          </Button>
          <Button asChild variant="hackGhost" size="hack">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
