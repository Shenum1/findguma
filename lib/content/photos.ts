import type { PhotoAlbum } from "@/lib/types/content";

// PLACEHOLDER CONTENT — real photography replaces these entries later. Each
// photo renders through PlaceholderMedia rather than a fabricated image.
const ALBUMS: PhotoAlbum[] = [
  {
    slug: "studio",
    title: "STUDIO",
    description: "[Behind-the-scenes studio photos go here.]",
    published: true,
    photos: [
      { id: "studio-1", caption: "[Caption]", date: "2026-01", aspect: "landscape" },
      { id: "studio-2", caption: "[Caption]", date: "2026-01", aspect: "portrait" },
      { id: "studio-3", date: "2026-02", aspect: "square" },
      { id: "studio-4", caption: "[Caption]", date: "2026-02", aspect: "portrait" },
    ],
  },
  {
    slug: "live",
    title: "LIVE",
    description: "[Live performance photography goes here.]",
    published: true,
    photos: [
      { id: "live-1", caption: "[Caption]", date: "2025-11", aspect: "landscape" },
      { id: "live-2", date: "2025-11", aspect: "square" },
      { id: "live-3", caption: "[Caption]", date: "2025-12", aspect: "portrait" },
    ],
  },
  {
    slug: "polaroids",
    title: "POLAROIDS",
    description: "[Candid, low-res, film-camera moments go here.]",
    published: true,
    photos: [
      { id: "polaroids-1", date: "2025-10", aspect: "square" },
      { id: "polaroids-2", date: "2025-10", aspect: "square" },
      { id: "polaroids-3", date: "2025-12", aspect: "square" },
      { id: "polaroids-4", date: "2026-01", aspect: "square" },
      { id: "polaroids-5", date: "2026-02", aspect: "square" },
    ],
  },
  {
    slug: "unreleased",
    title: "UNRELEASED",
    description: "[Unreleased / archival visuals go here.]",
    published: true,
    photos: [{ id: "unreleased-1", caption: "[Caption]", aspect: "landscape" }],
  },
];

export async function getPhotoAlbums(): Promise<PhotoAlbum[]> {
  return ALBUMS.filter((a) => a.published);
}

export async function getPhotoAlbumBySlug(slug: string): Promise<PhotoAlbum | undefined> {
  return ALBUMS.find((a) => a.slug === slug && a.published);
}
