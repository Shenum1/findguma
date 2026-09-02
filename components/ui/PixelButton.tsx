"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

// Exported so a Link that needs to look like a PixelButton (e.g. the
// Unreleased sign-in/sign-up gate) can share these exact classes instead of
// duplicating them — <button> can't render as an anchor.
export function pixelButtonClass(variant: "primary" | "ghost" = "primary", className?: string) {
  return cn(
    "pixel-corners inline-flex items-center justify-center gap-2 border font-pixel text-lg tracking-wide transition-colors px-4 py-2 leading-none disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary"
      ? "border-ink bg-ink text-canvas hover:bg-ink/85"
      : "border-ink/70 bg-transparent text-ink hover:bg-ink/10",
    className
  );
}

export function PixelButton({
  variant = "primary",
  className,
  children,
  ...props
}: PixelButtonProps) {
  return (
    <button className={pixelButtonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}
