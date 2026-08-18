import { formatDuration } from "@/lib/utils/formatDate";

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
  label,
}: {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  label: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <span className="w-10 shrink-0 text-right font-pixel text-xs text-muted">
        {formatDuration(currentTime)}
      </span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        onChange={(event) => onSeek(Number(event.target.value))}
        aria-label={`Seek — ${label}`}
        className="h-1.5 flex-1 accent-accent"
      />
      <span className="w-10 shrink-0 font-pixel text-xs text-muted">{formatDuration(duration)}</span>
    </div>
  );
}
