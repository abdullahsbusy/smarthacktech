import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-[54px] max-w-[680px]",
        center && "mx-auto text-center [&_.actions]:justify-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-block font-(family-name:--font-display) text-xs tracking-[3px] text-(--c6) uppercase",
            center && "block w-max mx-auto"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="text-(length:--h2-size) text-(--head) tracking-[-0.03em] [font-size:clamp(1.9rem,4vw,3.1rem)]">
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-[62ch] text-(--muted) [font-size:clamp(1.02rem,1.5vw,1.22rem)]",
            center && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="bg-grad-text bg-clip-text text-transparent">{children}</span>;
}
