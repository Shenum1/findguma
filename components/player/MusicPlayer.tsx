"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/player/usePlayer";
import { ProgressBar } from "@/components/player/ProgressBar";

export function MusicPlayer() {
  const { currentTrack, status, currentTime, duration, isVisible, seekToken, togglePlay, seek, close, dispatchTimeUpdate, dispatchPause } =
    usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastTrackIdRef = useRef<string | null>(null);

  // Load a new track / play-pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentTrack) {
      audio.pause();
      return;
    }
    if (lastTrackIdRef.current !== currentTrack.id) {
      audio.src = currentTrack.previewAudioUrl;
      lastTrackIdRef.current = currentTrack.id;
    }
    if (status === "playing") {
      void audio.play().catch(() => dispatchPause());
    } else {
      audio.pause();
    }
  }, [currentTrack, status, dispatchPause]);

  // Explicit seeks only (never on natural timeupdate, to avoid feedback loop)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = currentTime;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seekToken]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => dispatchTimeUpdate(audio.currentTime, audio.duration || 0);
    const handleEnded = () => {
      dispatchPause();
      seek(0);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatchTimeUpdate, dispatchPause, seek]);

  return (
    <>
      <audio ref={audioRef} preload="none" />
      {isVisible && currentTrack ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/70 bg-canvas-raised/95 backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-96">
          <div className="pixel-corners flex items-center gap-3 border border-ink/70 bg-canvas-raised px-3 py-2 sm:border">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={status === "playing" ? "Pause" : "Play"}
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/70 font-pixel text-base"
            >
              {status === "playing" ? "❚❚" : "▶"}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-pixel text-sm uppercase tracking-wide text-ink">
                {currentTrack.title}
              </p>
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seek}
                label={currentTrack.title}
              />
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close player"
              className="flex h-9 w-9 shrink-0 items-center justify-center font-pixel text-base text-muted hover:text-ink"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
