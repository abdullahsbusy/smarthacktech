"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

/**
 * Mobile only, hidden until the page is scrolled past ~60px. Ported from
 * the static site's app.js §6b: at natural load on a phone, a fixed
 * bottom-left button collides with whatever a page's opening content is
 * (verified across every page, not just the home hero). Hiding it until
 * the user has scrolled a little clears every page's content in one
 * general fix rather than guessing a per-page threshold. Desktop is
 * unaffected — the button is always visible there.
 */
export function WhatsAppFab() {
  const [yielded, setYielded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    function onScroll() {
      setYielded(window.scrollY < 60);
    }
    function sync() {
      if (mq.matches) {
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        setYielded(false);
        window.removeEventListener("scroll", onScroll);
      }
    }
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/923275516703?text=${encodeURIComponent(
        "Hi HackTech! I'd like to discuss a project."
      )}`}
      target="_blank"
      rel="noopener"
      aria-label="Chat with HackTech on WhatsApp"
      className="fixed bottom-3.5 left-3.5 z-[65] grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#2fd366] to-[#128c4b] text-white shadow-[0_10px_26px_-8px_rgba(18,140,75,.65)] transition-all duration-250 hover:-translate-y-0.5 hover:scale-[1.06]"
      style={
        yielded
          ? { opacity: 0, transform: "scale(.7)", pointerEvents: "none" }
          : undefined
      }
    >
      <MessageCircle className="size-6" fill="currentColor" />
    </a>
  );
}
