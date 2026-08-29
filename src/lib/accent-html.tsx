import { Fragment } from "react";
import { Accent } from "@/components/ui/section-head";

const ACCENT_SPAN = /<span class="accent">(.*?)<\/span>/g;

/**
 * Renders fixed, hardcoded copy (from src/lib/data/services.ts) that embeds
 * `<span class="accent">...</span>` markers into gradient-accented React
 * nodes, without dangerouslySetInnerHTML. Never pass user input here.
 */
export function AccentHtml({ html }: { html: string }) {
  const parts = html.split(ACCENT_SPAN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <Accent key={i}>{part}</Accent> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
