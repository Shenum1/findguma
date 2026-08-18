export function PixelLoader({ label = "LOADING" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 font-pixel text-base text-muted" role="status">
      <span className="flex gap-0.5" aria-hidden="true">
        <span className="h-2 w-2 animate-pulse bg-muted [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-pulse bg-muted [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-pulse bg-muted [animation-delay:300ms]" />
      </span>
      <span>{label}</span>
    </div>
  );
}
