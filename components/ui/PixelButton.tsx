"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function PixelButton({
  variant = "primary",
  className,
  children,
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={cn(
        "pixel-corners inline-flex items-center justify-center gap-2 border font-pixel text-lg tracking-wide transition-colors px-4 py-2 leading-none disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary"
          ? "border-ink bg-ink text-canvas hover:bg-ink/85"
          : "border-ink/70 bg-transparent text-ink hover:bg-ink/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
