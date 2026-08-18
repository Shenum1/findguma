export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

export function formatYear(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return String(date.getFullYear());
}

export function formatDuration(totalSeconds?: number) {
  if (!totalSeconds || Number.isNaN(totalSeconds)) return "--:--";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
