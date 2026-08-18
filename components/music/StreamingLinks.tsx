import type { ReleaseLink } from "@/lib/types/content";
import { isConfigured } from "@/lib/utils/isConfigured";

const PLATFORM_LABEL: Record<string, string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  youtube: "YouTube",
  audiomack: "Audiomack",
  boomplay: "Boomplay",
  deezer: "Deezer",
  tidal: "Tidal",
  amazon: "Amazon",
  purchase: "Buy / Download",
};

// Only platforms with a real configured URL ever render — never a fabricated link.
export function StreamingLinks({ links }: { links: ReleaseLink[] }) {
  const configured = links.filter((link) => isConfigured(link.url));

  if (configured.length === 0) {
    return <p className="font-pixel text-sm uppercase text-muted">Links coming soon.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-2">
      {configured.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink/40 px-2.5 py-1 font-pixel text-sm uppercase tracking-wide text-ink hover:border-accent hover:text-accent"
          >
            {PLATFORM_LABEL[link.platform] ?? link.platform}
          </a>
        </li>
      ))}
    </ul>
  );
}
