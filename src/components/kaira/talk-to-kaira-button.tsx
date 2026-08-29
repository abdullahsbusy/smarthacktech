"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DotLive } from "@/components/ui/pill";

/** Ported from index.html's inline onclick: open Kaira if the widget has
 * mounted, otherwise fall back to the contact page. */
export function TalkToKairaButton() {
  const router = useRouter();
  return (
    <Button
      variant="hackGhost"
      size="hack"
      onClick={() => {
        if (window.KairaChat) window.KairaChat.open();
        else router.push("/contact");
      }}
    >
      <DotLive /> Let&apos;s Talk
    </Button>
  );
}
