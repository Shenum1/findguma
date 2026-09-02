import { getSiteSettings } from "@/lib/content/artist";

// Generic reserved handles that could pass as staff/system accounts in any
// community, independent of this artist's identity.
const GENERIC_RESERVED = [
  "admin",
  "administrator",
  "artist",
  "official",
  "officialaccount",
  "moderator",
  "mod",
  "support",
  "system",
  "staff",
  "team",
  "help",
  "root",
  "owner",
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * True if `usernameLower` (already lowercased) could reasonably be mistaken
 * for the official artist account or a site-staff account. Checked in
 * addition to, not instead of, the DB's own uniqueness constraint.
 */
export async function isReservedUsername(usernameLower: string): Promise<boolean> {
  const normalized = normalize(usernameLower);
  if (GENERIC_RESERVED.some((reserved) => normalize(reserved) === normalized)) {
    return true;
  }

  const settings = await getSiteSettings();
  const artistVariants = [settings.artist.name, settings.artist.wordmark]
    .map(normalize)
    .filter((value) => value.length > 0);

  if (artistVariants.includes(normalized)) return true;

  // Catches "official<artist>", "<artist>official", "the<artist>", etc.
  return artistVariants.some(
    (variant) =>
      normalized === `official${variant}` ||
      normalized === `${variant}official` ||
      normalized === `the${variant}` ||
      normalized === `real${variant}`
  );
}
