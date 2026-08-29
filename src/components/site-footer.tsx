import Link from "next/link";
import Image from "next/image";
import { OpenChip } from "@/components/open-chip";

export function SiteFooter() {
  return (
    <footer className="border-t border-(--line) bg-(--c1)">
      <div className="mx-auto max-w-(--breakpoint-xl) px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/">
              <Image
                src="/images/hacktech-logo.svg"
                alt="HackTech Zone"
                width={56}
                height={56}
              />
            </Link>
            <p className="mt-3.5 max-w-[34ch] text-sm text-(--muted)">
              Engineering intelligent technology — AI, software, IoT, automation and
              security, built under one roof in Pakistan.
            </p>
            <p className="mt-3 font-(family-name:--font-display) text-[13px] font-semibold tracking-wide text-(--c6)">
              AI · Software · IoT · Automation · Security
            </p>
          </div>

          <FooterCol title="What we do">
            <FooterLink href="/solutions">Services</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Get a Quote</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterCol>

          <FooterCol title="Get in touch">
            <FooterLink href="mailto:contact.hacktechzone@gmail.com">
              contact.hacktechzone@gmail.com
            </FooterLink>
            <FooterLink href="tel:+923275516703">0327 5516703</FooterLink>
            <FooterLink href="https://www.tiktok.com/@hacktech.zone" external>
              TikTok · hacktech zone
            </FooterLink>
          </FooterCol>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-(--line) py-5 text-sm text-(--muted)">
          <span>© 2026 HackTech Technologies (Pvt) Ltd. All rights reserved.</span>
          <OpenChip />
          <span>Engineered in Pakistan 🇵🇰</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-(family-name:--font-display) text-[13px] uppercase tracking-wider text-(--c6)">
        {title}
      </h3>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="py-1 text-sm text-(--muted) transition-colors hover:text-(--c6)"
    >
      {children}
    </Link>
  );
}
