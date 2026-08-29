import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SERVICES } from "@/lib/data/services";
import { ServicePage } from "@/components/service-page";

type Props = {
  searchParams: Promise<{ s?: string }>;
};

function resolveService(rawKey?: string) {
  const key = (rawKey || "").toLowerCase();
  const svc = SERVICES[key];
  return svc ? { key, svc } : null;
}

function plainTitle(title: string) {
  return title.replace(/<[^>]+>/g, "");
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolved = resolveService((await searchParams).s);
  if (!resolved) return {};
  const { key, svc } = resolved;
  const title = plainTitle(svc.title);
  const ogTitle = `${title}, HackTech`;
  const canonical = `/service?s=${encodeURIComponent(key)}`;
  return {
    title,
    description: svc.lead,
    alternates: { canonical },
    openGraph: { title: ogTitle, description: svc.lead, url: canonical },
    twitter: { title: ogTitle, description: svc.lead },
  };
}

export default async function Service({ searchParams }: Props) {
  const resolved = resolveService((await searchParams).s);
  if (!resolved) redirect("/solutions");
  return <ServicePage svc={resolved.svc} svcKey={resolved.key} />;
}
