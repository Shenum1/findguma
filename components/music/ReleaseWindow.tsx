"use client";

import { useState } from "react";
import type { Release } from "@/lib/types/content";
import { Modal } from "@/components/ui/Modal";
import { Visualizer } from "@/components/music/Visualizer";
import { Tracklist } from "@/components/music/Tracklist";
import { StreamingLinks } from "@/components/music/StreamingLinks";
import { formatDate } from "@/lib/utils/formatDate";

export function ReleaseWindow({ release, onClose }: { release: Release | null; onClose: () => void }) {
  // Keeps the last-known release rendered during the close/exit animation,
  // since `release` itself flips to null the instant the panel starts closing.
  // Adjusted during render (React's documented pattern for this), not in an
  // effect, so there's no extra render pass or flash of empty content.
  const [prevRelease, setPrevRelease] = useState(release);
  const [displayRelease, setDisplayRelease] = useState<Release | null>(release);
  if (release !== prevRelease) {
    setPrevRelease(release);
    if (release) setDisplayRelease(release);
  }

  return (
    <Modal open={!!release} onClose={onClose} labelledBy="release-window-heading" className="max-w-xl">
      {displayRelease ? (
        <div className="pixel-corners max-h-[85vh] overflow-y-auto border border-ink/70 bg-canvas-raised">
          <div className="flex items-center justify-between gap-3 border-b border-ink/70 bg-ink px-3 py-1.5 text-canvas">
            <span className="truncate font-pixel text-lg leading-none tracking-wide">
              {displayRelease.title.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-6 w-6 items-center justify-center border border-canvas/40 font-pixel text-sm leading-none hover:bg-canvas/10"
            >
              ✕
            </button>
          </div>
          <div className="space-y-5 p-5 sm:p-6">
            <Visualizer visualizer={displayRelease.visualizer} title={displayRelease.title} />
            <div>
              <h2 id="release-window-heading" className="font-display text-2xl font-semibold text-ink">
                {displayRelease.title}
              </h2>
              <p className="mt-1 font-pixel text-xs uppercase tracking-wide text-muted">
                {formatDate(displayRelease.releaseDate)} · {displayRelease.type}
              </p>
              {displayRelease.description ? (
                <p className="mt-2 font-body text-sm text-muted">{displayRelease.description}</p>
              ) : null}
            </div>
            <Tracklist tracks={displayRelease.tracks} releaseTitle={displayRelease.title} />
            <StreamingLinks links={displayRelease.links} />
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
