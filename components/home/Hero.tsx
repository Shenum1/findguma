import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { NavLink, MerchNavLink } from "@/components/layout/NavLink";
import { PANEL_NAV_ITEMS } from "@/components/layout/navItems";

export function Hero({ name, tagline }: { name: string; tagline: string }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div>
        <p className="font-pixel text-sm uppercase tracking-[0.25em] text-muted">
          Welcome to
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {name}
        </h1>
        <nav aria-label="Primary" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:hidden">
          {PANEL_NAV_ITEMS.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} />
          ))}
          <MerchNavLink />
        </nav>
        <p className="mt-4 max-w-md font-body text-lg text-muted">{tagline}</p>
      </div>
      <PlaceholderMedia label="HERO VISUAL — PLACEHOLDER" aspect="wide" variant="video" />
    </div>
  );
}
