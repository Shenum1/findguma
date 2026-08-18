"use client";

import type { Release } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { formatDate } from "@/lib/utils/formatDate";
import { usePanel } from "@/components/panels/useActivePanel";

export function ReleaseCard({ release }: { release: Release }) {
  const { openSub } = usePanel();

  return (
    <button
      type="button"
      onClick={() => openSub(release.slug)}
      className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <PlaceholderMedia
        label="COVER ART — PLACEHOLDER"
        aspect="square"
        className="transition-transform group-hover:-translate-y-0.5"
      />
      <p className="mt-2 truncate font-display text-lg font-medium text-ink">{release.title}</p>
      <p className="font-pixel text-xs uppercase tracking-wide text-muted">
        {formatDate(release.releaseDate)} · {release.type}
      </p>
    </button>
  );
}
