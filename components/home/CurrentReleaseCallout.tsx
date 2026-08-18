"use client";

import type { Release } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { PixelButton } from "@/components/ui/PixelButton";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/formatDate";
import { usePanel } from "@/components/panels/useActivePanel";

export function CurrentReleaseCallout({ release }: { release: Release }) {
  const { openPanel, openSub } = usePanel();

  function handleListen() {
    openPanel("music");
    openSub(release.slug);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <div className="pixel-corners flex flex-col gap-5 border border-ink/70 bg-canvas-raised p-5 sm:flex-row sm:items-center sm:p-6">
        <PlaceholderMedia
          label="COVER ART — PLACEHOLDER"
          aspect="square"
          className="w-full max-w-[9rem] sm:w-36"
        />
        <div className="flex-1">
          <Badge tone="accent">Out now</Badge>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{release.title}</h2>
          <p className="mt-1 font-pixel text-sm uppercase tracking-wide text-muted">
            {formatDate(release.releaseDate)} · {release.type}
          </p>
        </div>
        <PixelButton onClick={handleListen}>▶ LISTEN</PixelButton>
      </div>
    </div>
  );
}
