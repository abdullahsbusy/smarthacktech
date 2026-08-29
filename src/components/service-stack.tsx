"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export type ServiceStackItem = {
  slug: string;
  img: string;
  no: string;
  title: string;
  accent: string;
  cap: string;
  text: string;
  chips: readonly string[];
  cta: string;
};

export function ServiceStack({ items }: { items: ServiceStackItem[] }) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <StackCard key={item.slug} item={item} index={i} isLast={i === items.length - 1} />
      ))}
    </div>
  );
}

function StackCard({
  item,
  index,
  isLast,
}: {
  item: ServiceStackItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  // scrubs from 1 -> a slight shrink as the NEXT card scrolls up to cover
  // this one, mirroring the original's GSAP scale-back-as-covered effect.
  // Skipped on the last card, which stays full size (nothing covers it).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);

  return (
    <motion.article
      ref={ref}
      style={{ scale, top: `calc(88px + ${index} * 13px)` }}
      className="sticky mx-auto mb-5.5 flex min-h-[82vh] w-[min(1180px,92vw)] items-center overflow-hidden rounded-[28px] bg-cover bg-center shadow-[0_40px_90px_-46px_rgba(0,0,0,.75)] max-[899px]:static max-[899px]:min-h-0 max-[899px]:scale-100!"
      data-index={index}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.img})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,9,15,.95)_0%,rgba(4,9,15,.82)_42%,rgba(4,9,15,.44)_78%,rgba(4,9,15,.22)_100%)]" />
      <div className="relative z-2 max-w-[680px] p-7 text-[#eaf3fb] md:p-12 lg:p-18">
        <span className="font-(family-name:--font-display) text-[.78rem] font-bold uppercase tracking-[.24em] text-[#7cc3f4]">
          {item.no}
        </span>
        <h3 className="mt-3.5 font-(family-name:--font-display) text-[clamp(2rem,4.4vw,3.15rem)] font-bold leading-[1.04]">
          {item.title}{" "}
          <span className="bg-[linear-gradient(120deg,#C6E1F7,#7cc3f4_55%,#2FA8EF)] bg-clip-text text-transparent">
            {item.accent}
          </span>
        </h3>
        <p className="mt-3 text-[.76rem] uppercase tracking-[.16em] text-[#A6D6F7]">{item.cap}</p>
        <p className="mt-4.5 max-w-[52ch] text-[clamp(1rem,1.4vw,1.14rem)] leading-relaxed text-[#d6e7f3]">
          {item.text}
        </p>
        <div className="mt-5.5 flex flex-wrap gap-2.5">
          {item.chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/26 bg-white/12 px-4 py-2 text-[0.82rem] text-[#eaf3fb] backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-6.5">
          <Button asChild variant="hackPrimary" size="hack">
            <Link href={`/service?s=${item.slug}`}>{item.cta} →</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
