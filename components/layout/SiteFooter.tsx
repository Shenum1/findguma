import { SocialLinks } from "@/components/social/SocialLinks";
import { FooterNewsletterForm } from "@/components/newsletter/FooterNewsletterForm";

export function SiteFooter({ artistName, statusLine }: { artistName: string; statusLine: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/70 bg-canvas-raised">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="max-w-sm">
          <p className="font-pixel text-sm uppercase tracking-wider text-muted">
            WANT TO STAY IN THE LOOP?
          </p>
          <div className="mt-2">
            <FooterNewsletterForm />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-ink/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <SocialLinks />
          <p className="font-pixel text-xs uppercase tracking-wider text-muted">
            © {year} {artistName} — {statusLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
