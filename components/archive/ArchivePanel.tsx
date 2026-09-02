"use client";

import { useState } from "react";
import type { Freestyle, PhotoAlbum } from "@/lib/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePanel } from "@/components/panels/useActivePanel";
import { PhotosSection } from "@/components/archive/PhotosSection";
import { FreestylesSection } from "@/components/archive/FreestylesSection";
import { UnreleasedSection } from "@/components/archive/UnreleasedSection";

type ArchiveSection = "photos" | "freestyles" | "unreleased";

const SECTIONS: { id: ArchiveSection; number: string; label: string }[] = [
  { id: "photos", number: "01", label: "PHOTOS" },
  { id: "freestyles", number: "02", label: "FREESTYLES" },
  { id: "unreleased", number: "03", label: "UNRELEASED" },
];

/**
 * Exactly three curated sections, chosen locally (not URL-hash-routed —
 * PanelProvider's activeSub only ever holds one path segment, which is
 * still needed as-is by PhotosSection's album deep-linking). A direct link
 * into a specific album (`#archive/<slug>`) still lands on Photos via the
 * lazy initializer below.
 */
export function ArchivePanel({
  albums,
  freestyles,
}: {
  albums: PhotoAlbum[];
  freestyles: Freestyle[];
}) {
  const { activeSub } = usePanel();
  const [section, setSection] = useState<ArchiveSection | null>(() => (activeSub ? "photos" : null));

  return (
    <div>
      <SectionHeading eyebrow="/ARTIST/ARCHIVE">ARCHIVE</SectionHeading>
      {section ? (
        <button
          type="button"
          onClick={() => setSection(null)}
          className="mb-4 font-pixel text-sm uppercase tracking-wide text-muted hover:text-accent"
        >
          ← Back to Archive
        </button>
      ) : null}
      {section === null ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {SECTIONS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSection(entry.id)}
              className="pixel-corners flex flex-col items-start gap-1 border border-ink/40 bg-canvas-raised px-4 py-3 text-left hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="font-pixel text-xs text-muted">{entry.number}</span>
              <span className="font-pixel text-base uppercase tracking-wide text-ink">{entry.label}</span>
            </button>
          ))}
        </div>
      ) : section === "photos" ? (
        <PhotosSection albums={albums} />
      ) : section === "freestyles" ? (
        <FreestylesSection freestyles={freestyles} />
      ) : (
        <UnreleasedSection />
      )}
    </div>
  );
}
