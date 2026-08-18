import type { Track } from "@/lib/types/content";
import { formatDuration } from "@/lib/utils/formatDate";
import { AudioPreview } from "@/components/music/AudioPreview";

export function Tracklist({ tracks, releaseTitle }: { tracks: Track[]; releaseTitle: string }) {
  return (
    <ol className="divide-y divide-ink/15 border-y border-ink/15">
      {tracks.map((track, index) => (
        <li key={track.id} className="flex items-center gap-3 py-2.5">
          <span className="w-5 shrink-0 font-pixel text-sm text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 truncate font-body text-sm text-ink">{track.title}</span>
          <span className="font-pixel text-xs text-muted">{formatDuration(track.durationSeconds)}</span>
          <AudioPreview track={track} releaseTitle={releaseTitle} />
        </li>
      ))}
    </ol>
  );
}
