import type { Photo } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { formatDate } from "@/lib/utils/formatDate";

export function PhotoLightbox({
  photo,
  index,
  total,
  onPrev,
  onNext,
  onBack,
}: {
  photo: Photo;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-pixel text-xs uppercase tracking-wider text-muted hover:text-accent"
        >
          &larr; Back to album
        </button>
        <span className="font-pixel text-xs text-muted">
          {index + 1} / {total}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/40 font-pixel hover:border-accent"
        >
          &#8592;
        </button>
        <PlaceholderMedia
          label={photo.caption ?? "ARCHIVE PHOTO"}
          aspect={photo.aspect}
          className="flex-1"
        />
        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink/40 font-pixel hover:border-accent"
        >
          &#8594;
        </button>
      </div>
      {(photo.caption || photo.date) && (
        <p className="mt-2 font-pixel text-xs uppercase tracking-wide text-muted">
          {[photo.caption, photo.date ? formatDate(photo.date) : null].filter(Boolean).join(" — ")}
        </p>
      )}
    </div>
  );
}
