"use client";

import { useEffect, useState } from "react";
import type { PhotoAlbum } from "@/lib/types/content";
import { Modal } from "@/components/ui/Modal";
import { PhotoGallery } from "@/components/archive/PhotoGallery";
import { PhotoLightbox } from "@/components/archive/PhotoLightbox";

export function AlbumWindow({ album, onClose }: { album: PhotoAlbum | null; onClose: () => void }) {
  // Same "adjust state during render" pattern as ReleaseWindow — keeps the
  // last-known album visible through the close animation without an effect.
  const [prevAlbum, setPrevAlbum] = useState(album);
  const [displayAlbum, setDisplayAlbum] = useState<PhotoAlbum | null>(album);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  if (album !== prevAlbum) {
    setPrevAlbum(album);
    if (album) {
      setDisplayAlbum(album);
      setLightboxIndex(null);
    }
  }

  // ESC closes the lightbox first, then the album window — routed through
  // Modal's single onClose so there's only ever one ESC listener.
  function handleModalClose() {
    if (lightboxIndex !== null) {
      setLightboxIndex(null);
    } else {
      onClose();
    }
  }

  useEffect(() => {
    if (lightboxIndex === null || !displayAlbum) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setLightboxIndex((i) => (i === null ? i : Math.min(i + 1, displayAlbum!.photos.length - 1)));
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayAlbum]);

  return (
    <Modal open={!!album} onClose={handleModalClose} labelledBy="album-window-heading" className="max-w-2xl">
      {displayAlbum ? (
        <div className="pixel-corners max-h-[85vh] overflow-y-auto border border-ink/70 bg-canvas-raised">
          <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
            <span id="album-window-heading" className="truncate font-pixel text-lg leading-none tracking-wide">
              {displayAlbum.title}
            </span>
            <button
              type="button"
              onClick={handleModalClose}
              aria-label="Close"
              className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
            >
              ✕
            </button>
          </div>
          <div className="p-5 sm:p-6">
            {lightboxIndex !== null ? (
              <PhotoLightbox
                photo={displayAlbum.photos[lightboxIndex]}
                index={lightboxIndex}
                total={displayAlbum.photos.length}
                onPrev={() => setLightboxIndex((i) => (i === null ? i : Math.max(i - 1, 0)))}
                onNext={() =>
                  setLightboxIndex((i) => (i === null ? i : Math.min(i + 1, displayAlbum.photos.length - 1)))
                }
                onBack={() => setLightboxIndex(null)}
              />
            ) : (
              <PhotoGallery photos={displayAlbum.photos} onSelectPhoto={setLightboxIndex} />
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
