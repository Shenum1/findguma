import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  children,
  className,
  id,
  tabIndex,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  tabIndex?: number;
}) {
  return (
    <div className={cn("mb-6", className)}>
      {eyebrow ? (
        <p className="mb-1 font-pixel text-sm uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        tabIndex={tabIndex}
        className="font-display text-3xl font-medium leading-tight text-ink outline-none sm:text-4xl"
      >
        {children}
      </h2>
    </div>
  );
}
