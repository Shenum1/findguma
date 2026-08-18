import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface WindowChromeProps {
  title?: string;
  children: ReactNode;
  className?: string;
  titleBarActions?: ReactNode;
  raised?: boolean;
  as?: "div" | "section" | "article";
}

/**
 * Shared "system window" shell — a title-bar card with a pixel-cut border, no
 * fake OS buttons. Reused for panels, the newsletter dialog, and the lightbox
 * so the retro visual language lives in one place.
 */
export function WindowChrome({
  title,
  children,
  className,
  titleBarActions,
  raised = false,
  as: Tag = "div",
}: WindowChromeProps) {
  return (
    <Tag
      className={cn(
        "pixel-corners border border-ink/70",
        raised ? "bg-canvas-raised" : "bg-canvas",
        className
      )}
    >
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
          <span className="truncate font-pixel text-lg leading-none tracking-wide">
            {title}
          </span>
          {titleBarActions ? (
            <div className="flex shrink-0 items-center gap-1.5">{titleBarActions}</div>
          ) : null}
        </div>
      ) : null}
      <div className="p-4 sm:p-6">{children}</div>
    </Tag>
  );
}
