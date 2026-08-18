import type { Release } from "@/lib/types/content";

// PLACEHOLDER CONTENT — titles, dates, and links are structurally obvious
// placeholders. Streaming links are deliberately left unset on some entries so
// the "only render configured platforms" rule can be verified in the UI.
const RELEASES: Release[] = [
  {
    slug: "release-one",
    title: "RELEASE TITLE ONE",
    type: "single",
    releaseDate: "2026-06-01",
    description: "[Short release description / liner note goes here.]",
    published: true,
    tracks: [
      {
        id: "release-one-track-1",
        title: "Song Title One",
        durationSeconds: 152,
        // A short placeholder tone (not a real song) — wired in only to verify
        // the persistent player actually plays/pauses/seeks end-to-end.
        previewAudioUrl: "/placeholder/preview-tone.wav",
      },
    ],
    links: [
      { platform: "spotify", url: "#" },
      { platform: "appleMusic", url: "#" },
      { platform: "youtube" },
      { platform: "audiomack" },
      { platform: "boomplay" },
      { platform: "deezer" },
      { platform: "tidal" },
      { platform: "amazon" },
      { platform: "purchase" },
    ],
    visualizer: {
      posterUrl: "placeholder",
    },
  },
  {
    slug: "release-two",
    title: "RELEASE TITLE TWO",
    type: "ep",
    releaseDate: "2026-02-14",
    description: "[Short release description / liner note goes here.]",
    published: true,
    tracks: [
      { id: "release-two-track-1", title: "Track One", durationSeconds: 198 },
      { id: "release-two-track-2", title: "Track Two", durationSeconds: 221 },
      { id: "release-two-track-3", title: "Track Three", durationSeconds: 174 },
    ],
    links: [
      { platform: "spotify", url: "#" },
      { platform: "appleMusic" },
      { platform: "youtube", url: "#" },
      { platform: "audiomack" },
      { platform: "boomplay" },
      { platform: "deezer" },
      { platform: "tidal" },
      { platform: "amazon" },
      { platform: "purchase" },
    ],
  },
  {
    slug: "release-three",
    title: "RELEASE TITLE THREE",
    type: "album",
    releaseDate: "2025-09-20",
    description: "[Short release description / liner note goes here.]",
    published: true,
    tracks: [
      { id: "release-three-track-1", title: "Opening", durationSeconds: 140 },
      { id: "release-three-track-2", title: "Middle Chapter", durationSeconds: 210 },
      { id: "release-three-track-3", title: "Closing", durationSeconds: 260 },
    ],
    links: [
      { platform: "spotify" },
      { platform: "appleMusic" },
      { platform: "youtube" },
      { platform: "audiomack" },
      { platform: "boomplay" },
      { platform: "deezer" },
      { platform: "tidal" },
      { platform: "amazon" },
      { platform: "purchase" },
    ],
  },
];

export async function getReleases(): Promise<Release[]> {
  return RELEASES.filter((r) => r.published).sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );
}

export async function getReleaseBySlug(slug: string): Promise<Release | undefined> {
  return RELEASES.find((r) => r.slug === slug && r.published);
}

export async function getLatestRelease(): Promise<Release | undefined> {
  const releases = await getReleases();
  return releases[0];
}
