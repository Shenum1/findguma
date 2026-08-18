"use client";

import type { Track } from "@/lib/types/content";
import { isConfigured } from "@/lib/utils/isConfigured";
import { usePlayer } from "@/components/player/usePlayer";

export function AudioPreview({ track, releaseTitle }: { track: Track; releaseTitle: string }) {
  const { currentTrack, status, playTrack, togglePlay } = usePlayer();

  if (!isConfigured(track.previewAudioUrl)) {
    return (
      <span className="font-pixel text-xs uppercase tracking-wider text-muted/70">
        Preview unavailable
      </span>
    );
  }

  const isCurrent = currentTrack?.id === track.id;
  const isPlaying = isCurrent && status === "playing";

  function handleClick() {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        releaseTitle,
        previewAudioUrl: track.previewAudioUrl!,
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isPlaying}
      className="flex items-center gap-1.5 border border-ink/40 px-2 py-1 font-pixel text-xs uppercase tracking-wider text-ink hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true">{isPlaying ? "❚❚" : "▶"}</span>
      Preview
    </button>
  );
}
