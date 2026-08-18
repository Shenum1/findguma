"use client";

import type { PhotoAlbum } from "@/lib/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AlbumFolder } from "@/components/archive/AlbumFolder";
import { AlbumWindow } from "@/components/archive/AlbumWindow";
import { usePanel } from "@/components/panels/useActivePanel";

export function ArchivePanel({ albums }: { albums: PhotoAlbum[] }) {
  const { activePanel, activeSub, closeSub } = usePanel();
  const activeAlbum =
    activePanel === "archive" && activeSub ? albums.find((a) => a.slug === activeSub) ?? null : null;

  return (
    <div>
      <SectionHeading eyebrow="/ARTIST/ARCHIVE">ARCHIVE</SectionHeading>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {albums.map((album) => (
          <AlbumFolder key={album.slug} album={album} />
        ))}
      </div>
      <AlbumWindow album={activeAlbum} onClose={closeSub} />
    </div>
  );
}
