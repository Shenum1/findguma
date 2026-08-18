/**
 * Treats missing/empty values as "not configured" so we never render a
 * fabricated link (streaming platforms, socials, tickets). A literal "#" is
 * treated as configured on purpose — it's the standard, transparent
 * placeholder-link convention (never mistaken for a real URL) used by content
 * entries that want to demonstrate the "link renders" state before the real
 * URL exists; entries not yet ready simply omit `url` and are filtered here.
 */
export function isConfigured(url?: string | null): url is string {
  if (!url) return false;
  return url.trim().length > 0;
}
