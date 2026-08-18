"use client";

import type { Release } from "@/lib/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReleaseCard } from "@/components/music/ReleaseCard";
import { ReleaseWindow } from "@/components/music/ReleaseWindow";
import { usePanel } from "@/components/panels/useActivePanel";

export function MusicPanel({ releases }: { releases: Release[] }) {
  const { activePanel, activeSub, closeSub } = usePanel();
  const activeRelease =
    activePanel === "music" && activeSub ? releases.find((r) => r.slug === activeSub) ?? null : null;

  return (
    <div>
      <SectionHeading eyebrow="THE CATALOG">MUSIC</SectionHeading>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {releases.map((release) => (
          <ReleaseCard key={release.slug} release={release} />
        ))}
      </div>
      <ReleaseWindow release={activeRelease} onClose={closeSub} />
    </div>
  );
}
