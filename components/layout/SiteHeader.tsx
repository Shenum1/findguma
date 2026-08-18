import { HomeWordmark, NavLink, MerchNavLink } from "@/components/layout/NavLink";
import { PANEL_NAV_ITEMS } from "@/components/layout/navItems";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader({ artistName, wordmark }: { artistName: string; wordmark: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/70 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <HomeWordmark name={artistName} wordmark={wordmark} />
        <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
          {PANEL_NAV_ITEMS.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} assignTriggerId />
          ))}
          <MerchNavLink />
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
