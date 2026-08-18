import type { SiteSettings } from "@/lib/types/content";

// PLACEHOLDER CONTENT — replace with the artist's real profile before launch.
// Never fabricated to look like a real biography; structurally obvious as placeholder.
const SITE_SETTINGS: SiteSettings = {
  artist: {
    name: "ARTIST NAME",
    wordmark: "A/N",
    tagline: "[One-line artist tagline goes here]",
  },
  bioSections: [
    {
      heading: "WHO IS THE ARTIST?",
      body: "[Origin story and background — replace with the artist's real biography. This placeholder intentionally contains no invented biographical details.]",
    },
    {
      heading: "INFLUENCES",
      body: "[The artists, sounds, and eras that shaped this project go here.]",
    },
    {
      heading: "CREATIVE PHILOSOPHY",
      body: "[How the artist thinks about making music and building a world around it.]",
    },
    {
      heading: "CURRENT ERA",
      body: "[What this chapter of the project is about right now.]",
    },
  ],
  quote: {
    text: "[Artist quote placeholder — replace with a real quote in the artist's voice.]",
  },
  statusLine: "LAST UPDATED — 2026 · BUILDING A WORLD, NOT JUST A WEBSITE",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  return SITE_SETTINGS;
}
