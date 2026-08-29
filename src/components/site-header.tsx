"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { ABOUT_MENU, PRIMARY_NAV, SERVICE_MENU } from "@/lib/nav-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPaletteHint } from "@/components/command-palette/command-palette";
import { cn } from "@/lib/utils";

function useActiveKey(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/solutions") || pathname.startsWith("/service")) return "solutions";
  if (pathname.startsWith("/portfolio")) return "portfolio";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return "";
}

export function SiteHeader() {
  const pathname = usePathname();
  const activeKey = useActiveKey(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile drawer links call closeMobile() directly on click, so no route-change
  // effect is needed to close it (avoids a setState-in-effect cascade)
  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "site-nav fixed inset-x-0 top-0 z-50 flex h-[76px] items-center px-5 transition-colors duration-300 md:px-10",
        scrolled
          ? "bg-(--c1)/90 backdrop-blur-md border-b border-(--line)"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Link href="/" className="mr-auto flex items-center gap-2.5">
        <Image
          src="/images/hacktech-mark.svg"
          alt="HackTech Zone"
          width={42}
          height={42}
          priority
        />
        <span className="font-(family-name:--font-display) text-lg font-bold text-(--head)">
          Hack<span className="text-(--c5)">Tech</span>
        </span>
      </Link>

      {/* ---- desktop nav ---- */}
      <ul className="hidden items-center gap-1.5 md:flex">
        {PRIMARY_NAV.map((item) => (
          <li key={item.key} className="group relative">
            <Link
              href={item.href}
              aria-current={activeKey === item.key ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] transition-colors",
                activeKey === item.key
                  ? "bg-grad-btn text-[#0A0A0A]"
                  : "text-(--head) hover:bg-white/7"
              )}
            >
              {item.label}
              {(item.key === "solutions" || item.key === "about") && (
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {item.key === "solutions" && (
              <ul className="invisible absolute left-0 top-full min-w-[240px] translate-y-1 rounded-2xl border border-(--line) bg-(--c2) p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                {SERVICE_MENU.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/service?s=${s.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-(--ink) hover:bg-white/7 hover:text-(--head)"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {item.key === "about" && (
              <ul className="invisible absolute left-0 top-full w-[280px] translate-y-1 rounded-2xl border border-(--line) bg-(--c2) p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                {ABOUT_MENU.map((a) => (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="block rounded-lg px-3 py-2 hover:bg-white/7"
                    >
                      <span className="block text-sm font-medium text-(--head)">{a.title}</span>
                      <span className="block text-xs text-(--muted)">{a.subtitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="ml-4 hidden items-center gap-3 md:flex">
        <ThemeToggle />
        <CommandPaletteHint />
        <Link
          href="/contact"
          aria-current={activeKey === "contact" ? "page" : undefined}
          className="rounded-full bg-grad-btn px-5 py-2.5 text-[13px] font-semibold text-[#0A0A0A] shadow-[0_12px_30px_rgba(255,164,0,.3)] transition-shadow hover:shadow-[0_18px_48px_rgba(255,164,0,.44)]"
        >
          Get a Quote
        </Link>
      </div>

      {/* ---- mobile toggle ---- */}
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="ml-4 grid size-10 place-items-center rounded-lg text-(--head) md:hidden"
      >
        {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* ---- mobile drawer ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-[min(86vw,360px)] overflow-y-auto border-l border-(--line) bg-(--c1) px-7 pb-11 pt-[104px] md:hidden"
            >
              <ul className="flex flex-col gap-5">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className={cn(
                        "text-base",
                        activeKey === item.key ? "text-(--c6)" : "text-(--ink)"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.key === "solutions" && (
                      <ul className="mt-3 flex flex-col gap-3 pl-4">
                        {SERVICE_MENU.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/service?s=${s.slug}`} onClick={closeMobile} className="text-sm text-(--muted)">
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.key === "about" && (
                      <ul className="mt-3 flex flex-col gap-3 pl-4">
                        {ABOUT_MENU.map((a) => (
                          <li key={a.href}>
                            <Link href={a.href} onClick={closeMobile} className="text-sm text-(--muted)">
                              {a.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="flex items-center gap-3 pt-2">
                  <ThemeToggle />
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="flex-1 rounded-full bg-grad-btn px-5 py-2.5 text-center text-sm font-semibold text-[#0A0A0A]"
                  >
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
