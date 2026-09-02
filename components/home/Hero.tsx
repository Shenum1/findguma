import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

export function Hero({
  name,
  tagline,
  wordmark,
}: {
  name: string;
  tagline: string;
  wordmark: string;
}) {
  return (
    <div className="relative mx-auto grid max-w-5xl gap-8 overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[28vw] font-semibold text-ink/5 sm:text-[14rem]"
      >
        {wordmark}
      </span>
      <div className="relative z-10">
        <p className="font-pixel text-sm uppercase tracking-[0.25em] text-muted">
          Welcome to
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {name}
        </h1>
        <p className="mt-4 max-w-md font-body text-lg text-muted">{tagline}</p>
      </div>
      <div className="relative z-10">
        <PlaceholderMedia label="HERO VISUAL — PLACEHOLDER" aspect="wide" variant="video" />
      </div>
    </div>
  );
}
