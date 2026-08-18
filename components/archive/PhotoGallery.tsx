import type { Photo } from "@/lib/types/content";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

// CSS multi-column masonry so mixed aspect ratios read as a collected archive,
// not a uniform social-media grid.
export function PhotoGallery({
  photos,
  onSelectPhoto,
}: {
  photos: Photo[];
  onSelectPhoto: (index: number) => void;
}) {
  return (
    <div className="columns-2 gap-3 sm:columns-3">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onSelectPhoto(index)}
          className="mb-3 block w-full break-inside-avoid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <PlaceholderMedia label={photo.caption ?? "ARCHIVE PHOTO"} aspect={photo.aspect} />
        </button>
      ))}
    </div>
  );
}
