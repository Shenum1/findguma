"use client";

import type { Freestyle } from "@/lib/types/content";
import { EmptyState } from "@/components/ui/EmptyState";
import { isConfigured } from "@/lib/utils/isConfigured";
import { usePlayer } from "@/components/player/usePlayer";

// Reuses the existing global singleton player (same one MusicPanel's
// AudioPreview uses) rather than a second audio implementation.
export function FreestylesSection({ freestyles }: { freestyles: Freestyle[] }) {
  const { currentTrack, status, playTrack, togglePlay } = usePlayer();

  if (freestyles.length === 0) {
    return <EmptyState title="NOTHING HERE YET" description="Check back soon." />;
  }

  return (
    <div className="flex flex-col gap-3">
      {freestyles.map((freestyle) => {
        const isCurrent = currentTrack?.id === freestyle.id;
        const isPlaying = isCurrent && status === "playing";
        const playable = isConfigured(freestyle.previewAudioUrl);

        return (
          <div
            key={freestyle.id}
            className="pixel-corners flex items-center justify-between gap-3 border border-ink/40 bg-canvas-raised p-4"
          >
            <div>
              <p className="font-pixel text-base uppercase tracking-wide text-ink">{freestyle.title}</p>
              {freestyle.date ? (
                <p className="font-pixel text-xs text-muted">{freestyle.date}</p>
              ) : null}
              {freestyle.description ? (
                <p className="mt-1 font-body text-sm text-muted">{freestyle.description}</p>
              ) : null}
            </div>
            {playable ? (
              <button
                type="button"
                onClick={() =>
                  isCurrent
                    ? togglePlay()
                    : playTrack({
                        id: freestyle.id,
                        title: freestyle.title,
                        releaseTitle: "FREESTYLE",
                        previewAudioUrl: freestyle.previewAudioUrl!,
                      })
                }
                aria-pressed={isPlaying}
                className="flex items-center gap-1.5 border border-ink/40 px-2 py-1 font-pixel text-xs uppercase tracking-wider text-ink hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
                Play
              </button>
            ) : (
              <span className="font-pixel text-xs uppercase tracking-wider text-muted/70">
                Unavailable
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
