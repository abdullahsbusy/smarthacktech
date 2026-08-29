import { cn } from "@/lib/utils";

export function CardGlow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "relative rounded-(--radius-lg) border border-(--line) bg-(--card) p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-(--line-2) hover:bg-(--glass-2)",
        className
      )}
    >
      {children}
    </article>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2.5 text-[1.28rem] text-(--head)">{children}</h3>;
}

export function CardText({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.97rem] text-(--muted)">{children}</p>;
}
