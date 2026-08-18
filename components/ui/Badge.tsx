import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "accent" | "green" | "red";
  className?: string;
}) {
  const toneClass = {
    muted: "border-muted text-muted",
    accent: "border-accent text-accent",
    green: "border-green text-green",
    red: "border-red text-red",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 font-pixel text-sm uppercase leading-none tracking-wider",
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );
}
