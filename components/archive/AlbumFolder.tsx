"use client";

import type { PhotoAlbum } from "@/lib/types/content";
import { usePanel } from "@/components/panels/useActivePanel";

export function AlbumFolder({ album }: { album: PhotoAlbum }) {
  const { openSub } = usePanel();

  return (
    <button
      type="button"
      onClick={() => openSub(album.slug)}
      className="pixel-corners flex flex-col items-start gap-1 border border-ink/40 bg-canvas-raised px-4 py-3 text-left hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="font-pixel text-base uppercase tracking-wide text-ink">{album.title}</span>
      <span className="font-pixel text-xs text-muted">{album.photos.length} photos</span>
    </button>
  );
}
