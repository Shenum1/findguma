import type { SocialLink } from "@/lib/types/content";

// PLACEHOLDER — only a subset configured on purpose, to verify unconfigured
// platforms never render.
const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", url: "#" },
  { platform: "youtube", url: "#" },
  { platform: "tiktok" },
  { platform: "x" },
  { platform: "facebook" },
  { platform: "threads" },
];

export async function getSocialLinks(): Promise<SocialLink[]> {
  return SOCIAL_LINKS;
}
