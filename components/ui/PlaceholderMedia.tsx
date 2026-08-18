import { cn } from "@/lib/utils/cn";

/**
 * Stands in for cover art / photos / product shots / video posters until real
 * assets exist. Deliberately looks like a placeholder (not a fabricated photo)
 * per the content rules — labeled, textured, never presented as real media.
 */
export function PlaceholderMedia({
  label,
  aspect = "square",
  variant = "image",
  className,
}: {
  label: string;
  aspect?: "square" | "portrait" | "landscape" | "wide";
  variant?: "image" | "video";
  className?: string;
}) {
  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    wide: "aspect-video",
  }[aspect];

  return (
    <div
      className={cn(
        "pixel-corners relative flex items-center justify-center overflow-hidden border border-ink/30 bg-[repeating-linear-gradient(135deg,var(--color-line)_0px,var(--color-line)_2px,transparent_2px,transparent_10px)]",
        aspectClass,
        className
      )}
    >
      <div className="absolute inset-2 flex flex-col items-center justify-center gap-2 border border-dashed border-ink/25 bg-canvas/70 px-2 text-center backdrop-blur-[1px]">
        {variant === "video" ? (
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center border border-ink/40 text-sm text-muted"
          >
            &#9654;
          </span>
        ) : null}
        <span className="font-pixel text-xs uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}
