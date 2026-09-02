import { NavLink, MerchNavLink } from "@/components/layout/NavLink";
import { PANEL_NAV_ITEMS } from "@/components/layout/navItems";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ChatPanelTrigger } from "@/components/chat/ChatPanelTrigger";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/70 bg-canvas/95 backdrop-blur">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 sm:left-3">
        <ChatPanelTrigger />
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-end gap-4 px-4 py-3 sm:px-6">
        <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
          {PANEL_NAV_ITEMS.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} assignTriggerId />
          ))}
          <MerchNavLink />
        </nav>
        <div className="sm:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
