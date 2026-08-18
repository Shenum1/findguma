import type { SiteSettings } from "@/lib/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

export function AboutPanel({ settings }: { settings: SiteSettings }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
      <div className="space-y-6">
        <PlaceholderMedia label="ARTIST PHOTOGRAPHY — PLACEHOLDER" aspect="portrait" />
        <blockquote className="border-l-2 border-accent pl-4 font-display text-xl italic leading-snug text-ink">
          “{settings.quote.text}”
        </blockquote>
      </div>
      <div className="space-y-8">
        {settings.bioSections.map((section) => (
          <div key={section.heading}>
            <SectionHeading eyebrow={undefined}>{section.heading}</SectionHeading>
            <p className="font-body text-base leading-relaxed text-ink/90">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
