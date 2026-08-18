import { getSocialLinks } from "@/lib/content/social";
import { isConfigured } from "@/lib/utils/isConfigured";
import { cn } from "@/lib/utils/cn";

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  facebook: "Facebook",
  threads: "Threads",
};

export async function SocialLinks({ className }: { className?: string }) {
  const links = await getSocialLinks();
  const configured = links.filter((l) => isConfigured(l.url));

  if (configured.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-4", className)}>
      {configured.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-sm uppercase tracking-wider text-muted hover:text-accent"
          >
            {PLATFORM_LABEL[link.platform] ?? link.platform}
          </a>
        </li>
      ))}
    </ul>
  );
}
