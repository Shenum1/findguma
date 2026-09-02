// Mirrors the eventual Supabase/Postgres schema (Phase 4). Content accessors in
// lib/content/*.ts return these shapes today from local placeholder data; when a
// real backend is added, only the accessor bodies change to real queries.

export interface Artist {
  name: string;
  wordmark: string;
  tagline: string;
}

export interface BioSection {
  heading: string;
  body: string;
}

export interface SiteSettings {
  artist: Artist;
  bioSections: BioSection[];
  quote: {
    text: string;
    attribution?: string;
  };
  statusLine: string;
}

export type StreamingPlatform =
  | "spotify"
  | "appleMusic"
  | "youtube"
  | "audiomack"
  | "boomplay"
  | "deezer"
  | "tidal"
  | "amazon"
  | "purchase";

export interface ReleaseLink {
  platform: StreamingPlatform;
  url?: string;
}

export interface Track {
  id: string;
  title: string;
  durationSeconds?: number;
  previewAudioUrl?: string;
  fullAudioUrl?: string;
}

export type ReleaseType = "single" | "ep" | "album";

export interface Visualizer {
  videoUrl?: string;
  posterUrl?: string;
}

export interface Release {
  slug: string;
  title: string;
  type: ReleaseType;
  releaseDate: string;
  description?: string;
  tracks: Track[];
  links: ReleaseLink[];
  visualizer?: Visualizer;
  published: boolean;
}

export interface Photo {
  id: string;
  caption?: string;
  date?: string;
  aspect: "portrait" | "landscape" | "square";
}

export interface PhotoAlbum {
  slug: string;
  title: string;
  description?: string;
  photos: Photo[];
  published: boolean;
}

export interface Freestyle {
  id: string;
  title: string;
  date?: string;
  description?: string;
  previewAudioUrl?: string;
  externalUrl?: string;
}

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "coming_soon";

export interface MerchVariant {
  id: string;
  label: string;
  price: number;
  currency: string;
  stockStatus: StockStatus;
  sku: string;
}

export interface MerchProduct {
  slug: string;
  name: string;
  description: string;
  variants: MerchVariant[];
  published: boolean;
}

export interface TourEvent {
  id: string;
  date: string;
  city: string;
  country: string;
  venue: string;
  time?: string;
  ticketUrl?: string;
  rsvpUrl?: string;
  published: boolean;
}

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x"
  | "facebook"
  | "threads";

export interface SocialLink {
  platform: SocialPlatform;
  url?: string;
}
